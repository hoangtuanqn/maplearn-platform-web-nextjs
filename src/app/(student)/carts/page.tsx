"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BookOpen, Clock, Earth, Gift, ShoppingCart, Square, StarHalf, Trash2, TrendingUp, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import cartApi from "~/apiRequest/cart";
import { ConfirmDialog } from "~/components/ConfirmDialog";
import { DangerConfirm } from "~/components/DangerConfirm";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { formatter } from "~/libs/format";
import CartSkeleton from "./_components/CartSkeleton";
import { CartsResponse } from "~/schemaValidate/cart.schema";
import Loading from "../_components/Loading";
import DisplayNoData from "../_components/Courses/DisplayNoData";
import { toast } from "sonner";
const CartPage = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [carts, setCarts] = useState<CartsResponse["data"] | null>(null);
    const mutation = useMutation({
        mutationFn: (id: number) => cartApi.removeCartItem(id),
        onSuccess: (data, id) => {
            toast.success("Đã xóa sản phẩm này khỏi giỏ hàng thành công!");
            setCarts((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    items: prev.items?.filter((item) => item.id !== id) ?? [],
                };
            });
        },
    });
    const { data, isLoading } = useQuery({
        queryKey: ["user", "carts"],
        queryFn: async () => {
            const res = await cartApi.getCarts();
            return res.data.data;
        },
    });

    useEffect(() => {
        // if (carts?.items) {
        //     setSelectedItems(data.items.map((item) => item.id));
        // }
        if (data) {
            setCarts(data);
        }
    }, [data, isLoading]);
    // const handleRemoveItem = (id: number) => {
    //     setCarts((prev) => {
    //         if (!prev) return null;
    //         return {
    //             ...prev,
    //             items: prev.items.filter((item) => item.id !== id),
    //         };
    //     });
    // };

    return (
        <>
            {mutation.isPending && <Loading />}
            <section className="flex min-h-screen gap-2 rounded-xl bg-white shadow-sm max-lg:flex-col">
                <div className="w-full rounded-xl bg-white p-12">
                    <div className="flex gap-5">
                        <div className="t1-flex-center from-primary relative h-16 w-16 rounded-2xl bg-gradient-to-r to-blue-600 text-white shadow-lg">
                            <ShoppingCart className="size-6" />
                            <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                3
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-primary text-3xl font-bold">Giỏ hàng của bạn</h1>
                            <div className="mt-1 flex">
                                <span>
                                    Đã chọn <span className="font-bold">3 khóa học </span>- Tiết kiệm được{" "}
                                    <span className="font-bold text-green-500">900.000đ</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Summary */}
                    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex flex-col">
                                <span>Tổng số bài học</span>
                                <span className="text-primary font-bold">135 bài</span>
                            </div>
                        </div>
                        <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                <Clock className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex flex-col">
                                <span>Tổng thời lượng</span>
                                <span className="text-primary font-bold">1000 giờ</span>
                            </div>
                        </div>

                        <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                                {/* <TrendingUp className="h-5 w-5 text-orange-600" /> */}
                                <StarHalf className="h-5 w-5 text-orange-600" />
                            </div>
                            <div className="flex flex-col">
                                <span>Tổng đánh giá TB</span>
                                <span className="text-primary font-bold">4.5/5</span>
                            </div>
                        </div>
                        <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                                <Gift className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="flex flex-col">
                                <span>Điểm thưởng MapLearn</span>
                                <span className="text-primary font-bold">1.200 điểm</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        {/* Danh sách khóa học */}
                        <div className="mb-6 flex-9/12 shrink-0 rounded-lg border border-slate-200">
                            <header className="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-4 shadow-sm">
                                <div className="text-primary flex items-center gap-2">
                                    <ShoppingCart className="size-6" />
                                    <h2 className="text-base font-bold">Danh sách khóa học</h2>
                                </div>
                                {(carts?.items.length ?? 0) > 0 && (
                                    <div className="text-primary flex cursor-pointer items-center gap-2 rounded bg-white px-3 py-1.5 text-sm font-semibold">
                                        <Square className="h-4 w-4" />
                                        {/* <CheckSquare className="h-4 w-4" />  */}
                                        Bỏ chọn tất cả
                                    </div>
                                )}
                            </header>
                            <section className="mt-4 flex flex-col gap-2 divide-y divide-slate-200 px-4">
                                {!isLoading && carts?.items.length === 0 && (
                                    <div className="t1-flex-center w-full flex-col">
                                        <DisplayNoData title="Không có khóa học nào trong giỏ hàng. Hãy tiếp tục mua sắm" />
                                        <Button className="mx-auto mt-4 w-fit text-white">
                                            <Link href="/courses">Tiếp tục mua sắm</Link>
                                        </Button>
                                    </div>
                                )}
                                {isLoading && [...Array(10)].map((_, index) => <CartSkeleton key={index} />)}
                                {carts?.items.map((course) => (
                                    <div
                                        key={course.id}
                                        // Active thì dùng class border-slate-100
                                        className={`relative flex justify-between rounded-lg border p-4 shadow-sm transition duration-200 hover:border-blue-300 hover:bg-blue-50 ${selectedItems.includes(course.id) ? "border-blue-300 bg-blue-50" : "border-slate-100 bg-white"}`}
                                    >
                                        <Checkbox
                                            className="absolute top-5 left-2 size-6 cursor-pointer border-blue-300 bg-white !text-white"
                                            checked={selectedItems.includes(course.id)}
                                        />
                                        <div className="flex shrink-0 gap-6 py-4">
                                            <Image
                                                src={course.course.thumbnail}
                                                width={150}
                                                height={172}
                                                alt={course.course.name}
                                                className="rounded-lg border border-slate-200 shadow"
                                            />
                                            <div>
                                                <h2 className="text-primary cursor-pointer text-lg font-bold transition">
                                                    <Link href="#">{course.course.name}</Link>
                                                </h2>
                                                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                                                    <User className="h-4 w-4" style={{ fill: "currentColor" }} />
                                                    <span className="line-clamp-2 font-semibold">
                                                        {course.course.department[0]?.name}
                                                    </span>
                                                </div>
                                                <div className="mt-3 flex gap-6 text-xs font-bold text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" /> 8 giờ học
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <BookOpen className="h-4 w-4" /> 8 bài học
                                                    </span>
                                                    <span className="flex items-center gap-1 text-green-600">
                                                        <Earth className="h-4 w-4" /> Truy cập trọn đời
                                                    </span>
                                                </div>
                                                {/* Điểm nổi bật */}
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    <span className="flex items-center gap-1 rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700 shadow-sm">
                                                        <StarHalf className="h-4 w-4 text-yellow-500" /> 4.8/5
                                                    </span>
                                                    <span className="flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                                                        <TrendingUp className="h-4 w-4 text-blue-500" /> Bán chạy
                                                    </span>
                                                    <span className="flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 shadow-sm">
                                                        <Gift className="h-4 w-4 text-green-500" /> Tặng kèm tài liệu,
                                                        đề thi
                                                    </span>
                                                </div>
                                                <div className="mt-4 flex items-center gap-3">
                                                    <p className="t1-gradient-text text-xl font-bold">
                                                        {formatter.number(course.price_snapshot)}đ
                                                    </p>
                                                    <span className="text-xs text-slate-400 line-through">
                                                        1.000.000đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <DangerConfirm
                                                action={() => mutation.mutate(course.id)}
                                                message={`Bạn có chắc chắn muốn xóa khóa học ${course.course.name} khỏi giỏ hàng không?`}
                                            >
                                                <Button className="!bg-transparent text-red-500 transition hover:bg-red-50 hover:text-red-600">
                                                    <Trash2 />
                                                </Button>
                                            </DangerConfirm>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </div>
                        {/* Tóm tắt đơn hàng */}
                        <div className="sticky top-[70px] h-fit flex-3/12 shrink-0 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-primary mb-4 text-lg font-bold">Tóm tắt đơn hàng</h2>
                            <ul className="space-y-2">
                                <li className="flex items-center justify-between border-b border-slate-200 py-2">
                                    <span>Tạm tính</span>
                                    <span className="font-bold">1.800.000đ</span>
                                </li>
                                <li className="flex items-center justify-between border-b border-slate-200 py-2">
                                    <span>Tiết kiệm</span>
                                    <span className="font-bold text-green-600">900.000đ</span>
                                </li>
                                <li className="flex items-center justify-between border-b border-slate-200 py-2">
                                    <span>Điểm thưởng MapLearn</span>
                                    <span className="text-primary font-bold">1.200 điểm</span>
                                </li>
                                <li className="mt-2 flex items-end justify-between py-2">
                                    <span className="font-bold">Thành tiền</span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm text-slate-500 line-through">1.800.000đ</span>
                                        <span className="text-2xl font-bold">900.000đ</span>
                                    </div>
                                </li>
                            </ul>
                            <ConfirmDialog
                                message="Bạn có chắc chắn muốn thanh toán đơn hàng này không?"
                                action={() => alert("Thanh toán")}
                            >
                                <Button className="mt-5 w-full text-white">Thanh toán ngay</Button>
                            </ConfirmDialog>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartPage;
