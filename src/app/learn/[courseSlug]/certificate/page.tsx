import React from "react";
import { Award, Calendar, BookOpen, CheckCircle, Trophy, Star } from "lucide-react";
import { Metadata } from "next";
import StudentInfomation from "./_components/StudentInfomation";
import CertificateDisplay from "./_components/CertificateDisplay";

// Mock data - bạn sẽ thay thế bằng dữ liệu thật từ API
const mockCourseData = {
    title: "Lập trình React.js từ cơ bản đến nâng cao",
    instructor: "Thầy Nguyễn Văn Minh",
    completionDate: "15/09/2024",
    duration: "40 giờ",
    totalLessons: 45,
    completedLessons: 45,
    grade: "A+",
    level: "Trung cấp",
    category: "Công nghệ thông tin",
    skills: ["React.js", "JavaScript ES6+", "Redux", "React Router", "API Integration"],
    certificateId: "ML-2024-RC-001",
};

export const metadata: Metadata = {
    title: "Chứng chỉ hoàn thành khóa học | MapLearn",
    description: "Chứng chỉ hoàn thành khóa học được cấp bởi nền tảng học tập MapLearn",
};
const CertificatePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br">
            {/* Header Section */}
            <div className="relative border-b backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 py-8">
                    <div className="space-y-4 text-center">
                        {/* Hero Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
                            <Trophy className="h-4 w-4" />
                            <span>Chứng chỉ hoàn thành</span>
                        </div>

                        {/* Main Title */}
                        <div>
                            <h1 className="mb-2 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-4xl font-bold text-transparent">
                                Xin chúc mừng!
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                Bạn đã hoàn thành xuất sắc khóa học và được trao chứng chỉ này
                            </p>
                        </div>

                        {/* Certificate ID */}
                        <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1">
                            <span className="text-xs text-gray-500">Mã chứng chỉ:</span>
                            <span className="font-mono text-sm font-semibold text-blue-600">
                                {mockCourseData.certificateId}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Certificate Display - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <CertificateDisplay />
                    </div>

                    {/* Sidebar - Takes 1 column */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl border border-gray-100 bg-white p-4 text-center">
                                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div className="text-2xl font-bold text-emerald-600">{mockCourseData.grade}</div>
                                <div className="text-xs text-gray-500">Điểm số</div>
                            </div>
                            <div className="rounded-xl border border-gray-100 bg-white p-4 text-center">
                                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                    <BookOpen className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {mockCourseData.completedLessons}
                                </div>
                                <div className="text-xs text-gray-500">Bài học</div>
                            </div>
                        </div>

                        {/* Course Summary */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                                    <BookOpen className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900">Thông tin khóa học</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="mb-1 line-clamp-2 font-semibold text-gray-900">
                                        {mockCourseData.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">Giảng viên: {mockCourseData.instructor}</p>
                                </div>

                                {/* Course Metadata */}
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                        <span>{mockCourseData.completionDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Trophy className="h-4 w-4" />
                                        <span>{mockCourseData.level}</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div>
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="text-gray-600">Tiến độ hoàn thành</span>
                                        <span className="font-semibold text-emerald-600">100%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">
                                        {mockCourseData.completedLessons}/{mockCourseData.totalLessons} bài học •{" "}
                                        {mockCourseData.duration}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Earned */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                                    <Star className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900">Kỹ năng đạt được</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {mockCourseData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center rounded-full border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 text-xs font-medium text-blue-700"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Achievement Banner */}
                        <div className="rounded-xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 p-6 text-white shadow-lg">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-bold text-white">Thành tích xuất sắc</h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white/90">Tỷ lệ hoàn thành</span>
                                    <span className="font-bold text-white">100%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white/90">Xếp loại</span>
                                    <span className="font-bold text-white">Xuất sắc</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white/90">Thời gian học</span>
                                    <span className="font-bold text-white">{mockCourseData.duration}</span>
                                </div>
                            </div>

                            {/* Success Badge */}
                            <div className="mt-4 border-t border-white/20 pt-4">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                                    <Trophy className="h-4 w-4" />
                                    <span>Chứng chỉ đã được xác thực</span>
                                </div>
                            </div>
                        </div>

                        {/* Student Info */}
                        <StudentInfomation />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificatePage;
