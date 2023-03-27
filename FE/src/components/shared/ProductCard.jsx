import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductCard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const endpoint = `${import.meta.env.VITE_REACT_API_URL}/products`;

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(endpoint);
                setData(response.data);
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

    if (loading) {
        return <div>A moment please...</div>;
    }

    if (error) {
        return (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
        );
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {data &&
                data.data.map(({ id, name, desc, price, image }) => (
                    <Link to={`/products/${id}`} key={id}>
                        <div className="border h-fit rounded-xl border-solid border-slate-200 pb-2 hover:-translate-y-4 transition duratio hover:shadow-xl">
                            <div
                                style={{ backgroundImage: `url(${image})` }}
                                className="h-40 bg-cover bg-center bg-no-repeat rounded-t-xl"
                            ></div>
                            <div className="p-4 font-hk">
                                <div className="grid grid-cols-2 w-full text-lg">
                                    <h3 className="font-bold truncate mb-3">
                                        {name}
                                    </h3>
                                    <h3 className="font-bold text-green-600 text-end text-lg">
                                        {`Rp. ${Number(price).toLocaleString(
                                            "id-ID"
                                        )}`}
                                    </h3>
                                </div>

                                <div className="h-20 overflow-hidden w-full">
                                    <p className="font-light text-slate-600 mb-5">
                                        {desc}
                                    </p>
                                </div>

                                <hr />
                                <button className="text-center w-full py-3 bg-blue-400 mt-6 rounded-lg text-white hover:bg-blue-500">
                                    Beli Sekarang
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
        </div>
    );
}
