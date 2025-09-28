"use client";

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
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { CheckCircle, BookOpen, Trophy, Target, TrendingUp, Award, Calendar, Star } from "lucide-react";

const studentA = {
    id: 1,
    full_name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    avatar: "https://i.pravatar.cc/100?u=student-a",
    phone_number: "0901234567",
    enrolled_at: "2024-01-15T08:00:00Z",
    is_completed: false,
    completion_date: null,
    certificate_code: null,
    completed_lessons: 28,
    total_lessons: 35,
    completion_percentage: 80,
    exam_score: 85,
    lessons_in_week: 4,
    hours_in_week: 12.5,
    status: "Đang học" as const,
    // Dữ liệu mở rộng dựa trên schema thực tế
    total_study_hours: 156.8,
    streak_days: 15,
    badges: ["Chăm chỉ", "Hoàn thành bài tập"],
    // Dữ liệu theo chương (course_chapters)
    chapter_progress: [
        { chapter: "Chương 1: Hàm số", completed: 8, total: 8, percentage: 100 },
        { chapter: "Chương 2: Đạo hàm", completed: 7, total: 9, percentage: 78 },
        { chapter: "Chương 3: Tích phân", completed: 6, total: 10, percentage: 60 },
        { chapter: "Chương 4: Hình học", completed: 7, total: 8, percentage: 88 },
    ],
    // Lịch sử làm bài thi (exam_attempts)
    exam_attempts: [
        { attempt: 1, score: 75, time_spent: 90, violation_count: 0, date: "2024-02-15" },
        { attempt: 2, score: 82, time_spent: 85, violation_count: 1, date: "2024-02-28" },
        { attempt: 3, score: 85, time_spent: 80, violation_count: 0, date: "2024-03-15" },
    ],
    // Thời gian học theo tuần
    weekly_study_time: [
        { week: "Tuần 1", hours: 8, lessons: 3 },
        { week: "Tuần 2", hours: 12, lessons: 4 },
        { week: "Tuần 3", hours: 15, lessons: 5 },
        { week: "Tuần 4", hours: 10, lessons: 3 },
    ],
    // Đánh giá khóa học
    course_rating: 4.2,
    course_review: "Khóa học rất hay, giảng viên nhiệt tình",
};

const studentB = {
    id: 2,
    full_name: "Trần Thị Bình",
    email: "tranthibinh@email.com",
    avatar: "https://i.pravatar.cc/100?u=student-b",
    phone_number: "0907654321",
    enrolled_at: "2024-01-20T08:00:00Z",
    is_completed: true,
    completion_date: "2024-03-25T16:30:00Z",
    certificate_code: "CERT-2024-001234",
    completed_lessons: 35,
    total_lessons: 35,
    completion_percentage: 100,
    exam_score: 92,
    lessons_in_week: 5,
    hours_in_week: 15.2,
    status: "Đã hoàn thành" as const,
    total_study_hours: 189.4,
    streak_days: 28,
    badges: ["Xuất sắc", "Hoàn thành khóa học", "Top 1"],
    chapter_progress: [
        { chapter: "Chương 1: Hàm số", completed: 8, total: 8, percentage: 100 },
        { chapter: "Chương 2: Đạo hàm", completed: 9, total: 9, percentage: 100 },
        { chapter: "Chương 3: Tích phân", completed: 10, total: 10, percentage: 100 },
        { chapter: "Chương 4: Hình học", completed: 8, total: 8, percentage: 100 },
    ],
    exam_attempts: [
        { attempt: 1, score: 88, time_spent: 75, violation_count: 0, date: "2024-02-10" },
        { attempt: 2, score: 92, time_spent: 70, violation_count: 0, date: "2024-02-25" },
    ],
    weekly_study_time: [
        { week: "Tuần 1", hours: 12, lessons: 4 },
        { week: "Tuần 2", hours: 16, lessons: 6 },
        { week: "Tuần 3", hours: 18, lessons: 6 },
        { week: "Tuần 4", hours: 14, lessons: 5 },
    ],
    course_rating: 4.8,
    course_review: "Khóa học tuyệt vời, nội dung chất lượng cao",
};

