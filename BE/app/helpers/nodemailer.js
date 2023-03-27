const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SSL,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

const sendVerificationEmail = (toEmail, token) => {
    try {
        const mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS,
            to: toEmail,
            subject: `Verification email`,
            html: `Please click this link to verify your email address: <a href="${process.env.APP_BASE_URL}/api/verify-email/${token}">Verify</a>`,
        };
        return transporter.sendMail(mailOptions);
    } catch (error) {
        return error.message;
    }
};

const sendResetPasswordLink = (toEmail, token) => {
    try {
        const mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS,
            to: toEmail,
            subject: `Request Reset Password`,
            html: `Please click this link to reset your password: <a href="${process.env.APP_BASE_URL}/api/reset-password/${token}">Reset Password</a>`,
        };
        return transporter.sendMail(mailOptions);
    } catch (error) {
        return error.message;
    }
};

module.exports = {
    sendVerificationEmail,
    sendResetPasswordLink,
};
