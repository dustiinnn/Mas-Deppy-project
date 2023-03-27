require("dotenv").config();
const {
    User,
    VerifyEmailToken,
    ResetPasswordToken,
    sequelize,
} = require("../models");
const { Op, where } = require("sequelize");
const bcrypt = require("bcryptjs");
const { errorResponse, successResponse } = require("../helpers/utils");
var uid = require("rand-token").uid;
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const nodemailer = require("../helpers/nodemailer");

exports.signUp = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { username, firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create(
            {
                username,
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
            { transaction: t }
        );

        var token = uid(16);
        const expiredAt = new Date();
        expiredAt.setHours(expiredAt.getHours() + 1);

        const verifyEmailToken = await VerifyEmailToken.create(
            {
                userId: user.id,
                token,
                expiredAt,
            },
            { transaction: t }
        );

        await nodemailer.sendVerificationEmail(
            user.email,
            verifyEmailToken.token
        );

        await t.commit();
        return successResponse(
            201,
            true,
            "Registration success. Verification email has been sent to your email address",
            user,
            res
        );
    } catch (error) {
        await t.rollback();
        console.log(error);
        return errorResponse(500, "Failed register", error, res);
    }
};

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            return errorResponse(
                401,
                "Invalid email or password",
                "Invalid email or password",
                res
            );
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return errorResponse(
                401,
                "Invalid email or password",
                "Invalid email or password",
                res
            );
        }

        if (!user.isVerified) {
            return errorResponse(
                401,
                "Your account has not been verified, check your email",
                "Your account has not been verified, check your email",
                res
            );
        }

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        });

        return successResponse(
            200,
            true,
            "Login success",
            { token: token, user: user },
            res
        );
    } catch (error) {
        console.log(error);
        return errorResponse(500, "Internal server error", error, res);
    }
};

exports.verifyEmail = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { token } = req.params;
        const verifyEmailToken = await VerifyEmailToken.findOne({
            where: { token },
            include: { model: User, as: "user" },
            transaction: t,
        });
        const user = verifyEmailToken.user;
        if (!user) {
            await t.rollback();
            return res.status(400).json({ error: "Invalid or expired token" });
        }
        await user.update(
            { isVerified: true, verifiedAt: new Date() },
            { transaction: t }
        );
        await verifyEmailToken.destroy({ transaction: t });
        await t.commit();
        return res.status(200).json({ message: "Verification success" });
    } catch (error) {
        return errorResponse(400, "Failed to verify", error.message, res);
    }
};

exports.requestResetPassword = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const user = await User.findOne(
            {
                where: {
                    email: req.body.email,
                },
            },
            { transaction: t }
        );
        if (!user) throw { message: "User not found" };

        const isTokenExist = await ResetPasswordToken.findAll(
            {
                where: { userId: user.id },
            },
            { transaction: t }
        );

        if (isTokenExist.length > 0) {
            await Promise.all(
                isTokenExist.map((token) => token.destroy({ transaction: t }))
            );
        }

        var token = uid(16);
        const expiredAt = new Date();
        expiredAt.setHours(expiredAt.getHours() + 1);

        const createToken = await ResetPasswordToken.create(
            {
                userId: user.id,
                token: token,
                expiredAt: expiredAt,
            },
            { transaction: t }
        );
        await nodemailer.sendResetPasswordLink(user.email, token);
        await t.commit();
        return successResponse(
            201,
            true,
            "Reset password link has seen sent to your email",
            null,
            res
        );
    } catch (error) {
        if (t && t.finished !== "commit" && t.finished !== "rollback") {
            await t.rollback();
        }
        console.log(error);
        return errorResponse(
            500,
            "Request reset password failed",
            error.message,
            res
        );
    }
};

exports.resetPassword = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { token } = req.params;
        const { password, passwordConfirmation } = req.body;
        const isValidToken = await ResetPasswordToken.findOne({
            where: { token },
            include: { model: User, as: "user" },
            transaction: t,
        });
        if (!isValidToken) throw { message: "Token invalid / Expire" };
        if (password != passwordConfirmation)
            throw { message: "Password confirmation does not match" };
        const user = isValidToken.user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const resetPassword = await user.update(
            { password: hashedPassword },
            { transaction: t }
        );
        await isValidToken.destroy({ transaction: t });
        await t.commit();
        return successResponse(200, true, "Password reset success", null, res);
    } catch (error) {
        await t.rollback();
        return errorResponse(
            500,
            "Failed to reset password",
            error.message,
            res
        );
    }
};
