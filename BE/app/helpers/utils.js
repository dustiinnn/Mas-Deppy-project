function successResponse(code, status, msg, data, res) {
    return res.status(code).send({
        success: status,
        msg: msg,
        data: data,
    });
}

function errorResponse(code, status, msg, res) {
    return res.status(code).send({
        error: status,
        msg: msg,
    });
}

module.exports = { successResponse, errorResponse };
