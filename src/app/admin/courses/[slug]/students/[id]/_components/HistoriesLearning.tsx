"use client";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import courseAdminApi from "~/apiRequest/admin/course";
import { COURSE_PER_PAGE } from "~/apiRequest/course";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import DisplayTotalResult from "~/app/admin/_components/DisplayTotalResult";
import { Badge } from "~/components/ui/badge";

const HistoriesLearning = ({ slug, id }: { slug: string; id: string }) => {
    const { data: histories } = useQuery({
        queryKey: ["histories-learning", slug, id],
        queryFn: async () => {
            const res = await courseAdminApi.getHistoriesLearning(slug, id);
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    const total = histories?.total || 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);

    return (
        <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:mb-8 md:p-6">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 md:mb-4 md:text-base">Lịch sử bài giảng đã học</h2>

            <div className="mt-6 md:mt-8">
                <DisplayTotalResult total={total} />

                {/* Desktop Table View */}
                <div className="hidden overflow-x-auto lg:block">
                    <table className="min-w-full rounded-xl bg-white shadow-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Tên bài giảng
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Ngày học</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Tiến độ (%)</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Hoàn thành</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {(!histories?.data || histories.data.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="py-6">
                                        <DisplayNoData title="Chưa có dữ liệu học bài của người dùng" />
                                    </td>
                                </tr>
                            )}
                            {histories?.data?.map((his, idx) => (
                                <tr
                                    key={his.id}
                                    className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                >
                                    <td className="px-4 py-3 text-zinc-500">{idx + 1}</td>
                                    <td className="px-4 py-3 text-zinc-500">{his.lesson.title}</td>
                                    <td className="px-4 py-3 text-zinc-500">
                                        {new Date(his.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-500">
                                        {his.is_completed ? 100 : Math.ceil((his.progress / his.lesson.duration) * 100)}
                                        %
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant={his.is_completed ? "success" : "warning"}>
                                            {his.is_completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="space-y-3 lg:hidden">
                    {!histories?.data || histories.data.length === 0 ? (
                        <div className="py-8">
                            <DisplayNoData title="Chưa có dữ liệu học bài của người dùng" />
                        </div>
                    ) : (
                        histories.data.map((his, idx) => (
                            <div
                                key={his.id}
                                className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                            >
                                {/* Header với STT và Status */}
                                <div className="mb-3 flex items-start justify-between">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">
                                        {idx + 1}
                                    </span>
                                    <Badge variant={his.is_completed ? "success" : "warning"}>
                                        {his.is_completed ? "Hoàn thành" : "Chưa xong"}
                                    </Badge>
                                </div>

                                {/* Lesson Title */}
                                <h3 className="mb-3 line-clamp-2 text-sm font-medium text-gray-900">
                                    {his.lesson.title}
                                </h3>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <span className="text-gray-500">Ngày học:</span>
                                        <p className="mt-1 font-medium text-gray-900">
                                            {new Date(his.created_at).toLocaleDateString("vi-VN")}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(his.created_at).toLocaleTimeString("vi-VN")}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Tiến độ:</span>
                                        <div className="mt-1">
                                            <div className="mb-1 flex items-center justify-between">
                                                <span className="text-sm font-bold text-blue-600">
                                                    {his.is_completed
                                                        ? 100
                                                        : Math.ceil((his.progress / his.lesson.duration) * 100)}
                                                    %
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-gray-200">
                                                <div
                                                    className={`h-2 rounded-full ${his.is_completed ? "bg-green-500" : "bg-blue-500"}`}
                                                    style={{
                                                        width: `${his.is_completed ? 100 : Math.ceil((his.progress / his.lesson.duration) * 100)}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {totalPages > 1 && (
                <div className="mt-4 flex w-full md:mt-6">
                    <div className="ml-auto">
                        <Suspense>
                            <PaginationNav totalPages={totalPages} basePath={`/admin/courses/${slug}`} />
                        </Suspense>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoriesLearning;
