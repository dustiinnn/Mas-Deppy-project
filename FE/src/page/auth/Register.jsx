import axios from "axios";
import { React, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { checkTokenValidity } from "../../utils/checkAuth";
import { Link } from "react-router-dom";

export default function Register() {
    const [login, isLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState(null);
    const [token, setToken] = useState(null);
    const endpoint = `${import.meta.env.VITE_REACT_API_URL}/auth`;
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(event.target);
            const response = await axios.post(`${endpoint}/signup`, formData);
            const { token, user } = response.data.data;

            setLoading(false);
            console.log(response.data.msg);
            toast.success(response.data.msg);
            navigate("/login");
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.msg);
        }
    };

    return (
        <div className="w-screen h-full">
            <ToastContainer />
            <div className="max-w-7xl mx-auto flex items-center justify-center h-screen">
                <div className="border w-1/3 rounded-xl px-8 pt-14 pb-10">
                    <div className="bg-white rounded-lg overflow-hidden ">
                        <h2 className="text-center text-3xl font-bold text-gray-800">
                            Register
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block text-gray-700 font-medium"
                                >
                                    First Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-gray-700 font-medium"
                                >
                                    Last Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-gray-700 font-medium"
                                >
                                    User Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                            </div>
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
                                    {loading ? "Loading..." : "Register"}
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
                                    Register successful!
                                </div>
                            )}
                        </form>
                        <p className="mt-5">
                            Dont have an account?{" "}
                            <Link
                                to="/login"
                                className="underline text-blue-500"
                            >
                                Login now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
