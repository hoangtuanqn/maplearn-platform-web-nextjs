"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Clock, Users, Target, Lock } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { toast } from "sonner";
import examApi, { EXAM_PER_PAGE } from "~/apiRequest/admin/exam";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import { DangerConfirm } from "~/components/DangerConfirm";
import { Button } from "~/components/ui/button";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { formatter } from "~/libs/format";
import { buildLaravelFilterQuery, highlightKeyword } from "~/libs/helper";
import { getStatusBadge } from "~/libs/statusBadge";
import { examCategories } from "~/mockdata/exam/examCategories.data";
import { gradeLevelsMock } from "~/mockdata/gradeLevels";
import { subjectsMock } from "~/mockdata/subject.data";
import DisplayTotalResult from "../../_components/DisplayTotalResult";
import { notificationErrorApi } from "~/libs/apis/http";

const allowedFields = [
    "search",
    "page",
    "categories",
    "difficulty",
    "provinces",
    "difficulties",
    "subject",
    "grade_level",
    "exam_category",
    "sort",
] as const;

const ExamList = () => {
    const queryClient = useQueryClient();
    const { page, search, provinces, categories, difficulties, subject, difficulty, grade_level, exam_category, sort } =
        useGetSearchQuery(allowedFields);

    const { data: exams, isLoading } = useQuery({
        queryKey: [
            "exam",
            "list",
            {
                page,
                search,
                provinces,
                categories,
                difficulties,
                subject,
                difficulty,
                grade_level,
                exam_category,
                sort,
            },
        ],
        queryFn: async () => {
            const res = await examApi.getExams(
                +page,
                EXAM_PER_PAGE,
                search,
                sort,
                buildLaravelFilterQuery({
                    provinces,
                    categories,
                    difficulties,
                    subject,
                    difficulty,
                    grade_level,
                    exam_category,
                }),
            );
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    const total = exams?.total ?? 0;
    const totalPages = Math.ceil(total / EXAM_PER_PAGE);

    const getDifficultyBadge = (difficulty: string) => {
        const configs = {
            easy: { label: "Dễ", className: "bg-green-100 text-green-800" },
            medium: { label: "Trung bình", className: "bg-yellow-100 text-yellow-800" },
            hard: { label: "Khó", className: "bg-red-100 text-red-800" },
        };
        const config = configs[difficulty as keyof typeof configs] || configs.medium;
        return (
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${config.className}`}>
                {config.label}
            </span>
        );
    };

    const getExamTypeBadge = (examType: string) => {
        const configs = {
            HSA: { label: "HSA", className: "bg-blue-100 text-blue-800" },
            "V-ACT": { label: "V-ACT", className: "bg-purple-100 text-purple-800" },
            TSA: { label: "TSA", className: "bg-orange-100 text-orange-800" },
            THPT: { label: "THPT", className: "bg-green-100 text-green-800" },
            OTHER: { label: "Khác", className: "bg-gray-100 text-gray-800" },
        };
        const config = configs[examType as keyof typeof configs] || configs.OTHER;
        return (
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${config.className}`}>
                {config.label}
            </span>
        );
    };

    const mutationDeleteExam = useMutation({
        mutationFn: (slug: string) => examApi.deletePaperExam(slug),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["exam", "list", { page, search, provinces, categories, difficulties, subject, difficulty }],
            });
            toast.success("Xóa đề thi thành công!");
        },
        onError: notificationErrorApi,
    });
    return (
        <>
            <div className="mt-8">
                <DisplayTotalResult total={total} />

                {/* Desktop Table View */}
                <div className="hidden overflow-x-auto lg:block">
                    <table className="min-w-full rounded-xl bg-white shadow-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Thông tin đề thi
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Thời gian</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Điểm số</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Thống kê</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Trạng thái</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {isLoading
                                ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={8} />)
                                : exams?.data.map((exam, idx) => (
                                      <tr
                                          key={exam.id}
                                          className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                      >
                                          <td className="px-4 py-3 text-zinc-500">
                                              {Math.max(0, +page - 1) * EXAM_PER_PAGE + idx + 1}
                                          </td>

                                          <td className="px-4 py-3 align-top break-all text-zinc-500">
                                              <div className="space-y-1">
                                                  <p
                                                      className="text-base font-semibold text-gray-900"
                                                      dangerouslySetInnerHTML={{
                                                          __html: highlightKeyword(exam.title, search),
                                                      }}
                                                  ></p>
                                                  <div className="mt-1 flex flex-wrap items-center gap-2">
                                                      {getDifficultyBadge(exam.difficulty)}
                                                      {getExamTypeBadge(exam.exam_type)}
                                                  </div>
                                                  <div className="mt-2 flex flex-wrap gap-4">
                                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                                          <span className="font-medium">Lớp:</span>
                                                          <span>
                                                              {gradeLevelsMock.find((g) => g.slug === exam.grade_level)
                                                                  ?.name || exam.grade_level}
                                                          </span>
                                                      </div>
                                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                                          <span className="font-medium">Tỉnh ra đề:</span>
                                                          <span>{exam.province}</span>
                                                      </div>
                                                  </div>
                                                  <div className="mt-1 flex flex-wrap gap-4">
                                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                                          <span className="font-medium">Môn học:</span>
                                                          <span>
                                                              {subjectsMock.find((s) => s.slug === exam.subject)
                                                                  ?.name || exam.subject}
                                                          </span>
                                                      </div>
                                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                                          <span className="font-medium">Danh mục:</span>
                                                          <span>
                                                              {examCategories.find((c) => c.slug === exam.exam_category)
                                                                  ?.name || exam.exam_category}
                                                          </span>
                                                      </div>
                                                  </div>
                                                  {exam.is_password_protected && (
                                                      <span className="inline-flex items-center gap-1 rounded border border-yellow-300 bg-gradient-to-r from-yellow-200 to-yellow-400 px-2 py-0.5 text-xs font-semibold text-yellow-900 shadow-sm">
                                                          <Lock />
                                                          Có mật khẩu
                                                      </span>
                                                  )}
                                              </div>
                                          </td>

                                          <td className="px-4 py-3 text-zinc-500">
                                              <div className="space-y-1">
                                                  <div className="flex items-center gap-1">
                                                      <Clock className="h-3 w-3 text-gray-400" />
                                                      <span className="font-medium">{exam.duration_minutes} phút</span>
                                                  </div>
                                                  <p className="text-xs text-gray-500">
                                                      Bắt đầu: {formatter.date(exam.start_time, true)}
                                                  </p>
                                                  {exam.end_time && (
                                                      <p className="text-xs text-gray-500">
                                                          Kết thúc: {formatter.date(exam.end_time, true)}
                                                      </p>
                                                  )}
                                              </div>
                                          </td>

                                          <td className="px-4 py-3 text-zinc-500">
                                              <div className="space-y-1">
                                                  <div className="flex items-center gap-1">
                                                      <Target className="h-3 w-3 text-green-500" />
                                                      <span className="font-medium">Tối đa: {exam.max_score}</span>
                                                  </div>
                                                  <p className="text-xs text-gray-500">Điểm đậu: {exam.pass_score}</p>
                                                  {exam.max_attempts && (
                                                      <p className="text-xs text-gray-500">
                                                          Số lần thi: {exam.max_attempts}
                                                      </p>
                                                  )}
                                              </div>
                                          </td>

                                          <td className="px-4 py-3 text-zinc-500">
                                              <div className="space-y-1">
                                                  <div className="flex items-center gap-1">
                                                      <Users className="h-3 w-3 text-blue-500" />
                                                      <span className="font-medium">{exam.registered_count}</span>
                                                  </div>
                                                  <p className="text-xs text-gray-500">
                                                      {exam.registered_count === 0
                                                          ? "Chưa có thí sinh"
                                                          : "thí sinh làm bài"}
                                                  </p>
                                                  {exam.anti_cheat_enabled && (
                                                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                                          Chống gian lận
                                                      </span>
                                                  )}
                                              </div>
                                          </td>

                                          <td className="px-4 py-3">
                                              {getStatusBadge("public_private", exam.status ? "1" : "0")}
                                          </td>

                                          <td className="px-4 py-3">
                                              <div className="flex items-center justify-end gap-2">
                                                  <Link href={`/admin/exams/${exam.slug}`}>
                                                      <Button variant="outlineBlack">Chi tiết</Button>
                                                  </Link>
                                                  <Link href={`/admin/exams/${exam.slug}/histories`} target="_blank">
                                                      <Button variant="outlineBlack">Lịch sử làm bài thi</Button>
                                                  </Link>

                                                  <DangerConfirm
                                                      message="Bạn có chắc chắn muốn xóa đề thi này?."
                                                      action={() => {
                                                          mutationDeleteExam.mutate(exam.slug);
                                                      }}
                                                  >
                                                      <Button variant="ghost" size="sm" className="hover:bg-red-50">
                                                          <Trash2 className="h-4 w-4 text-red-500" />
                                                      </Button>
                                                  </DangerConfirm>
                                              </div>
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="space-y-4 lg:hidden">
                    {isLoading
                        ? [...Array(5)].map((_, index) => (
                              <div key={index} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                                  <TableSkeleton col={1} />
                              </div>
                          ))
                        : exams?.data.map((exam, idx) => (
                              <div
                                  key={exam.id}
                                  className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                              >
                                  {/* Header với STT và Title */}
                                  <div className="mb-3">
                                      <div className="mb-2 flex items-start justify-between">
                                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">
                                              {Math.max(0, +page - 1) * EXAM_PER_PAGE + idx + 1}
                                          </span>
                                          {getStatusBadge("public_private", exam.status ? "1" : "0")}
                                      </div>
                                      <h3
                                          className="mb-2 text-sm font-semibold text-gray-900"
                                          dangerouslySetInnerHTML={{
                                              __html: highlightKeyword(exam.title, search),
                                          }}
                                      ></h3>
                                      <div className="mb-3 flex flex-wrap items-center gap-2">
                                          {getDifficultyBadge(exam.difficulty)}
                                          {getExamTypeBadge(exam.exam_type)}
                                          {exam.is_password_protected && (
                                              <span className="inline-flex items-center gap-1 rounded border border-yellow-300 bg-gradient-to-r from-yellow-200 to-yellow-400 px-2 py-0.5 text-xs font-semibold text-yellow-900">
                                                  <Lock className="h-3 w-3" />
                                                  Mật khẩu
                                              </span>
                                          )}
                                          {exam.anti_cheat_enabled && (
                                              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                                  Chống gian lận
                                              </span>
                                          )}
                                      </div>
                                  </div>

                                  {/* Grid Info */}
                                  <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                      <div className="space-y-1">
                                          <div className="flex items-center gap-1 text-gray-500">
                                              <span className="font-medium">Lớp:</span>
                                              <span>
                                                  {gradeLevelsMock.find((g) => g.slug === exam.grade_level)?.name ||
                                                      exam.grade_level}
                                              </span>
                                          </div>
                                          <div className="flex items-center gap-1 text-gray-500">
                                              <span className="font-medium">Môn:</span>
                                              <span className="truncate">
                                                  {subjectsMock.find((s) => s.slug === exam.subject)?.name ||
                                                      exam.subject}
                                              </span>
                                          </div>
                                          <div className="flex items-center gap-1 text-gray-500">
                                              <span className="font-medium">Danh mục:</span>
                                              <span className="truncate">
                                                  {examCategories.find((c) => c.slug === exam.exam_category)?.name ||
                                                      exam.exam_category}
                                              </span>
                                          </div>
                                      </div>
                                      <div className="space-y-1">
                                          <div className="flex items-center gap-1 text-gray-500">
                                              <span className="font-medium">Tỉnh:</span>
                                              <span className="truncate">{exam.province}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                              <Clock className="h-3 w-3 text-gray-400" />
                                              <span className="font-medium text-gray-700">
                                                  {exam.duration_minutes} phút
                                              </span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                              <Users className="h-3 w-3 text-blue-500" />
                                              <span className="font-medium text-gray-700">{exam.registered_count}</span>
                                              <span className="text-xs text-gray-500">học sinh</span>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Time and Score Info */}
                                  <div className="mb-4 rounded-lg bg-gray-50 p-3">
                                      <div className="grid grid-cols-1 gap-2 text-xs">
                                          <div className="flex justify-between">
                                              <span className="text-gray-500">Bắt đầu:</span>
                                              <span className="font-medium">
                                                  {formatter.date(exam.start_time, true)}
                                              </span>
                                          </div>
                                          {exam.end_time && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Kết thúc:</span>
                                                  <span className="font-medium">
                                                      {formatter.date(exam.end_time, true)}
                                                  </span>
                                              </div>
                                          )}
                                          <div className="flex justify-between">
                                              <span className="text-gray-500">Điểm tối đa:</span>
                                              <span className="font-medium text-green-600">{exam.max_score}</span>
                                          </div>
                                          <div className="flex justify-between">
                                              <span className="text-gray-500">Điểm đậu:</span>
                                              <span className="font-medium">{exam.pass_score}</span>
                                          </div>
                                          {exam.max_attempts && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Số lần thi:</span>
                                                  <span className="font-medium">{exam.max_attempts}</span>
                                              </div>
                                          )}
                                      </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex flex-col gap-2">
                                      <div className="grid grid-cols-2 gap-2">
                                          <Link href={`/admin/exams/${exam.slug}`} className="w-full">
                                              <Button variant="outlineBlack" className="w-full text-xs">
                                                  Chi tiết
                                              </Button>
                                          </Link>
                                          <Link href={`/admin/exams/${exam.slug}`} className="w-full">
                                              <Button variant="outlineBlack" className="w-full text-xs">
                                                  Lịch sử
                                              </Button>
                                          </Link>
                                      </div>
                                      <DangerConfirm
                                          message="Bạn có chắc chắn muốn xóa đề thi này?"
                                          action={() => {
                                              mutationDeleteExam.mutate(exam.slug);
                                          }}
                                      >
                                          <Button
                                              variant="outline"
                                              className="w-full border-red-200 text-xs text-red-600 hover:bg-red-50"
                                          >
                                              <Trash2 className="mr-1 h-3 w-3" />
                                              Xóa đề thi
                                          </Button>
                                      </DangerConfirm>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>

            <div className="mt-6 ml-auto w-fit">
                <Suspense>
                    <PaginationNav totalPages={totalPages} basePath="/admin/exams" />
                </Suspense>
            </div>
        </>
    );
};

export default ExamList;
