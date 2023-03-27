import { React, useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import numeral from "numeral"; // Import
import { Link } from "react-router-dom";

export default function MyOrder() {
    const refresh = () => window.location.reload(true);
    const endpoint = `${import.meta.env.VITE_REACT_API_URL}/my-order`;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Daftarkan plugin UTC dan timezone pada dayjs
    dayjs.extend(utc);
    dayjs.extend(timezone);

    // Function untuk mengonversi date ke timezone Jakarta
    const convertToJakartaTimezone = (date) => {
        return dayjs.utc(date).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
    };

    // Function untuk mengubah angka ke format Rupiah
    const formatToRupiah = (num) => {
        return numeral(num).format("0,0");
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${endpoint}`, {
                    headers: {
                        Authorization: `Bearer: ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                console.log(response.data.data);
                // Konversi createdAt ke timezone Jakarta dan ubah format totalPrice dan grandTotal ke Rupiah
                const modifiedData = response.data.data.map((item) => {
                    return {
                        ...item,
                        createdAt: convertToJakartaTimezone(item.createdAt),
                        totalPrice: formatToRupiah(item.totalPrice),
                        grandTotal: formatToRupiah(item.grandTotal),
                    };
                });
                setData(modifiedData);
                setError(null);
            } catch (err) {
                console.log(err);
                if ((err.response.status = 401)) {
                    toast.error("Login expired");
                }
                toast.error(err.response.data.msg);
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [endpoint]);

    return (
        <div>
            <div className="w-full px-4 py-4 ">
                <div className="mx-auto bg-center bg-cover bg-heroBanner lg:max-w-7xl rounded-3xl">
                    <div className="w-full justify-between mb-10">
                        <div>
                            <h1 className="text-2xl font-hk font-bold text-slate-800">
                                My Order
                            </h1>
                        </div>
                        <div className="mt-10 mb-5">
                            <div className="relative overflow-x-auto sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 ">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2">
                                        <tr>
                                            <th className="px-6 py-3">
                                                Order ID
                                            </th>
                                            <th className="px-6 py-3">
                                                Order Date
                                            </th>
                                            <th className="px-6 py-3">Total</th>
                                            <th className="px-6 py-3">
                                                Shipping
                                            </th>
                                            <th className="px-6 py-3">
                                                Grand Total
                                            </th>
                                            <th className="px-6 py-3">
                                                Status
                                            </th>
                                            <th className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            data.map((item) => (
                                                <tr className="bg-white border-b ">
                                                    <td className="px-6 py-4">
                                                        {item.id}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {dayjs(item.createdAt)
                                                            .tz("Asia/Jakarta")
                                                            .format(
                                                                "DD MMMM YYYY, HH:mm:ss"
                                                            )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        Rp. {item.totalPrice}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        Rp. 10,000
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        Rp. {item.grandTotal}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.isPaid ? (
                                                            <span className="px-2 py-1 bg-blue-500 rounded-full text-white">
                                                                Dibayar
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 py-1 bg-red-500 rounded-full text-white">
                                                                Belum dibayar
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Link
                                                            to={`/detail-order/${item.id}`}
                                                            className="font-medium text-blue-600 hover:underline"
                                                        >
                                                            Lihat Detail
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="grid grid-cols-6 font-semibold text-gray-600 text-xs uppercase">
                                <h3>Order ID</h3>
                                <h3>Order Date</h3>
                                <h3>Total</h3>
                                <h3>Grand Total</h3>
                                <h3>Status</h3>
                                <h3>Action</h3>
                            </div> */}
                            {/* <div className="grid grid-cols-6 font-semibold text-gray-600 text-md uppercase mt-8 p-4 border-b-2">
                                {data &&
                                    data.map((item) => (
                                        <h3 key={item.id}>{item.id}</h3>
                                        <h3>{item}</h3>
                                    ))}
                            </div> */}
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}
