import axios from "axios";
import React from "react";
import Watch from "../assets/images/watch.png";
import ProductCard from "../components/shared/ProductCard";
import FloatingChat from "../components/FloatingChat";

export default function Home() {
    return (
        <div>
            <div className="w-full px-4 py-4 ">
                <div className="mx-auto bg-center bg-cover bg-heroBanner lg:max-w-7xl rounded-3xl">
                    <div className="backdrop-opacity-90 rounded-3xl dark:bg-slate-800 h-96 mb-20">
                        <div className="mx-auto space-y-2 h-full">
                            <div className="grid grid-cols-2 h-full">
                                <div className="self-center  px-12">
                                    <h2 className="text-white font-hk text-2xl">
                                        Best Deal Online on smart watches
                                    </h2>
                                    <h1 className="text-white font-hk text-6xl font-bold">
                                        SMART WEARABLE.
                                    </h1>
                                    <h2 className="text-white font-hk text-2xl">
                                        UP to 80% OFF
                                    </h2>
                                </div>
                                <div className="h-full flex items-center justify-center bg-circle-component bg-no-repeat bg-center bg-contain">
                                    <img
                                        src={Watch}
                                        alt=""
                                        className="self-center"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full justify-between flex mb-10">
                        <h1 className="text-2xl font-hk font-bold text-slate-800">
                            Barang yang mungkin kamu suka
                        </h1>
                        <a href="#" className="font-hk hover:text-blue-500">
                            View All
                        </a>
                    </div>

                    <div>
                        <ProductCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
