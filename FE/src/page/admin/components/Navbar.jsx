import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        if (!userData.isAdmin) {
            toast.error("anda tidak memiliki akses");
            navigate("/");
        }
    }, [userData]);
    return (
        <div>
            <div className="w-full font-hk">
                <div className="mx-auto bg-center bg-cover 3xl w-full bg-slate-50 shadow-md">
                    <div className="w-full shadow-md mx-auto ">
                        <div className="mx-auto max-w-7xl py-4 ">
                            <ul className="space-x-14">
                                <li className="inline text-slate-800 hover:text-blue-600">
                                    <Link to="/admin/home">Data Product</Link>
                                </li>
                                <li className="inline text-slate-800 hover:text-blue-600">
                                    <Link to="/admin/order">Data Order</Link>
                                </li>
                                <li className="inline text-slate-800 hover:text-blue-600">
                                    <Link to="/admin/chat">Chat</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
