import React from "react";
import Skeleton from "react-loading-skeleton";

const ReviewSkeleton = () => {
    return (
        <div className="rounded-lg border border-gray-100 bg-white p-4">
            <div className="flex items-start gap-4">
                <Skeleton width={40} height={40} className="shrink-0 rounded-full" />
                <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Skeleton width={96} height={16} />
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton key={i} width={16} height={16} />
                                ))}
                            </div>
                        </div>
                        <Skeleton width={80} height={12} />
                    </div>
                    <div className="space-y-2">
                        <Skeleton height={16} />
                        <Skeleton height={16} width="75%" />
                        <Skeleton height={16} width="50%" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSkeleton;
