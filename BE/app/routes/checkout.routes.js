const { checkout, updateTrx } = require("../controllers/checkout.controller");
const { authMiddleware } = require("../middleware/authenticate");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Controller_allow_headers",
            "Authorization, Origin, Content-Type, Acces"
        );
        next();
    });
    app.post("/api/checkout", [authMiddleware], checkout);
    app.patch("/api/update-trx/:id", [authMiddleware], updateTrx);
};
