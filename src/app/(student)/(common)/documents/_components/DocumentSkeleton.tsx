import React from "react";
import Skeleton from "react-loading-skeleton";

const DocumentSkeleton = () => {
    return (
        <div className="flex items-start gap-2">
            <div className="flex-1">
                <Skeleton height={180} className="w-full !rounded-xl" />
            </div>
        </div>
    );
};

export default DocumentSkeleton;
