"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Calendar, BarChart3, DollarSign, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import courseAdminApi from "~/apiRequest/admin/course";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { formatter } from "~/libs/format";

// Format date for display
const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        return format(date, "dd/MM", { locale: vi });
    } catch {
        return dateString;
    }
};

// Custom tooltip component với design mới
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const studentData = payload.find((p: any) => p.dataKey === "students");
        const revenueData = payload.find((p: any) => p.dataKey === "revenue");

        return (
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-xl">
                <div className="mb-2">
                    <p className="text-sm font-semibold text-gray-900">
                        <Calendar className="mr-2 inline h-4 w-4" />
                        {label}
                    </p>
                </div>
                <div className="space-y-2">
                    {studentData && (
                        <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm text-gray-600">
                                <Users className="mr-2 h-4 w-4 text-blue-500" />
                                Học sinh đăng ký:
                            </span>
                            <span className="font-bold text-blue-600">{studentData.value}</span>
                        </div>
                    )}
                    {revenueData && (
                        <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm text-gray-600">
                                <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                                Doanh thu:
                            </span>
                            <span className="font-bold text-green-600">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(revenueData.value)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

export default function CourseStudentChart({ slug }: { slug: string }) {
    const {
        data: rawData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["course-student-stats", slug],
        queryFn: async () => {
            const res = await courseAdminApi.getCourseStudentStats(slug);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Process data for chart
    const chartData = rawData
        ? rawData.map((item) => ({
              date: formatDate(item.date),
              students: item.student_count,
              revenue: item.revenue,
              originalDate: item.date,
          }))
        : [];

    // Calculate statistics
    const totalStudents = chartData.reduce((sum, item) => sum + item.students, 0);
    const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
    const averageStudents = chartData.length > 0 ? Math.round(totalStudents / chartData.length) : 0;
    const averageRevenue = chartData.length > 0 ? Math.round(totalRevenue / chartData.length) : 0;

    if (isLoading) {
        return (
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="animate-pulse">
                    <div className="mb-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="h-6 w-48 rounded bg-gray-200"></div>
                            <div className="h-8 w-32 rounded bg-gray-200"></div>
                        </div>
                        <div className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 p-4"
                                >
                                    <div className="mb-2 h-4 w-20 rounded bg-gray-200"></div>
                                    <div className="h-8 w-16 rounded bg-gray-200"></div>
                                    <div className="mt-2 h-3 w-12 rounded bg-gray-200"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-96 w-full rounded bg-gray-200"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="py-12 text-center">
                    <BarChart3 className="mx-auto mb-4 h-16 w-16 text-red-300" />
                    <h3 className="mb-2 text-lg font-semibold text-red-600">Không thể tải dữ liệu</h3>
                    <p className="text-sm text-gray-500">Vui lòng thử lại sau hoặc liên hệ hỗ trợ</p>
                </div>
            </div>
        );
    }

    if (!chartData || chartData.length === 0) {
        return (
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100">
                        <Users className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Chưa có dữ liệu thống kê</h3>
                    <p className="text-sm text-gray-500">
                        Dữ liệu sẽ xuất hiện khi có học sinh đăng ký khóa học trong 7 ngày qua
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:p-6">
            {/* Header */}
            <div className="mb-4 md:mb-6">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:mb-4">
                    <h3 className="flex items-center text-base font-bold text-gray-900 md:text-lg">
                        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 md:mr-3 md:h-10 md:w-10">
                            <BarChart3 className="h-4 w-4 text-white md:h-5 md:w-5" />
                        </div>
                        <span className="hidden sm:inline">Thống kê khóa học 7 ngày qua</span>
                        <span className="sm:hidden">Thống kê 7 ngày</span>
                    </h3>
                </div>

                {/* Stats cards với responsive design */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
                    {/* Tổng học sinh */}
                    <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100 p-3 transition-all hover:shadow-md md:rounded-xl md:p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-blue-600">Tổng học sinh</p>
                                <p className="text-lg font-bold text-blue-700 md:text-2xl">{totalStudents}</p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 md:h-12 md:w-12 md:rounded-xl">
                                <Users className="h-4 w-4 text-white md:h-6 md:w-6" />
                            </div>
                        </div>
                    </div>

                    {/* Tổng doanh thu */}
                    <div className="rounded-lg border border-green-100 bg-gradient-to-br from-green-50 to-emerald-100 p-3 transition-all hover:shadow-md md:rounded-xl md:p-4">
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-green-600">Tổng doanh thu</p>
                                <p className="truncate text-lg font-bold text-green-700 md:text-2xl">
                                    {formatter.number(totalRevenue)}đ
                                </p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 md:h-12 md:w-12 md:rounded-xl">
                                <DollarSign className="h-4 w-4 text-white md:h-6 md:w-6" />
                            </div>
                        </div>
                    </div>

                    {/* Trung bình học sinh */}
                    <div className="rounded-lg border border-purple-100 bg-gradient-to-br from-purple-50 to-purple-100 p-3 transition-all hover:shadow-md md:rounded-xl md:p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-purple-600">
                                    <span className="hidden sm:inline">TB/ngày (học sinh)</span>
                                    <span className="sm:hidden">TB học sinh</span>
                                </p>
                                <p className="text-lg font-bold text-purple-700 md:text-2xl">{averageStudents}</p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 md:h-12 md:w-12 md:rounded-xl">
                                <Target className="h-4 w-4 text-white md:h-6 md:w-6" />
                            </div>
                        </div>
                    </div>

                    {/* Trung bình doanh thu */}
                    <div className="rounded-lg border border-orange-100 bg-gradient-to-br from-orange-50 to-orange-100 p-3 transition-all hover:shadow-md md:rounded-xl md:p-4">
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-orange-600">
                                    <span className="hidden sm:inline">TB/ngày (doanh thu)</span>
                                    <span className="sm:hidden">TB doanh thu</span>
                                </p>
                                <p className="truncate text-lg font-bold text-orange-700 md:text-2xl">
                                    {formatter.number(averageRevenue)}đ
                                </p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 md:h-12 md:w-12 md:rounded-xl">
                                <Calendar className="h-4 w-4 text-white md:h-6 md:w-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart với responsive height */}
            <div className="h-64 w-full sm:h-80 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="studentsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="#e5e7eb" />

                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                            dy={10}
                        />

                        <YAxis
                            yAxisId="students"
                            orientation="left"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#3b82f6" }}
                            dx={-10}
                            allowDecimals={false}
                        />

                        <YAxis
                            yAxisId="revenue"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#10b981" }}
                            dx={10}
                            tickFormatter={(value) => formatter.number(value) + "đ"}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <Area
                            yAxisId="students"
                            type="monotone"
                            dataKey="students"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="url(#studentsGradient)"
                            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#ffffff" }}
                        />

                        <Area
                            yAxisId="revenue"
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10b981"
                            strokeWidth={3}
                            fill="url(#revenueGradient)"
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2, fill: "#ffffff" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend với responsive */}
            <div className="mt-4 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-8 md:mt-6">
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-gray-600">Học sinh đăng ký</span>
                </div>
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-gray-600">Doanh thu (VND)</span>
                </div>
            </div>
        </div>
    );
}
