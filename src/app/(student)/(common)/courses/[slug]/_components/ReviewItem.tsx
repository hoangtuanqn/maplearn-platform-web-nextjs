import { Rating } from "@smastrom/react-rating";
import React from "react";
import DisplayAvatar from "~/app/(student)/_components/DisplayAvatar";
import { formatter } from "~/libs/format";
import { ReviewCourse } from "~/schemaValidate/reviewCourse.schema";

const ReviewItem = ({ review }: { review: ReviewCourse }) => {
    return (
        <div className="rounded-lg border border-gray-100 bg-white p-4 transition-shadow">
            <div className="flex items-start gap-4">
                {/* <UserAvatar user={review.user} /> */}
                <DisplayAvatar fullName={review.user.full_name} avatar={review.user.avatar} ratio={"10"} />

                <div className="flex-1 space-y-3">
                    {/* Header với tên và rating */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-gray-900">{review.user.full_name}</h4>
                            <div className="flex items-center gap-1">
                                <Rating style={{ maxWidth: 100 }} value={review.rating} readOnly />
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">{formatter.date(review.created_at)}</span>
                    </div>

                    {/* Nội dung comment */}

                    <p className="leading-relaxed text-gray-700">{review.comment}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
