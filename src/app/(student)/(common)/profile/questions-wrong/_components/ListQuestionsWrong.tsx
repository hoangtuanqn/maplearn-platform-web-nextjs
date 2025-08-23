"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import profileApi from "~/apiRequest/profile";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
import TableSkeleton from "../../_components/TableSkeleton";
import RenderLatex from "~/components/RenderLatex";
import { formatter } from "~/libs/format";
import ShowDetailQuestion from "./ShowDetailQuestion";
import { QUESTION_PER_PAGE } from "~/apiRequest/exam";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { Button } from "~/components/ui/button";

const ListQuestionsWrong = () => {
    const { page } = useGetSearchQuery(["page"] as const);
    const { data: questionWrong, isLoading } = useQuery({
        queryKey: ["user", "questionWrong", page],
        queryFn: async () => {
            const res = await profileApi.getQuestionWrong(Number(page));
            return res.data.data;
        },
    });
    const total = questionWrong?.total || 0;
    const totalPages = Math.ceil(total / QUESTION_PER_PAGE);
    return (
        <div className="flex flex-col gap-4 px-2 font-medium sm:px-0">
            <div className="flex flex-col">
                <div className="mb-5 flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-2 shadow-sm sm:p-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col justify-center gap-1">
                        <p className="text-sm font-semibold text-neutral-900 sm:text-base">Đã tìm thấy</p>
                        <ul className="ml-4 list-inside list-disc text-xs text-neutral-700 sm:text-sm">
                            <li>
                                <span className="text-primary-600 font-bold">{questionWrong?.total ?? 0}</span> câu trả
                                lời sai cần ôn lại
                            </li>
                        </ul>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-1 sm:gap-2 md:mt-0">
                        <Button variant={"outline"}>Tạo đề thi</Button>
                    </div>
                </div>
                <div className="-m-1.5 overflow-x-auto">
                    <div className="inline-block min-w-full p-1.5 align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase sm:table-cell"
                                        >
                                            Môn học
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase md:table-cell"
                                        >
                                            Câu hỏi
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase md:table-cell"
                                        >
                                            Lần sai gần nhất
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-end text-xs font-medium text-gray-500 uppercase sm:px-6"
                                        >
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!isLoading && (questionWrong?.data.length ?? 0) == 0 && (
                                        <tr className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-gray-100">
                                            <td
                                                className="px-2 py-4 text-xs font-medium whitespace-nowrap text-gray-800 sm:px-6 sm:text-sm"
                                                colSpan={8}
                                            >
                                                <DisplayNoData title="Bạn hiện không có câu hỏi nào làm sai!" />
                                            </td>
                                        </tr>
                                    )}

                                    {isLoading ? (
                                        [...Array(QUESTION_PER_PAGE)].map((_, index) => (
                                            <TableSkeleton key={index} col={4} />
                                        ))
                                    ) : (
                                        <>
                                            {questionWrong?.data.map((question, index) => (
                                                <tr
                                                    key={index}
                                                    // onClick={() => router.push(`/invoices/${invoice.transaction_code}`)}
                                                    // key={invoice.id}
                                                    className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-gray-100"
                                                >
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800 sm:table-cell">
                                                        {question.question.exam_paper.subject.name}
                                                    </td>
                                                    <td className="max-w-[250px] px-6 py-4 text-sm text-gray-800 md:table-cell">
                                                        <div className="line-clamp-2">
                                                            <RenderLatex content={question.question.content} />
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 text-xs whitespace-nowrap text-gray-800 sm:px-6 sm:text-sm">
                                                        <div className="font-medium">
                                                            {formatter.date(question.last_wrong_at, true)}
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 text-end text-xs font-medium whitespace-nowrap sm:px-6 sm:text-sm">
                                                        <ShowDetailQuestion question={question} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-end justify-between lg:flex-col">
                <div className="ml-auto">
                    {!isLoading && totalPages > 1 && (questionWrong?.data.length ?? 0) > 0 && (
                        <PaginationNav totalPages={totalPages} basePath="/profile/questions-wrong" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListQuestionsWrong;
