import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

export default function CheckoutConfirmation() {
    const { id } = useParams();
    const endpoint = `${import.meta.env.VITE_REACT_API_URL}/update-trx/${id}`;
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("image", file);
            const response = await axios.patch(endpoint, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Upload berhasil");
            // history.push("/");
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        handleUpload();
    };

    return (
        <div className="w-full px-4 py-4 mt-10">
            <div className="mx-auto bg-center  lg:max-w-2xl rounded-3xl text-center">
                <h1 className="font-hk text-3xl font-bold antialiased text-slate-900">
                    Checkout berhasil
                </h1>
                <p className="font-hk text-slate-500 antialiased">
                    Selanjutnya, silahkan unggah bukti transfer dibawah ini
                </p>
                <div className="flex items-center justify-center w-full mt-10">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                aria-hidden="true"
                                className="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 ">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 "></p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
