const { authMiddleware } = require("../middleware/authenticate");
const { create } = require("../controllers/chat.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Controller_allow_headers",
            "Authorization, Origin, Content-Type, Acces"
        );
        next();
    });

    app.post("/api/chat", authMiddleware, create);
};
