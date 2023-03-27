const { authMiddleware } = require("../middleware/authenticate");
const {
    createCart,
    getCart,
    updateCart,
    deleteCart,
    deleteCartItem,
} = require("../controllers/cart.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Controller_allow_headers",
            "Authorization, Origin, Content-Type, Acces"
        );
        next();
    });

    app.post("/api/cart/", [authMiddleware], createCart);
    app.get("/api/cart/", [authMiddleware], getCart);
    app.put("/api/cart/:id", [authMiddleware], updateCart);
    app.delete("/api/cart", [authMiddleware], deleteCartItem);
};
