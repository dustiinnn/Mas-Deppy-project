const { Cart, Product, Order, OrderDetail } = require("../models");

exports.checkout = async (req, res) => {
    try {
        const cart = await Cart.findAll({
            where: { userId: req.user.id },
            include: Product,
        });
        if (cart.length == 0) throw { message: "Keranjang anda kosong!" };

        const totalPrice = cart.reduce((total, item) => {
            return total + item.qty * item.Product.price;
        }, 0);

        const createOrder = await Order.create({
            userId: req.user.id,
            totalPrice: totalPrice,
            shipping: 10000,
            grandTotal: totalPrice + 10000,
        });

        let orderData = [];

        for (const item of cart) {
            const createDetailOrder = await OrderDetail.create({
                orderId: createOrder.id,
                productId: item.Product.id,
                productName: item.Product.name,
                productDesc: item.Product.desc,
                qty: item.qty,
                price: item.Product.price,
                totalPrice: +item.qty * +item.Product.price,
            });
            orderData.push(createDetailOrder);
        }

        const deleteCart = await Cart.destroy({
            where: {
                userId: req.user.id,
            },
        });

        res.status(201).send({
            success: true,
            msg: "Checkout berhasil!",
            orderId: createOrder.id,
            totalPrice: createOrder.totalPrice,
            grandTotal: createOrder.grandTotal,
            orderData: orderData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            msg: "Produk gagal ditambahkan",
            reason: err.message,
        });
    }
};

exports.updateTrx = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!order) throw { message: "Order tidak ditemukan" };

        if (!req.body.image)
            throw { message: "Bukti transfer tidak ditemukan" };

        await order.update({ isPaid: true });
        return res.json({ success: true, message: "Order updated" });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};
