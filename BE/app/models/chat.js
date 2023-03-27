"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Chat extends Model {
        static associate(models) {
            Chat.hasMany(models.ChatDetails, {
                foreignKey: "roomId",
                as: "chatDetail",
            });

            Chat.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });
        }
    }
    Chat.init(
        {
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Chat",
        }
    );
    return Chat;
};
