"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";

import React, { useEffect, useState } from "react";
import cartApi from "~/apiRequest/cart";
import { Button } from "~/components/ui/button";
import { CartsResponse } from "~/schemaValidate/cart.schema";
import Loading from "../_components/Loading";
import { toast } from "sonner";

import { Input } from "~/components/ui/input";
import CartsSummary from "./_components/CartsSummary";
import ListCarts from "./_components/ListCarts";
import OrderSummary from "./_components/OrderSummary";
import { formatter } from "~/libs/format";
const CartPage = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [carts, setCarts] = useState<CartsResponse["data"] | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ["user", "carts"],
        queryFn: async () => {
            const res = await cartApi.getCarts();
            return res.data.data;
        },
    });
    const removeCartMutation = useMutation({
        mutationFn: (ids: number[]) => cartApi.removeCartItem(ids),
        onSuccess: (data, ids) => {
            toast.success("Đã xóa sản phẩm này khỏi giỏ hàng thành công!");
            setCarts((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    items: prev.items?.filter((item) => !ids.includes(item.id)) ?? [],
                };
            });
        },
    });

    useEffect(() => {
        if (data) {
            setCarts(data);
            // Lấy id đang có is_active = true
            setSelectedItems(
                data.items
                    .filter((item) => {
                        return item.is_active;
                    })
                    .map((item) => item.id),
            );
        }
    }, [data, isLoading]);
    const discoutMoney =
        carts?.items
            .filter((item) => selectedItems.includes(item.id)) // chỉ lấy khóa học đang được chọn
            .reduce(
                // thực hiện tính tổng đã giảm bao nhiêu của các khóa học đã chọn
                (acc, item) => acc + item.course.price - item.price_snapshot,
                0,
            ) || 0;
    const totalMoney =
        carts?.items
            .filter((item) => selectedItems.includes(item.id)) // chỉ lấy khóa học đang được chọn
            .reduce(
                // thực hiện tính tổng đã giảm bao nhiêu của các khóa học đã chọn
                (acc, item) => acc + item.course.price,
                0,
            ) || 0;
    return (
        <>
            {removeCartMutation.isPending && <Loading />}
            <section className="flex min-h-screen gap-4 rounded-xl bg-white shadow-sm max-lg:flex-col max-lg:gap-2 max-lg:p-2">
                <div className="w-full rounded-xl bg-white p-12 max-lg:p-2">
                    {/* Header */}
                    <div className="flex gap-5 max-lg:flex-col max-lg:items-start max-lg:gap-3">
                        <div className="t1-flex-center from-primary relative h-16 w-16 rounded-2xl bg-gradient-to-r to-blue-600 text-white shadow-lg max-lg:h-12 max-lg:w-12">
                            <ShoppingCart className="size-6 max-lg:size-5" />
                            <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white max-lg:h-5 max-lg:w-5">
                                3
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="text-primary text-3xl font-bold max-lg:text-xl">Giỏ hàng của bạn</h1>

                            <div className="mt-1 flex max-lg:text-sm">
                                <span>
                                    Đã chọn <span className="font-bold">{selectedItems.length ?? 0} khóa học </span>
                                    {discoutMoney > 0 && (
                                        <span>
                                            - Tiết kiệm được{" "}
                                            <span className="font-bold text-green-500">
                                                {formatter.number(discoutMoney)}đ đ
                                            </span>
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <CartsSummary carts={carts} selectedItems={selectedItems} />
                    <div className="flex h-full gap-2 max-lg:flex-col">
                        {/* Danh sách khóa học */}
                        <ListCarts
                            payload={{
                                selectedItems,
                                setSelectedItems,
                                carts,
                                removeCartMutation,
                                isLoading,
                            }}
                        />

                        <div className="flex-3/12 shrink-0">
                            {/* Tóm tắt đơn hàng */}
                            {/* <div className="mb-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-primary mb-4 font-bold">Mã giảm giá</h2>
                                <form>
                                    <div className="mt-3 flex items-center gap-1">
                                        <Input type="text" placeholder="MAPX728394...." />
                                        <Button
                                            className="text-primary disabled:bg-slate-400"
                                            disabled={false}
                                            variant={"outline"}
                                        >
                                            Áp dụng
                                        </Button>
                                    </div>
                                </form>
                            </div> */}

                            {/* Order summary */}
                            <OrderSummary payload={{ discoutMoney, totalMoney, carts }} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartPage;
