"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Chat, {
                foreignKey: "userId",
                as: "chats",
            });
        }
        toJSON() {
            return {
                ...this.get(),
                password: undefined,
                // isAdmin: undefined,
            };
        }
    }
    User.init(
        {
            username: {
                unique: true,
                type: DataTypes.STRING,
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            password: DataTypes.STRING,
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            verifiedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    return User;
};
