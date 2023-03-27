import { React, useState, useEffect } from "react";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import { HiOutlineLogout, HiOutlineChat } from "react-icons/hi";
import { Link } from "react-router-dom";
import { checkTokenValidity } from "../utils/checkAuth";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const [userTitle, setUserTitle] = useState("Sign In / Sign Up");
    const [login, isLogin] = useState(false);
    const [admin, isAdmin] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const isValid = await checkTokenValidity();
            if (isValid) {
                const userData = JSON.parse(localStorage.getItem("userData"));
                setUserTitle(`${userData.firstName} ${userData.lastName}`);
                isLogin(true);
                isAdmin(false);
                if (userData.isAdmin) isAdmin(true);
            }
        };
        checkToken();
    }, []);

    const handleLogout = () => {
        confirmAlert({
            title: "Logout",
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        setUserTitle("Sign In / Sign Up");
                        localStorage.removeItem("userData");
                        localStorage.removeItem("token");
                        isLogin(false);
                        toast.success("Logout berhasil!");
                    },
                },
                {
                    label: "No",
                },
            ],
        });
    };

    return (
        <nav className="w-full shadow-sm">
            <ToastContainer />
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link to="/">
                            <h2 className="text-2xl font-bold text-black hover:text-blue-500 transition duration-300">
                                PLATINUM
                            </h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-900"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-900"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <div className="items-center justify-center space-y-8 md:flex md:space-x-12 md:space-y-0 md:w-[507px]">
                            <label
                                htmlFor="email"
                                className="relative text-gray-400 focus-within:text-gray-600 block w-full"
                            >
                                <FiSearch
                                    className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-6"
                                    size={20}
                                />

                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="bg-blue-50 w-full py-3 px-14 rounded-xl font-normal font-hk"
                                    placeholder="Search something here"
                                />
                            </label>
                        </div>

                        <div className="mt-8 space-y-2 lg:hidden md:inline-block">
                            <Link
                                to="/login"
                                className="inline-block w-full py-3 text-center bg-blue-500 text-white rounded-full font-normal hover:bg-blue-600 transition-all duration-300"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">
                    <div className="pr-3 py-0 border-r-2 md:inline-block">
                        <Link
                            to={
                                login
                                    ? admin
                                        ? "/admin/home"
                                        : "/my-order"
                                    : "/login"
                            }
                            className="font-hk font-bold text-gray-500 flex items-center gap-x-4"
                        >
                            <span>
                                <FiUser size={20} className="text-blue-500" />
                            </span>
                            {userTitle || "Sign In / Sign Up"}
                        </Link>
                    </div>
                    <div className="pr-3 py-0 md:inline-block">
                        <Link
                            to={login ? "/cart" : "/login"}
                            className="font-hk font-bold text-gray-500 flex items-center gap-x-4"
                        >
                            <span>
                                <FiShoppingCart
                                    size={20}
                                    className="text-blue-500"
                                />
                            </span>
                            Cart
                        </Link>
                    </div>
                    {login ? (
                        <div className="pl-3 md:inline-block border-l-2">
                            <Link
                                href="#"
                                to="/chat"
                                className="font-hk font-bold text-gray-500 flex items-center gap-x-4"
                            >
                                <span>
                                    <HiOutlineChat
                                        size={20}
                                        className="text-blue-500"
                                    />
                                </span>
                                Chat
                            </Link>
                        </div>
                    ) : (
                        ""
                    )}

                    {login ? (
                        <div className="pl-3 md:inline-block border-l-2">
                            <a
                                href="#"
                                onClick={handleLogout}
                                className="font-hk font-bold text-gray-500 flex items-center gap-x-4"
                            >
                                <span>
                                    <HiOutlineLogout
                                        size={20}
                                        className="text-blue-500"
                                    />
                                </span>
                                Logout
                            </a>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </nav>
    );
}
