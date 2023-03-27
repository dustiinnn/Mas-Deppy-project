import axios from "axios";

export const checkTokenValidity = async () => {
    const endpoint = `${import.meta.env.VITE_REACT_API_URL}/auth`;
    try {
        await axios.get(`${endpoint}/info`, {
            headers: {
                Authorization: `Bearer: ${localStorage.getItem("token")}`,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};
