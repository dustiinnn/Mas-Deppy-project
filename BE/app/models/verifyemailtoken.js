"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class VerifyEmailToken extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            VerifyEmailToken.belongsTo(models.User, {
                as: "user",
                foreignKey: "userId",
                foreignKeyConstraint: true,
                onDelete: "cascade",
            });
        }
    }
    VerifyEmailToken.init(
        {
            userId: DataTypes.INTEGER,
            token: DataTypes.STRING,
            expiredAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "VerifyEmailToken",
        }
    );
    return VerifyEmailToken;
};
