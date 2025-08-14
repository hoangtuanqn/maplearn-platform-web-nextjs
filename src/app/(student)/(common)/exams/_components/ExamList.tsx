"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import examApi, { EXAM_PER_PAGE } from "~/apiRequest/exam";
import Link from "next/link";
import clsx from "clsx";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import ExamSkeleton from "./ExamSkeleton";

const ExamList = () => {
    const { data: examList, isLoading } = useQuery({
        queryKey: ["exam", "list"],
        queryFn: async () => {
            const res = await examApi.getExams();
            return res.data.data;
        },
    });

    const totalPages = Math.ceil((examList?.total ?? 0) / EXAM_PER_PAGE);

    return (
        <section className="flex-1 space-y-4 rounded-xl">
            {isLoading ? (
                <>
                    {[...Array(EXAM_PER_PAGE)].map((_, index) => (
                        <ExamSkeleton key={index} />
                    ))}
                </>
            ) : (
                <>
                    {examList?.data.map((exam, idx) => (
                        <div
                            key={exam.id}
                            className={clsx(
                                "relative flex h-[72px] w-full items-center justify-between gap-4 overflow-hidden rounded-lg bg-white px-6 shadow-sm",
                                {
                                    "border border-red-700": exam.exam_type == "TSA",
                                    "border border-[#0F80CC]": exam.exam_type == "V-ACT",
                                    "border border-[#128B3D]": exam.exam_type == "HSA",
                                },
                            )}
                        >
                            {exam.exam_type != "OTHER" && (
                                <div
                                    className={clsx(
                                        "t1-flex-center bg-${colorExamType[exam.exam_type]} absolute -top-[1px] -left-[1px] h-[24px] rounded-br-[5px] px-[8px] text-[13px] font-medium text-white",
                                        {
                                            "bg-red-700": exam.exam_type == "TSA",
                                            "bg-[#0F80CC]": exam.exam_type == "V-ACT",
                                            "bg-[#128B3D]": exam.exam_type == "HSA",
                                        },
                                    )}
                                >
                                    {exam.exam_type}
                                </div>
                            )}

                            <div className="flex h-full grow items-center justify-between text-[15.15px]">
                                <Link className={`line-clamp-1 w-[70%] pr-6 font-medium`} href={`/exams/${exam.slug}`}>
                                    {`${idx + 1}. ${exam.title}`}
                                </Link>

                                {exam.exam_type != "OTHER" && (
                                    <div
                                        className={clsx("text-primary-typo w-[25%] font-medium", {
                                            "text-[#0F80CC]": exam.exam_type == "V-ACT",
                                            "text-[#128B3D]": exam.exam_type == "HSA",
                                            "text-red-700": exam.exam_type == "TSA",
                                        })}
                                    >
                                        {exam.exam_type == "V-ACT"
                                            ? "ĐGNL V-ACT"
                                            : exam.exam_type == "HSA"
                                              ? "ĐGNL HSA"
                                              : "ĐGTD TSA"}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
            <div className="ml-auto">
                {!isLoading && totalPages > 1 && (examList?.data.length ?? 0) > 0 && (
                    <PaginationNav totalPages={totalPages} basePath="/profile/invoices" />
                )}
            </div>
        </section>
    );
};

export default ExamList;
