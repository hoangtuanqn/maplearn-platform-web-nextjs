"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import courseApi, { REVIEW_PER_PAGE } from "~/apiRequest/course";
import ReviewSkeleton from "./ReviewSkeleton";
import ReviewItem from "./ReviewItem";
const ReviewsCourse = ({ slug }: { slug: string }) => {
    const [page, setPage] = useState(1);

    const { data: reviewsData, isLoading } = useQuery({
        queryKey: ["reviews", slug, page],
        queryFn: async () => {
            const res = await courseApi.getReviewCourses(slug, page, REVIEW_PER_PAGE);
            return res?.data.data;
        },
    });

    // Tính toán thống kê rating
    const calculateRatingStats = () => {
        if (!reviewsData?.data || reviewsData.data.length === 0) return null;

        const ratings = reviewsData.data.map((review) => review.rating);
        const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

        const ratingCounts = {
            5: ratings.filter((r) => r === 5).length,
            4: ratings.filter((r) => r === 4).length,
            3: ratings.filter((r) => r === 3).length,
            2: ratings.filter((r) => r === 2).length,
            1: ratings.filter((r) => r === 1).length,
        };

        return { averageRating, ratingCounts, totalReviews: reviewsData.total };
    };

    const ratingStats = calculateRatingStats();

    // Component Rating Statistics
    const RatingStats = () => {
        if (!ratingStats) return null;

        return (
            <div className="mb-6 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                <div className="flex items-center gap-6">
                    {/* Overall Rating */}
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{ratingStats.averageRating.toFixed(1)}</div>
                        <div className="mb-1 flex items-center justify-center gap-1">
                            {/* {renderStars(Math.round(ratingStats.averageRating))} */}
                        </div>
                        <div className="text-sm text-gray-600">{ratingStats.totalReviews} đánh giá</div>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="mb-1 flex items-center gap-2">
                                <span className="w-4 text-sm font-medium text-gray-600">{star}</span>
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <div className="h-2 flex-1 rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-yellow-400 transition-all duration-300"
                                        style={{
                                            width: `${
                                                ratingStats.totalReviews > 0
                                                    ? (ratingStats.ratingCounts[
                                                          star as keyof typeof ratingStats.ratingCounts
                                                      ] /
                                                          ratingStats.totalReviews) *
                                                      100
                                                    : 0
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                                <span className="w-8 text-right text-sm text-gray-600">
                                    {ratingStats.ratingCounts[star as keyof typeof ratingStats.ratingCounts]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Component Pagination
    const Pagination = () => {
        if (!reviewsData || reviewsData.last_page <= 1) return null;

        return (
            <div className="flex items-center justify-between pt-6">
                <div className="text-sm text-gray-600">
                    Hiển thị {reviewsData.from} - {reviewsData.to} của {reviewsData.total} đánh giá
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page === 1}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Trang trước"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, reviewsData.last_page) }, (_, i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setPage(pageNum)}
                                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                                        page === pageNum
                                            ? "bg-primary text-white"
                                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setPage((prev) => Math.min(reviewsData.last_page, prev + 1))}
                        disabled={page === reviewsData.last_page}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Trang sau"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Đánh giá từ học viên</h3>
                    {reviewsData && <p className="text-sm text-gray-600">{reviewsData.total} đánh giá</p>}
                </div>
            </div>

            {/* Rating Statistics */}
            <RatingStats />

            {/* Reviews List */}
            <div className="space-y-4">
                {isLoading ? (
                    // Loading state
                    Array.from({ length: REVIEW_PER_PAGE }, (_, i) => <ReviewSkeleton key={i} />)
                ) : reviewsData?.data && reviewsData.data.length > 0 ? (
                    reviewsData.data.map((review) => <ReviewItem key={review.id} review={review} />)
                ) : (
                    // No reviews
                    <div className="py-12 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                            <MessageCircle className="h-8 w-8 text-gray-400" />
                        </div>
                        <h4 className="mb-2 text-lg font-medium text-gray-900">Chưa có đánh giá nào</h4>
                        <p className="text-gray-600">Hãy là người đầu tiên đánh giá khóa học này</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination />
        </div>
    );
};

export default ReviewsCourse;
