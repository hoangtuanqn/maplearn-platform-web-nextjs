"use client";
import { useQuery } from "@tanstack/react-query";
import React, { memo } from "react";
import { Clock, FileText, AlertCircle, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatter } from "~/libs/format";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { buildLaravelFilterQuery } from "~/libs/helper";
import profileApi, { ATTEMPTS_PER_PAGE } from "~/apiRequest/profile";
import TableSkeleton from "../../_components/TableSkeleton";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
import { PaginationNav } from "~/app/(student)/_components/Pagination";

const AttemptExams = () => {
    const { page, sort, status, date } = useGetSearchQuery(["page", "sort", "status", "date"] as const);
    const { data, isLoading } = useQuery({
        queryKey: ["user", "attempts-exams", { page, sort, status, date }],
        queryFn: async () => {
            const res = await profileApi.getAttemptExams(
                +page || 1,
                ATTEMPTS_PER_PAGE,
                "",
                sort,
                buildLaravelFilterQuery({ status, date }),
            );
            return res.data.data;
        },
    });

    const totalPages = Math.ceil((data?.total ?? 0) / ATTEMPTS_PER_PAGE);
    const router = useRouter();

    // Hàm để lấy badge màu cho trạng thái
    const getExamStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "submitted":
                return "bg-green-100 text-green-800";
            case "in_progress":
                return "bg-yellow-100 text-yellow-800";
            case "detected":
                return "bg-red-100 text-red-800";
            case "canceled":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusText = (status: string) => {
        switch (status.toLowerCase()) {
            case "submitted":
                return "Đã nộp bài";
            case "in_progress":
                return "Đang làm";
            case "detected":
                return "Phát hiện vi phạm";
            case "canceled":
                return "Đã hủy";
            default:
                return status;
        }
    };

    return (
        <div className="flex flex-col gap-4 px-2 font-medium sm:px-0">
            <div className="flex flex-col">
                {/* Desktop Table View */}
                <div className="-m-1.5 hidden overflow-x-auto lg:block">
                    <div className="inline-block min-w-full p-1.5 align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase sm:px-6"
                                        >
                                            Đề thi
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase sm:px-6"
                                        >
                                            Điểm số
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase sm:px-6"
                                        >
                                            Thời gian
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-end text-xs font-medium text-gray-500 uppercase sm:px-6"
                                        >
                                            Trạng thái
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading && (data?.data?.length ?? 0) === 0 && (
                                        <tr className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-gray-100">
                                            <td
                                                className="px-2 py-4 text-xs font-medium whitespace-nowrap text-gray-800 sm:px-6 sm:text-sm"
                                                colSpan={5}
                                            >
                                                <DisplayNoData title="Bạn chưa làm bài kiểm tra nào" />
                                            </td>
                                        </tr>
                                    )}

                                    {isLoading ? (
                                        [...Array(ATTEMPTS_PER_PAGE)].map((_, index) => (
                                            <TableSkeleton key={index} col={5} />
                                        ))
                                    ) : (
                                        <>
                                            {data?.data?.map((attempt) => (
                                                <tr
                                                    onClick={() => {
                                                        if (attempt.status !== "in_progress") {
                                                            router.push(
                                                                `/exams/${attempt.paper.slug}/results/${attempt.id}`,
                                                            );
                                                        }
                                                    }}
                                                    key={attempt.id}
                                                    className={`cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-gray-100 ${
                                                        attempt.status === "in_progress" ? "opacity-60" : ""
                                                    }`}
                                                >
                                                    <td className="px-2 py-4 text-xs font-medium whitespace-nowrap text-gray-800 sm:px-6 sm:text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="h-4 w-4 text-blue-500" />
                                                            <div>
                                                                <div className="font-semibold text-gray-900">
                                                                    {attempt.paper.title}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {attempt.paper.question_count} câu hỏi
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-2 py-4 text-xs whitespace-nowrap text-gray-800 sm:px-6 sm:text-sm">
                                                        <div className="flex items-center gap-1">
                                                            <Trophy className="h-3 w-3 text-yellow-500" />
                                                            <span className="text-primary font-semibold">
                                                                {attempt.score} điểm
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-2 py-4 text-xs whitespace-nowrap text-gray-800 sm:px-6 sm:text-sm">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="h-3 w-3 text-gray-400" />
                                                                <span>{formatter.duration(attempt.time_spent)}</span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-2 py-4 text-end text-xs font-medium whitespace-nowrap sm:px-6 sm:text-sm">
                                                        <span
                                                            className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${getExamStatusBadge(attempt.status)}`}
                                                        >
                                                            {getStatusText(attempt.status)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="space-y-3 lg:hidden">
                    {!isLoading && (data?.data?.length ?? 0) === 0 && (
                        <div className="py-8">
                            <DisplayNoData title="Bạn chưa làm bài kiểm tra nào" />
                        </div>
                    )}

                    {isLoading
                        ? [...Array(ATTEMPTS_PER_PAGE)].map((_, index) => (
                              <div key={index} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                                  <div className="animate-pulse space-y-3">
                                      <div className="flex items-start justify-between">
                                          <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                                          <div className="h-6 w-16 rounded bg-gray-200"></div>
                                      </div>
                                      <div className="space-y-2">
                                          <div className="h-3 w-1/3 rounded bg-gray-200"></div>
                                          <div className="h-3 w-1/4 rounded bg-gray-200"></div>
                                      </div>
                                  </div>
                              </div>
                          ))
                        : data?.data?.map((attempt) => (
                              <div
                                  key={attempt.id}
                                  onClick={() => {
                                      if (attempt.status !== "in_progress") {
                                          router.push(`/exams/${attempt.paper.slug}/results/${attempt.id}`);
                                      }
                                  }}
                                  className={`cursor-pointer rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
                                      attempt.status === "in_progress" ? "opacity-60" : ""
                                  }`}
                              >
                                  {/* Header với title và status */}
                                  <div className="mb-3 flex items-start justify-between">
                                      <div className="flex min-w-0 flex-1 items-center gap-2">
                                          <FileText className="h-4 w-4 flex-shrink-0 text-blue-500" />
                                          <div className="min-w-0 flex-1">
                                              <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                                                  {attempt.paper.title}
                                              </h3>
                                              <p className="mt-1 text-xs text-gray-500">
                                                  {attempt.paper.question_count} câu hỏi
                                              </p>
                                          </div>
                                      </div>
                                      <span
                                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getExamStatusBadge(attempt.status)}`}
                                      >
                                          {getStatusText(attempt.status)}
                                      </span>
                                  </div>

                                  {/* Score và Violation */}
                                  <div className="mb-3 grid grid-cols-2 gap-3">
                                      <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-2">
                                          <Trophy className="h-4 w-4 text-yellow-500" />
                                          <div>
                                              <div className="text-primary text-lg font-bold">{attempt.score}</div>
                                              <div className="text-xs text-gray-600">điểm</div>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Time Info */}
                                  <div className="space-y-2 text-xs text-gray-500">
                                      <div className="flex items-center justify-between">
                                          <span>Thời gian làm bài:</span>
                                          <span className="font-medium text-gray-900">
                                              {formatter.duration(attempt.time_spent)}
                                          </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                          <span>Bắt đầu:</span>
                                          <span>
                                              {new Date(attempt.started_at).toLocaleDateString("vi-VN")} •{" "}
                                              {new Date(attempt.started_at).toLocaleTimeString("vi-VN")}
                                          </span>
                                      </div>
                                      {attempt.submitted_at && (
                                          <div className="flex items-center justify-between">
                                              <span>Nộp bài:</span>
                                              <span>
                                                  {new Date(attempt.submitted_at).toLocaleDateString("vi-VN")} •{" "}
                                                  {new Date(attempt.submitted_at).toLocaleTimeString("vi-VN")}
                                              </span>
                                          </div>
                                      )}
                                  </div>

                                  {/* Note if available */}
                                  {attempt.note && (
                                      <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-2">
                                          <div className="flex items-start gap-2">
                                              <AlertCircle className="mt-0.5 h-3 w-3 text-yellow-600" />
                                              <span className="text-xs text-yellow-800">{attempt.note}</span>
                                          </div>
                                      </div>
                                  )}
                              </div>
                          ))}
                </div>
            </div>

            <div className="flex items-end justify-between lg:flex-col">
                <div className="ml-auto">
                    {!isLoading && totalPages > 1 && (data?.data?.length ?? 0) > 0 && (
                        <PaginationNav totalPages={totalPages} basePath="/profile/exam-histories" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(AttemptExams);
