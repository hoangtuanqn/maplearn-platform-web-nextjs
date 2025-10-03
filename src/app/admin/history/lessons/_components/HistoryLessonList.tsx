"use client";
import { useQuery } from "@tanstack/react-query";
import { Clock, User, BookOpen, PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { Suspense } from "react";
import courseAdminApi from "~/apiRequest/admin/course";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import DisplayTotalResult from "~/app/admin/_components/DisplayTotalResult";
import { Badge } from "~/components/ui/badge";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { formatter } from "~/libs/format";

const LESSON_PER_PAGE = 20;

const allowedFields = [
    "page",
    "search",
    "user_id",
    "lesson_id",
    "progress_min",
    "progress_max",
    "is_completed",
    "sort",
] as const;

const HistoryLessonList = () => {
    const { page, search, user_id, lesson_id, progress_min, progress_max, is_completed, sort } =
        useGetSearchQuery(allowedFields);

    // Gọi API để lấy lịch sử học bài
    const { data: lessonHistories, isLoading } = useQuery({
        queryKey: [
            "admin",
            "lesson-histories",
            { page, search, user_id, lesson_id, progress_min, progress_max, is_completed, sort },
        ],
        queryFn: async () => {
            const res = await courseAdminApi.getLessonHistories();
            return res.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    const total = lessonHistories?.data?.total ?? 0;
    const totalPages = Math.ceil(total / LESSON_PER_PAGE);

    return (
        <>
            <div className="mt-6 md:mt-8">
                <DisplayTotalResult total={total} />

                {/* Desktop Table View */}
                <div className="hidden overflow-x-auto lg:block">
                    <table className="min-w-full rounded-xl bg-white shadow-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Thông tin học sinh
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Thông tin bài học
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Tiến độ</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Thời gian</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {isLoading
                                ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={7} />)
                                : lessonHistories?.data?.data.map((history, idx) => (
                                      <tr
                                          key={history.id}
                                          className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                      >
                                          {/* STT */}
                                          <td className="px-4 py-3 text-zinc-500">
                                              {Math.max(0, +page - 1) * LESSON_PER_PAGE + idx + 1}
                                          </td>

                                          {/* Thông tin học sinh */}
                                          <td className="px-4 py-3 text-zinc-500">
                                              <Link href={`/admin/students/${history.user.id}`}>
                                                  <div className="flex cursor-pointer items-center space-x-3 rounded p-1 transition hover:bg-blue-50">
                                                      {history.user.avatar ? (
                                                          <Image
                                                              src={history.user.avatar}
                                                              alt={history.user.full_name}
                                                              width={40}
                                                              height={40}
                                                              className="h-10 w-10 rounded-full object-cover"
                                                          />
                                                      ) : (
                                                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                              <User className="h-5 w-5 text-blue-600" />
                                                          </div>
                                                      )}
                                                      <div>
                                                          <p className="text-sm font-semibold text-gray-900">
                                                              {history.user.full_name}
                                                          </p>
                                                          <p className="text-xs text-gray-500">{history.user.email}</p>
                                                          <p className="text-xs text-gray-500">ID: {history.user.id}</p>
                                                      </div>
                                                  </div>
                                              </Link>
                                          </td>

                                          {/* Thông tin bài học */}
                                          <td className="px-4 py-3 text-zinc-500">
                                              <div className="flex items-start space-x-2">
                                                  <BookOpen className="mt-0.5 h-4 w-4 text-gray-400" />
                                                  <div className="space-y-1">
                                                      <Link
                                                          href={`/learn/${history.lesson.slug}`}
                                                          className="text-sm font-medium text-gray-900 hover:text-blue-600"
                                                      >
                                                          {history.lesson.title}
                                                      </Link>
                                                      <div className="space-y-0.5">
                                                          <p className="text-xs text-gray-500">
                                                              <span className="font-medium">Chapter:</span>{" "}
                                                              {history.lesson.chapter.title}
                                                          </p>
                                                          <p className="text-xs text-gray-500">
                                                              <span className="font-medium">Bài số:</span>{" "}
                                                              {history.lesson.position}
                                                              <span> trong chương</span>
                                                          </p>
                                                          <p className="text-xs text-gray-500">
                                                              <span className="font-medium">Thời lượng:</span>{" "}
                                                              {history.lesson.duration
                                                                  ? formatter.duration(history.lesson.duration)
                                                                  : "Chưa xác định"}
                                                          </p>
                                                      </div>
                                                  </div>
                                              </div>
                                          </td>

                                          {/* Tiến độ */}
                                          <td className="px-4 py-3 text-zinc-500">
                                              <div className="space-y-2">
                                                  <div className="flex items-center justify-between">
                                                      <span className="text-xs font-medium">
                                                          {history.is_completed
                                                              ? 100
                                                              : Math.round(history.progress / history.lesson.duration)}
                                                          %
                                                      </span>
                                                  </div>
                                              </div>
                                          </td>

                                          {/* Thời gian */}
                                          <td className="px-4 py-3 text-zinc-500">
                                              <div className="space-y-1">
                                                  <div className="flex items-center space-x-1">
                                                      <Clock className="h-3 w-3 text-gray-400" />
                                                      <span className="text-xs">
                                                          Bắt đầu học: {formatter.date(history.created_at, true)}
                                                      </span>
                                                  </div>
                                                  <p className="text-xs text-gray-500">
                                                      Cập nhật lần cuối: {formatter.date(history.updated_at, true)}
                                                  </p>
                                              </div>
                                          </td>

                                          {/* Trạng thái */}
                                          <td className="px-4 py-3">
                                              <Badge
                                                  variant={
                                                      history.is_completed === true || history.is_completed === 1
                                                          ? "success"
                                                          : "default"
                                                  }
                                              >
                                                  {history.is_completed === true || history.is_completed === 1
                                                      ? "Hoàn thành"
                                                      : "Chưa hoàn thành"}
                                              </Badge>
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="space-y-4 lg:hidden">
                    {isLoading
                        ? [...Array(10)].map((_, index) => (
                              <div key={index} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                                  <div className="animate-pulse space-y-4">
                                      <div className="flex items-start justify-between">
                                          <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                                          <div className="h-6 w-16 rounded bg-gray-200"></div>
                                      </div>
                                      <div className="space-y-2">
                                          <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                                          <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                                          <div className="h-2 w-full rounded bg-gray-200"></div>
                                      </div>
                                  </div>
                              </div>
                          ))
                        : lessonHistories?.data?.data.map((history, idx) => (
                              <div
                                  key={history.id}
                                  className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                              >
                                  {/* Header với STT và Progress */}
                                  <div className="mb-4 flex items-start justify-between">
                                      <div className="flex items-center gap-3">
                                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">
                                              {Math.max(0, +page - 1) * LESSON_PER_PAGE + idx + 1}
                                          </span>
                                          <div className="flex items-center gap-2">
                                              <span className="text-sm font-bold text-gray-900">
                                                  {history.is_completed
                                                      ? 100
                                                      : Math.round(history.progress / history.lesson.duration)}
                                                  %
                                              </span>
                                          </div>
                                      </div>
                                      <Badge variant={history.is_completed ? "success" : "default"}>
                                          {history.is_completed ? "Hoàn thành" : "Chưa hoàn thành"}
                                      </Badge>
                                  </div>

                                  {/* Student Info */}
                                  <Link href={`/admin/students/${history.user.id}`}>
                                      <div className="mb-4 flex items-center space-x-3 rounded-lg p-2 transition hover:bg-blue-50">
                                          {history.user.avatar ? (
                                              <Image
                                                  src={history.user.avatar}
                                                  alt={history.user.full_name}
                                                  width={40}
                                                  height={40}
                                                  className="h-10 w-10 rounded-full object-cover"
                                              />
                                          ) : (
                                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                  <User className="h-5 w-5 text-blue-600" />
                                              </div>
                                          )}
                                          <div className="min-w-0 flex-1">
                                              <p className="truncate text-sm font-semibold text-gray-900">
                                                  {history.user.full_name}
                                              </p>
                                              <p className="truncate text-xs text-gray-500">{history.user.email}</p>
                                              <p className="text-xs text-gray-500">ID: {history.user.id}</p>
                                          </div>
                                      </div>
                                  </Link>

                                  {/* Lesson Info */}
                                  <div className="mb-4">
                                      <Link
                                          href={`/learn/${history.lesson.slug}`}
                                          className="mb-2 line-clamp-2 block text-sm font-medium text-blue-600 hover:text-blue-800"
                                      >
                                          {history.lesson.title}
                                      </Link>

                                      {/* Lesson Details */}
                                      <div className="grid grid-cols-2 gap-2 text-xs">
                                          <div className="space-y-1">
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Chapter:</span>
                                                  <span className="ml-1 truncate font-medium text-gray-900">
                                                      {history.lesson.chapter.title}
                                                  </span>
                                              </div>
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Bài số:</span>
                                                  <span className="font-medium text-gray-900">
                                                      {history.lesson.position}
                                                  </span>
                                                  <span> trong chương</span>
                                              </div>
                                          </div>
                                      </div>

                                      {/* Duration */}
                                      {history.lesson.duration && (
                                          <div className="mt-2 flex items-center gap-1">
                                              <Clock className="h-3 w-3 text-gray-400" />
                                              <span className="text-xs text-gray-600">
                                                  Thời lượng: {formatter.duration(history.lesson.duration)}
                                              </span>
                                          </div>
                                      )}
                                  </div>

                                  {/* Progress Bar */}
                                  <div className="mb-4 rounded-lg bg-gray-50 p-3">
                                      <div className="flex items-center justify-between">
                                          <span className="text-xs font-medium text-gray-700">Tiến độ học tập</span>
                                          <span className="text-sm font-bold text-gray-900">
                                              {history.is_completed
                                                  ? 100
                                                  : Math.round(history.progress / history.lesson.duration)}
                                              %
                                          </span>
                                      </div>
                                  </div>

                                  {/* Time Info */}
                                  <div className="mb-4 text-xs text-gray-500">
                                      <div className="flex justify-between">
                                          <span>Bắt đầu:</span>
                                          <span>{formatter.date(history.created_at, true)}</span>
                                      </div>
                                      <div className="mt-1 flex justify-between">
                                          <span>Cập nhật:</span>
                                          <span>{formatter.date(history.updated_at, true)}</span>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>

            <div className="mt-4 ml-auto w-fit md:mt-6">
                <Suspense>
                    <PaginationNav totalPages={totalPages} basePath="/teacher/history/lessons" />
                </Suspense>
            </div>
        </>
    );
};

export default HistoryLessonList;
