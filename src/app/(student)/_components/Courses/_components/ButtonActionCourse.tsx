"use client";
import React, { useState } from "react";
import { Heart, HeartOff, ShoppingCart, TrendingUp } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { CourseType } from "~/schemaValidate/course.schema";
import { ShowCartSonner } from "../../ShowCartSonner";
import { toast } from "sonner";
import courseApi from "~/apiRequest/course";
import { useMutation } from "@tanstack/react-query";
import { notificationErrorApi } from "~/libs/apis/http";
import { useAuth } from "~/hooks/useAuth";
import Loading from "../../Loading";

const ButtonActionCourse = ({ courseInit }: { courseInit: CourseType }) => {
    const [course, setCourse] = useState<CourseType>(courseInit);
    const { user, updateProfile } = useAuth();
    const favoriateMutation = useMutation({
        mutationKey: ["course", "action"],
        mutationFn: async (action: "add" | "check" | "remove") => {
            return courseApi.actionCourseToFavorite(course?.id ?? 0, action);
        },
        onSuccess: () => {
            if (course?.is_favorite) {
                toast.success("Đã xóa khỏi danh sách yêu thích!");
            } else {
                ShowCartSonner({
                    title: course?.name ?? "Khóa học",
                    image: course?.thumbnail ?? "",
                    url: "/profile/saved-courses",
                    message: "Đã thêm danh sách yêu thích!",
                });
                courseInit.is_favorite = true;
            }
            setCourse((prev) => ({
                ...prev!,
                is_favorite: !course?.is_favorite,
            }));
        },
        onError: notificationErrorApi,
    });
    const cartMutation = useMutation({
        mutationKey: ["course", "action"],
        mutationFn: async () => courseApi.addCourseToCart(course?.id ?? 0),
        onSuccess: () => {
            updateProfile({
                cart_item_count: (user?.cart_item_count ?? 0) + 1,
            });
            ShowCartSonner({
                title: course?.name ?? "Khóa học",
                image: course?.thumbnail ?? "",
                url: "/carts",
                message: "Đã thêm vào giỏ hàng thành công!",
            });
            setCourse((prev) => ({
                ...prev!,
                is_cart: true,
            }));
        },
        onError: notificationErrorApi,
    });

    return (
        <>
            {(favoriateMutation.isPending || cartMutation.isPending) && <Loading />}

            <div className="t1-flex-center mt-4 gap-2">
                {course.is_cart ? (
                    <Link href="/carts" className="flex-7/8">
                        <Button className="text-primary flex w-full items-center gap-2" variant={"outline"}>
                            <TrendingUp />
                            Chuyển đến giỏ hàng
                        </Button>
                    </Link>
                ) : (
                    <Button className="flex-7/8 text-white" onClick={() => cartMutation.mutate()} variant={"default"}>
                        <ShoppingCart className={course.is_cart ? "text-red-600" : "text-white"} />
                        {course.is_cart ? "Xóa khỏi giỏ hàng" : "Thêm vào giỏ hàng"}
                    </Button>
                )}

                {/* <Button
                    onClick={() => favoriateMutation.mutate(course.is_favorite ? "remove" : "add")}
                    variant={"outline"}
                    className={`view_tooltip flex-1/8 border-none`}
                    data-tooltip-id="tooltip"
                    data-tooltip-content={"Thêm vào danh sách yêu thích"}
                > */}
                <div
                    className="inline-flex cursor-pointer items-center justify-center rounded-full bg-red-100 p-2 duration-200 ease-in hover:bg-red-200"
                    onClick={() => favoriateMutation.mutate(course.is_favorite ? "remove" : "add")}
                >
                    {course.is_favorite ? (
                        <HeartOff className="h-5 w-5 text-red-600" />
                    ) : (
                        <Heart className="h-5 w-5 text-red-600" />
                    )}
                </div>
            </div>
        </>
    );
};

export default ButtonActionCourse;
