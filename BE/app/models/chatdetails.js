"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ChatDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ChatDetails.belongsTo(models.Chat, {
                foreignKey: "roomId",
                as: "chatDetail",
            });
        }
    }
    ChatDetails.init(
        {
            roomId: DataTypes.INTEGER,
            message: DataTypes.TEXT,
            senderId: DataTypes.INTEGER,
            receiverId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "ChatDetails",
        }
    );
    return ChatDetails;
};
