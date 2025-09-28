import React from "react";
import { formatter } from "~/libs/format";
import { ExamAttemptSchema } from "~/schemaValidate/admin/student.schema";

const AttemptsExams = ({ testResults }: { testResults: ExamAttemptSchema[] }) => {
    return (
        <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Kết quả bài kiểm tra</h2>
            <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                            Tên bài kiểm tra
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                            Ngày làm
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                            Điểm số
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {testResults.map((test, idx) => (
                        <tr key={idx} className="transition-colors hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900">{test.title}</td>
                            <td className="px-4 py-4 text-center text-sm text-gray-500">
                                {formatter.date(test.date, true)}
                            </td>
                            <td className="px-4 py-4 text-center text-sm font-bold text-gray-900">
                                {test.score}/{test.max_score}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttemptsExams;
