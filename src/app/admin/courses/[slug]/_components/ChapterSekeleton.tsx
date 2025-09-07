import React from "react";
import Skeleton from "react-loading-skeleton";

const ChapterSekeleton = () => {
    return (
        <div className="flex flex-col">
            <div className="flex-1 rounded-lg border border-gray-200">
                {[...Array(10)].map((_, index) => (
                    <Skeleton height={73} className="aspect-square w-full !rounded-xl" key={index} />
                ))}
            </div>
        </div>
    );
};

export default ChapterSekeleton;
