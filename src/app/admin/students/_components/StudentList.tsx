"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { Suspense } from "react";

import studentApi, { USERS_PER_PAGE } from "~/apiRequest/admin/student";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import { Button } from "~/components/ui/button";
import { buildLaravelFilterQuery, getGender } from "~/libs/helper";
import { getStatusBadge } from "~/libs/statusBadge";
import DisplayTotalResult from "../../_components/DisplayTotalResult";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { formatter } from "~/libs/format";
const allowedFields = [
    "sort",
    "page",
    "search",
    "full_name",
    "email",
    "city",
    "school",
    "gender",
    "birth_year",
    "banned",
    "email_verified",
    "created_at",
    "phone_number",
] as const;

const StudentList = () => {
    const {
        page,
        search,
        full_name,
        email,
        city,
        school,
        gender,
        birth_year,
        banned,
        email_verified,
        created_at,
        phone_number,
        sort,
    } = useGetSearchQuery(allowedFields);
    const { data: students, isLoading } = useQuery({
        queryKey: [
            "admin",
            "students",
            {
                page,
                sort,
                search,
                full_name,
                email,
                city,
                school,
                gender,
                birth_year,
                banned,
                email_verified,
                created_at,
                phone_number,
            },
        ],
        queryFn: async () => {
            const res = await studentApi.getStudents(
                +page || 1,
                USERS_PER_PAGE,
                search || "",
                sort,
                buildLaravelFilterQuery({
                    full_name,
                    email,
                    city,
                    school,
                    gender,
                    birth_year,
                    banned,
                    email_verified,
                    created_at,
                    phone_number,
                }),
            );
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });
    const total = students?.total ?? 0;
    const totalPages = Math.ceil(total / USERS_PER_PAGE);
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
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Tài khoản</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Thông tin cơ bản
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Thông tin học tập
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Trạng thái</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {isLoading
                                ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={8} />)
                                : students?.data.map((student, idx) => (
                                      <tr
                                          key={student.id}
                                          className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                      >
                                          <td className="px-4 py-3 text-zinc-500">{idx + 1}</td>
                                          <td className="px-4 py-3 text-zinc-500">{student.username}</td>
                                          <td className="px-4 py-3 text-zinc-500">
                                              {student.full_name && (
                                                  <p>
                                                      <span className="font-bold">Họ tên:</span> {student.full_name}
                                                  </p>
                                              )}
                                              {student.city && (
                                                  <p>
                                                      <span className="font-bold">Thành phố:</span> {student.city}
                                                  </p>
                                              )}
                                              {student.school && (
                                                  <p>
                                                      <span className="font-bold">Trường học:</span> {student.school}
                                                  </p>
                                              )}
                                              {student.birth_year && (
                                                  <p>
                                                      <span className="font-bold">Năm sinh:</span> {student.birth_year}
                                                  </p>
                                              )}
                                              {student.gender && (
                                                  <p>
                                                      <span className="font-bold">Giới tính:</span>{" "}
                                                      {getGender(student.gender)}
                                                  </p>
                                              )}
                                              {student.email && (
                                                  <p>
                                                      <span className="font-bold">Email:</span> {student.email}
                                                  </p>
                                              )}
                                              {student.phone_number && (
                                                  <p>
                                                      <span className="font-bold">Số điện thoại:</span>{" "}
                                                      {student.phone_number}
                                                  </p>
                                              )}
                                              <p>
                                                  <span className="font-bold">Tham gia:</span>{" "}
                                                  {formatter.date(student.created_at)}
                                              </p>
                                          </td>
                                          <td className="px-4 py-3 text-zinc-500">
                                              <p>
                                                  <span className="font-bold text-blue-700">
                                                      Bài đã học trong tuần:
                                                  </span>{" "}
                                                  <span className="font-semibold text-blue-600">
                                                      {student.learning_info.lessons}
                                                  </span>
                                              </p>
                                              <p>
                                                  <span className="font-bold text-green-700">
                                                      Tổng số giờ học trong tuần:
                                                  </span>{" "}
                                                  <span className="font-semibold text-green-600">
                                                      {student.learning_info.hours}
                                                  </span>
                                              </p>
                                              <p>
                                                  <span className="font-bold text-purple-700">Số khóa học đã mua:</span>{" "}
                                                  <span className="font-semibold text-purple-600">
                                                      {student.learning_info.enrollments_count}
                                                  </span>
                                              </p>
                                              <p>
                                                  <span className="font-bold text-orange-700">
                                                      Số khóa học đã hoàn thành:
                                                  </span>{" "}
                                                  <span className="font-semibold text-orange-600">
                                                      {student.learning_info.completed_courses_count}
                                                  </span>
                                              </p>
                                          </td>

                                          <td className="px-4 py-3">
                                              {getStatusBadge("activity_status", student.banned ? "0" : "1")}
                                          </td>
                                          <td className="px-4 py-3 text-right">
                                              <Link href={`/admin/students/${student.id}`}>
                                                  <Button variant={"outlineBlack"}>Chỉnh sửa</Button>
                                              </Link>
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
                                  <div className="animate-pulse space-y-3">
                                      <div className="flex items-start justify-between">
                                          <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                                          <div className="h-6 w-16 rounded bg-gray-200"></div>
                                      </div>
                                      <div className="space-y-2">
                                          <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                                          <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                                          <div className="h-3 w-3/4 rounded bg-gray-200"></div>
                                      </div>
                                  </div>
                              </div>
                          ))
                        : students?.data.map((student, idx) => (
                              <div
                                  key={student.id}
                                  className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                              >
                                  {/* Header với STT, Username và Status */}
                                  <div className="mb-4 flex items-start justify-between">
                                      <div className="flex items-center gap-3">
                                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">
                                              {idx + 1}
                                          </span>
                                          <div>
                                              <p className="text-sm font-semibold text-gray-900">@{student.username}</p>
                                              {student.full_name && (
                                                  <p className="text-xs text-gray-500">{student.full_name}</p>
                                              )}
                                          </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          {getStatusBadge("activity_status", student.banned ? "0" : "1")}
                                      </div>
                                  </div>

                                  {/* Basic Info Section */}
                                  <div className="mb-4">
                                      <h4 className="mb-2 text-xs font-semibold text-gray-700">Thông tin cơ bản</h4>
                                      <div className="grid grid-cols-1 gap-1 text-xs">
                                          {student.email && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Email:</span>
                                                  <span className="ml-2 truncate font-medium text-gray-900">
                                                      {student.email}
                                                  </span>
                                              </div>
                                          )}
                                          {student.phone_number && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">SĐT:</span>
                                                  <span className="font-medium text-gray-900">
                                                      {student.phone_number}
                                                  </span>
                                              </div>
                                          )}
                                          {student.city && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Thành phố:</span>
                                                  <span className="ml-2 truncate font-medium text-gray-900">
                                                      {student.city}
                                                  </span>
                                              </div>
                                          )}
                                          {student.school && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Trường:</span>
                                                  <span className="ml-2 truncate font-medium text-gray-900">
                                                      {student.school}
                                                  </span>
                                              </div>
                                          )}
                                          <div className="flex justify-between">
                                              <span className="text-gray-500">Tham gia:</span>
                                              <span className="font-medium text-gray-900">
                                                  {new Date(student.created_at).toLocaleDateString("vi-VN")}
                                              </span>
                                          </div>
                                          {student.birth_year && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Năm sinh:</span>
                                                  <span className="font-medium text-gray-900">
                                                      {student.birth_year}
                                                  </span>
                                              </div>
                                          )}
                                          {student.gender && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Giới tính:</span>
                                                  <span className="font-medium text-gray-900">
                                                      {getGender(student.gender)}
                                                  </span>
                                              </div>
                                          )}
                                      </div>
                                  </div>

                                  {/* Learning Stats Section */}
                                  <div className="mb-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-3">
                                      <h4 className="mb-2 text-xs font-semibold text-gray-700">Thống kê học tập</h4>
                                      <div className="grid grid-cols-2 gap-2 text-xs">
                                          <div className="rounded bg-white/60 p-2 text-center">
                                              <div className="text-lg font-bold text-blue-600">
                                                  {student.learning_info.lessons}
                                              </div>
                                              <div className="text-gray-600">Bài học/tuần</div>
                                          </div>
                                          <div className="rounded bg-white/60 p-2 text-center">
                                              <div className="text-lg font-bold text-green-600">
                                                  {student.learning_info.hours}
                                              </div>
                                              <div className="text-gray-600">Giờ học/tuần</div>
                                          </div>
                                          <div className="rounded bg-white/60 p-2 text-center">
                                              <div className="text-lg font-bold text-purple-600">
                                                  {student.learning_info.enrollments_count}
                                              </div>
                                              <div className="text-gray-600">Khóa đã mua</div>
                                          </div>
                                          <div className="rounded bg-white/60 p-2 text-center">
                                              <div className="text-lg font-bold text-orange-600">
                                                  {student.learning_info.completed_courses_count}
                                              </div>
                                              <div className="text-gray-600">Khóa hoàn thành</div>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Action Button */}
                                  <div className="flex justify-end">
                                      <Link href={`/admin/students/${student.id}`}>
                                          <Button variant="outlineBlack" size="sm">
                                              Chỉnh sửa
                                          </Button>
                                      </Link>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>
            <div className="mt-4 ml-auto w-fit md:mt-6">
                <Suspense>
                    <PaginationNav totalPages={totalPages} basePath="/admin/students" />
                </Suspense>
            </div>
        </>
    );
};

export default StudentList;
