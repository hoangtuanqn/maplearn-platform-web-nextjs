import React from "react";
import Skeleton from "react-loading-skeleton";

const CategorySkeleton = () => {
    return (
        <div className="mt-3 flex items-start gap-2">
            <div className="flex-1">
                <Skeleton height={135} className="w-full !rounded-xl" />
            </div>
        </div>
    );
};

export default CategorySkeleton;
