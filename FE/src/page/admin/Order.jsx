import { React, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { isAdmin } from "../../utils/isAdmin";

export default function OrderAdmin() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const endpoint = `${import.meta.env.VITE_REACT_API_URL}/order-data`;

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer: ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                setData(response.data.data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const viewBtnHandle = (id) => {
        window.open(`/admin/order/${id}/detail`, "_blank");
    };

    const editBtnHandle = (productId) => {
        alert(productId);
    };

    const deleteBtnHandle = (productId) => {
        alert(`Delete: ${productId}`);
    };

    if (loading) {
        return <div>A moment please...</div>;
    }

    if (error) {
        return (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
        );
    }

    return (
        <div className="font-hk">
            <Navbar />
            <div className="w-full px-4 py-4 ">
                <div className="mx-auto bg-center bg-cover bg-heroBanner lg:max-w-7xl rounded-3xl">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Order Data
                    </h1>
                    <div className="mt-4 mb-5">
                        <div className="relative overflow-x-auto sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">
                                            Customer Name
                                        </th>
                                        <th className="px-6 py-3">
                                            Total Shopping
                                        </th>
                                        <th className="px-6 py-3">
                                            Total Shipping
                                        </th>
                                        <th className="px-6 py-3">
                                            Grand Total
                                        </th>
                                        <th className="px-6 py-3">
                                            Paid Status
                                        </th>
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        data.map(({ ...item }, index) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4">
                                                    {item.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.User.firstName}{" "}
                                                    {item.User.lastName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {`Rp. ${Number(
                                                        item.totalPrice
                                                    ).toLocaleString("id-ID")}`}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {`Rp. ${Number(
                                                        item.shipping
                                                    ).toLocaleString("id-ID")}`}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {`Rp. ${Number(
                                                        item.grandTotal
                                                    ).toLocaleString("id-ID")}`}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.isPaid ? (
                                                        <span className="px-3 py-1 bg-green-600 rounded-full text-white">
                                                            Paid
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 bg-red-600 rounded-full text-white">
                                                            Not Paid
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="space-x-2">
                                                    <button
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                                        onClick={() =>
                                                            viewBtnHandle(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}
