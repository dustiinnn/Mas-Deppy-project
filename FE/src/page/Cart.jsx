import { React, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const refresh = () => window.location.reload(true);
    const endpoint = `${import.meta.env.VITE_REACT_API_URL}/cart`;
    const checkoutEndpoint = `${import.meta.env.VITE_REACT_API_URL}/checkout`;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState(null);
    const navigate = useNavigate();

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
                setSummary(response.data.data.total);
                setError(null);
                console.log(response.data);
            } catch (err) {
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

    const handleRemoveItem = async (productId) => {
        confirmAlert({
            title: "Delete Product",
            message: "Hapus product dari keranjang?.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        axios({
                            method: "delete",
                            data: { productId: productId },
                            url: endpoint,
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    "token"
                                )}`,
                                "Content-Type": "multipart/form-data",
                            },
                        });
                        toast.success("Produk berhasil dihapus!");
                        window.location.reload(true);
                    },
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const handleQtyChange = async (productId, e) => {
        console.log(e.target.value);
        console.log(productId);
        setLoading(true);
        await axios({
            url: `${endpoint}/${productId}`,
            method: "put",
            data: { qty: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                setTimeout(() => {
                    setLoading(false);
                    window.location.reload(true);
                    toast.success("Data berhasil diupdate");
                }, 1000);
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.response);
            });
    };

    const checkoutConfirmation = () => {
        confirmAlert({
            title: "Checkout",
            message: "Yakin untuk checkout?.",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await handleCheckout();
                    },
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const handleCheckout = async () => {
        await axios({
            url: checkoutEndpoint,
            method: "post",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                toast.success("Checkout success");
                navigate(`/checkout-confirmation/${response.data.orderId}`);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.msg);
            });
    };
    return (
        <div>
            {loading && (
                <div>
                    <center>
                        <Loading size={100} />
                    </center>
                </div>
            )}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            <div>
                <div className="container mx-auto mt-10">
                    <div className="flex my-10">
                        <div className="w-3/4 bg-white px-10 py-10">
                            <div className="flex justify-between border-b pb-8">
                                <h1 className="font-semibold text-2xl">
                                    Shopping Cart
                                </h1>
                                <h2 className="font-semibold text-2xl">
                                    {/* {data.length} Items */}
                                </h2>
                            </div>

                            <div className="flex mt-10 mb-5">
                                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                                    Product Details
                                </h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                                    Quantity
                                </h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                                    Price
                                </h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                                    Total
                                </h3>
                            </div>

                            {/* Product Data */}
                            {data &&
                                data.data.map((item) => (
                                    <div key={item.id}>
                                        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                            <div className="flex w-2/5">
                                                <div className="w-20">
                                                    <img
                                                        className="h-24"
                                                        alt=""
                                                        src={item.Product.image}
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                                    <span className="font-bold text-sm">
                                                        {item.Product.name}
                                                    </span>
                                                    <span className="text-slate-500 text-xs">
                                                        {item.Product.desc}
                                                    </span>
                                                    <a
                                                        href="#"
                                                        onClick={() =>
                                                            handleRemoveItem(
                                                                item.Product.id
                                                            )
                                                        }
                                                        className="font-semibold hover:text-red-500 text-red-500 text-xs"
                                                    >
                                                        Remove
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex justify-center w-1/5">
                                                <input
                                                    className="mx-2 border text-center w-8"
                                                    type="text"
                                                    id="qty"
                                                    name="qty"
                                                    defaultValue={item.qty}
                                                    onBlur={(e) =>
                                                        handleQtyChange(
                                                            item.Product.id,
                                                            e
                                                        )
                                                    }
                                                />
                                            </div>
                                            <span className="text-center w-1/5 font-semibold text-sm">
                                                {`Rp. ${Number(
                                                    item.Product.price
                                                ).toLocaleString("id-ID")}`}
                                            </span>
                                            <span className="text-center w-1/5 font-semibold text-sm">
                                                {`Rp. ${Number(
                                                    item.Product.price *
                                                        item.qty
                                                ).toLocaleString("id-ID")}`}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Summary */}
                        {data && (
                            <div
                                id="summary"
                                className="w-1/4 px-8 py-10 bg-slate-200"
                            >
                                <h1 className="font-semibold text-2xl border-b pb-8">
                                    Order Summary
                                </h1>
                                <div className="flex justify-between mt-10 mb-5">
                                    <span className="font-semibold text-sm uppercase">
                                        Total item
                                    </span>
                                    <span className="font-semibold text-sm">
                                        {data.data.length}
                                    </span>
                                </div>
                                <div>
                                    <label className="font-medium inline-block mb-3 text-sm uppercase">
                                        Shipping
                                    </label>
                                    <select className="block p-2 text-gray-600 w-full text-sm">
                                        <option>
                                            Standard shipping - Rp.10.000
                                        </option>
                                    </select>
                                </div>
                                <div className="border-t mt-8">
                                    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                        <span>Total cost</span>
                                        {`Rp. ${Number(
                                            data.total + 10000
                                        ).toLocaleString("id-ID")}`}
                                    </div>
                                    <button
                                        className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                                        onClick={checkoutConfirmation}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
