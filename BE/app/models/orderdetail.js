"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // OrderDetail.belongsTo(models.Product, {
            //     foreignKey: "productId",
            //     as: "Product",
            // });
        }
    }
    OrderDetail.init(
        {
            orderId: DataTypes.STRING,
            productId: DataTypes.STRING,
            productName: DataTypes.STRING,
            productDesc: DataTypes.STRING,
            qty: DataTypes.INTEGER,
            price: DataTypes.DECIMAL,
            totalPrice: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "OrderDetail",
        }
    );
    return OrderDetail;
};
