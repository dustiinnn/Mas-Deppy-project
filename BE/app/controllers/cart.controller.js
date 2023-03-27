const { Cart, Product } = require("../models");
const { successResponse, errorResponse } = require("../helpers/utils");
const {
    createCartValidation,
    updateCartValidation,
} = require("../validation/requiredFields");

const createCart = async (req, res) => {
    try {
        const { error } = createCartValidation.validate(req.body);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const { productId, qty } = req.body;
        const userId = req.user.id;
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        const existingCart = await Cart.findOne({
            where: { userId, productId },
        });
        if (existingCart) {
            await existingCart.increment("qty", { by: qty });
            successResponse(
                200,
                true,
                "Cart updated successfully",
                existingCart,
                res
            );
        } else {
            const cart = await Cart.create({ userId, productId, qty });
            successResponse(201, true, "Cart created successfully", cart, res);
        }
    } catch (error) {
        errorResponse(400, false, error.message, res);
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findAll({
            where: { userId: req.user.id },
            include: [Product],
        });
        let total = 0; // inisialisasi variabel total

        // perulangan pada setiap item di cart
        cart.forEach((item) => {
            const price = parseFloat(item.Product.price); // mengambil harga produk
            const qty = item.qty; // mengambil jumlah qty
            total += price * qty; // menghitung total harga
        });

        const response = {
            data: cart,
            total: total, // menambahkan total harga ke response
        };

        successResponse(
            200,
            true,
            "Cart successfully retrieved",
            response,
            res
        );
    } catch (error) {
        console.log(error);
        errorResponse(400, false, error.message, res);
    }
};

const updateCart = async (req, res) => {
    try {
        const { error } = updateCartValidation.validate(req.body);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const { qty } = req.body;
        const cart = await Cart.findOne({
            where: {
                userId: req.user.id,
                productId: req.params.id,
            },
        });

        if (!cart) {
            throw new Error("Cart not found");
        }

        await cart.update({ qty });
        successResponse(200, true, "Cart updated successfully", cart, res);
    } catch (error) {
        errorResponse(400, false, error.message, res);
    }
};

const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) {
            throw new Error("Cart not found");
        }

        await cart.destroy();
        successResponse(200, true, "Cart deleted successfully", null, res);
    } catch (error) {
        errorResponse(400, false, error.message, res);
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: {
                userId: req.user.id,
                productId: req.body.productId,
            },
        });
        if (!cart) {
            throw new Error("Cart not found");
        }

        await cart.destroy();
        successResponse(200, true, "Cart deleted successfully", null, res);
    } catch (error) {
        errorResponse(400, false, error.message, res);
    }
};

module.exports = {
    createCart,
    getCart,
    updateCart,
    deleteCart,
    deleteCartItem,
};
