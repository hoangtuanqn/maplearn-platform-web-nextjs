import React from "react";
import Skeleton from "react-loading-skeleton";

const TableSkeleton = () => {
    return (
        <tr className="odd:bg-white even:bg-gray-100">
            <td className="px-6 py-4">
                <Skeleton width={100} />
            </td>
            <td className="px-6 py-4">
                <Skeleton width={120} />
            </td>
            <td className="px-6 py-4">
                <Skeleton width={120} />
            </td>
            <td className="px-6 py-4">
                <Skeleton width={80} />
            </td>
            <td className="px-6 py-4 text-end">
                <Skeleton width={100} />
            </td>
        </tr>
    );
};

export default TableSkeleton;
