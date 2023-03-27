const jwt = require("jsonwebtoken");
const { errorResponse, successResponse } = require("../helpers/utils");
const { User } = require("../models");
const authConfig = require("../config/auth.config");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return errorResponse(401, false, "Authorization header missing", res);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return errorResponse(401, false, "Authentication token missing", res);
    }

    try {
        const decoded = jwt.verify(token, authConfig.secret);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return errorResponse(401, false, "User not found", res);
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return errorResponse(401, false, "Invalid authentication token", res);
    }
};

const adminMiddleware = (req, res, next) => {
    if (!req.user.isAdmin) {
        return errorResponse(
            403,
            false,
            "Access forbidden. Admin access required",
            res
        );
    }
    next();
};

const isValidToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return errorResponse(401, false, "Authorization header missing", res);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return errorResponse(401, false, "Authentication token missing", res);
    }

    try {
        const decoded = jwt.verify(token, authConfig.secret);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return errorResponse(401, false, "User not found", res);
        }

        req.user = user;
        return successResponse(200, true, "Get User Info", req.user, res);
    } catch (err) {
        console.log(err);
        return errorResponse(401, false, "Invalid authentication token", res);
    }
};

module.exports = {
    authMiddleware,
    adminMiddleware,
    isValidToken,
};
