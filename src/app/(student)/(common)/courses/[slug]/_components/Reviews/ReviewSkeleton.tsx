import React from "react";
import Skeleton from "react-loading-skeleton";

const ReviewSkeleton = () => {
    return (
        <div>
            <div className="flex items-start gap-3 py-3">
                {/* Ảnh thumbnail (hình vuông) */}
                <Skeleton width={48} height={48} className="shrink-0 rounded-md" />

                {/* Nội dung bên phải */}
                <div className="flex h-full flex-1 flex-col">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="mt-2 h-3 w-[40%]" />
                </div>
            </div>
            <Skeleton className="mt-2 h-26 w-[40%]" />
            <Skeleton className="mt-2 h-8 w-[40%]" />
        </div>
    );
};

export default ReviewSkeleton;
