"use client";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
    LineChart,
    Line,
} from "recharts";
import { BookOpen, Clock, CheckCircle, BarChart3 } from "lucide-react";

// Demo data for 7 days
const learningStats = [
    { date: "2025-09-22", lessons: 2, hours: 1.5 },
    { date: "2025-09-23", lessons: 3, hours: 2.2 },
    { date: "2025-09-24", lessons: 1, hours: 0.8 },
    { date: "2025-09-25", lessons: 4, hours: 3.1 },
    { date: "2025-09-26", lessons: 2, hours: 1.7 },
    { date: "2025-09-27", lessons: 3, hours: 2.5 },
    { date: "2025-09-28", lessons: 2, hours: 1.2 },
];

// Demo lesson history
const lessonHistory = [
    { title: "Bài giảng 1: Giới thiệu", date: "2025-09-22", duration: 30, completed: true },
    { title: "Bài giảng 2: Cơ bản", date: "2025-09-23", duration: 45, completed: true },
    { title: "Bài giảng 3: Nâng cao", date: "2025-09-24", duration: 40, completed: true },
    { title: "Bài giảng 4: Thực hành", date: "2025-09-25", duration: 60, completed: true },
    { title: "Bài giảng 5: Ôn tập", date: "2025-09-26", duration: 35, completed: true },
    { title: "Bài giảng 6: Kiểm tra", date: "2025-09-27", duration: 50, completed: false },
];

// Demo streak data
const streak = 5; // days in a row

// Demo quiz/test results
const testResults = [
    { name: "Quiz 1", score: 8, max: 10, date: "2025-09-23" },
    { name: "Quiz 2", score: 7, max: 10, date: "2025-09-25" },
];

// Demo badges/achievements
const achievements = [
    { name: "Chăm chỉ", icon: <CheckCircle className="h-5 w-5 text-green-500" />, desc: "Học liên tục 5 ngày" },
    {
        name: "Hoàn thành bài giảng",
        icon: <BookOpen className="h-5 w-5 text-blue-500" />,
        desc: "Hoàn thành 5 bài giảng",
    },
];

const ProcessLearningPage = () => {
    // Calculate totals
    const totalLessons = learningStats.reduce((a, b) => a + b.lessons, 0);
    const totalHours = learningStats.reduce((a, b) => a + b.hours, 0);

    return (
        <div className="min-h-screen bg-white p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">Báo cáo quá trình học tập</h1>
                <p className="text-gray-600">Tổng quan về hoạt động học tập của học viên trong 7 ngày gần nhất</p>
            </div>

            {/* Tổng quan nhanh */}
            <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-blue-500" />
                            <span className="text-lg font-bold">{totalLessons}</span>
                        </div>
                        <span className="text-sm text-gray-500">Bài giảng đã học</span>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock className="h-6 w-6 text-purple-500" />
                            <span className="text-lg font-bold">{totalHours.toFixed(1)}h</span>
                        </div>
                        <span className="text-sm text-gray-500">Tổng thời lượng học</span>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-6 w-6 text-green-500" />
                            <span className="text-lg font-bold">{streak} ngày</span>
                        </div>
                        <span className="text-sm text-gray-500">Chuỗi ngày học liên tục</span>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-6 w-6 text-emerald-500" />
                            <span className="text-lg font-bold">{testResults.length}</span>
                        </div>
                        <span className="text-sm text-gray-500">Bài kiểm tra đã làm</span>
                    </div>
                </div>
            </div>

            {/* Biểu đồ học tập 7 ngày */}
            <div className="mb-8 grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-base font-semibold text-gray-900">Biểu đồ số bài giảng đã học</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={learningStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="lessons" fill="#3b82f6" name="Bài giảng" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-base font-semibold text-gray-900">Biểu đồ thời lượng học</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={learningStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="hours" stroke="#8b5cf6" name="Giờ học" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Lịch sử bài giảng đã học */}
            <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-gray-900">Lịch sử bài giảng đã học</h2>
                <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                STT
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Tên bài giảng
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Ngày học
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Thời lượng (phút)
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Trạng thái
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {lessonHistory.map((lesson, idx) => (
                            <tr key={idx} className="transition-colors hover:bg-gray-50">
                                <td className="px-4 py-4 text-sm text-gray-500">{idx + 1}</td>
                                <td className="px-4 py-4 font-medium text-gray-900">{lesson.title}</td>
                                <td className="px-4 py-4 text-center text-sm text-gray-500">{lesson.date}</td>
                                <td className="px-4 py-4 text-center text-sm text-gray-500">{lesson.duration}</td>
                                <td className="px-4 py-4 text-center">
                                    {lesson.completed ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                            <CheckCircle className="h-3 w-3" /> Đã hoàn thành
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                            <Clock className="h-3 w-3" /> Chưa hoàn thành
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bài kiểm tra đã làm */}
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
                                <td className="px-4 py-4 font-medium text-gray-900">{test.name}</td>
                                <td className="px-4 py-4 text-center text-sm text-gray-500">{test.date}</td>
                                <td className="px-4 py-4 text-center text-sm font-bold text-gray-900">
                                    {test.score}/{test.max}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Ý tưởng bổ sung */}
            <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-gray-900">Gợi ý & Tính năng nâng cao</h2>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                    <li>Biểu đồ so sánh tiến bộ với trung bình lớp hoặc toàn khóa học</li>
                    <li>Thống kê số lần xem lại bài giảng, số lần làm lại bài kiểm tra</li>
                    <li>Phân tích điểm mạnh/yếu dựa trên kết quả bài kiểm tra</li>
                    <li>Thông báo nhắc nhở học tập, mục tiêu tuần/tháng</li>
                    <li>Hệ thống xếp hạng học viên theo điểm số, tiến độ, huy hiệu</li>
                    <li>Xuất báo cáo quá trình học tập ra file PDF/Excel</li>
                </ul>
            </div>
        </div>
    );
};

export default ProcessLearningPage;
