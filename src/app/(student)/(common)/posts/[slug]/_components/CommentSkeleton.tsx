import React from "react";
import Skeleton from "react-loading-skeleton";

const CommentSkeleton = () => {
    return (
        <div className="mt-10 flex items-start gap-2">
            <Skeleton width={50} height={50} className="rounded-full" />
            <div className="flex-1">
                <Skeleton height={100} className="w-full rounded-xl" />
            </div>
        </div>
    );
};

export default CommentSkeleton;
