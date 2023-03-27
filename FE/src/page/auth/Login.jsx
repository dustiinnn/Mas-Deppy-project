import axios from "axios";
import { React, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { checkTokenValidity } from "../../utils/checkAuth";
import { Link } from "react-router-dom";

export default function Login() {
    const [login, isLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState(null);
    const [token, setToken] = useState(null);
    const endpoint = `${import.meta.env.VITE_REACT_API_URL}/auth`;
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const isValid = await checkTokenValidity();
            if (isValid) {
                toast.success("You're already logged in");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        };
        checkToken();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        var bodyFormData = new FormData();
        bodyFormData.append("email", email);
        bodyFormData.append("password", password);
        const response = await axios({
            method: "post",
            url: `${endpoint}/login`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                setLoading(false);
                toast.success("Login success");
                setToken(response.data.data.token); // simpan token ke state
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem(
                    "userData",
                    JSON.stringify(response.data.data.user)
                );
                console.log(localStorage.getItem("userData"));
                setTimeout(() => {
                    if (JSON.parse(response.data.data.user.isAdmin)) {
                        navigate("/admin/home");
                        toast("admin");
                    } else {
                        navigate("/");
                    }
                }, 1000);
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.response.data.msg);
            });
    };

    return (
        <div className="w-screen h-full">
            <ToastContainer />
            <div className="max-w-7xl mx-auto flex items-center justify-center h-screen">
                <div className="border w-1/3 rounded-xl px-8 pt-14 pb-10">
                    <div className="bg-white rounded-lg overflow-hidden ">
                        <h2 className="text-center text-3xl font-bold text-gray-800">
                            Login
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 font-medium"
                                >
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-gray-700 font-medium"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-lg font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                                    disabled={loading}
                                >
                                    {loading ? "Loading..." : "Login"}
                                </button>
                            </div>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                    {error}
                                </div>
                            )}
                            {msg && (
                                <div className="bg-green-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                    {msg}
                                </div>
                            )}
                            {login && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                                    Login successful!
                                </div>
                            )}
                        </form>
                        <p className="mt-5">
                            Dont have an account?{" "}
                            <Link
                                to="/register"
                                className="underline text-blue-500"
                            >
                                Register now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
