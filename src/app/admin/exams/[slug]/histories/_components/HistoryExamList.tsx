"use client";
import { useQuery } from "@tanstack/react-query";
import { Clock, User, AlertCircle } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import examApi, { EXAM_PER_PAGE } from "~/apiRequest/admin/exam";
import { difficulties } from "~/apiRequest/exam";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import DisplayTotalResult from "~/app/admin/_components/DisplayTotalResult";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { formatter } from "~/libs/format";
import { buildLaravelFilterQuery } from "~/libs/helper";
import { gradeLevelsMock } from "~/mockdata/gradeLevels";
import { subjectsMock } from "~/mockdata/subject.data";
const HistoryExamList = ({ slug }: { slug: string }) => {
    const { page, search, min_score, max_score, status, violation_count, time_spent, full_name, sort } =
        useGetSearchQuery([
            "page",
            "search",
            "min_score",
            "max_score",
            "status",
            "violation_count",
            "time_spent",
            "full_name",
            "sort",
        ] as const);

    // Gọi API để lấy lịch sử làm bài thi
    const { data: examAttempts, isLoading } = useQuery({
        queryKey: [
            "admin",
            "exam-attempts",
            { slug, page, search, min_score, max_score, status, violation_count, time_spent, full_name, sort },
        ],
        queryFn: async () => {
            const res = await examApi.getExamAttempts(
                slug,
                +page,
                EXAM_PER_PAGE,
                search,
                sort,
                buildLaravelFilterQuery({
                    min_score,
                    max_score,
                    status,
                    violation_count,
                    time_spent,
                    full_name,
                }),
            );
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    const total = examAttempts?.total ?? 0;
    const totalPages = Math.ceil(total / EXAM_PER_PAGE);

    // Hàm để lấy badge màu cho trạng thái
    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "failed":
                return "bg-red-100 text-red-800";
            case "in_progress":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            <div className="mt-6 md:mt-8">
                <DisplayTotalResult total={total} />

                {/* Desktop Table View */}
                <div className="hidden overflow-x-auto xl:block">
                    <table className="min-w-full rounded-xl bg-white shadow-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Thông tin học sinh
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Điểm số</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Thời gian</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Vi phạm</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Trạng thái</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {isLoading
                                ? [...Array(EXAM_PER_PAGE)].map((_, index) => <TableSkeleton key={index} col={7} />)
                                : examAttempts?.data.map((attempt, idx) => (
                                      <tr
                                          key={attempt.id}
                                          className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                      >
                                          {/* STT */}
                                          <td className="px-4 py-3 text-zinc-500">
                                              {Math.max(0, +page - 1) * EXAM_PER_PAGE + idx + 1}
                                          </td>

                                          {/* Thông tin học sinh */}
                                          <td className="px-4 py-3 text-zinc-500">
                                              <Link href={`/admin/students/${attempt.user.id}`}>
                                                  <div className="flex cursor-pointer items-center space-x-3 rounded p-1 transition hover:bg-blue-50">
                                                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                          <User className="h-5 w-5 text-blue-600" />
                                                      </div>
                                                      <div>
                                                          <p className="text-sm font-semibold text-gray-900">
                                                              {attempt.user.full_name}
                                                          </p>
                                                          <p className="text-xs text-gray-500">
                                                              @{attempt.user.username}
                                                          </p>
                                                          <p className="text-xs text-gray-500">ID: {attempt.user.id}</p>
                                                      </div>
                                                  </div>
                                              </Link>
                                          </td>

                                          {/* Điểm số */}
                                          <td className="px-4 py-3 text-zinc-500">
                                              <div
                                                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                                                      attempt.score >= Number(attempt.paper.pass_score)
                                                          ? "bg-green-100 text-green-800"
                                                          : "bg-red-100 text-red-800"
                                                  }`}
                                              >
                                                  {attempt.score}
                                              </div>
                                          </td>

                                          {/* Thời gian */}
                                          <td className="px-4 py-3 text-zinc-500">
                                              <div className="space-y-1">
                                                  <div className="flex items-center space-x-1">
                                                      <Clock className="h-3 w-3 text-gray-400" />
                                                      <span className="text-xs">
                                                          Đã làm: {formatter.duration(attempt.time_spent)}
                                                      </span>
                                                  </div>
                                                  <p className="text-xs text-gray-500">
                                                      Bắt đầu: {formatter.date(attempt.started_at, true)}
                                                  </p>
                                                  <p className="text-xs text-gray-500">
                                                      Nộp bài: {formatter.date(attempt.submitted_at, true)}
                                                  </p>
                                              </div>
                                          </td>

                                          {/* Vi phạm */}
                                          <td className="px-4 py-3 text-zinc-500">
                                              <span
                                                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                                      attempt.violation_count === 0
                                                          ? "bg-green-100 text-green-800"
                                                          : attempt.violation_count <= 2
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-red-100 text-red-800"
                                                  }`}
                                              >
                                                  {attempt.violation_count}
                                              </span>
                                          </td>

                                          {/* Trạng thái */}
                                          <td className="px-4 py-3">
                                              <div className="flex items-center space-x-2">
                                                  <span
                                                      className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${getStatusBadge(attempt.status)}`}
                                                  >
                                                      {attempt.status === "completed"
                                                          ? "Hoàn thành"
                                                          : attempt.status === "failed"
                                                            ? "Thất bại"
                                                            : attempt.status === "in_progress"
                                                              ? "Đang làm"
                                                              : attempt.status === "submitted"
                                                                ? "Đã nộp"
                                                                : attempt.status === "detected"
                                                                  ? "Phát hiện vi phạm"
                                                                  : attempt.status === "canceled"
                                                                    ? "Đã hủy"
                                                                    : attempt.status}
                                                  </span>
                                              </div>
                                          </td>

                                          {/* Thao tác */}
                                          <td className="px-4 py-3">
                                              <div className="flex items-center justify-end gap-2">
                                                  {attempt.status !== "in_progress" && (
                                                      <Link
                                                          href={`/exams/${attempt.paper.slug}/results/${attempt.id}`}
                                                          target="_blank"
                                                      >
                                                          <Button variant="outlineBlack" size="sm">
                                                              Chi tiết
                                                          </Button>
                                                      </Link>
                                                  )}
                                                  {attempt.note && (
                                                      <Button
                                                          className="view_tooltip hover:bg-blue-50"
                                                          data-tooltip-content={attempt.note}
                                                          variant="ghost"
                                                          size="sm"
                                                      >
                                                          <AlertCircle className="h-4 w-4 text-blue-500" />
                                                      </Button>
                                                  )}
                                              </div>
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="space-y-4 xl:hidden">
                    {isLoading
                        ? [...Array(EXAM_PER_PAGE)].map((_, index) => (
                              <div key={index} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                                  <div className="animate-pulse space-y-4">
                                      <div className="flex items-start justify-between">
                                          <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                                          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                                      </div>
                                      <div className="space-y-2">
                                          <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                                          <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                                          <div className="h-3 w-3/4 rounded bg-gray-200"></div>
                                      </div>
                                  </div>
                              </div>
                          ))
                        : examAttempts?.data.map((attempt, idx) => (
                              <div
                                  key={attempt.id}
                                  className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                              >
                                  {/* Header với STT, Score và Status */}
                                  <div className="mb-4 flex items-start justify-between">
                                      <div className="flex items-center gap-3">
                                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">
                                              {Math.max(0, +page - 1) * EXAM_PER_PAGE + idx + 1}
                                          </span>

                                          <Badge
                                              variant={
                                                  attempt.score >= Number(attempt.paper.pass_score)
                                                      ? "success"
                                                      : "danger"
                                              }
                                          >
                                              Điểm: {attempt.score}
                                          </Badge>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          <span
                                              className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                                                  attempt.violation_count === 0
                                                      ? "bg-green-100 text-green-800"
                                                      : attempt.violation_count <= 2
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-red-100 text-red-800"
                                              }`}
                                          >
                                              {attempt.violation_count}
                                          </span>
                                          <span
                                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusBadge(attempt.status)}`}
                                          >
                                              {attempt.status === "completed"
                                                  ? "Hoàn thành"
                                                  : attempt.status === "failed"
                                                    ? "Thất bại"
                                                    : attempt.status === "in_progress"
                                                      ? "Đang làm"
                                                      : attempt.status === "submitted"
                                                        ? "Đã nộp"
                                                        : attempt.status === "detected"
                                                          ? "Phát hiện vi phạm"
                                                          : attempt.status === "canceled"
                                                            ? "Đã hủy"
                                                            : attempt.status}
                                          </span>
                                      </div>
                                  </div>

                                  {/* Student Info */}
                                  <Link href={`/admin/students/${attempt.user.id}`}>
                                      <div className="mb-4 flex items-center space-x-3 rounded-lg p-2 transition hover:bg-blue-50">
                                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                              <User className="h-5 w-5 text-blue-600" />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                              <p className="truncate text-sm font-semibold text-gray-900">
                                                  {attempt.user.full_name}
                                              </p>
                                              <p className="text-xs text-gray-500">
                                                  @{attempt.user.username} • ID: {attempt.user.id}
                                              </p>
                                          </div>
                                      </div>
                                  </Link>

                                  {/* Exam Info */}
                                  <div className="mb-4">
                                      <Link
                                          href={`/admin/exams/${attempt.paper.slug}`}
                                          className="mb-2 line-clamp-2 block text-sm font-medium text-blue-600 hover:text-blue-800"
                                      >
                                          {attempt.paper.title}
                                      </Link>

                                      {/* Exam Details Grid */}
                                      <div className="grid grid-cols-2 gap-2 text-xs">
                                          <div className="space-y-1">
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Môn học:</span>
                                                  <span className="ml-1 truncate font-medium text-gray-900">
                                                      {subjectsMock.find((sub) => sub.slug === attempt.paper.subject)
                                                          ?.name || attempt.paper.subject}
                                                  </span>
                                              </div>
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Lớp:</span>
                                                  <span className="font-medium text-gray-900">
                                                      {gradeLevelsMock.find(
                                                          (grade) => grade.slug === attempt.paper.grade_level,
                                                      )?.name || attempt.paper.grade_level}
                                                  </span>
                                              </div>
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Thời gian:</span>
                                                  <span className="font-medium text-gray-900">
                                                      {attempt.paper.duration_minutes}p
                                                  </span>
                                              </div>
                                          </div>
                                          <div className="space-y-1">
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Loại:</span>
                                                  <span className="ml-1 truncate font-medium text-gray-900">
                                                      {difficulties.find(
                                                          (diff) => diff.slug === attempt.paper.exam_type,
                                                      )?.name || attempt.paper.exam_type}
                                                  </span>
                                              </div>
                                              <div className="flex items-center justify-between">
                                                  <span className="text-gray-500">Độ khó:</span>
                                                  <span
                                                      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium ${
                                                          attempt.paper.difficulty === "very_hard"
                                                              ? "bg-red-100 text-red-800"
                                                              : attempt.paper.difficulty === "hard"
                                                                ? "bg-orange-100 text-orange-800"
                                                                : attempt.paper.difficulty === "normal"
                                                                  ? "bg-yellow-100 text-yellow-800"
                                                                  : attempt.paper.difficulty === "easy"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-gray-100 text-gray-800"
                                                      }`}
                                                  >
                                                      {difficulties.find(
                                                          (diff) => diff.slug === attempt.paper.difficulty,
                                                      )?.name || attempt.paper.difficulty}
                                                  </span>
                                              </div>
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Điểm tối đa:</span>
                                                  <span className="font-medium text-gray-900">
                                                      {attempt.paper.max_score}
                                                  </span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Time Info */}
                                  <div className="mb-4 rounded-lg bg-gray-50 p-2">
                                      <div className="mb-2 flex items-center gap-1">
                                          <Clock className="h-3 w-3 text-gray-400" />
                                          <span className="text-xs font-medium text-gray-700">
                                              Đã làm: {formatter.duration(attempt.time_spent)}
                                          </span>
                                      </div>
                                      <div className="space-y-1 text-xs text-gray-500">
                                          <div className="flex justify-between">
                                              <span>Bắt đầu:</span>
                                              <span>
                                                  {new Date(attempt.started_at).toLocaleDateString("vi-VN")} •{" "}
                                                  {new Date(attempt.started_at).toLocaleTimeString("vi-VN")}
                                              </span>
                                          </div>
                                          <div className="flex justify-between">
                                              <span>Nộp bài:</span>
                                              <span>
                                                  {new Date(attempt.submitted_at).toLocaleDateString("vi-VN")} •{" "}
                                                  {new Date(attempt.submitted_at).toLocaleTimeString("vi-VN")}
                                              </span>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                          <span className="text-xs text-gray-500">Vi phạm:</span>
                                          <span
                                              className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                                                  attempt.violation_count === 0
                                                      ? "bg-green-100 text-green-800"
                                                      : attempt.violation_count <= 2
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-red-100 text-red-800"
                                              }`}
                                          >
                                              {attempt.violation_count}
                                          </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          {attempt.status !== "in_progress" && (
                                              <Link
                                                  href={`/exams/${attempt.paper.slug}/results/${attempt.id}`}
                                                  target="_blank"
                                              >
                                                  <Button variant="outlineBlack" size="sm">
                                                      Chi tiết
                                                  </Button>
                                              </Link>
                                          )}
                                          {attempt.note && (
                                              <Button
                                                  className="view_tooltip hover:bg-blue-50"
                                                  data-tooltip-content={attempt.note}
                                                  variant="ghost"
                                                  size="sm"
                                              >
                                                  <AlertCircle className="h-4 w-4 text-blue-500" />
                                              </Button>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>
            <div className="mt-4 ml-auto w-fit md:mt-6">
                <Suspense>
                    <PaginationNav totalPages={totalPages} basePath={`/admin/exams/${slug}/histories`} />
                </Suspense>
            </div>
        </>
    );
};

export default HistoryExamList;
