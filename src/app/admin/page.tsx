"use client";
import { Users, BookOpen, FileText, CreditCard, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import Link from "next/link";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

// Mock data - thay thế bằng API thật
const mockStats = {
    totalUsers: 12567,
    totalCourses: 245,
    totalExams: 189,
    totalPayments: 8934,
    totalRevenue: 2847500000,

    // Growth percentages
    userGrowth: 12.5,
    courseGrowth: 8.3,
    examGrowth: -2.1,
    paymentGrowth: 15.7,
    revenueGrowth: 23.4,

    // Recent activities
    recentUsers: [
        { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", joinedAt: "2024-03-15", avatar: "" },
        { id: 2, name: "Trần Thị B", email: "b@gmail.com", joinedAt: "2024-03-14", avatar: "" },
        { id: 3, name: "Lê Văn C", email: "c@gmail.com", joinedAt: "2024-03-13", avatar: "" },
        { id: 4, name: "Phạm Thị D", email: "d@gmail.com", joinedAt: "2024-03-12", avatar: "" },
    ],

    // Top courses
    topCourses: [
        { id: 1, name: "Lập trình React cơ bản", students: 1245, revenue: 186750000 },
        { id: 2, name: "JavaScript từ Zero to Hero", students: 987, revenue: 148050000 },
        { id: 3, name: "Node.js Backend Development", students: 743, revenue: 111450000 },
        { id: 4, name: "Database Design với MySQL", students: 692, revenue: 103800000 },
    ],

    // Recent payments
    recentPayments: [
        {
            id: 1,
            user: "Nguyễn Văn A",
            course: "React cơ bản",
            amount: 150000,
            method: "vnpay",
            status: "paid",
            date: "2024-03-15",
        },
        {
            id: 2,
            user: "Trần Thị B",
            course: "JavaScript",
            amount: 150000,
            method: "momo",
            status: "paid",
            date: "2024-03-15",
        },
        {
            id: 3,
            user: "Lê Văn C",
            course: "Node.js",
            amount: 150000,
            method: "transfer",
            status: "pending",
            date: "2024-03-14",
        },
        {
            id: 4,
            user: "Phạm Thị D",
            course: "MySQL",
            amount: 150000,
            method: "zalopay",
            status: "paid",
            date: "2024-03-14",
        },
    ],
};

// Data cho biểu đồ - Mock data
const chartData = {
    // Dữ liệu doanh thu theo tháng (12 tháng gần nhất)
    revenueData: [
        { month: "T1", revenue: 120000000, users: 850 },
        { month: "T2", revenue: 135000000, users: 920 },
        { month: "T3", revenue: 158000000, users: 1050 },
        { month: "T4", revenue: 180000000, users: 1150 },
        { month: "T5", revenue: 195000000, users: 1280 },
        { month: "T6", revenue: 210000000, users: 1350 },
        { month: "T7", revenue: 225000000, users: 1420 },
        { month: "T8", revenue: 240000000, users: 1580 },
        { month: "T9", revenue: 255000000, users: 1650 },
        { month: "T10", revenue: 268000000, users: 1720 },
        { month: "T11", revenue: 275000000, users: 1850 },
        { month: "T12", revenue: 285000000, users: 1950 },
    ],

    // Phân bố khóa học theo danh mục
    courseCategoryData: [
        { category: "Lập trình Web", count: 45, color: "#3b82f6" },
        { category: "Mobile App", count: 32, color: "#10b981" },
        { category: "Data Science", count: 28, color: "#f59e0b" },
        { category: "DevOps", count: 18, color: "#ef4444" },
        { category: "UI/UX Design", count: 25, color: "#8b5cf6" },
        { category: "Khác", count: 12, color: "#6b7280" },
    ],

    // Thống kê đăng ký khóa học theo tuần (4 tuần gần nhất)
    weeklyEnrollmentData: [
        { week: "Tuần 1", courses: 28, exams: 15, users: 145 },
        { week: "Tuần 2", courses: 35, exams: 22, users: 180 },
        { week: "Tuần 3", courses: 42, exams: 18, users: 220 },
        { week: "Tuần 4", courses: 38, exams: 25, users: 195 },
    ],

    // Top payment methods usage
    paymentMethodData: [
        { method: "VNPay", count: 450, percentage: 35, color: "#3b82f6" },
        { method: "MoMo", count: 380, percentage: 30, color: "#ec4899" },
        { method: "ZaloPay", count: 285, percentage: 22, color: "#06b6d4" },
        { method: "Chuyển khoản", count: 165, percentage: 13, color: "#10b981" },
    ],
};

const AdminPage = () => {
    return (
        <div className="min-h-screen bg-white p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard Quản Trị</h1>
                <p className="text-gray-600">Tổng quan về hệ thống MapLearn Platform</p>
            </div>

            {/* Thống kê tổng quan - 4 Cards chính */}
            <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                {/* Tổng người dùng */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tổng Người Dùng</p>
                            <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
                            <div className="mt-2 flex items-center">
                                {mockStats.userGrowth > 0 ? (
                                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                                ) : (
                                    <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                                )}
                                <span
                                    className={`text-sm ${mockStats.userGrowth > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                    {Math.abs(mockStats.userGrowth)}%
                                </span>
                                <span className="ml-1 text-sm text-gray-500">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-3">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Tổng khóa học */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tổng Khóa Học</p>
                            <p className="text-2xl font-bold text-gray-900">{mockStats.totalCourses}</p>
                            <div className="mt-2 flex items-center">
                                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">{mockStats.courseGrowth}%</span>
                                <span className="ml-1 text-sm text-gray-500">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-green-50 p-3">
                            <BookOpen className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Tổng đề thi */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tổng Đề Thi</p>
                            <p className="text-2xl font-bold text-gray-900">{mockStats.totalExams}</p>
                            <div className="mt-2 flex items-center">
                                <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                                <span className="text-sm text-red-600">{Math.abs(mockStats.examGrowth)}%</span>
                                <span className="ml-1 text-sm text-gray-500">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-orange-50 p-3">
                            <FileText className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                </div>

                {/* Tổng doanh thu */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tổng Doanh Thu</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(mockStats.totalRevenue)}
                            </p>
                            <div className="mt-2 flex items-center">
                                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">{mockStats.revenueGrowth}%</span>
                                <span className="ml-1 text-sm text-gray-500">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-yellow-50 p-3">
                            <DollarSign className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Biểu đồ chính - Row 1: Doanh thu và Danh mục khóa học */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
                {/* Biểu đồ doanh thu theo tháng */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Doanh Thu 12 Tháng</h3>
                        <div className="text-sm text-gray-500">VNĐ (triệu)</div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.revenueData}>
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
                                    formatter={(value: number) => [
                                        `${new Intl.NumberFormat("vi-VN").format(value)} VNĐ`,
                                        "Doanh thu",
                                    ]}
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
                    </div>
                </div>

                {/* Biểu đồ phân bố danh mục khóa học */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Phân Bố Khóa Học</h3>
                        <div className="text-sm text-gray-500">Theo danh mục</div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData.courseCategoryData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="count"
                                    label={(entry: any) => `${entry.category}: ${(entry.percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {chartData.courseCategoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => [`${value} khóa học`, "Số lượng"]}
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Biểu đồ và thống kê - Row 2 */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Biểu đồ hoạt động hàng tuần */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Hoạt Động 4 Tuần Gần Đây</h3>
                        <div className="text-sm text-gray-500">Khóa học, Đề thi, Người dùng mới</div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData.weeklyEnrollmentData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="week"
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                    tickLine={{ stroke: "#e2e8f0" }}
                                />
                                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickLine={{ stroke: "#e2e8f0" }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Bar dataKey="courses" fill="#3b82f6" name="Khóa học" radius={[2, 2, 0, 0]} />
                                <Bar dataKey="exams" fill="#10b981" name="Đề thi" radius={[2, 2, 0, 0]} />
                                <Bar dataKey="users" fill="#f59e0b" name="Người dùng mới" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Thống kê phương thức thanh toán */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Thanh Toán</h3>
                        <div className="text-sm text-gray-500">Phương thức</div>
                    </div>
                    <div className="space-y-4">
                        {chartData.paymentMethodData.map((method, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className="h-3 w-3 rounded-full"
                                        style={{ backgroundColor: method.color }}
                                    ></div>
                                    <span className="text-sm font-medium text-gray-900">{method.method}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-gray-900">{method.count}</div>
                                    <div className="text-xs text-gray-500">{method.percentage}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Mini chart for payment methods */}
                    <div className="mt-4 h-32">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData.paymentMethodData}
                                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                            >
                                <XAxis
                                    dataKey="method"
                                    tick={{ fontSize: 10, fill: "#64748b" }}
                                    tickLine={{ stroke: "#e2e8f0" }}
                                    interval={0}
                                    angle={-45}
                                    textAnchor="end"
                                    height={50}
                                />
                                <YAxis hide />
                                <Tooltip
                                    formatter={(value: number) => [`${value} giao dịch`, "Số lượng"]}
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Bar dataKey="count" radius={[2, 2, 0, 0]} fill="#3b82f6">
                                    {chartData.paymentMethodData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Danh sách hoạt động gần đây */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Người dùng mới */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Người Dùng Mới</h3>
                            <Link href="/admin/users" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {mockStats.recentUsers.map((user) => (
                                <div key={user.id} className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                        <span className="text-sm font-medium text-blue-600">{user.name.charAt(0)}</span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="truncate text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {new Date(user.joinedAt).toLocaleDateString("vi-VN")}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Khóa học phổ biến */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Khóa Học Phổ Biến</h3>
                            <Link
                                href="/admin/courses"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {mockStats.topCourses.map((course, index) => (
                                <div key={course.id} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                                            <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">{course.name}</p>
                                        <div className="mt-1 flex items-center space-x-4">
                                            <div className="flex items-center">
                                                <Users className="mr-1 h-3 w-3 text-gray-400" />
                                                <span className="text-xs text-gray-500">
                                                    {course.students} học viên
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <DollarSign className="mr-1 h-3 w-3 text-gray-400" />
                                                <span className="text-xs text-gray-500">
                                                    {new Intl.NumberFormat("vi-VN").format(course.revenue / 1000000)}M
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Thanh toán gần đây */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Thanh Toán Gần Đây</h3>
                            <Link
                                href="/admin/payments"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {mockStats.recentPayments.map((payment) => (
                                <div key={payment.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                                            <CreditCard className="h-4 w-4 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{payment.user}</p>
                                            <p className="text-xs text-gray-500">{payment.course}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(payment.amount)}
                                        </p>
                                        <div className="flex items-center space-x-1">
                                            <span
                                                className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
                                                    payment.status === "paid"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {payment.status === "paid" ? "Đã thanh toán" : "Đang chờ"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Thao tác nhanh */}
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Thao Tác Nhanh</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Link
                        href="/admin/courses/create"
                        className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                        <div className="mr-3 rounded-lg bg-blue-50 p-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Tạo Khóa Học</p>
                            <p className="text-sm text-gray-500">Thêm khóa học mới</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/exams/create"
                        className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                        <div className="mr-3 rounded-lg bg-orange-50 p-2">
                            <FileText className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Tạo Đề Thi</p>
                            <p className="text-sm text-gray-500">Thêm đề thi mới</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/students"
                        className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                        <div className="mr-3 rounded-lg bg-green-50 p-2">
                            <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Quản Lý học sinh</p>
                            <p className="text-sm text-gray-500">Xem danh sách học sinh</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/payments"
                        className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                        <div className="mr-3 rounded-lg bg-yellow-50 p-2">
                            <CreditCard className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Thanh Toán</p>
                            <p className="text-sm text-gray-500">Xem giao dịch</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
