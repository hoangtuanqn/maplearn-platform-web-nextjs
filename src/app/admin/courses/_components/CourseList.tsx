"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { toast } from "sonner";
import courseAdminApi from "~/apiRequest/admin/course";
import { COURSE_PER_PAGE } from "~/apiRequest/course";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import { DangerConfirm } from "~/components/DangerConfirm";
import { Button } from "~/components/ui/button";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { notificationErrorApi } from "~/libs/apis/http";
import { formatter } from "~/libs/format";
import { getStatusBadge } from "~/libs/statusBadge";
import { subjectsMock } from "~/mockdata/subject.data";
import DisplayTotalResult from "../../_components/DisplayTotalResult";
import { buildLaravelFilterQuery, highlightKeyword } from "~/libs/helper";
const CourseList = () => {
    const queryClient = useQueryClient();
    const { page, search, sort, rating, price_range, duration, teachers, is_active } = useGetSearchQuery([
        "page",
        "search",
        "sort",
        "rating",
        "price_range",
        "duration",
        "teachers",
        "is_active",
    ] as const);
    const { data: courses, isLoading } = useQuery({
        queryKey: ["admin", "courses", { page, search, sort, rating, price_range, duration, teachers, is_active }],
        queryFn: async () => {
            const res = await courseAdminApi.getCourses(
                +page,
                COURSE_PER_PAGE,
                search,
                sort,
                buildLaravelFilterQuery({ rating, price_range, duration, teachers, is_active }),
            );
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    const total = courses?.total ?? 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);

    const mutationDeleteCourse = useMutation({
        mutationFn: (courseSlug: string) => courseAdminApi.deleteCourse(courseSlug),
        onSuccess: () => {
            toast.success("Xóa khóa học thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
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
                                    Thông tin chung
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Giá tiền</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Số học sinh đã đăng ký
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Giáo viên</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Trạng thái</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {isLoading
                                ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={7} />)
                                : courses?.data.map((course, idx) => {
                                      return (
                                          <tr
                                              key={course.id}
                                              className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                          >
                                              <td className="px-4 py-3 text-zinc-500">
                                                  {Math.max(0, +page - 1) * COURSE_PER_PAGE + idx + 1}
                                              </td>
                                              <td className="px-4 py-3 text-zinc-500">
                                                  <p
                                                      className="text-base font-semibold text-gray-900"
                                                      dangerouslySetInnerHTML={{
                                                          __html: highlightKeyword(course.name, search),
                                                      }}
                                                  />
                                                  <p>
                                                      <span className="font-bold">Môn học:</span>{" "}
                                                      {subjectsMock.find((s) => s.slug === course.subject)?.name}
                                                  </p>
                                                  <p>
                                                      <span className="font-bold">Bài giảng đang có:</span>{" "}
                                                      {course.lesson_count}
                                                  </p>
                                                  <p>
                                                      <span className="font-bold">Dự kiến bắt đầu:</span>{" "}
                                                      {formatter.date(course.start_date)}
                                                  </p>
                                                  <p>
                                                      <span className="font-bold">Dự kiến kết thúc:</span>{" "}
                                                      {course.end_date
                                                          ? formatter.date(course.end_date)
                                                          : "Không kết thúc"}
                                                  </p>
                                              </td>
                                              <td
                                                  className={`px-4 py-3 font-semibold ${course.price === 0 ? "text-green-600" : ""}`}
                                              >
                                                  {course.price === 0
                                                      ? "Miễn phí"
                                                      : formatter.number(course.price) + "đ"}
                                              </td>
                                              <td className="px-4 py-3 text-zinc-500">
                                                  <span
                                                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                          course.enrollments_count === 0
                                                              ? "bg-gray-100 text-gray-600"
                                                              : "bg-blue-100 text-blue-800"
                                                      }`}
                                                  >
                                                      {course.enrollments_count === 0
                                                          ? "Chưa có học sinh"
                                                          : `${course.enrollments_count} học sinh`}
                                                  </span>
                                              </td>
                                              <td className="px-4 py-3 text-zinc-500">
                                                  <Link href={`/admin/students/${course.teacher.id}`}>
                                                      {course.teacher.full_name}
                                                  </Link>
                                              </td>

                                              <td className="px-4 py-3">
                                                  {getStatusBadge(
                                                      "activity_status",
                                                      new Date(course.start_date) > new Date()
                                                          ? "2"
                                                          : String(course.status),
                                                  )}
                                              </td>
                                              <td className="px-4 py-3">
                                                  <div className="flex items-center justify-end gap-2">
                                                      <Link href={`/admin/courses/${course.slug}`}>
                                                          <Button variant="outlineBlack" size="sm">
                                                              Xem chi tiết
                                                          </Button>
                                                      </Link>
                                                      <DangerConfirm
                                                          message="Bạn có chắc chắn muốn xóa khóa học này?"
                                                          action={() => mutationDeleteCourse.mutate(course.slug)}
                                                      >
                                                          <Button variant="ghost" size="sm" className="hover:bg-red-50">
                                                              <Trash2 className="h-4 w-4 text-red-500" />
                                                          </Button>
                                                      </DangerConfirm>
                                                  </div>
                                              </td>
                                          </tr>
                                      );
                                  })}
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
                        : courses?.data.map((course, idx) => (
                              <div
                                  key={course.id}
                                  className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                              >
                                  {/* Header với STT và Status */}
                                  <div className="mb-3">
                                      <div className="mb-2 flex items-start justify-between">
                                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">
                                              {Math.max(0, +page - 1) * COURSE_PER_PAGE + idx + 1}
                                          </span>
                                          {getStatusBadge(
                                              "activity_status",
                                              new Date(course.start_date) > new Date() ? "2" : String(course.status),
                                          )}
                                      </div>
                                      <h3
                                          className="mb-2 text-sm font-semibold text-gray-900"
                                          dangerouslySetInnerHTML={{
                                              __html: highlightKeyword(course.name, search),
                                          }}
                                      ></h3>
                                  </div>

                                  {/* Course Info Grid */}
                                  <div className="mb-4 grid grid-cols-1 gap-3">
                                      <div className="space-y-2 text-xs">
                                          <div className="flex justify-between">
                                              <span className="text-gray-500">Môn học:</span>
                                              <span className="font-medium">
                                                  {subjectsMock.find((s) => s.slug === course.subject)?.name}
                                              </span>
                                          </div>
                                          <div className="flex justify-between">
                                              <span className="text-gray-500">Bài giảng:</span>
                                              <span className="font-medium">{course.lesson_count} bài</span>
                                          </div>
                                          <div className="flex justify-between">
                                              <span className="text-gray-500">Học sinh:</span>
                                              <span
                                                  className={`font-medium ${
                                                      course.enrollments_count === 0 ? "text-gray-500" : "text-blue-600"
                                                  }`}
                                              >
                                                  {course.enrollments_count === 0
                                                      ? "Chưa có"
                                                      : `${course.enrollments_count} học sinh`}
                                              </span>
                                          </div>
                                          <div className="flex justify-between">
                                              <span className="text-gray-500">Giáo viên:</span>
                                              <Link
                                                  href={`/admin/students/${course.teacher.id}`}
                                                  className="font-medium text-blue-600 transition-colors hover:text-blue-800"
                                              >
                                                  {course.teacher.full_name}
                                              </Link>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Price and Schedule Info */}
                                  <div className="mb-4 rounded-lg bg-gray-50 p-3">
                                      <div className="grid grid-cols-1 gap-2 text-xs">
                                          <div className="flex items-center justify-between">
                                              <span className="text-gray-500">Giá:</span>
                                              <span
                                                  className={`text-sm font-bold ${
                                                      course.price === 0 ? "text-green-600" : "text-blue-600"
                                                  }`}
                                              >
                                                  {course.price === 0
                                                      ? "Miễn phí"
                                                      : `${formatter.number(course.price)}đ`}
                                              </span>
                                          </div>
                                          <div className="flex justify-between">
                                              <span className="text-gray-500">Bắt đầu:</span>
                                              <span className="font-medium">{formatter.date(course.start_date)}</span>
                                          </div>
                                          <div className="flex justify-between">
                                              <span className="text-gray-500">Kết thúc:</span>
                                              <span className="font-medium">
                                                  {course.end_date ? formatter.date(course.end_date) : "Không kết thúc"}
                                              </span>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Enrollment Badge */}
                                  <div className="mb-4">
                                      <span
                                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                              course.enrollments_count === 0
                                                  ? "bg-gray-100 text-gray-600"
                                                  : "bg-blue-100 text-blue-800"
                                          }`}
                                      >
                                          {course.enrollments_count === 0
                                              ? "Chưa có học sinh đăng ký"
                                              : `${course.enrollments_count} học sinh đã đăng ký`}
                                      </span>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="grid grid-cols-2 gap-2">
                                      <Link href={`/admin/courses/${course.slug}`} className="w-full">
                                          <Button variant="outlineBlack" className="w-full text-xs">
                                              Xem chi tiết
                                          </Button>
                                      </Link>
                                      <DangerConfirm
                                          message="Bạn có chắc chắn muốn xóa khóa học này?"
                                          action={() => mutationDeleteCourse.mutate(course.slug)}
                                      >
                                          <Button
                                              variant="outline"
                                              className="w-full border-red-200 text-xs text-red-600 hover:bg-red-50"
                                          >
                                              <Trash2 className="mr-1 h-3 w-3" />
                                              Xóa
                                          </Button>
                                      </DangerConfirm>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>

            <div className="mt-6 ml-auto w-fit">
                <Suspense>
                    <PaginationNav totalPages={totalPages} basePath="/admin/courses" />
                </Suspense>
            </div>
        </>
    );
};

export default CourseList;
