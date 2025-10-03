import React from "react";
import { BookOpen, Clock, BarChart3, Award } from "lucide-react";
import LearingChart7Days from "./_components/LearingChart7Days";
import AttemptsExams from "./_components/AttemptsExams";
import { redirect } from "next/navigation";
import studentApiServer from "~/apiRequest/server/admin/student";
import Breadcrumb from "~/app/admin/_components/Breadcrumb";
import HistoriesLearning from "./_components/HistoriesLearning";
import { formatter } from "~/libs/format";
import { CompareOtherStudentDialog } from "./_components/CompareOtherStudentDialog";
const ProcessLearningPage = async ({ params }: { params: Promise<{ slug: string; id: string }> }) => {
    const { slug, id } = await params;
    const breadcrumbData = [
        { label: "Dashboard", href: "/teacher" },
        { label: "Khóa học", href: "/teacher/courses" },
        { label: "Chi tiết khóa học", href: `/teacher/courses/${slug}` },
        { label: "Quá trình học", href: `/teacher/courses/${slug}/students/${id}` },
    ];
    let statsStudent;
    try {
        const res = await studentApiServer.getLearningStats(slug, id);
        statsStudent = res.data.data;
    } catch {
        redirect(`/teacher/courses/${slug}`);
    }
    // Calculate totals
    const totalLessons = statsStudent.total_lessons || 0;
    const totalHours = statsStudent.total_duration || 0;
    const streak = statsStudent.max_streak || 0;
    const testResults = statsStudent.exam_attempts;
    const learningStats = statsStudent.last_7_days || [];
    const lastLearningAt = statsStudent.last_learned_at || null;
    const highestScore = statsStudent.highest_score || null;

    return (
        <div className="mt-5 min-h-screen bg-[#F5F5F5]">
            <div className="mb-4 flex flex-col gap-3 md:mb-6 md:gap-5">
                <Breadcrumb breadcrumbData={breadcrumbData} />
            </div>
            <div className="min-h-screen bg-white p-4 md:p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col justify-between gap-4 md:mb-8 lg:flex-row lg:items-center">
                    <div>
                        <h1 className="mb-2 text-xl font-bold text-gray-900 md:text-2xl">
                            <span className="hidden sm:inline">
                                Báo cáo quá trình học tập của {statsStudent.full_name}
                            </span>
                            <span className="sm:hidden">Báo cáo học tập</span>
                        </h1>
                        <h2 className="mb-2 text-lg font-semibold text-gray-800 sm:hidden">{statsStudent.full_name}</h2>
                        <p className="text-sm text-gray-600 md:text-base">
                            <span className="hidden sm:inline">
                                Tổng quan về hoạt động học tập của học viên trong khóa học này!
                            </span>
                            <span className="sm:hidden">Tổng quan hoạt động học tập</span>
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <CompareOtherStudentDialog slug={slug} idCurrentStudent={id} />
                    </div>
                </div>

                {/* Báo cáo lần học gần nhất */}
                <div className="mb-6 flex flex-col gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center md:mb-8 md:gap-4 md:p-6">
                    <Clock className="h-5 w-5 flex-shrink-0 text-orange-500 md:h-6 md:w-6" />
                    <div>
                        <span className="block text-base font-bold md:text-lg">
                            Lần gần nhất học: {formatter.timeAgo(lastLearningAt)}
                        </span>
                        <p className="mt-1 text-xs text-gray-500 md:text-sm">
                            <span className="hidden sm:inline">
                                Thời gian cập nhật lần cuối hoạt động học tập của học viên{" "}
                                <b className="font-semibold">trong khóa học này</b>.
                            </span>
                            <span className="sm:hidden">
                                Hoạt động học tập lần cuối <b className="font-semibold">trong khóa học này</b>
                            </span>
                        </p>
                    </div>
                </div>

                {/* Tổng quan nhanh */}
                <div className="mb-6 grid grid-cols-2 gap-3 md:mb-8 lg:grid-cols-4">
                    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:p-6">
                        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-blue-500 md:h-6 md:w-6" />
                                <span className="text-lg font-bold md:text-xl">{totalLessons}</span>
                            </div>
                            <span className="text-left text-xs text-gray-500 md:text-right md:text-sm">
                                <span className="hidden sm:inline">Bài giảng đã học</span>
                                <span className="sm:hidden">Bài đã học</span>
                            </span>
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:p-6">
                        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-purple-500 md:h-6 md:w-6" />
                                <span className="text-lg font-bold md:text-xl">{totalHours}h</span>
                            </div>
                            <span className="text-left text-xs text-gray-500 md:text-right md:text-sm">
                                <span className="hidden sm:inline">Tổng thời lượng học</span>
                                <span className="sm:hidden">Tổng giờ học</span>
                            </span>
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:p-6">
                        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-green-500 md:h-6 md:w-6" />
                                <span className="text-lg font-bold md:text-xl">{streak} ngày</span>
                            </div>
                            <span className="text-left text-xs text-gray-500 md:text-right md:text-sm">
                                <span className="hidden sm:inline">Chuỗi ngày học liên tục</span>
                                <span className="sm:hidden">Streak học</span>
                            </span>
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:p-6">
                        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                            <div className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-emerald-500 md:h-6 md:w-6" />
                                <span className="text-lg font-bold md:text-xl">
                                    {highestScore ? `${highestScore}` : "0"}
                                    <span className="hidden sm:inline">{highestScore ? " điểm" : ""}</span>
                                </span>
                            </div>
                            <span className="text-left text-xs text-gray-500 md:text-right md:text-sm">
                                <span className="hidden sm:inline">Điểm thi cao nhất</span>
                                <span className="sm:hidden">Điểm cao nhất</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Biểu đồ học tập 7 ngày */}
                <LearingChart7Days learningStats={learningStats} />

                {/* Lịch sử bài giảng đã học */}
                <HistoriesLearning slug={slug} id={id} />

                {/* Bài kiểm tra đã làm */}
                <AttemptsExams testResults={testResults} />
            </div>
        </div>
    );
};

export default ProcessLearningPage;
