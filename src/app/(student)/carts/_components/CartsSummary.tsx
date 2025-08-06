"use client";
import { BookOpen, Clock, Gift, StarHalf } from "lucide-react";
import React, { useState, useEffect } from "react";
import { formatter } from "~/libs/format";
import { CartsResponse } from "~/schemaValidate/cart.schema";

const CartsSummary = ({ carts, selectedItems }: { carts: CartsResponse["data"] | null; selectedItems: number[] }) => {
    const [data, setData] = useState<CartsResponse["data"]["items"] | null>(null);
    const [summary, setSummary] = useState<{
        total_lessons: number;
        total_duration: number;
        average_rating: number;
    } | null>(null);

    useEffect(() => {
        if (carts) {
            const filtered = carts.items.filter((course) => selectedItems.includes(course.id));
            console.log("dafilteredta >>", carts.items, " ", selectedItems);

            setData(filtered);
        } else {
            setData(null); // tránh giữ data cũ nếu carts bị null
        }
    }, [carts, selectedItems]);

    useEffect(() => {
        if (!data?.length) {
            setSummary(null);
            return;
        }

        const totalLessons = data.reduce((acc, course) => acc + (course.course.lesson_count || 0), 0);
        const totalDuration = data.reduce((acc, course) => acc + (course.course.duration || 0), 0);
        const totalRating = data.reduce((acc, course) => acc + (course.course.rating?.average_rating || 0), 0);
        const averageRating = data.length > 0 ? parseFloat((totalRating / data.length).toFixed(1)) : 0;

        setSummary({
            total_lessons: totalLessons,
            total_duration: totalDuration,
            average_rating: averageRating,
        });
    }, [data]);

    return (
        <>
            <div className="my-6 grid grid-cols-1 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1 md:grid-cols-4">
                <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm max-lg:p-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 max-lg:h-8 max-lg:w-8">
                        <BookOpen className="h-5 w-5 text-blue-600 max-lg:h-4 max-lg:w-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="max-lg:text-xs">Tổng số bài học</span>
                        <span className="text-primary font-bold max-lg:text-sm">{summary?.total_lessons ?? 0} bài</span>
                    </div>
                </div>
                <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm max-lg:p-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 max-lg:h-8 max-lg:w-8">
                        <Clock className="h-5 w-5 text-green-600 max-lg:h-4 max-lg:w-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="max-lg:text-xs">Tổng thời lượng</span>
                        <span className="text-primary font-bold max-lg:text-sm">
                            {formatter.durationToHours(summary?.total_duration ?? 0)}
                        </span>
                    </div>
                </div>
                <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm max-lg:p-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 max-lg:h-8 max-lg:w-8">
                        <StarHalf className="h-5 w-5 text-orange-600 max-lg:h-4 max-lg:w-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="max-lg:text-xs">Tổng đánh giá TB</span>
                        <span className="text-primary font-bold max-lg:text-sm">{summary?.average_rating ?? 0}/5</span>
                    </div>
                </div>
                <div className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm max-lg:p-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 max-lg:h-8 max-lg:w-8">
                        <Gift className="h-5 w-5 text-purple-600 max-lg:h-4 max-lg:w-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="max-lg:text-xs">Điểm thưởng MapLearn</span>
                        <span className="text-primary font-bold max-lg:text-sm">Chưa có điểm</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartsSummary;
