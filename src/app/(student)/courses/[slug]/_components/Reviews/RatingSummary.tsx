import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import React from "react";
import reviewCourseApi from "~/apiRequest/reviewCourse";
import { CourseDetail } from "~/schemaValidate/course.schema";

const RatingSummary = ({ course }: { course: CourseDetail }) => {
    // Tính toán thống kê rating
    const { data: ratingDistribution } = useQuery({
        queryKey: ["course", "rating", course.slug],
        queryFn: async () => {
            const response = await reviewCourseApi.getRatingDistribution(course.slug);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 phút
    });

    return (
        <>
            {/* Rating Summary - Layout cải tiến */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center">
                {/* Overall Rating Card */}
                <div className="lg:w-80">
                    <div className="t1-flex-center flex-col rounded-2xl bg-white p-5 shadow-sm sm:p-8">
                        <div className="text-primary mb-2 flex items-center gap-1 text-3xl font-bold sm:mb-3 sm:text-4xl">
                            {course.rating.average_rating}
                            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 sm:h-8 sm:w-8" />
                        </div>
                        <Rating
                            style={{ maxWidth: 120 }}
                            value={course.rating.average_rating}
                            readOnly
                            className="mb-2 sm:mb-3 sm:max-w-[140px]"
                        />
                        <div className="text-xs font-medium text-slate-600 sm:text-sm">
                            Dựa trên {course.rating.total_reviews} đánh giá
                        </div>
                    </div>
                </div>

                {/* Rating Distribution */}
                <div className="flex-1">
                    <div className="space-y-2 sm:space-y-3">
                        {ratingDistribution?.map(({ star, count, percentage }) => (
                            <div key={star} className="flex items-center gap-2 sm:gap-4">
                                <div className="flex w-14 items-center gap-1 sm:w-20 sm:gap-2">
                                    <span className="text-xs font-medium text-slate-600 sm:text-sm">{star}</span>
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
                                </div>
                                <div className="h-2 flex-1 rounded-full bg-slate-200 sm:h-3">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500 sm:h-3"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="w-8 text-xs font-medium text-slate-600 sm:w-12 sm:text-sm">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RatingSummary;
