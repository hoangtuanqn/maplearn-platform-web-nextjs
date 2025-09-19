"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { Button } from "~/components/ui/button";
import { getGender } from "~/libs/hepler";
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
            <div className="mt-8 overflow-x-auto">
                <DisplayTotalResult total={teachers?.length ?? 0} />
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
                                          <Link href={`tel:${student.phone_number}`} className="underline">
                                              {student.phone_number}
                                          </Link>
                                      </td>

                                      <td className="px-4 py-3">
                                          {getStatusBadge("activity_status", student.banned ? "0" : "1")}
                                      </td>
                                      <td className="px-4 py-3 text-right">
                                          <Link href={`/admin/teachers/${student.id}`}>
                                              <Button variant={"outlineBlack"}>Chỉnh sửa</Button>
                                          </Link>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TeacherList;
