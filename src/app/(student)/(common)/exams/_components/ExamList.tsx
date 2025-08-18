"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import examApi, { EXAM_PER_PAGE } from "~/apiRequest/exam";
import Link from "next/link";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import ExamSkeleton from "./ExamSkeleton";
import { BookMinus, Calendar } from "lucide-react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { formatter } from "~/libs/format";

const ExamList = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const { data: examList, isLoading } = useQuery({
        queryKey: ["exam", "list", { page }],
        queryFn: async () => {
            const res = await examApi.getExams();
            return res.data.data;
        },
    });

    const totalPages = Math.ceil((examList?.total ?? 0) / EXAM_PER_PAGE);

    return (
        <section className="grid flex-1 grid-cols-2 gap-4 rounded-xl">
            {isLoading ? (
                <>
                    {[...Array(EXAM_PER_PAGE)].map((_, index) => (
                        <ExamSkeleton key={index} />
                    ))}
                </>
            ) : (
                <>
                    {examList?.data.map((exam) => (
                        <Link
                            key={exam.id}
                            href={`/exams/${exam.slug}`}
                            className="rounded-[8px] bg-white px-4.5 py-3.5"
                            style={{ boxShadow: "0px 1px 4px 0px #0000000D" }}
                        >
                            <div className="flex gap-3.5">
                                <div
                                    className={clsx(
                                        "t1-flex-center h-[28px] rounded-[8px] px-3.5 font-medium text-white",
                                        {
                                            "bg-[#128b3d]": exam.exam_type === "HSA",
                                            "bg-[#0F80CC]": exam.exam_type === "V-ACT",
                                            "bg-[#C41D17]": exam.exam_type === "TSA",
                                            "bg-[#FF8A00]": exam.exam_type === "THPT",
                                            "bg-[#515051]": exam.exam_type === "OTHER",
                                        },
                                    )}
                                >
                                    {exam.exam_type != "OTHER" ? exam.exam_type : "Khác"}
                                </div>
                                <div className="t1-flex-center text-primary h-[28px] rounded-[8px] bg-[#F0F3F7] px-3.5 font-medium">
                                    {exam.duration_minutes} phút
                                </div>
                            </div>
                            <div className="mt-3.5 line-clamp-2 min-h-[48px] text-[16px] font-medium text-[#444444]">
                                {exam.title}
                            </div>
                            <div className="text-primary mt-3.5 flex items-center gap-[4px] text-[13px]">
                                <BookMinus />
                                <div className="flex-1 text-[13px]">Ghi nhận 60 lượt thi</div>
                                <Calendar />
                                <div>{formatter.date(exam.created_at)}</div>
                            </div>
                        </Link>
                    ))}
                </>
            )}
            <div className="ml-auto">
                {!isLoading && totalPages > 1 && (examList?.data.length ?? 0) > 0 && (
                    <PaginationNav totalPages={totalPages} basePath="/exams" />
                )}
            </div>
        </section>
    );
};

export default ExamList;