const compareData = [
    { label: "Bài học hoàn thành", A: studentA.completed_lessons, B: studentB.completed_lessons },
    { label: "Tỷ lệ hoàn thành (%)", A: studentA.completion_percentage, B: studentB.completion_percentage },
    { label: "Điểm thi", A: studentA.exam_score, B: studentB.exam_score },
    { label: "Bài học/tuần", A: studentA.lessons_in_week, B: studentB.lessons_in_week },
    { label: "Giờ học/tuần", A: studentA.hours_in_week, B: studentB.hours_in_week },
    { label: "Tổng giờ học", A: Math.round(studentA.total_study_hours), B: Math.round(studentB.total_study_hours) },
];

const chapterProgressData = studentA.chapter_progress.map((chapter, index) => ({
    chapter: chapter.chapter.replace("Chương ", "Ch."),
    [studentA.full_name]: chapter.percentage,
    [studentB.full_name]: studentB.chapter_progress[index].percentage,
}));

const weeklyStudyData = studentA.weekly_study_time.map((week, index) => ({
    week: week.week,
    [studentA.full_name]: week.hours,
    [studentB.full_name]: studentB.weekly_study_time[index].hours,
}));

const examAttemptsData = [
    {
        name: "Lần 1",
        [studentA.full_name]: studentA.exam_attempts[0].score,
        [studentB.full_name]: studentB.exam_attempts[0].score,
    },
    {
        name: "Lần 2",
        [studentA.full_name]: studentA.exam_attempts[1].score,
        [studentB.full_name]: studentB.exam_attempts[1].score,
    },
    {
        name: "Lần 3",
        [studentA.full_name]: studentA.exam_attempts[2]?.score || 0,
        [studentB.full_name]: studentB.exam_attempts[2]?.score || 0,
    },
];

const violationData = [
    {
        name: "Không vi phạm",
        value: studentA.exam_attempts.filter((a) => a.violation_count === 0).length,
        color: "#10b981",
    },
    { name: "Có vi phạm", value: studentA.exam_attempts.filter((a) => a.violation_count > 0).length, color: "#ef4444" },
];

