"use client";
import React, { useState } from "react";
import { CourseDetail } from "~/schemaValidate/course.schema";
import { useQuery } from "@tanstack/react-query";
import reviewCourseApi from "~/apiRequest/reviewCourse";
import RatingSummary from "./RatingSummary";
import RatingFilter from "./RatingFilter";
import ReviewList from "./ReviewList";

const ReviewCourse = ({ course }: { course: CourseDetail }) => {
    const [sortBy, setSortBy] = useState("-id");
    const [filterRating, setFilterRating] = useState<number | null>(null);
    const { data, isLoading } = useQuery({
        queryKey: ["user", "course", "reviews", course.id, sortBy, filterRating],
        queryFn: async () => {
            const response = await reviewCourseApi.getCourseReviews(1, 5, course.slug, filterRating, sortBy);
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 phút
    });
    const reviews = data?.data || [];

    return (
        <div className="mt-4 overflow-hidden bg-white shadow-sm lg:rounded-xl">
            {/* Header với gradient background */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-3 py-5 sm:px-6 sm:py-8">
                <h2 className="text-primary mb-4 text-lg font-bold sm:mb-6 sm:text-xl">Đánh giá từ học viên</h2>
                <RatingSummary course={course} />
            </div>

            <RatingFilter data={{ sortBy, setSortBy, filterRating, setFilterRating }} />

            <ReviewList reviews={reviews} isLoading={isLoading} countAll={data?.total || 0} />
        </div>
    );
};

export default ReviewCourse;
