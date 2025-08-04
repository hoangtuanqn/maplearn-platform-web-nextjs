"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    BookOpen,
    Clock,
    Earth,
    Gift,
    ShoppingCart,
    Square,
    SquareCheckBig,
    StarHalf,
    Trash2,
    TrendingUp,
    User,
} from "lucide-react";
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
import { handleApiError } from "~/libs/apis/http";
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
    const toggleAllMutation = useMutation({
        mutationFn: (is_active: boolean) => cartApi.toggleCartAll(is_active),
        onSuccess: (data, is_active) => {
            toast.success(`Đã ${is_active ? "chọn" : "bỏ chọn"} tất cả sản phẩm trong giỏ hàng!`);
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
    const toggleItemMutation = useMutation({
        mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) => cartApi.toggleCartItem(id, is_active),
        onSuccess: (data, { is_active }: { id: number; is_active: boolean }) => {
            toast.success(`Đã ${is_active ? "chọn" : "bỏ chọn"} sản phẩm trong giỏ hàng!`);
        },
        onError: (error) => {
            handleApiError(error);
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
    const toggleAll = (is_active: boolean) => {
        toggleAllMutation.mutate(is_active);
        console.log(is_active, "is_active");

        // Nếu is_active là true thì xóa hết selectedItems, ngược lại thì set lại selectedItems

        if (is_active) {
            setSelectedItems(carts?.items.map((item) => item.id) ?? []);
        } else {
            setSelectedItems([]);
        }
    };

    const toggleItem = (id: number, is_active: boolean) => {
        toggleItemMutation.mutate({ id, is_active });
        setSelectedItems((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            }
            return [...prev, id];
        });
    };
    const removeCartIds = (ids: number[]) => {
        removeCartMutation.mutate(ids);
        setSelectedItems((prev) => prev.filter((item) => !ids.includes(item)));
    };

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
                                    Đã chọn <span className="font-bold">3 khóa học </span>- Tiết kiệm được{" "}
                                    <span className="font-bold text-green-500">900.000đ</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Summary */}
                    <div className="my-6 grid grid-cols-1 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1 md:grid-cols-4">
                        <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm max-lg:p-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 max-lg:h-8 max-lg:w-8">
                                <BookOpen className="h-5 w-5 text-blue-600 max-lg:h-4 max-lg:w-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="max-lg:text-xs">Tổng số bài học</span>
                                <span className="text-primary font-bold max-lg:text-sm">135 bài</span>
                            </div>
                        </div>
                        <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm max-lg:p-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 max-lg:h-8 max-lg:w-8">
                                <Clock className="h-5 w-5 text-green-600 max-lg:h-4 max-lg:w-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="max-lg:text-xs">Tổng thời lượng</span>
                                <span className="text-primary font-bold max-lg:text-sm">1000 giờ</span>
                            </div>
                        </div>
                        <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm max-lg:p-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 max-lg:h-8 max-lg:w-8">
                                <StarHalf className="h-5 w-5 text-orange-600 max-lg:h-4 max-lg:w-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="max-lg:text-xs">Tổng đánh giá TB</span>
                                <span className="text-primary font-bold max-lg:text-sm">4.5/5</span>
                            </div>
                        </div>
                        <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm max-lg:p-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 max-lg:h-8 max-lg:w-8">
                                <Gift className="h-5 w-5 text-purple-600 max-lg:h-4 max-lg:w-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="max-lg:text-xs">Điểm thưởng MapLearn</span>
                                <span className="text-primary font-bold max-lg:text-sm">1.200 điểm</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 max-lg:flex-col max-lg:gap-2">
                        {/* Danh sách khóa học */}
                        <div className="mb-6 flex-9/12 shrink-0 rounded-lg border border-slate-200 max-lg:mb-2 max-lg:w-full">
                            <header className="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-4 shadow-sm max-lg:p-2">
                                <div className="text-primary flex items-center gap-2">
                                    <ShoppingCart className="size-6 max-lg:size-5" />
                                    <h2 className="text-base font-bold max-lg:text-sm">Danh sách khóa học</h2>
                                </div>

                                <div className="flex items-center gap-2">
                                    <DangerConfirm
                                        message="Bạn có chắc chắn muốn xóa tất cả khóa học đã chọn khỏi giỏ hàng không?"
                                        action={() => selectedItems.length > 0 && removeCartIds(selectedItems)}
                                    >
                                        <div
                                            className={`flex items-center gap-2 rounded px-3 py-1.5 text-xs font-semibold text-white max-lg:px-2 max-lg:py-1 max-lg:text-xs ${
                                                selectedItems.length === 0
                                                    ? "cursor-not-allowed bg-red-300"
                                                    : "cursor-pointer bg-red-500"
                                            }`}
                                        >
                                            <Trash2 className="h-4 w-4 max-lg:h-3 max-lg:w-3" />
                                            Xóa ({selectedItems.length}) đã chọn
                                        </div>
                                    </DangerConfirm>

                                    <div
                                        onClick={() => toggleAll(selectedItems.length !== (carts?.items.length ?? 0))}
                                        className={`flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold max-lg:px-2 max-lg:py-1 max-lg:text-xs ${(carts?.items.length ?? 0) === selectedItems.length ? "bg-primary text-white" : "text-primary bg-white"}`}
                                    >
                                        {(carts?.items.length ?? 0) === selectedItems.length ? (
                                            <SquareCheckBig className="h-4 w-4 max-lg:h-3 max-lg:w-3" />
                                        ) : (
                                            <Square className="h-4 w-4 max-lg:h-3 max-lg:w-3" />
                                        )}
                                        Tất cả
                                    </div>
                                </div>
                            </header>
                            <section className="mt-4 flex flex-col gap-2 divide-y divide-slate-200 px-4 max-lg:px-1">
                                {!isLoading && carts?.items.length === 0 && (
                                    <div className="t1-flex-center w-full flex-col">
                                        <DisplayNoData title="Không có khóa học nào trong giỏ hàng. Hãy tiếp tục mua sắm" />
                                        <Button className="mx-auto mt-4 w-fit text-white max-lg:w-full">
                                            <Link href="/courses">Tiếp tục mua sắm</Link>
                                        </Button>
                                    </div>
                                )}
                                {isLoading && [...Array(10)].map((_, index) => <CartSkeleton key={index} />)}
                                {carts?.items.map((course) => (
                                    <div
                                        key={course.id}
                                        className={`relative flex justify-between rounded-lg border p-4 shadow-sm transition duration-200 hover:border-blue-300 hover:bg-blue-50 ${selectedItems.includes(course.id) ? "border-blue-300 bg-blue-50" : "border-slate-100 bg-white"} max-lg:flex-col max-lg:gap-2 max-lg:p-2`}
                                    >
                                        <Checkbox
                                            className="absolute top-5 left-2 size-6 cursor-pointer border-blue-300 bg-white !text-white max-lg:static max-lg:mb-2"
                                            checked={selectedItems.includes(course.id)}
                                            onCheckedChange={() =>
                                                toggleItem(course.id, !selectedItems.includes(course.id))
                                            }
                                        />
                                        <div className="flex shrink-0 gap-6 py-4 max-lg:flex-col max-lg:gap-2 max-lg:py-2">
                                            <Image
                                                src={course.course.thumbnail}
                                                width={150}
                                                height={172}
                                                alt={course.course.name}
                                                className="rounded-lg border border-slate-200 shadow max-lg:h-auto max-lg:w-full max-lg:max-w-[120px]"
                                            />
                                            <div className="max-lg:mt-2">
                                                <h2 className="text-primary cursor-pointer text-lg font-bold transition max-lg:line-clamp-2 max-lg:text-base">
                                                    <Link href={`/courses/${course.course.slug}`}>
                                                        {course.course.name}
                                                    </Link>
                                                </h2>
                                                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 max-lg:mt-1 max-lg:text-xs">
                                                    <User
                                                        className="h-4 w-4 max-lg:h-3 max-lg:w-3"
                                                        style={{ fill: "currentColor" }}
                                                    />
                                                    <span className="line-clamp-2 font-semibold">
                                                        {course.course.department[0]?.name}
                                                    </span>
                                                </div>
                                                <div className="mt-3 flex gap-6 text-xs font-bold text-slate-500 max-lg:mt-1 max-lg:gap-2">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4 max-lg:h-3 max-lg:w-3" /> 8 giờ học
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <BookOpen className="h-4 w-4 max-lg:h-3 max-lg:w-3" /> 8 bài học
                                                    </span>
                                                    <span className="flex items-center gap-1 text-green-600">
                                                        <Earth className="h-4 w-4 max-lg:h-3 max-lg:w-3" /> Truy cập
                                                        trọn đời
                                                    </span>
                                                </div>
                                                {/* Điểm nổi bật */}
                                                <div className="mt-4 flex flex-wrap gap-2 max-lg:mt-2 max-lg:gap-1">
                                                    <span className="flex items-center gap-1 rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700 shadow-sm max-lg:px-1 max-lg:py-0.5">
                                                        <StarHalf className="h-4 w-4 text-yellow-500 max-lg:h-3 max-lg:w-3" />{" "}
                                                        4.8/5
                                                    </span>
                                                    <span className="flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 shadow-sm max-lg:px-1 max-lg:py-0.5">
                                                        <TrendingUp className="h-4 w-4 text-blue-500 max-lg:h-3 max-lg:w-3" />{" "}
                                                        Bán chạy
                                                    </span>
                                                    <span className="flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 shadow-sm max-lg:px-1 max-lg:py-0.5">
                                                        <Gift className="h-4 w-4 text-green-500 max-lg:h-3 max-lg:w-3" />{" "}
                                                        Tặng kèm tài liệu, đề thi
                                                    </span>
                                                </div>
                                                <div className="mt-4 flex items-center gap-3 max-lg:mt-2 max-lg:gap-2">
                                                    <p className="t1-gradient-text text-xl font-bold max-lg:text-base">
                                                        {formatter.number(course.price_snapshot)}đ
                                                    </p>
                                                    <span className="text-xs text-slate-400 line-through max-lg:text-xs">
                                                        1.000.000đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 max-lg:mt-2 max-lg:flex-row max-lg:justify-end">
                                            <DangerConfirm
                                                action={() => removeCartIds([course.id])}
                                                message={`Bạn có chắc chắn muốn xóa khóa học ${course.course.name} khỏi giỏ hàng không?`}
                                            >
                                                <Button className="!bg-transparent text-red-500 transition hover:bg-red-50 hover:text-red-600 max-lg:p-1">
                                                    <Trash2 />
                                                </Button>
                                            </DangerConfirm>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </div>
                        {/* Tóm tắt đơn hàng */}
                        <div className="sticky top-[70px] h-fit flex-3/12 shrink-0 rounded-lg border border-slate-200 bg-white p-8 shadow-sm max-lg:static max-lg:mt-0 max-lg:w-full max-lg:p-3">
                            <h2 className="text-primary mb-4 text-lg font-bold max-lg:text-base">Tóm tắt đơn hàng</h2>
                            <ul className="space-y-2 max-lg:space-y-1">
                                <li className="flex items-center justify-between border-b border-slate-200 py-2 max-lg:py-1">
                                    <span className="max-lg:text-xs">Tạm tính</span>
                                    <span className="font-bold max-lg:text-sm">1.800.000đ</span>
                                </li>
                                <li className="flex items-center justify-between border-b border-slate-200 py-2 max-lg:py-1">
                                    <span className="max-lg:text-xs">Tiết kiệm</span>
                                    <span className="font-bold text-green-600 max-lg:text-sm">900.000đ</span>
                                </li>
                                <li className="flex items-center justify-between border-b border-slate-200 py-2 max-lg:py-1">
                                    <span className="max-lg:text-xs">Điểm thưởng MapLearn</span>
                                    <span className="text-primary font-bold max-lg:text-sm">1.200 điểm</span>
                                </li>
                                <li className="mt-2 flex items-end justify-between py-2 max-lg:mt-1 max-lg:py-1">
                                    <span className="font-bold max-lg:text-sm">Thành tiền</span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm text-slate-500 line-through max-lg:text-xs">
                                            1.800.000đ
                                        </span>
                                        <span className="text-2xl font-bold max-lg:text-lg">900.000đ</span>
                                    </div>
                                </li>
                            </ul>
                            <ConfirmDialog
                                message="Bạn có chắc chắn muốn thanh toán đơn hàng này không?"
                                action={() => alert("Thanh toán")}
                            >
                                <Button className="mt-5 w-full text-white max-lg:mt-3">Thanh toán ngay</Button>
                            </ConfirmDialog>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartPage;
