import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function DetailOrderAdmin() {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const endpoint = `${
            import.meta.env.VITE_REACT_API_URL
        }/order-data/${id}/detail`;

        if (id) {
            setIsLoading(true);
            axios({
                url: endpoint,
                headers: {
                    Authorization: `Bearer: ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => {
                    setOrderData(response.data);
                    setOrderDetail(response.data.orderData);
                    setError(null);
                })
                .catch((error) => {
                    setError(error.message);
                    setOrderData(null);
                    setOrderDetail(null);
                    console.log(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            <div>
                <section className="py-20 bg-slate-100">
                    <div className="max-w-5xl mx-auto py-16 bg-white">
                        <article className="overflow-hidden">
                            <div className="bg-[white] rounded-b-md">
                                <div className="p-9">
                                    <div className="space-y-6 text-slate-700 flex justify-between items-center">
                                        <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                                            DETAIL ORDER
                                        </p>
                                        {orderData.isPaid ? (
                                            <p className="text-blue-500">
                                                {" "}
                                                Dibayar
                                            </p>
                                        ) : (
                                            <p className="text-red-500">
                                                {" "}
                                                Belum dibayar <br />
                                                <Link
                                                    to={`/checkout-confirmation/${id}`}
                                                    className="text-black underline"
                                                >
                                                    Bayar sekarang
                                                </Link>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="px-9">
                                    <div className="flex flex-col mx-0 mt-8">
                                        <table className="min-w-full divide-y divide-slate-500">
                                            <thead>
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                                                    >
                                                        Product Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                                                    >
                                                        Quantity
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                                                    >
                                                        Price
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                                                    >
                                                        Total
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderDetail &&
                                                    orderDetail.map((item) => (
                                                        <tr
                                                            className="border-b border-slate-200"
                                                            key={item.id}
                                                        >
                                                            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                                                <div className="font-medium text-slate-700">
                                                                    {
                                                                        item.productName
                                                                    }
                                                                </div>
                                                                <div className="mt-0.5 text-slate-50 hidden">
                                                                    {item.qty}
                                                                </div>
                                                            </td>
                                                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                                                {item.qty}
                                                            </td>
                                                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                                                {`Rp. ${Number(
                                                                    item.price
                                                                ).toLocaleString(
                                                                    "id-ID"
                                                                )}`}
                                                            </td>
                                                            <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                                {`Rp. ${Number(
                                                                    item.totalPrice
                                                                ).toLocaleString(
                                                                    "id-ID"
                                                                )}`}
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th
                                                        scope="row"
                                                        colSpan={3}
                                                        className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                                    >
                                                        Subtotal
                                                    </th>
                                                    <th
                                                        scope="row"
                                                        className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                                                    >
                                                        Subtotal
                                                    </th>
                                                    <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                        {`Rp. ${Number(
                                                            orderData.totalPrice
                                                        ).toLocaleString(
                                                            "id-ID"
                                                        )}`}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        scope="row"
                                                        colSpan={3}
                                                        className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                                    >
                                                        Shipping
                                                    </th>
                                                    <th
                                                        scope="row"
                                                        className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                                                    >
                                                        Shipping
                                                    </th>
                                                    <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                        Rp. 10.000
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        scope="row"
                                                        colSpan={3}
                                                        className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                                                    >
                                                        Total
                                                    </th>
                                                    <th
                                                        scope="row"
                                                        className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                                                    >
                                                        Total
                                                    </th>
                                                    <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                                                        {`Rp. ${Number(
                                                            orderData.grandTotal
                                                        ).toLocaleString(
                                                            "id-ID"
                                                        )}`}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                <div className="mt-10 p-9">
                                    <div className="border-t pt-9 border-slate-200">
                                        <div className="text-sm font-light text-slate-700">
                                            <p>
                                                Payment terms are 14 days.
                                                Please be aware that according
                                                to the Late Payment of Unwrapped
                                                Debts Act 0000, freelancers are
                                                entitled to claim a 00.00 late
                                                fee upon non-payment of debts
                                                after this time, at which point
                                                a new invoice will be submitted
                                                with the addition of this fee.
                                                If payment of the revised
                                                invoice is not received within a
                                                further 14 days, additional
                                                interest will be charged to the
                                                overdue account and a statutory
                                                rate of 8% plus Bank of England
                                                base of 0.5%, totalling 8.5%.
                                                Parties cannot contract out of
                                                the Act’s provisions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </div>
    );
}
