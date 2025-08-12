import React from "react";
import Skeleton from "react-loading-skeleton";

const CartSkeleton = () => {
    return (
        <div className="flex items-end gap-3 py-3">
            {/* Ảnh thumbnail (hình vuông) */}
            <Skeleton width={150} height={172} className="shrink-0 rounded-md" />

            {/* Nội dung bên phải */}
            <div className="flex h-full flex-1 flex-col space-y-2">
                {/* Tiêu đề */}
                <Skeleton className="mt-3 h-10 w-[80%]" />
                {/* Thời gian tạo */}
                <Skeleton className="h-3" width={70} />
                <div className="flex gap-2">
                    <Skeleton className="h-3" width={73} />
                    <Skeleton className="h-3" width={73} />
                    <Skeleton className="h-3" width={120} />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-5" width={66} />
                    <Skeleton className="h-5" width={86} />
                    <Skeleton className="h-5" width={170} />
                </div>
                <div className="flex items-end gap-1">
                    <Skeleton className="h-7" width={80} />
                    <Skeleton className="h-4" width={80} />
                </div>
            </div>
        </div>
    );
};

export default CartSkeleton;
