const Joi = require("joi");

const createUser = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const createProductValidation = Joi.object({
    name: Joi.string().required(),
    desc: Joi.string().allow(""),
    price: Joi.number().required(),
    image: Joi.string().allow(""),
});

const updateProductValidation = Joi.object({
    name: Joi.string().optional(),
    desc: Joi.string().allow("").optional(),
    price: Joi.number().optional(),
    image: Joi.string().allow("").optional(),
});

const createCartValidation = Joi.object({
    productId: Joi.string().required(),
    qty: Joi.number().integer().required(),
});

const updateCartValidation = Joi.object({
    qty: Joi.number().integer().required(),
});

module.exports = {
    createUser,
    createProductValidation,
    updateProductValidation,
    createCartValidation,
    updateCartValidation,
};
