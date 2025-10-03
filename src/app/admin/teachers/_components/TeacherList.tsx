"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { Button } from "~/components/ui/button";
import { getGender } from "~/libs/helper";
import { getStatusBadge } from "~/libs/statusBadge";
import DisplayTotalResult from "../../_components/DisplayTotalResult";
import teacherApi from "~/apiRequest/teachers";
const TeacherList = () => {
    const { data: teachers, isLoading } = useQuery({
        queryKey: ["admin", "teachers"],
        queryFn: async () => {
            const res = await teacherApi.getTeachers();
            return res;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    return (
        <>
            <div className="mt-6 md:mt-8">
                <DisplayTotalResult total={teachers?.length ?? 0} />

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
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Số điện thoại
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Trạng thái</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {isLoading
                                ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={8} />)
                                : teachers?.map((student, idx) => (
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
                                          </td>
                                          <td className="px-4 py-3 text-zinc-500">
                                              <Link href={`mailto:${student.email}`} className="underline">
                                                  {student.email}
                                              </Link>
                                          </td>
                                          <td className="px-4 py-3 text-zinc-500">
                                              {student.phone_number ? (
                                                  <Link href={`tel:${student.phone_number}`} className="underline">
                                                      {student.phone_number}
                                                  </Link>
                                              ) : (
                                                  "Chưa cập nhật"
                                              )}
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
                        : teachers?.map((teacher, idx) => (
                              <div
                                  key={teacher.id}
                                  className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                              >
                                  {/* Header với STT, Username và Status */}
                                  <div className="mb-4 flex items-start justify-between">
                                      <div className="flex items-center gap-3">
                                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-800">
                                              {idx + 1}
                                          </span>
                                          <div>
                                              <p className="text-sm font-semibold text-gray-900">@{teacher.username}</p>
                                              {teacher.full_name && (
                                                  <p className="text-xs text-gray-500">{teacher.full_name}</p>
                                              )}
                                          </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          {getStatusBadge("activity_status", teacher.banned ? "0" : "1")}
                                      </div>
                                  </div>

                                  {/* Basic Info Section */}
                                  <div className="mb-4">
                                      <h4 className="mb-2 text-xs font-semibold text-gray-700">Thông tin cơ bản</h4>
                                      <div className="space-y-1 text-xs">
                                          {teacher.city && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Thành phố:</span>
                                                  <span className="ml-2 truncate font-medium text-gray-900">
                                                      {teacher.city}
                                                  </span>
                                              </div>
                                          )}
                                          {teacher.school && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Trường:</span>
                                                  <span className="ml-2 truncate font-medium text-gray-900">
                                                      {teacher.school}
                                                  </span>
                                              </div>
                                          )}
                                          {teacher.birth_year && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Năm sinh:</span>
                                                  <span className="font-medium text-gray-900">
                                                      {teacher.birth_year}
                                                  </span>
                                              </div>
                                          )}
                                          {teacher.gender && (
                                              <div className="flex justify-between">
                                                  <span className="text-gray-500">Giới tính:</span>
                                                  <span className="font-medium text-gray-900">
                                                      {getGender(teacher.gender)}
                                                  </span>
                                              </div>
                                          )}
                                      </div>
                                  </div>

                                  {/* Contact Info Section */}
                                  <div className="mb-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 p-3">
                                      <h4 className="mb-2 text-xs font-semibold text-gray-700">Thông tin liên hệ</h4>
                                      <div className="space-y-2">
                                          <div className="flex items-center justify-between">
                                              <span className="text-xs text-gray-500">Email:</span>
                                              <Link
                                                  href={`mailto:${teacher.email}`}
                                                  className="ml-2 truncate text-xs font-medium text-blue-600 underline hover:text-blue-800"
                                              >
                                                  {teacher.email}
                                              </Link>
                                          </div>
                                          <div className="flex items-center justify-between">
                                              <span className="text-xs text-gray-500">Số điện thoại:</span>
                                              {teacher.phone_number ? (
                                                  <Link
                                                      href={`tel:${teacher.phone_number}`}
                                                      className="text-xs font-medium text-blue-600 underline hover:text-blue-800"
                                                  >
                                                      {teacher.phone_number}
                                                  </Link>
                                              ) : (
                                                  <span className="text-xs text-gray-400 italic">Chưa cập nhật</span>
                                              )}
                                          </div>
                                      </div>
                                  </div>

                                  {/* Action Button */}
                                  <div className="flex justify-end">
                                      <Link href={`/admin/students/${teacher.id}`}>
                                          <Button variant="outlineBlack" size="sm">
                                              Chỉnh sửa
                                          </Button>
                                      </Link>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>
        </>
    );
};

export default TeacherList;
