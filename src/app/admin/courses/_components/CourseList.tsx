"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { Suspense } from "react";
import { toast } from "sonner";

import courseApi, { COURSE_PER_PAGE } from "~/apiRequest/course";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import { DangerConfirm } from "~/components/DangerConfirm";
import { Button } from "~/components/ui/button";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { notificationErrorApi } from "~/libs/apis/http";
import { formatter } from "~/libs/format";
import { getStatusBadge } from "~/libs/statusBadge";
import { subjectsMock } from "~/mockdata/subject.data";
const CourseList = () => {
    const queryClient = useQueryClient();
    const { page } = useGetSearchQuery(["page"] as const);
    const { data: courses, isLoading } = useQuery({
        queryKey: ["admin", "courses", page],
        queryFn: async () => {
            const res = await courseApi.getCourses(+page, COURSE_PER_PAGE);
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    const total = courses?.total ?? 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);

    const mutationDeleteCourse = useMutation({
        mutationFn: (courseSlug: string) => courseApi.deleteCourse(courseSlug),
        onSuccess: () => {
            toast.success("Xóa khóa học thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
        },
        onError: notificationErrorApi,
    });
    return (
        <>
            <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold">Danh sách khóa học</h3>
                        <p className="text-sm text-slate-500">Danh sách khóa học sẽ được hiển thị ở đây.</p>
                    </div>
                </div>
                <div className="mt-8 overflow-x-auto">
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
                                ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={8} />)
                                : courses?.data.map((course, idx) => (
                                      <tr
                                          key={course.id}
                                          className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                      >
                                          <td className="px-4 py-3 text-zinc-500">
                                              {Math.max(0, +page - 1) * COURSE_PER_PAGE + idx + 1}
                                          </td>
                                          <td className="px-4 py-3 text-zinc-500">
                                              <p>
                                                  <span className="font-bold">Tên khóa:</span> {course.name}
                                              </p>
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
                                                  {course.end_date ? formatter.date(course.end_date) : "Không kết thúc"}
                                              </p>
                                          </td>
                                          <td className="px-4 py-3 text-zinc-500">{formatter.number(course.price)}đ</td>
                                          <td className="px-4 py-3 text-zinc-500">{course.enrollments_count}</td>
                                          <td className="px-4 py-3 text-zinc-500">{course.teacher.full_name}</td>

                                          <td className="px-4 py-3">
                                              {getStatusBadge("activity_status", String(course.status))}
                                          </td>
                                          <td className="px-4 py-3 text-right">
                                              <Link href={`/admin/courses/${course.slug}`}>
                                                  <Button variant={"outlineBlack"}>Chỉnh sửa</Button>
                                              </Link>
                                              <DangerConfirm
                                                  message="Bạn có chắc chắn muốn xóa khóa học này? Hành động này không thể hoàn tác."
                                                  action={() => mutationDeleteCourse.mutate(course.slug)}
                                              >
                                                  <Button className="ml-2" variant={"destructive"}>
                                                      Xóa
                                                  </Button>
                                              </DangerConfirm>
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>
                <div className="ml-auto w-fit">
                    <Suspense>
                        <PaginationNav totalPages={totalPages} basePath="/admin/courses" />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default CourseList;
