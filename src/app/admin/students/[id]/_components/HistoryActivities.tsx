import React from "react";
import { PaginationNav } from "~/app/(student)/_components/Pagination";

const HistoryActivities = () => {
    return (
        <>
            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full rounded-xl bg-white shadow-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Tài khoản</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                Thông tin cơ bản
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Số điện thoại</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Số dư</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Trạng thái</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {[1, 2, 3, 4, 5].map((_, idx) => (
                            <tr
                                key={idx}
                                className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                            >
                                <td className="px-4 py-3 text-zinc-500">Xin chào</td>
                                <td className="px-4 py-3 text-zinc-500">Xin chào</td>
                                <td className="px-4 py-3 text-zinc-500">Xin chào</td>
                                <td className="px-4 py-3 text-zinc-500">Xin chào</td>
                                <td className="px-4 py-3 text-zinc-500">Xin chào</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="ml-auto w-fit">
                <PaginationNav totalPages={20} basePath="/admin" />
            </div>
        </>
    );
};

export default HistoryActivities;
