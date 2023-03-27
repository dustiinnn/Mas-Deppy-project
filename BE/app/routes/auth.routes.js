const verifySignUp = require("../middleware/verifySignUp");
const verifySignIn = require("../middleware/verifySignIn");
const authController = require("../controllers/auth.controller");
const { authMiddleware, isValidToken } = require("../middleware/authenticate");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Controller_allow_headers",
            "Authorization, Origin, Content-Type, Acces"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [verifySignUp.checkDuplicateEmailorUsername],
        authController.signUp
    );
    app.get("/api/verify-email/:token", authController.verifyEmail);
    app.post("/api/auth/login", authController.signIn);
    app.post(
        "/api/auth/request-reset-password",
        authController.requestResetPassword
    );

    app.post("/api/reset-password/:token", authController.resetPassword);
    app.get("/api/auth/info", isValidToken);
};
