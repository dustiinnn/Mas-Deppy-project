const db = require("../models");
const User = db.User;
const { errorResponse } = require("../helpers/utils");
const isVerifiedUser = async (req, res, next) => {
    try {
        const findUser = await User.findOne({
            where: { email: req.body.email },
        });
        if (!findUser.isVerified)
            throw {
                message: "Your account has not been verified, check your email",
            };
        next();
    } catch (error) {
        return errorResponse(400, "Failed login", error.message, res);
    }
};
module.exports = { isVerifiedUser };
