const { Chat, User, ChatDetails } = require("../models");

exports.getChat = async (data, callback) => {
    try {
        const chatData = await Chat.findOne({
            where: {
                userId: data,
            },
            include: ["chatDetail"],
        });

        // Pastikan chatData tidak kosong dan sesuai dengan yang diharapkan
        if (!chatData) {
            const createChatRoom = await Chat.create({
                userId: data,
            });
            callback({
                status: "Tidak ditemukan",
                roomId: createChatRoom.id,
                data: null, // misalnya data yang dicari tidak ditemukan, maka nilai data diresponse sebagai null
            });
        } else {
            callback({
                status: "Ditemukan",
                data: chatData,
            });
        }
    } catch (error) {
        callback({
            status: "Terjadi kesalahan",
            message: error.message,
        });
    }
};

exports.getDetailChat = async (data, callback) => {
    try {
        const chatData = await Chat.findOne({
            where: {
                id: data,
            },
            include: ["chatDetail"],
        });

        // Pastikan chatData tidak kosong dan sesuai dengan yang diharapkan
        if (!chatData) {
            callback({
                status: "Tidak ditemukan",
                data: null, // misalnya data yang dicari tidak ditemukan, maka nilai data diresponse sebagai null
            });
        } else {
            callback({
                status: "Ditemukan",
                data: chatData,
            });
        }
    } catch (error) {
        callback({
            status: "Terjadi kesalahan",
            message: error.message,
        });
    }
};

exports.getChatAdmin = async (data, callback) => {
    console.log(data);
    try {
        const chatData = await Chat.findAll({
            include: ["chatDetail", "user"],
        });

        // Pastikan chatData tidak kosong dan sesuai dengan yang diharapkan
        if (!chatData) {
            callback({
                status: "Tidak ditemukan",
                data: null, // misalnya data yang dicari tidak ditemukan, maka nilai data diresponse sebagai null
            });
        } else {
            callback({
                status: "Ditemukan",
                data: chatData,
            });
        }
    } catch (error) {
        callback({
            status: "Terjadi kesalahan",
            message: error.message,
        });
    }
};

exports.create = async (data, callback) => {
    try {
        const sendMessage = await ChatDetails.create({
            roomId: data.roomId,
            message: data.msg,
            senderId: data.senderId,
            receiverId: 1,
        });
        callback({
            status: "Success",
            data: sendMessage,
        });
    } catch (error) {
        callback({
            status: "Error",
            data: error.message,
        });
    }
};
