import { React, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { isAdmin } from "../../utils/isAdmin";
import ReactConfirmAlert, { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
export default function HomeAdmin() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const endpoint = `${import.meta.env.VITE_REACT_API_URL}/products`;

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(endpoint);
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

    const viewBtnHandle = (productId) => {
        window.open(`/products/${productId}`, "_blank");
    };

    const editBtnHandle = (productId) => {
        window.open(`/admin/product/${productId}/edit`, "_blank");

        // alert(productId);
    };

    const deleteBtnHandle = (productId) => {
        confirmAlert({
            title: "Delete Data",
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await deleteProduct(productId);
                    },
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const deleteProduct = async (productId) => {
        const response = await axios({
            url: `${endpoint}/${productId}`,
            method: "delete",
            headers: {
                Authorization: `Bearer: ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                toast.success("delete data berhasil");
                setInterval(() => {
                    window.location.reload();
                }, 5000);
            })
            .catch((error) => {
                toast.error(`delete data gagal: ${error.response.msg}`);
            });
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
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold text-slate-800">
                            Product Data
                        </h1>
                        <Link
                            to="/admin/add-product"
                            className="bg-blue-500 text-white px-3 py-2 rounded-md"
                        >
                            Add new
                        </Link>
                    </div>
                    <div className="mt-4 mb-5">
                        <div className="relative overflow-x-auto sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">Desc</th>
                                        <th className="px-6 py-3">Price</th>
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        data.map(({ ...item }, index) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 flex items-center gap-2">
                                                    <img
                                                        src={item.image}
                                                        className="w-10 rounded"
                                                    />
                                                    {item.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.desc}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {`Rp. ${Number(
                                                        item.price
                                                    ).toLocaleString("id-ID")}`}
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
                                                    <button
                                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                                                        onClick={() =>
                                                            editBtnHandle(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                                                        onClick={() =>
                                                            deleteBtnHandle(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Delete
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
