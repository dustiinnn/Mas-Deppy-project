const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const uploadToImgbb = async (apiKey, buffer, filename) => {
    const url = "https://api.imgbb.com/1/upload";
    const data = new FormData();
    data.append("image", buffer, { filename });
    data.append("key", apiKey);

    const response = await axios.post(url, data, {
        headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
    });

    if (response.status !== 200) {
        throw new Error("Failed to upload image");
    }

    return response.data.data.url;
};

module.exports = { uploadToImgbb };
