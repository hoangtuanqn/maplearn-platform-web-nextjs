import React from "react";
import { BookOpen, Clock, CheckCircle, BarChart3 } from "lucide-react";
import LearingChart7Days from "./_components/LearingChart7Days";
import AttemptsExams from "./_components/AttemptsExams";
import { redirect } from "next/navigation";
import studentApiServer from "~/apiRequest/server/admin/student";
import Breadcrumb from "~/app/admin/_components/Breadcrumb";

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

const ProcessLearningPage = async ({ params }: { params: Promise<{ slug: string; id: string }> }) => {
    const { slug, id } = await params;
    const breadcrumbData = [
        { label: "Dashboard", href: "/admin" },
        { label: "Khóa học", href: "/admin/courses" },
        { label: "Chi tiết khóa học", href: `/admin/courses/${slug}` },
        { label: "Quá trình học", href: `/admin/courses/${slug}/students/${id}` },
    ];
    let statsStudent;
    try {
        const res = await studentApiServer.getLearningStats(slug, id);
        statsStudent = res.data.data;
    } catch {
        redirect(`/admin/courses/${slug}`);
    }
    // Calculate totals
    const totalLessons = statsStudent.total_lessons || 0;
    const totalHours = statsStudent.total_duration || 0;
    const streak = statsStudent.max_streak || 0;
    const testResults = statsStudent.exam_attempts;
    const learningStats = statsStudent.last_7_days || [];

    return (
        <div className="mt-5 min-h-screen bg-[#F5F5F5]">
            <div className="mb-6 flex flex-col gap-5">
                <Breadcrumb breadcrumbData={breadcrumbData} />
            </div>
            <div className="min-h-screen bg-white p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">Báo cáo quá trình học tập</h1>
                    <p className="text-gray-600">Tổng quan về hoạt động học tập của học viên trong khóa học này!</p>
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
                                <span className="text-lg font-bold">{totalHours}h</span>
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
                <LearingChart7Days learningStats={learningStats} />

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
                <AttemptsExams testResults={testResults} />
            </div>
        </div>
    );
};

export default ProcessLearningPage;
