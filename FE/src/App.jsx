import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Cart from "./page/Cart";
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import ProductDetail from "./page/ProductDetail";
import CheckoutConfirmation from "./page/CheckoutConfirmation";
import MyOrder from "./page/MyOrder";
import DetailOrder from "./page/DetailOrder";
import FloatingChat from "./components/FloatingChat";
import HomeAdmin from "./page/admin/Home";
import OrderAdmin from "./page/admin/Order";
import DetailOrderAdmin from "./page/admin/OrderDetail";
import EditProduct from "./page/admin/product/EditProduct";
import Chat from "./page/admin/Chat";
import AddProduct from "./page/admin/product/AddProduct";
import UserChat from "./page/Chat";
export default function App() {
    return (
        <div>
            {/* <FloatingChat /> */}
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/chat" element={<UserChat />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route
                    path="/checkout-confirmation/:id"
                    element={<CheckoutConfirmation />}
                />
                <Route path="/my-order" element={<MyOrder />} />
                <Route path="/detail-order/:id" element={<DetailOrder />} />

                <Route path="/admin/home" element={<HomeAdmin />} />
                <Route path="/admin/order" element={<OrderAdmin />} />
                <Route path="/admin/chat" element={<Chat />} />
                <Route path="/admin/add-product" element={<AddProduct />} />
                <Route
                    path="/admin/order/:id/detail"
                    element={<DetailOrderAdmin />}
                />
                <Route
                    path="/admin/product/:id/edit"
                    element={<EditProduct />}
                />
            </Routes>
        </div>
    );
}
