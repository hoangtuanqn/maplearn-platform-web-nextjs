import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, BookOpen, FileText, CreditCard, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatter } from "~/libs/format";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import DashboardSkeleton from "./DashboardSkeleton";
import dashboardTeacherApi from "~/apiRequest/teacher/dashboard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const allowedFields = ["start_date", "end_date"] as const;

const TeacherDashboard = () => {
    const { start_date, end_date } = useGetSearchQuery(allowedFields);
    const [revenueCurrentPage, setRevenueCurrentPage] = useState(0);
    const [_, setActivityCurrentPage] = useState(0);
    const itemsPerPage = 12; // Hiển thị 12 tháng mỗi lần

    // Reset pages khi filter thay đổi
    useEffect(() => {
        setRevenueCurrentPage(0);
        setActivityCurrentPage(0);
    }, [start_date, end_date]);

    const { data: dashboard, isLoading } = useQuery({
        queryKey: ["teacher", "dashboard", { start_date, end_date }],
        queryFn: async () => {
            const res = await dashboardTeacherApi.getDashboard(start_date ?? "", end_date ?? "");
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    // Tính toán data cho charts từ API data - phù hợp với teacher schema
    const chartData = dashboard
        ? {
              // Dữ liệu doanh thu theo tháng từ total_in_this_year (object với key là YYYY-MM)
              allRevenueData: Object.entries(dashboard.total_in_this_year)
                  .map(([monthKey, revenue]) => ({
                      month: monthKey.split("-")[1] + "/" + monthKey.split("-")[0], // MM/YYYY
                      monthKey: monthKey,
                      revenue: revenue,
                  }))
                  .sort((a, b) => a.monthKey.localeCompare(b.monthKey)), // Sort tăng dần để có thứ tự đúng

              // Top courses data cho PieChart
              topCoursesData: dashboard.top_courses.map((course, index) => {
                  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
                  return {
                      name: course.name,
                      students: course.students_count,
                      revenue: course.revenue,
                      color: colors[index % colors.length],
                  };
              }),

              // Students per course cho BarChart
              studentsPerCourseData: dashboard.students_per_course.map((course) => ({
                  courseName:
                      course.course_name.length > 20 ? course.course_name.substring(0, 20) + "..." : course.course_name,
                  fullName: course.course_name,
                  students: course.students_count,
              })),

              // Exam submissions data
              examSubmissionsData: dashboard.recent_exam_submissions.map((submission) => ({
                  name: submission.full_name,
                  score: submission.score,
                  exam: submission.exam_title || "Không có tiêu đề",
                  submittedAt: submission.submitted_at,
              })),
          }
        : null;

    // Tính toán dữ liệu phân trang cho biểu đồ doanh thu - Dữ liệu mới nhất ở bên phải
    const revenueDataForChart = chartData
        ? (() => {
              const totalItems = chartData.allRevenueData.length;
              const totalPagesCount = Math.ceil(totalItems / itemsPerPage);

              // Tính toán để dữ liệu mới nhất luôn ở bên phải
              // Trang cuối cùng (index cao nhất) = dữ liệu mới nhất
              const pageFromEnd = totalPagesCount - 1 - revenueCurrentPage;
              const endIndex = totalItems - pageFromEnd * itemsPerPage;
              const startIndex = Math.max(0, endIndex - itemsPerPage);

              return chartData.allRevenueData.slice(startIndex, endIndex);
          })()
        : [];

    const revenueTotalPages = chartData ? Math.ceil(chartData.allRevenueData.length / itemsPerPage) : 0;
    const showRevenuePagination = chartData ? chartData.allRevenueData.length > itemsPerPage : false;

    useEffect(() => {
        if (revenueTotalPages > 0) {
            setRevenueCurrentPage(revenueTotalPages - 1);
        }
    }, [revenueTotalPages]);

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (!dashboard) return null;
    return (
        <>
            {/* Thống kê tổng quan - 4 Cards chính */}
            <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                {/* Tổng số học sinh */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Học sinh đang theo học</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboard.total_students.toLocaleString()}
                            </p>
                            {/* <div className="mt-2 flex items-center">
                                    <User className="mr-1 h-4 w-4 text-green-500" />
                                    <span className="text-sm text-green-600">+{dashboard.top_4_new_students.length}</span>
                                    <span className="ml-1 text-sm text-gray-500">học sinh mới</span>
                                </div> */}
                        </div>
                        <div className="rounded-lg bg-blue-50 p-3">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Số khóa học */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Số khóa học đang dạy</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboard.total_courses}</p>
                        </div>
                        <div className="rounded-lg bg-green-50 p-3">
                            <BookOpen className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Số đề thi */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Số đề thi đã tạo</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboard.total_exams}</p>
                        </div>
                        <div className="rounded-lg bg-orange-50 p-3">
                            <FileText className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                </div>

                {/* Tổng doanh thu tháng này */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Doanh Thu tháng này</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboard.total_in_this_month.toLocaleString("vi-VN")} VNĐ
                            </p>
                        </div>
                        <div className="rounded-lg bg-yellow-50 p-3">
                            <DollarSign className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Biểu đồ chính - Row 2: Students per Course và Recent Submissions */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Biểu đồ doanh thu theo tháng */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Doanh Thu</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-500">VNĐ</div>
                            {revenueDataForChart.length > 0 && (
                                <div className="text-xs text-gray-400">
                                    {revenueDataForChart.length} tháng: {revenueDataForChart[0].month} đến{" "}
                                    {revenueDataForChart[revenueDataForChart.length - 1].month}
                                </div>
                            )}
                            {showRevenuePagination && (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setRevenueCurrentPage((prev) => Math.max(0, prev - 1))}
                                        disabled={revenueCurrentPage === 0}
                                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        title="Xem dữ liệu cũ hơn (về trái)"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <span className="px-2 text-sm text-gray-600">
                                        {revenueCurrentPage + 1}/{revenueTotalPages}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setRevenueCurrentPage((prev) => Math.min(revenueTotalPages - 1, prev + 1))
                                        }
                                        disabled={revenueCurrentPage === revenueTotalPages - 1}
                                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        title="Về dữ liệu mới hơn (về phải)"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="h-80">
                        {chartData && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueDataForChart}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fontSize: 12, fill: "#64748b" }}
                                        tickLine={{ stroke: "#e2e8f0" }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: "#64748b" }}
                                        tickLine={{ stroke: "#e2e8f0" }}
                                        tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => [`${formatter.number(value)} VNĐ`, "Doanh thu"]}
                                        labelStyle={{ color: "#1f2937" }}
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#3b82f6"
                                        fill="#3b82f6"
                                        fillOpacity={0.1}
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Recent Exam Submissions */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-900">Bài thi gần đây</h3>
                        <div className="text-sm text-gray-500">Điểm số</div>
                    </div>
                    <div className="h-80 overflow-y-auto">
                        {dashboard && (
                            <div className="space-y-3">
                                {dashboard.recent_exam_submissions.map((submission, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-medium text-white">
                                                {submission.full_name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{submission.full_name}</p>
                                                <p className="max-w-40 truncate text-sm text-gray-500">
                                                    {submission.exam_title || "Không có tiêu đề"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p
                                                className={`text-lg font-bold ${submission.score >= 8 ? "text-green-600" : submission.score >= 5 ? "text-yellow-600" : "text-red-600"}`}
                                            >
                                                {submission.score}/10
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(submission.submitted_at).toLocaleDateString("vi-VN")}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Danh sách hoạt động gần đây */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Người dùng mới */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900">Người Dùng Mới</h3>
                            <Link
                                href="/teacher/students"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {dashboard?.top_4_new_students?.slice(0, 5).map((user: any) => (
                                <div key={user.id} className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                                        {user.full_name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">{user.full_name}</p>
                                        <p className="truncate text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="text-xs text-gray-400">Mới</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Khóa học phổ biến */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900">Khóa Học Phổ Biến</h3>
                            <Link
                                href="/teacher/courses"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {dashboard?.top_courses?.slice(0, 5).map((course: any, index: number) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                                            <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <Link
                                            href={`/courses/${course.slug}`}
                                            target="_blank"
                                            className="line-clamp-1 truncate text-sm font-medium text-gray-900"
                                        >
                                            {course.name}
                                        </Link>
                                        <div className="mt-1 flex items-center space-x-4">
                                            <div className="flex items-center">
                                                <Users className="mr-1 h-3 w-3 text-gray-400" />
                                                <span className="text-xs text-gray-500">
                                                    {course.students_count} học viên
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs text-gray-500">Tổng doanh thu: </span>
                                                <span
                                                    className={`text-xs ${course.revenue === 0 ? "text-gray-500" : "font-bold text-green-600"}`}
                                                >
                                                    {course.revenue === 0
                                                        ? "Miễn phí"
                                                        : `${formatter.number(course.revenue)}đ`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Phản hồi gần đây */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900">Phản Hồi Gần Đây</h3>
                            <Link
                                href="/teacher/feedbacks"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {dashboard?.new_feedbacks?.slice(0, 5).map((feedback: any, index: number) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                                            <CreditCard className="h-4 w-4 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{feedback.student_name}</p>
                                            <p className="truncate text-xs text-gray-500">{feedback.comment}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-sm ${i < feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherDashboard;
