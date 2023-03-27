const {
    listOrder,
    orderDetail,
    myOrder,
    orderData,
    orderDetailAdmin,
} = require("../controllers/order.controller");
const {
    authMiddleware,
    adminMiddleware,
} = require("../middleware/authenticate");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Controller_allow_headers",
            "Authorization, Origin, Content-Type, Acces"
        );
        next();
    });
    app.get("/api/my-order", [authMiddleware], listOrder);
    app.get("/api/my-order/:id", [authMiddleware], myOrder);
    app.get("/api/my-order/:id/detail", [authMiddleware], orderDetail);
    app.get("/api/order-data", [authMiddleware, adminMiddleware], orderData);
    app.get(
        "/api/order-data/:id/detail",
        [authMiddleware, adminMiddleware],
        orderDetailAdmin
    );
};
