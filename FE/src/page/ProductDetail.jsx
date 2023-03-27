import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../components/shared/ProductCard";
import { toast } from "react-toastify";
export default function ProductDetail() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(1);

    const endpoint = `${import.meta.env.VITE_REACT_API_URL}/products/${id}`;
    const addToCartEndpoint = `${import.meta.env.VITE_REACT_API_URL}/cart`;

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
    }, [endpoint]);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleAddToCart = async () => {
        const data = {
            qty: count,
            productId: id,
        };

        await axios({
            method: "post",
            url: addToCartEndpoint,
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then((resposne) =>
                toast.success("Produk berhasil ditambahkan ke keranjang")
            )
            .error((error) => {
                toast.error(`Error ${error.response.data.msg}`);
            });
    };

    return (
        <div>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {data && (
                <div className="w-screen">
                    <div className="mx-auto max-w-7xl">
                        <div className=" px-8 pt-14 pb-10">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="">
                                    <img
                                        src={data.image}
                                        alt=""
                                        className="w-full rounded-xl"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-hk font-bold text-slate-900">
                                        {data.name}
                                    </h1>
                                    <p className="text-slate-500 font-hk font-light">
                                        {data.desc}
                                    </p>
                                    <p className="text-slate-500 font-hk font-light mt-4 mb-4 text-sm">
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type
                                        and scrambled it to make a type specimen
                                        book. It has survived not only five
                                        centuries, but also the leap into
                                        electronic typesetting, remaining
                                        essentially unchanged. It was
                                        popularised in the 1960s with the
                                        release of Letraset sheets containing
                                        Lorem Ipsum passages, and more recently
                                        with desktop publishing software like
                                        Aldus PageMaker including versions of
                                        Lorem Ipsum.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <div className="space-x-5 border py-3 px-5 font-hk font-medium text-slate-600">
                                            <button
                                                onClick={handleDecrement}
                                                disabled={count === 1}
                                                className="w-4"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                value={count}
                                                className="w-10 text-center"
                                            />
                                            <button
                                                onClick={handleIncrement}
                                                className="w-4"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-hk font-bold text-end text-blue-500">{`Rp. ${Number(
                                                data.price * count
                                            ).toLocaleString("id-ID")}`}</h3>
                                            <small className="font-hk text-slate-500 text-end">
                                                Harga belum termasuk biaya
                                                pengiriman
                                            </small>
                                        </div>
                                    </div>
                                    <hr className="mt-4 mb-4" />
                                    <button
                                        className="text-center w-full bg-blue-500 py-3 rounded-md text-white font-hk font-bold"
                                        onClick={handleAddToCart}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>

                            <div className="w-full justify-between flex mb-10 mt-24">
                                <h1 className="text-2xl font-hk font-bold text-slate-800">
                                    Product lain yang mungkin kamu suka
                                </h1>
                                <a
                                    href="#"
                                    className="font-hk hover:text-blue-500"
                                >
                                    View All
                                </a>
                            </div>
                            <div>
                                <ProductCard />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
