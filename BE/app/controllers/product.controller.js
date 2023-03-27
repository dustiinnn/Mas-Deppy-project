const { Product } = require("../models");
const { successResponse, errorResponse } = require("../helpers/utils");
const {
    createProductValidation,
    updateProductValidation,
} = require("../validation/requiredFields");
const uid = require("rand-token").uid;

const { uploadToImgbb } = require("../helpers/imageUpload");

const createProduct = async (req, res, next) => {
    try {
        const { error } = createProductValidation.validate(req.body);
        if (error) {
            return errorResponse(400, false, error.details[0].message, res);
        }

        const id = uid(16);

        // Upload image to imgbb
        let imageUrl = null;
        if (req.file) {
            const apiKey = process.env.IMGBB_API_KEY;
            imageUrl = await uploadToImgbb(
                apiKey,
                req.file.buffer,
                req.file.originalname
            );
        }

        const product = await Product.create({
            ...req.body,
            image: imageUrl,
            id,
        });
        successResponse(
            201,
            true,
            "Product created successfully",
            product,
            res
        );
    } catch (err) {
        const errorMessage = err.response
            ? err.response.data.error.message
            : err.message;
        errorResponse(500, true, errorMessage, res);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        successResponse(
            200,
            true,
            "Products retrieved successfully",
            products,
            res
        );
    } catch (err) {
        errorResponse(500, true, err.message, res);
    }
};

const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            successResponse(
                200,
                true,
                "Product retrieved successfully",
                product,
                res
            );
        } else {
            errorResponse(404, true, "Product not found", res);
        }
    } catch (err) {
        errorResponse(500, true, "Failed to retrieve product", res);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { error } = updateProductValidation.validate(req.body);
        if (error) {
            return errorResponse(400, false, error.details[0].message, res);
        }
        const product = await Product.findByPk(req.params.id);
        if (product) {
            if (req.file) {
                let imageUrl = null;
                if (req.file) {
                    const apiKey = process.env.IMGBB_API_KEY;
                    imageUrl = await uploadToImgbb(
                        apiKey,
                        req.file.buffer,
                        req.file.originalname
                    );
                }

                // Update the product with the new image URL
                await product.update({ ...req.body, image: imageUrl });
            } else {
                // Update the product without changing the image URL
                await product.update(req.body);
            }

            // Send the success response
            successResponse(
                200,
                true,
                "Product updated successfully",
                product,
                res
            );
        }
    } catch (err) {
        const errorMessage = err.response
            ? err.response.data.error.message
            : err.message;
        errorResponse(500, true, errorMessage, res);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            successResponse(
                200,
                true,
                "Product deleted successfully",
                null,
                res
            );
        } else {
            errorResponse(404, true, "Product not found", res);
        }
    } catch (err) {
        errorResponse(500, true, "Failed to delete product", res);
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
