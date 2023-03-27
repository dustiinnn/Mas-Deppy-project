const {
    authMiddleware,
    adminMiddleware,
} = require("../middleware/authenticate");
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Controller_allow_headers",
            "Authorization, Origin, Content-Type, Acces"
        );
        next();
    });

    app.post(
        "/api/products/",
        [authMiddleware, adminMiddleware],
        createProduct
    );
    app.get("/api/products/", getProducts);
    app.get("/api/products/:id", getProduct);
    app.delete(
        "/api/products/:id",
        [authMiddleware, adminMiddleware],
        deleteProduct
    );
    app.put(
        "/api/products/:id",
        [authMiddleware, adminMiddleware],
        updateProduct
    );
};
