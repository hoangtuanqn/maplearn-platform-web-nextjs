import Link from "next/link";
import React from "react";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
import DisplayTotalResult from "~/app/admin/_components/DisplayTotalResult";
import { formatter } from "~/libs/format";
import { ExamAttemptSchema } from "~/schemaValidate/admin/student.schema";

const AttemptsExams = ({ testResults }: { testResults: ExamAttemptSchema[] }) => {
    return (
        <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:mb-8 md:p-6">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 md:mb-4 md:text-base">Lịch sử làm kiểm tra</h2>

            <div className="mt-6 md:mt-8">
                <DisplayTotalResult total={testResults.length} />

                {/* Desktop Table View */}
                <div className="hidden overflow-x-auto lg:block">
                    <table className="min-w-full rounded-xl bg-white shadow-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Lần làm bài</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Tên bài kiểm tra
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Ngày làm</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Điểm số</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {testResults.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-6">
                                        <DisplayNoData title="Chưa có dữ liệu bài làm của người dùng" />
                                    </td>
                                </tr>
                            )}
                            {testResults.map((attempt, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                >
                                    <td className="px-4 py-3 text-zinc-500">{idx + 1}</td>
                                    <td className="px-4 py-3 text-zinc-500">
                                        <Link
                                            href={`/exams/${attempt.slug_exam}/results/${attempt.id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                            target="_blank"
                                        >
                                            {attempt.title}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 text-zinc-500">
                                        {formatter.date(attempt.created_at, true)}
                                    </td>
                                    <td
                                        className={`px-4 py-3 font-medium ${
                                            attempt.score >= attempt.pass_score ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        {attempt.score}/{attempt.max_score} điểm
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="space-y-3 lg:hidden">
                    {testResults.length === 0 ? (
                        <div className="py-8">
                            <DisplayNoData title="Chưa có dữ liệu bài làm của người dùng" />
                        </div>
                    ) : (
                        testResults.map((attempt, idx) => (
                            <div
                                key={idx}
                                className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                            >
                                {/* Header với STT và Score */}
                                <div className="mb-3 flex items-start justify-between">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">
                                        {idx + 1}
                                    </span>
                                    <div className="text-right">
                                        <div
                                            className={`text-lg font-bold ${
                                                attempt.score >= attempt.pass_score ? "text-green-600" : "text-red-600"
                                            }`}
                                        >
                                            {attempt.score}/{attempt.max_score}
                                        </div>
                                        <div className="text-xs text-gray-500">điểm</div>
                                        <div
                                            className={`text-xs ${
                                                attempt.score >= attempt.pass_score ? "text-green-600" : "text-red-600"
                                            }`}
                                        >
                                            {attempt.score >= attempt.pass_score ? "Đạt" : "Chưa đạt"}
                                        </div>
                                    </div>
                                </div>

                                {/* Exam Title */}
                                <Link
                                    href={`/exams/${attempt.slug_exam}/results/${attempt.id}`}
                                    className="mb-3 line-clamp-2 block text-sm font-medium text-blue-600 hover:text-blue-800"
                                    target="_blank"
                                >
                                    {attempt.title}
                                </Link>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <span className="text-gray-500">Ngày làm:</span>
                                        <p className="mt-1 font-medium text-gray-900">
                                            {new Date(attempt.created_at).toLocaleDateString("vi-VN")}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(attempt.created_at).toLocaleTimeString("vi-VN")}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Điểm cần đạt:</span>
                                        <p className="mt-1 font-medium text-gray-900">
                                            {attempt.pass_score}/{attempt.max_score} điểm
                                        </p>
                                        <p
                                            className={`text-xs ${
                                                attempt.score >= attempt.pass_score ? "text-green-600" : "text-red-600"
                                            }`}
                                        >
                                            {attempt.score >= attempt.pass_score
                                                ? "Đã đạt yêu cầu"
                                                : "Chưa đạt yêu cầu"}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar for Score */}
                                <div className="mt-3">
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className={`h-2 rounded-full ${
                                                attempt.score >= attempt.pass_score ? "bg-green-500" : "bg-red-500"
                                            }`}
                                            style={{
                                                width: `${(attempt.score / attempt.max_score) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                                        <span>0</span>
                                        <span className="font-medium text-orange-600">Đạt: {attempt.pass_score}</span>
                                        <span>{attempt.max_score}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttemptsExams;
