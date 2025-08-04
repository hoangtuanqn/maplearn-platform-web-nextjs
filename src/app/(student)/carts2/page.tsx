import { Metadata } from "next";
import React from "react";
import CartList from "./_components/CartList";
export const metadata: Metadata = {
    title: "Danh sách giỏ hàng",
};
const CartPage = () => {
    return <CartList />;
};

export default CartPage;
