import React from "react";
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
import { DangerConfirm } from "~/components/DangerConfirm";
import { Checkbox } from "~/components/ui/checkbox";
import { formatter } from "~/libs/format";
import DisplayNoData from "../../_components/Courses/DisplayNoData";
import { Button } from "~/components/ui/button";
import CartSkeleton from "./CartSkeleton";
import { handleApiError } from "~/libs/apis/http";
import { useAuth } from "~/hooks/useAuth";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import cartApi from "~/apiRequest/cart";
import { CartsResponse } from "~/schemaValidate/cart.schema";
import { AxiosResponse } from "axios";
const ListCarts = ({
    payload: { selectedItems, setSelectedItems, carts, removeCartMutation, isLoading },
}: {
    payload: {
        selectedItems: number[];
        setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
        carts: CartsResponse["data"] | null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        removeCartMutation: UseMutationResult<AxiosResponse<any, any>, Error, number[], unknown>;
        isLoading: boolean;
    };
}) => {
    const { updateProfile } = useAuth();
    const toggleAllMutation = useMutation({
        mutationFn: (is_active: boolean) => cartApi.toggleCartAll(is_active),

        onError: (error) => {
            handleApiError(error);
        },
    });
    const toggleItemMutation = useMutation({
        mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) => cartApi.toggleCartItem(id, is_active),

        onError: (error) => {
            handleApiError(error);
        },
    });
    const toggleAll = (is_active: boolean) => {
        toggleAllMutation.mutate(is_active);
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
        updateProfile({
            cart_item_count: (carts?.items.length ?? 0) - ids.length,
        });
        removeCartMutation.mutate(ids);
        setSelectedItems((prev) => prev.filter((item) => !ids.includes(item)));
    };
    return (
        <div className="mb-6 h-fit flex-9/12 rounded-lg border border-slate-200 max-lg:mb-2">
            <header className="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-4 shadow-sm max-lg:p-2">
                <div className="text-primary flex items-center gap-2">
                    <ShoppingCart className="size-6 max-lg:size-5" />
                    <h2 className="text-base font-bold max-lg:text-sm">Danh sách khóa học</h2>
                </div>
                {(carts?.items.length ?? 0) > 0 && (
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
                )}
            </header>
            <section className="mt-4 flex flex-col gap-2 divide-y divide-slate-200 px-4 pb-4 max-lg:px-1">
                {!isLoading && carts?.items.length === 0 && (
                    <div className="t1-flex-center w-full flex-col">
                        <DisplayNoData title="Không có khóa học nào trong giỏ hàng." />
                        <Button className="mx-auto mt-4 w-fit text-white max-lg:w-full">
                            <Link href="/courses">Tiếp tục tìm kiếm khóa học</Link>
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
                            onCheckedChange={() => toggleItem(course.id, !selectedItems.includes(course.id))}
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
                                    <Link href={`/courses/${course.course.slug}`}>{course.course.name}</Link>
                                </h2>
                                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 max-lg:mt-1 max-lg:text-xs">
                                    <User className="h-4 w-4 max-lg:h-3 max-lg:w-3" style={{ fill: "currentColor" }} />
                                    <span className="line-clamp-2 font-semibold">
                                        {course.course.department[0]?.name}
                                    </span>
                                </div>
                                <div className="mt-3 flex gap-6 text-xs font-bold text-slate-500 max-lg:mt-1 max-lg:gap-2">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4 max-lg:h-3 max-lg:w-3" />
                                        {formatter.durationToHours(course.course.duration)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="h-4 w-4 max-lg:h-3 max-lg:w-3" />
                                        {course.course.lesson_count} bài học
                                    </span>
                                    <span className="flex items-center gap-1 text-green-600">
                                        <Earth className="h-4 w-4 max-lg:h-3 max-lg:w-3" /> Truy cập trọn đời
                                    </span>
                                </div>
                                {/* Điểm nổi bật */}
                                <div className="mt-4 flex flex-wrap gap-2 max-lg:mt-2 max-lg:gap-1">
                                    <span className="flex items-center gap-1 rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700 shadow-sm max-lg:px-1 max-lg:py-0.5">
                                        <StarHalf className="h-4 w-4 text-yellow-500 max-lg:h-3 max-lg:w-3" />
                                        {course.course.rating.average_rating}/5
                                    </span>
                                    {course.course.is_best_seller && (
                                        <span className="flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 shadow-sm max-lg:px-1 max-lg:py-0.5">
                                            <TrendingUp className="h-4 w-4 text-blue-500 max-lg:h-3 max-lg:w-3" /> Bán
                                            chạy
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 shadow-sm max-lg:px-1 max-lg:py-0.5">
                                        <Gift className="h-4 w-4 text-green-500 max-lg:h-3 max-lg:w-3" /> Tặng kèm tài
                                        liệu, đề thi
                                    </span>
                                </div>
                                <div className="mt-4 flex items-center gap-2 max-lg:mt-2 max-lg:gap-2">
                                    <p className="t1-gradient-text text-xl font-bold max-lg:text-base">
                                        {formatter.number(course.price_snapshot)}đ
                                    </p>
                                    {course.price_snapshot < course.course.price && (
                                        <span className="text-sm font-semibold text-slate-500 line-through max-lg:text-xs">
                                            {formatter.number(course.course.price)}đ
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="sticky flex h-fit flex-col gap-2 rounded-lg bg-white max-lg:mt-2 max-lg:flex-row max-lg:justify-end">
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
    );
};

export default ListCarts;
