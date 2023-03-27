import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function EditProduct() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const endpoint = `${import.meta.env.VITE_REACT_API_URL}/products/${id}`;

    useEffect(() => {
        const getData = async () => {
            const response = await axios
                .get(endpoint)
                .then((response) => {
                    setData(response.data.data);
                    setImageFile(response.data.data.image);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(true);
                    toast.error(`Error: ${error.response.msg}`);
                });
        };
        getData();
    }, [endpoint]);

    if (isLoading) {
        return <>Please wait</>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("name", e.target.name.value);
        bodyFormData.append("desc", e.target.desc.value);
        bodyFormData.append("price", e.target.price.value);

        if (imageFile) {
            bodyFormData.append("image", imageFile);
        }

        const response = await axios({
            url: endpoint,
            method: "put",
            data: bodyFormData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer: ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                toast.success("Update Data Berhasil!");
                console.log(response);
                // window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                toast.error(`Error: ${error.response.data.msg}`);
            });
        console.log(response);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageFile(file);
            const imagePreview = document.getElementById("imagePreview");
            imagePreview.src = reader.result;
        };
    };

    const handleImageRemove = () => {
        setImageFile(null);
        const imagePreview = document.getElementById("imagePreview");
        imagePreview.src = data.image;
        const imageInput = document.getElementById("image");
        imageInput.value = "";
    };

    return (
        <div>
            <div className="font-hk">
                <Navbar />
                <div className="w-full px-4 py-4 ">
                    <div className="mx-auto bg-center bg-cover bg-heroBanner lg:max-w-7xl rounded-3xl">
                        <h1 className="text-2xl font-bold text-slate-800">
                            Edit Product
                        </h1>
                        <div className="mt-4 mb-5 grid grid-cols-2 gap-8">
                            <div>
                                <img
                                    src={data.image}
                                    alt=""
                                    className="rounded-xl"
                                    id="imagePreview"
                                    name="imagePreview"
                                />
                            </div>
                            <div>
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                defaultValue={data.name}
                                                id="name"
                                                name="name"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                defaultValue={data.desc}
                                                name="desc"
                                                id="desc"
                                                placeholder="Enter product description"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                defaultValue={data.price}
                                                name="price"
                                                id="price"
                                                placeholder="Enter product price"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Product Image
                                            </label>
                                            <input
                                                type="file"
                                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="image"
                                                name="image"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <button
                                                className="text-red-500"
                                                type="button"
                                                onClick={handleImageRemove}
                                            >
                                                Batalkan
                                            </button>
                                        </div>

                                        <div className="mb-4">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Update Product
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
