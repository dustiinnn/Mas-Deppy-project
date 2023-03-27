const db = require("../models");
const User = db.User;
const { errorResponse } = require("../helpers/utils");
const { createUser } = require("../validation/requiredFields");
const { Op, Sequelize } = require("sequelize");

const checkDuplicateEmailorUsername = async (req, res, next) => {
    try {
        const { error, value } = createUser.validate(req.body);
        if (error) throw { message: error.details };

        const findUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                    { username: req.body.username },
                ],
            },
        });
        if (findUser) {
            let message = "";
            if (findUser.email === req.body.email) {
                message = "Email already taken";
            } else if (findUser.username === req.body.username) {
                message = "Username already taken";
            }
            throw { message: message };
        }
        next();
    } catch (error) {
        return errorResponse(400, "Failed register", error.message, res);
    }
};

module.exports = { checkDuplicateEmailorUsername };
