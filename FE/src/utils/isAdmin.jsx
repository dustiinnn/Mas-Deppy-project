export const isAdmin = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData.isAdmin) throw error;
        return true;
    } catch (error) {
        return false;
    }
};
