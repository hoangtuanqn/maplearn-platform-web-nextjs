import React from "react";
import { Download, Award, Calendar, User, BookOpen, CheckCircle, Trophy, Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import Certificate from "./_components/Certificate";
import { ShareButton } from "~/app/(student)/_components/Shared/ShareButton";
import { Metadata } from "next";
import StudentInfomation from "./_components/StudentInfomation";

// Mock data - bạn sẽ thay thế bằng dữ liệu thật từ API
const mockCourseData = {
    title: "Lập trình React.js từ cơ bản đến nâng cao",
    instructor: "Nguyễn Văn A",
    completionDate: "15/09/2024",
    duration: "40 giờ",
    totalLessons: 45,
    completedLessons: 45,
    grade: "A+",
    skills: ["React.js", "JavaScript ES6+", "Redux", "React Router", "API Integration"],
};

const mockUserData = {
    fullName: "Phạm Hoàng Tuấn",
    email: "tranvannam@email.com",
};
export const metadata: Metadata = {
    title: "Chứng chỉ hoàn thành khóa học",
};
const CertificatePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header Section */}
            <div className="border-b bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-emerald-100 p-2">
                            <Trophy className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Chứng chỉ hoàn thành khóa học</h1>
                            <p className="text-gray-600">Xin chúc mừng! Bạn đã hoàn thành xuất sắc khóa học</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Certificate Display */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl bg-white p-8">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Chứng chỉ của bạn</h2>
                                <div className="flex gap-3">
                                    <Button variant={"outline"}>
                                        <Download className="h-4 w-4" />
                                        Tải xuống
                                    </Button>
                                    {/* <Button variant="outline" onClick={handleShare}>
                                        <Share2 className="h-4 w-4" />
                                        Chia sẻ
                                    </Button> */}
                                    <ShareButton />
                                </div>
                            </div>

                            {/* Certificate Component */}
                            <div className="flex justify-center">
                                <div className="h-fit w-fit transform">
                                    <Certificate
                                        fullName={mockUserData.fullName}
                                        eventName={mockCourseData.title}
                                        eventDate={mockCourseData.completionDate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Info Sidebar */}
                    <div className="space-y-6">
                        {/* Course Summary */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-lg bg-blue-100 p-2">
                                    <BookOpen className="h-5 w-5 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-gray-900">Thông tin khóa học</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="mb-1 font-semibold text-gray-900">{mockCourseData.title}</h4>
                                    <p className="text-sm text-gray-600">Giảng viên: {mockCourseData.instructor}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-lg bg-emerald-50 p-3 text-center">
                                        <div className="text-lg font-bold text-emerald-600">{mockCourseData.grade}</div>
                                        <div className="text-xs text-gray-600">Điểm số</div>
                                    </div>
                                    <div className="rounded-lg bg-blue-50 p-3 text-center">
                                        <div className="text-lg font-bold text-blue-600">{mockCourseData.duration}</div>
                                        <div className="text-xs text-gray-600">Thời lượng</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Hoàn thành: {mockCourseData.completionDate}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>
                                        {mockCourseData.completedLessons}/{mockCourseData.totalLessons} bài học hoàn
                                        thành
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Skills Earned */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-lg bg-purple-100 p-2">
                                    <Star className="h-5 w-5 text-purple-600" />
                                </div>
                                <h3 className="font-bold text-gray-900">Kỹ năng đạt được</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {mockCourseData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 text-sm font-medium text-blue-700"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Achievement Stats */}
                        <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 p-6 text-white shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <Award className="h-6 w-6" />
                                <h3 className="font-bold">Thành tích</h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm opacity-90">Tỷ lệ hoàn thành</span>
                                    <span className="font-bold">100%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm opacity-90">Thời gian học tập</span>
                                    <span className="font-bold">{mockCourseData.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm opacity-90">Xếp hạng</span>
                                    <span className="font-bold">Xuất sắc</span>
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