const badgeColors = [
    "bg-blue-100 text-blue-700 border-blue-200",
    "bg-green-100 text-green-700 border-green-200",
    "bg-purple-100 text-purple-700 border-purple-200",
    "bg-pink-100 text-pink-700 border-pink-200",
    "bg-yellow-100 text-yellow-700 border-yellow-200",
    "bg-indigo-100 text-indigo-700 border-indigo-200",
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Đã hoàn thành":
            return "bg-green-100 text-green-800 border-green-200";
        case "Đang học":
            return "bg-blue-100 text-blue-800 border-blue-200";
        case "Chưa đạt bài thi":
            return "bg-red-100 text-red-800 border-red-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const StudentComparisonPage = () => {
    return (
        <div className="min-h-screen bg-white p-3 sm:p-6">
            {/* Header */}
            <div className="mb-6 text-center sm:mb-8">
                <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">So Sánh Quá Trình Học Tập</h1>
                <p className="text-xs text-gray-600 sm:text-sm">
                    Phân tích chi tiết tiến độ học tập trong khóa học Toán 12
                </p>
            </div>

            {/* Thông tin tổng quan học sinh */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:gap-6 lg:grid-cols-2">
                {/* Học sinh A */}
                <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <img
                            src={studentA.avatar || "/placeholder.svg"}
                            alt={studentA.full_name}
                            className="mx-auto h-12 w-12 rounded-full border-2 border-gray-200 object-cover sm:mx-0 sm:h-16 sm:w-16"
                        />
                        <div className="w-full flex-1">
                            <div className="mb-2 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                <h3 className="text-center text-lg font-bold text-gray-900 sm:text-left sm:text-xl">
                                    {studentA.full_name}
                                </h3>
                                <span
                                    className={`rounded-full border px-3 py-1 text-center text-xs font-medium ${getStatusColor(studentA.status)}`}
                                >
                                    {studentA.status}
                                </span>
                            </div>
                            <p className="mb-3 text-center text-xs text-gray-600 sm:text-left sm:text-sm">
                                {studentA.email}
                            </p>

                            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div className="flex items-center justify-center space-x-2 sm:justify-start">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Ngày đăng ký</p>
                                        <p className="text-xs font-medium text-gray-900 sm:text-sm">
                                            {formatDate(studentA.enrolled_at)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center space-x-2 sm:justify-start">
                                    <Trophy className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Chuỗi học</p>
                                        <p className="text-xs font-medium text-gray-900 sm:text-sm">
                                            {studentA.streak_days} ngày
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4 grid grid-cols-3 gap-2 text-center sm:gap-4">
                                <div className="rounded-lg bg-blue-50 p-2 sm:p-3">
                                    <BookOpen className="mx-auto mb-1 h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                                    <p className="text-sm font-bold text-blue-900 sm:text-lg">
                                        {studentA.completed_lessons}/{studentA.total_lessons}
                                    </p>
                                    <p className="text-xs text-blue-700">Bài học</p>
                                </div>
                                <div className="rounded-lg bg-green-50 p-2 sm:p-3">
                                    <Target className="mx-auto mb-1 h-4 w-4 text-green-600 sm:h-5 sm:w-5" />
                                    <p className="text-sm font-bold text-green-900 sm:text-lg">
                                        {studentA.completion_percentage}%
                                    </p>
                                    <p className="text-xs text-green-700">Hoàn thành</p>
                                </div>
                                <div className="rounded-lg bg-purple-50 p-2 sm:p-3">
                                    <Star className="mx-auto mb-1 h-4 w-4 text-purple-600 sm:h-5 sm:w-5" />
                                    <p className="text-sm font-bold text-purple-900 sm:text-lg">
                                        {studentA.exam_score}
                                    </p>
                                    <p className="text-xs text-purple-700">Điểm thi</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-1 sm:justify-start sm:gap-2">
                                {studentA.badges.map((badge, idx) => (
                                    <span
                                        key={badge}
                                        className={`rounded-full border px-2 py-1 text-xs font-medium ${badgeColors[idx % badgeColors.length]}`}
                                    >
                                        <Award className="mr-1 inline h-3 w-3" />
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Học sinh B */}
                <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <img
                            src={studentB.avatar || "/placeholder.svg"}
                            alt={studentB.full_name}
                            className="mx-auto h-12 w-12 rounded-full border-2 border-gray-200 object-cover sm:mx-0 sm:h-16 sm:w-16"
                        />
                        <div className="w-full flex-1">
                            <div className="mb-2 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                <h3 className="text-center text-lg font-bold text-gray-900 sm:text-left sm:text-xl">
                                    {studentB.full_name}
                                </h3>
                                <span
                                    className={`rounded-full border px-3 py-1 text-center text-xs font-medium ${getStatusColor(studentB.status)}`}
                                >
                                    {studentB.status}
                                </span>
                            </div>
                            <p className="mb-3 text-center text-xs text-gray-600 sm:text-left sm:text-sm">
                                {studentB.email}
                            </p>

                            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div className="flex items-center justify-center space-x-2 sm:justify-start">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Ngày đăng ký</p>
                                        <p className="text-xs font-medium text-gray-900 sm:text-sm">
                                            {formatDate(studentB.enrolled_at)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center space-x-2 sm:justify-start">
                                    <Trophy className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Chuỗi học</p>
                                        <p className="text-xs font-medium text-gray-900 sm:text-sm">
                                            {studentB.streak_days} ngày
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4 grid grid-cols-3 gap-2 text-center sm:gap-4">
                                <div className="rounded-lg bg-blue-50 p-2 sm:p-3">
                                    <BookOpen className="mx-auto mb-1 h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                                    <p className="text-sm font-bold text-blue-900 sm:text-lg">
                                        {studentB.completed_lessons}/{studentB.total_lessons}
                                    </p>
                                    <p className="text-xs text-blue-700">Bài học</p>
                                </div>
                                <div className="rounded-lg bg-green-50 p-2 sm:p-3">
                                    <Target className="mx-auto mb-1 h-4 w-4 text-green-600 sm:h-5 sm:w-5" />
                                    <p className="text-sm font-bold text-green-900 sm:text-lg">
                                        {studentB.completion_percentage}%
                                    </p>
                                    <p className="text-xs text-green-700">Hoàn thành</p>
                                </div>
                                <div className="rounded-lg bg-purple-50 p-2 sm:p-3">
                                    <Star className="mx-auto mb-1 h-4 w-4 text-purple-600 sm:h-5 sm:w-5" />
                                    <p className="text-sm font-bold text-purple-900 sm:text-lg">
                                        {studentB.exam_score}
                                    </p>
                                    <p className="text-xs text-purple-700">Điểm thi</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-1 sm:justify-start sm:gap-2">
                                {studentB.badges.map((badge, idx) => (
                                    <span
                                        key={badge}
                                        className={`rounded-full border px-2 py-1 text-xs font-medium ${badgeColors[idx % badgeColors.length]}`}
                                    >
                                        <Award className="mr-1 inline h-3 w-3" />
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:gap-6 lg:grid-cols-2">
                {/* Tiến độ theo chương */}
                <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                    <h3 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Tiến Độ Theo Chương</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chapterProgressData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis
                                dataKey="chapter"
                                tick={{ fontSize: 10, fill: "#64748b" }}
                                tickLine={{ stroke: "#e2e8f0" }}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis tick={{ fontSize: 10, fill: "#64748b" }} tickLine={{ stroke: "#e2e8f0" }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "white",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                    color: "#1f2937",
                                    fontSize: "12px",
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: "12px" }} />
                            <Bar dataKey={studentA.full_name} fill="#3b82f6" radius={[2, 2, 0, 0]} />
                            <Bar dataKey={studentB.full_name} fill="#10b981" radius={[2, 2, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Thời gian học theo tuần */}
                <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                    <h3 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Thời Gian Học Theo Tuần</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={weeklyStudyData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis
                                dataKey="week"
                                tick={{ fontSize: 10, fill: "#64748b" }}
                                tickLine={{ stroke: "#e2e8f0" }}
                            />
                            <YAxis tick={{ fontSize: 10, fill: "#64748b" }} tickLine={{ stroke: "#e2e8f0" }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "white",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                    color: "#1f2937",
                                    fontSize: "12px",
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: "12px" }} />
                            <Line
                                type="monotone"
                                dataKey={studentA.full_name}
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                            />
                            <Line
                                type="monotone"
                                dataKey={studentB.full_name}
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:gap-6 lg:grid-cols-3">
                {/* Lịch sử làm bài thi */}
                <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:p-6 lg:col-span-2">
                    <h3 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Lịch Sử Làm Bài Thi</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={examAttemptsData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 10, fill: "#64748b" }}
                                tickLine={{ stroke: "#e2e8f0" }}
                            />
                            <YAxis
                                domain={[0, 100]}
                                tick={{ fontSize: 10, fill: "#64748b" }}
                                tickLine={{ stroke: "#e2e8f0" }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "white",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                    color: "#1f2937",
                                    fontSize: "12px",
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: "12px" }} />
                            <Line
                                type="monotone"
                                dataKey={studentA.full_name}
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey={studentB.full_name}
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Phân tích vi phạm */}
                <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                    <h3 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Vi Phạm Thi Cử</h3>
                    <div className="mb-4">
                        <ResponsiveContainer width="100%" height={150}>
                            <PieChart>
                                <Pie
                                    data={violationData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={30}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {violationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span className="text-xs text-gray-600 sm:text-sm">Không vi phạm</span>
                            </div>
                            <span className="text-xs font-medium text-gray-900 sm:text-sm">
                                {violationData[0].value} lần
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <span className="text-xs text-gray-600 sm:text-sm">Có vi phạm</span>
                            </div>
                            <span className="text-xs font-medium text-gray-900 sm:text-sm">
                                {violationData[1].value} lần
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:mb-8 sm:p-6">
                <h3 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Bảng So Sánh Chi Tiết</h3>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="pb-3 text-left text-xs font-semibold text-gray-600 sm:text-sm">
                                    Chỉ Số
                                </th>
                                <th className="pb-3 text-center text-xs font-semibold text-blue-600 sm:text-sm">
                                    {studentA.full_name}
                                </th>
                                <th className="pb-3 text-center text-xs font-semibold text-green-600 sm:text-sm">
                                    {studentB.full_name}
                                </th>
                                <th className="pb-3 text-center text-xs font-semibold text-gray-600 sm:text-sm">
                                    Chênh Lệch
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="py-3 text-xs text-gray-600 sm:text-sm">Bài học hoàn thành</td>
                                <td className="py-3 text-center text-xs font-medium text-blue-600 sm:text-sm">
                                    {studentA.completed_lessons}/{studentA.total_lessons}
                                </td>
                                <td className="py-3 text-center text-xs font-medium text-green-600 sm:text-sm">
                                    {studentB.completed_lessons}/{studentB.total_lessons}
                                </td>
                                <td className="py-3 text-center text-xs sm:text-sm">
                                    <span
                                        className={
                                            studentB.completed_lessons > studentA.completed_lessons
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {studentB.completed_lessons > studentA.completed_lessons ? "+" : ""}
                                        {studentB.completed_lessons - studentA.completed_lessons}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 text-xs text-gray-600 sm:text-sm">Điểm thi cao nhất</td>
                                <td className="py-3 text-center text-xs font-medium text-blue-600 sm:text-sm">
                                    {studentA.exam_score}
                                </td>
                                <td className="py-3 text-center text-xs font-medium text-green-600 sm:text-sm">
                                    {studentB.exam_score}
                                </td>
                                <td className="py-3 text-center text-xs sm:text-sm">
                                    <span
                                        className={
                                            studentB.exam_score > studentA.exam_score
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {studentB.exam_score > studentA.exam_score ? "+" : ""}
                                        {studentB.exam_score - studentA.exam_score}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 text-xs text-gray-600 sm:text-sm">Số lần thi</td>
                                <td className="py-3 text-center text-xs font-medium text-blue-600 sm:text-sm">
                                    {studentA.exam_attempts.length}
                                </td>
                                <td className="py-3 text-center text-xs font-medium text-green-600 sm:text-sm">
                                    {studentB.exam_attempts.length}
                                </td>
                                <td className="py-3 text-center text-xs sm:text-sm">
                                    <span
                                        className={
                                            studentB.exam_attempts.length < studentA.exam_attempts.length
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {studentB.exam_attempts.length < studentA.exam_attempts.length ? "-" : "+"}
                                        {Math.abs(studentB.exam_attempts.length - studentA.exam_attempts.length)}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 text-xs text-gray-600 sm:text-sm">Tổng vi phạm</td>
                                <td className="py-3 text-center text-xs font-medium text-blue-600 sm:text-sm">
                                    {studentA.exam_attempts.reduce((sum, attempt) => sum + attempt.violation_count, 0)}
                                </td>
                                <td className="py-3 text-center text-xs font-medium text-green-600 sm:text-sm">
                                    {studentB.exam_attempts.reduce((sum, attempt) => sum + attempt.violation_count, 0)}
                                </td>
                                <td className="py-3 text-center text-xs sm:text-sm">
                                    <span className="text-green-600">
                                        {studentB.exam_attempts.reduce(
                                            (sum, attempt) => sum + attempt.violation_count,
                                            0,
                                        ) <
                                        studentA.exam_attempts.reduce(
                                            (sum, attempt) => sum + attempt.violation_count,
                                            0,
                                        )
                                            ? "Tốt hơn"
                                            : "Bằng nhau"}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 text-xs text-gray-600 sm:text-sm">Đánh giá khóa học</td>
                                <td className="py-3 text-center text-xs font-medium text-blue-600 sm:text-sm">
                                    {studentA.course_rating}/5 ⭐
                                </td>
                                <td className="py-3 text-center text-xs font-medium text-green-600 sm:text-sm">
                                    {studentB.course_rating}/5 ⭐
                                </td>
                                <td className="py-3 text-center text-xs sm:text-sm">
                                    <span
                                        className={
                                            studentB.course_rating > studentA.course_rating
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {studentB.course_rating > studentA.course_rating ? "+" : ""}
                                        {(studentB.course_rating - studentA.course_rating).toFixed(1)}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 text-xs text-gray-600 sm:text-sm">Chuỗi học liên tiếp</td>
                                <td className="py-3 text-center text-xs font-medium text-blue-600 sm:text-sm">
                                    {studentA.streak_days} ngày
                                </td>
                                <td className="py-3 text-center text-xs font-medium text-green-600 sm:text-sm">
                                    {studentB.streak_days} ngày
                                </td>
                                <td className="py-3 text-center text-xs sm:text-sm">
                                    <span
                                        className={
                                            studentB.streak_days > studentA.streak_days
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {studentB.streak_days > studentA.streak_days ? "+" : ""}
                                        {studentB.streak_days - studentA.streak_days} ngày
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:mb-8 sm:p-6">
                <h3 className="mb-6 text-base font-semibold text-gray-900 sm:text-lg">Chi Tiết Tiến Độ Theo Chương</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                    {studentA.chapter_progress.map((chapter, index) => (
                        <div key={chapter.chapter} className="rounded-lg border border-gray-100 bg-gray-50 p-3 sm:p-4">
                            <h4 className="mb-3 text-center text-sm font-medium text-gray-900 sm:text-base">
                                {chapter.chapter}
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-blue-600 sm:text-sm">{studentA.full_name}</span>
                                    <span className="text-xs font-bold text-blue-600 sm:text-sm">
                                        {chapter.completed}/{chapter.total}
                                    </span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-blue-500"
                                        style={{ width: `${chapter.percentage}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-green-600 sm:text-sm">{studentB.full_name}</span>
                                    <span className="text-xs font-bold text-green-600 sm:text-sm">
                                        {studentB.chapter_progress[index].completed}/
                                        {studentB.chapter_progress[index].total}
                                    </span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-green-500"
                                        style={{ width: `${studentB.chapter_progress[index].percentage}%` }}
                                    ></div>
                                </div>
                                <div className="pt-2 text-center">
                                    <span className="text-xs text-gray-500">
                                        Chênh lệch:{" "}
                                        {studentB.chapter_progress[index].percentage > chapter.percentage ? "+" : ""}
                                        {studentB.chapter_progress[index].percentage - chapter.percentage}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                <h3 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Tóm Tắt & Nhận Xét</h3>
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-900 sm:text-base">Điểm Mạnh</h4>
                        <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                <p className="text-xs text-gray-600 sm:text-sm">
                                    <span className="font-medium text-green-600">{studentB.full_name}</span> hoàn thành
                                    khóa học với điểm số xuất sắc ({studentB.exam_score} điểm)
                                </p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                <p className="text-xs text-gray-600 sm:text-sm">
                                    <span className="font-medium text-green-600">{studentB.full_name}</span> có ít lần
                                    thi hơn nhưng đạt điểm cao hơn, cho thấy hiệu quả học tập tốt
                                </p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                <p className="text-xs text-gray-600 sm:text-sm">
                                    <span className="font-medium text-green-600">{studentB.full_name}</span> không có vi
                                    phạm nào trong quá trình thi cử
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-900 sm:text-base">Cơ Hội Cải Thiện</h4>
                        <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                                <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                                <p className="text-xs text-gray-600 sm:text-sm">
                                    <span className="font-medium text-blue-600">{studentA.full_name}</span> cần tập
                                    trung hoàn thành các chương còn lại, đặc biệt là Chương 3
                                </p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                                <p className="text-xs text-gray-600 sm:text-sm">
                                    <span className="font-medium text-blue-600">{studentA.full_name}</span> nên cải
                                    thiện kỹ năng làm bài thi để tránh vi phạm
                                </p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                                <p className="text-xs text-gray-600 sm:text-sm">
                                    Cả hai học sinh đều có thể tham gia thêm các hoạt động thảo luận để nâng cao hiểu
                                    biết
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentComparisonPage;
