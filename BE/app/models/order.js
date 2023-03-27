"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Order.belongsTo(models.User, {
                foreignKey: "userId",
                sourceKey: "id",
            });
            Order.hasMany(models.OrderDetail, {
                foreignKey: "orderId",
                as: "OrderDetail",
                sourceKey: "id",
            });
        }
    }
    Order.init(
        {
            userId: DataTypes.INTEGER,
            totalPrice: DataTypes.DECIMAL,
            shipping: DataTypes.DECIMAL,
            grandTotal: DataTypes.DECIMAL,
            isPaid: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
