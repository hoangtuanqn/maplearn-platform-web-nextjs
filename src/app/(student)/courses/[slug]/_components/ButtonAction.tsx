"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Heart, HeartOff, ShoppingCart, TrendingUp } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import courseApi from "~/apiRequest/course.schema";
import Loading from "~/app/(student)/_components/Loading";
import { CourseDetail } from "~/schemaValidate/course.schema";
import { handleApiError } from "~/libs/apis/http";
import { ShowCartSonner } from "~/app/(student)/_components/ShowCartSonner";
const ButtonAction = () => {
    const { slug } = useParams<{ slug: string }>();
    const [course, setCourse] = useState<CourseDetail | null>(null);
    const { data, isLoading } = useQuery({
        queryKey: ["user", "course", slug],
        queryFn: async () => {
            const res = await courseApi.getDetailCourse(slug);
            return res.data.data;
        },
    });
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
            }
            setCourse((prev) => ({
                ...prev!,
                is_favorite: !course?.is_favorite,
            }));
        },
        onError: (error) => {
            handleApiError(error);
            console.error("Action failed:", error);
        },
    });
    const cartMutation = useMutation({
        mutationKey: ["course", "action"],
        mutationFn: async () => courseApi.addCourseToCart(course?.id ?? 0),
        onSuccess: () => {
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
        onError: (error) => {
            handleApiError(error);
            console.error("Action failed:", error);
        },
    });
    useEffect(() => {
        setCourse(data || null);
    }, [isLoading, data]);
    return (
        <>
            {(favoriateMutation.isPending || cartMutation.isPending) && <Loading />}
            {isLoading ? (
                <div className="flex items-start gap-3">
                    <div className="flex h-full flex-1 flex-col space-y-3">
                        <Skeleton className="h-10 w-[80%] !rounded-xl" />
                        <Skeleton className="h-10 w-[80%] !rounded-xl" />
                    </div>
                </div>
            ) : (
                <>
                    {course?.is_enrolled ? (
                        <>
                            <Link href="/courses">
                                <Button variant={"outline"} className="w-full">
                                    Vào học ngay
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="t1-flex-center gap-2">
                                {course?.is_cart ? (
                                    <Button className="text-primary flex-7/8" variant={"outline"}>
                                        <Link href="/carts" className="flex items-center gap-2">
                                            <TrendingUp />
                                            Chuyển đến giỏ hàng
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button
                                        className="flex-7/8 text-white"
                                        onClick={() => cartMutation.mutate()}
                                        variant={"default"}
                                    >
                                        <ShoppingCart className={course?.is_cart ? "text-red-600" : "text-white"} />
                                        {course?.is_cart ? "Xóa khỏi giỏ hàng" : "Thêm vào giỏ hàng"}
                                    </Button>
                                )}

                                <Button
                                    onClick={() => favoriateMutation.mutate(course?.is_favorite ? "remove" : "add")}
                                    variant={"outline"}
                                    className={`view_tooltip flex-1/8 ${course?.is_favorite ? "bg-black text-white" : ""}`}
                                    data-tooltip-id="tooltip"
                                    data-tooltip-content={"Thêm vào danh sách yêu thích"}
                                >
                                    {course?.is_favorite ? <HeartOff /> : <Heart />}
                                </Button>
                            </div>
                            <Button variant={"outline"}>Mua ngay</Button>
                            
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default ButtonAction;
