import React from "react";
import Skeleton from "react-loading-skeleton";

const CourseSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex-1">
                <Skeleton height={221} className="aspect-square w-full !rounded-xl" />
            </div>
            <div className="flex-1">
                <Skeleton height={42} className="w-full !rounded-xl" />
            </div>
            <div className="flex-1">
                <Skeleton height={16} className="w-full !rounded-xl" />
            </div>
        </div>
    );
};

export default CourseSkeleton;
