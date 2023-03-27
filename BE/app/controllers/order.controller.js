const { Cart, Product, User, Order, OrderDetail } = require("../models");
const { Op } = require("sequelize");

exports.listOrder = async (req, res) => {
    try {
        const order = await Order.findAll({
            where: {
                userId: req.user.id,
            },
        });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        return res.json({
            success: true,
            message: "Order updated",
            data: order,
        });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

exports.myOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id,
            },
        });

        const orderDetail = await OrderDetail.findAll({
            where: {
                orderId: req.params.id,
            },
        });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        return res.json({
            success: true,
            message: "Order updated",
            data: {
                orderData: order,
                orderDetail: orderDetail,
            },
        });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

exports.orderDetail = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id,
            },
        });

        const orderData = await OrderDetail.findAll({
            where: {
                orderId: req.params.id,
            },
        });

        return res.json({
            success: true,
            message: "Order updated",
            orderId: order.id,
            totalPrice: order.totalPrice,
            grandTotal: order.grandTotal,
            orderData: orderData,
        });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

exports.orderData = async (req, res) => {
    try {
        const order = await Order.findAll({
            include: [User],
        });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        return res.json({
            success: true,
            message: "Order data retrieved",
            data: order,
        });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

exports.orderDetailAdmin = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id,
            },
        });

        const orderData = await OrderDetail.findAll({
            where: {
                orderId: req.params.id,
            },
        });

        return res.json({
            success: true,
            message: "Order updated",
            orderId: order.id,
            totalPrice: order.totalPrice,
            grandTotal: order.grandTotal,
            isPaid: order.isPaid,
            orderData: orderData,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
};
