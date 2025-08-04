import React, { Dispatch, SetStateAction, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { getCharacterName } from "~/libs/hepler";
import { formatter } from "~/libs/format";
import { Button } from "~/components/ui/button";
import { ReviewCourse } from "~/schemaValidate/reviewCourse.schema";
import ReviewSkeleton from "./ReviewSkeleton";
import reviewCourseApi from "~/apiRequest/reviewCourse";
import { toast } from "sonner";
import Loading from "~/app/(student)/_components/Loading";
const ReviewList = ({
    data: { isLoading, reviews, setReviews, countAll, setCommentCount },
}: {
    data: {
        isLoading: boolean;
        reviews: ReviewCourse[] | undefined;
        setReviews: Dispatch<SetStateAction<ReviewCourse[]>>;
        countAll: number;
        setCommentCount: Dispatch<SetStateAction<number>>;
    };
}) => {
    const handleShowMoreReviews = () => {
        if (isLoading) return;
        setCommentCount((prev: number) => prev + 5);
    };
    const [isVoteLoading, setIsVoteLoading] = useState(false);
    const handleVoteReview = async (reviewId: number, is_like: boolean) => {
        if (isVoteLoading) return;
        setIsVoteLoading(true);
        try {
            const res = await reviewCourseApi.voteReviewCourse(reviewId, is_like);
            if (res.message) {
                setReviews((prev) =>
                    prev.map((review) => {
                        if (review.id === reviewId) {
                            return res.data;
                        }
                        return review;
                    }),
                );
                toast.success(res.message);
            } else {
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
            }
        } catch {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
        } finally {
            setIsVoteLoading(false);
        }
    };
    return (
        <>
            {isVoteLoading && <Loading />}
            <div className="px-3 py-4 sm:px-6 sm:py-6">
                <div className="space-y-3">
                    {isLoading ? (
                        [...Array(5).keys()].map((index) => <ReviewSkeleton key={index} />)
                    ) : reviews?.length === 0 ? (
                        <div className="text-secondary-typo text-center text-sm">Không có đánh giá!</div>
                    ) : (
                        <>
                            {reviews?.map((review) => (
                                <div
                                    key={review.id}
                                    className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all duration-200 hover:bg-slate-50 hover:shadow-md sm:rounded-2xl sm:p-6"
                                >
                                    {/* Review Header */}
                                    <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            {/* User Avatar */}
                                            <div className="t1-flex-center h-10 w-10 shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm">
                                                {getCharacterName(review.user.full_name)}
                                            </div>

                                            <div>
                                                <div className="text-primary text-sm font-semibold sm:text-base">
                                                    {review.user.full_name}
                                                </div>
                                                <div className="mt-1 flex items-center gap-2 sm:gap-3">
                                                    <Rating
                                                        style={{ maxWidth: 70 }}
                                                        value={review.rating}
                                                        readOnly
                                                        className="sm:max-w-[90px]"
                                                    />
                                                    <span className="text-[10px] text-slate-500 sm:text-xs">
                                                        {formatter.date(new Date(review.created_at))}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rating Badge */}
                                        <div className="bg-primary/10 text-primary flex items-center rounded-full px-2 py-0.5 text-xs font-bold sm:px-3 sm:py-1 sm:text-sm">
                                            <span className="mr-1">{review.rating}/5</span>
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
                                        </div>
                                    </div>

                                    {/* Review Content */}
                                    <div className="mb-4 sm:mb-5">
                                        <p className="text-secondary-typo text-sm leading-relaxed sm:text-[15.125px]">
                                            {review.comment}
                                        </p>
                                    </div>

                                    {/* Review Actions */}
                                    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <button
                                                onClick={() => handleVoteReview(review.id, true)}
                                                className={`t1-flex-center cursor-pointer gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                                                    // review?.isHelpful
                                                    review.is_liked === true
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "text-secondary-typo bg-slate-100 hover:bg-slate-200"
                                                }`}
                                            >
                                                <ThumbsUp className="h-4 w-4" />
                                                <span>Hữu ích ({review.likes_count})</span>
                                            </button>

                                            <button
                                                onClick={() => handleVoteReview(review.id, false)}
                                                className={`t1-flex-center cursor-pointer gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                                                    review.is_liked === false
                                                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                                                        : "text-secondary-typo bg-slate-100 hover:bg-slate-200"
                                                }`}
                                            >
                                                <ThumbsDown className="h-4 w-4" />
                                                <span>({review.dislikes_count})</span>
                                            </button>
                                        </div>

                                        {/* Helpful indicator - tạm bỏ cái này */}
                                        {/* {review && (
                                            <div className="t1-flex-center mt-1 gap-1 text-[11px] text-green-600 sm:mt-2 sm:text-xs">
                                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                                <span className="font-medium">Đánh giá hữu ích</span>
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {countAll > (reviews?.length || 0) && (
                    <div className="mt-6 text-center sm:mt-8">
                        <Button className="w-full text-white sm:w-auto" onClick={handleShowMoreReviews}>
                            <span>Xem thêm đánh giá ({countAll - (reviews?.length || 0)})</span>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ReviewList;
