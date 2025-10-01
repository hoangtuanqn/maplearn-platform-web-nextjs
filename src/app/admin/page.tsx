"use client";
import { useQuery } from "@tanstack/react-query";
import {
    Users,
    BookOpen,
    FileText,
    CreditCard,
    DollarSign,
    User,
    Book,
    // HandCoins,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
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
import dashboardAdminApi from "~/apiRequest/admin/dashboard";
import { formatter } from "~/libs/format";
import DisplayAvatar from "../(student)/_components/DisplayAvatar";
import { Suspense, useState, useEffect } from "react";
import TutorialButtonAdmin from "./_components/TutorialButtonAdmin";
import { FilterDashboard } from "./_components/FilterDashboard";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import DashboardSkeleton from "./_components/DashboardSkeleton";
const allowedFields = ["start_date", "end_date"] as const;
const AdminDashboard = () => {
    const { start_date, end_date } = useGetSearchQuery(allowedFields);
    const [revenueCurrentPage, setRevenueCurrentPage] = useState(0);
    const [activityCurrentPage, setActivityCurrentPage] = useState(0);
    const itemsPerPage = 12; // Hiển thị 12 tháng mỗi lần

    // Reset pages khi filter thay đổi
    useEffect(() => {
        setRevenueCurrentPage(0);
        setActivityCurrentPage(0);
    }, [start_date, end_date]);

    const { data: dashboard, isLoading } = useQuery({
        queryKey: ["admin", "dashboard", { start_date, end_date }],
        queryFn: async () => {
            const res = await dashboardAdminApi.getDashboard(start_date ?? "", end_date ?? "");
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    // Tính toán data cho charts từ API data
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

              // Phân bố khóa học theo danh mục từ courses_by_category
              courseCategoryData: Object.entries(dashboard.courses_by_category).map(([category, count], index) => {
                  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"];
                  return {
                      category: category.replace(/-/g, " ").toUpperCase(),
                      count: count,
                      color: colors[index % colors.length],
                  };
              }),

              // Hoạt động 12 tháng từ activity_in_12_months - format và sắp xếp theo thứ tự thời gian
              allActivityData: dashboard.activity_in_12_months
                  .map((item: any) => {
                      const [month, year] = item.month.split("-"); // "01-2025" -> ["01", "2025"]
                      return {
                          ...item,
                          month: month + "/" + year, // MM/YYYY format giống revenue
                          monthKey: year + "-" + month, // YYYY-MM để sort đúng thứ tự thời gian
                      };
                  })
                  .sort((a: any, b: any) => a.monthKey.localeCompare(b.monthKey)), // Sort tăng dần theo YYYY-MM

              // Phương thức thanh toán từ payment_methods - cấu trúc mới có count và total
              paymentMethodData: Object.entries(dashboard.payment_methods).map(([method, data]) => {
                  const totalCount = Object.values(dashboard.payment_methods).reduce(
                      (sum, item) => sum + item.count,
                      0,
                  );
                  const totalRevenue = Object.values(dashboard.payment_methods).reduce(
                      (sum, item) => sum + item.total,
                      0,
                  );
                  const methodNames = {
                      vnpay: "VNPay",
                      momo: "MoMo",
                      zalopay: "ZaloPay",
                      transfer: "Chuyển khoản",
                  };
                  const colors = {
                      vnpay: "#3b82f6",
                      momo: "#ec4899",
                      zalopay: "#06b6d4",
                      transfer: "#10b981",
                  };
                  return {
                      method: methodNames[method as keyof typeof methodNames] || method,
                      count: data.count,
                      total: data.total,
                      percentage: Math.round((data.count / totalCount) * 100),
                      revenuePercentage: Math.round((data.total / totalRevenue) * 100),
                      color: colors[method as keyof typeof colors] || "#6b7280",
                  };
              }),
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

    // Tính toán dữ liệu phân trang cho biểu đồ hoạt động - Dữ liệu mới nhất ở bên phải
    const activityDataForChart = chartData
        ? (() => {
              const totalItems = chartData.allActivityData.length;
              const totalPagesCount = Math.ceil(totalItems / itemsPerPage);

              // Tính toán để dữ liệu mới nhất luôn ở bên phải
              // Trang cuối cùng (index cao nhất) = dữ liệu mới nhất
              const pageFromEnd = totalPagesCount - 1 - activityCurrentPage;
              const endIndex = totalItems - pageFromEnd * itemsPerPage;
              const startIndex = Math.max(0, endIndex - itemsPerPage);

              return chartData.allActivityData.slice(startIndex, endIndex);
          })()
        : [];

    const activityTotalPages = chartData ? Math.ceil(chartData.allActivityData.length / itemsPerPage) : 0;
    const showActivityPagination = chartData ? chartData.allActivityData.length > itemsPerPage : false;
    useEffect(() => {
        if (revenueTotalPages > 0) {
            setRevenueCurrentPage(revenueTotalPages - 1);
        }
        if (activityTotalPages > 0) {
            setActivityCurrentPage(activityTotalPages - 1);
        }
    }, [revenueTotalPages, activityTotalPages]);
    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (!dashboard) return null;

    return (
        <div className="min-h-screen bg-white p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Quản trị hệ thống MapLearn</h1>
                    <p className="text-gray-600">
                        Tổng quan về hệ thống MapLearn Platform <b className="font-bold">trong 12 tháng qua</b>
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Suspense>
                        <TutorialButtonAdmin />
                    </Suspense>
                    <FilterDashboard />
                </div>
            </div>

            {/* Thống kê tổng quan - 4 Cards chính */}
            <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                {/* Người đăng ký */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Người đăng ký</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboard.total_users.toLocaleString()}</p>
                            <div className="mt-2 flex items-center">
                                <User className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">+{dashboard.recent_activity.new_users}</span>
                                <span className="ml-1 text-sm text-gray-500">trong tháng</span>
                            </div>
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
                            <p className="text-sm font-medium text-gray-600">Số khóa học</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboard.total_courses}</p>
                            <div className="mt-2 flex items-center">
                                <BookOpen className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">+{dashboard.recent_activity.new_courses}</span>
                                <span className="ml-1 text-sm text-gray-500">trong tháng</span>
                            </div>
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
                            <p className="text-sm font-medium text-gray-600">Số đề thi</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboard.total_exams}</p>
                            <div className="mt-2 flex items-center">
                                <Book className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">+{dashboard.recent_activity.new_exams}</span>
                                <span className="ml-1 text-sm text-gray-500">trong tháng</span>
                            </div>
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
                            <p className="text-sm font-medium text-gray-600">Doanh Thu</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatter.number(
                                    Object.values(dashboard.total_in_this_year).reduce(
                                        (a: number, b: number) => a + b,
                                        0,
                                    ),
                                )}
                                đ
                            </p>
                            {/* <div className="mt-2 flex items-center">
                                <HandCoins className="mr-1 h-4 w-4 text-green-500" />
                                <span className={`text-sm text-green-600`}>
                                    +
                                    {formatter.number(
                                        Object.values(dashboard.total_in_this_year)[
                                            Object.values(dashboard.total_in_this_year).length - 1
                                        ] || 0,
                                    )}
                                    đ
                                </span>
                                <span className="ml-1 text-sm text-gray-500">tháng gần nhất</span>
                            </div> */}
                        </div>
                        <div className="rounded-lg bg-yellow-50 p-3">
                            <DollarSign className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Biểu đồ chính - Row 1: Doanh thu và Danh mục khóa học */}
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

                {/* Biểu đồ phân bố danh mục khóa học */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-900">Phân Bố Khóa Học</h3>
                        <div className="text-sm text-gray-500">Theo danh mục</div>
                    </div>
                    <div className="h-80">
                        {chartData && (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData.courseCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="count"
                                        label={(entry: any) => `${entry.category.substring(0, 10)}...`}
                                        labelLine={false}
                                    >
                                        {chartData.courseCategoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number, name: string, props: any) => [
                                            `${value} khóa học`,
                                            props.payload.category,
                                        ]}
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>

            {/* Biểu đồ và thống kê - Row 2 */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Biểu đồ hoạt động*/}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Hoạt Động</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-500">Khóa học, Đề thi, Người dùng mới</div>
                            {activityDataForChart.length > 0 && (
                                <div className="text-xs text-gray-400">
                                    {activityDataForChart.length} tháng: {activityDataForChart[0].month} đến{" "}
                                    {activityDataForChart[activityDataForChart.length - 1].month}
                                </div>
                            )}
                            {showActivityPagination && (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setActivityCurrentPage((prev) => Math.max(0, prev - 1))}
                                        disabled={activityCurrentPage === 0}
                                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        title="Xem dữ liệu cũ hơn (về trái)"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <span className="px-2 text-sm text-gray-600">
                                        {activityCurrentPage + 1}/{activityTotalPages}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setActivityCurrentPage((prev) => Math.min(activityTotalPages - 1, prev + 1))
                                        }
                                        disabled={activityCurrentPage === activityTotalPages - 1}
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
                                <BarChart data={activityDataForChart}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="month"
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
                                    <Bar
                                        dataKey="new_courses"
                                        fill="#3b82f6"
                                        name="Khóa học mới"
                                        radius={[2, 2, 0, 0]}
                                    />
                                    <Bar dataKey="new_exams" fill="#10b981" name="Đề thi mới" radius={[2, 2, 0, 0]} />
                                    <Bar
                                        dataKey="new_users"
                                        fill="#f59e0b"
                                        name="Người dùng mới"
                                        radius={[2, 2, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Thống kê phương thức thanh toán */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-900">Thanh Toán</h3>
                        <div className="text-sm text-gray-500">Phương thức</div>
                    </div>
                    <div className="space-y-4">
                        {chartData?.paymentMethodData.map((method, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className="h-3 w-3 rounded-full"
                                        style={{ backgroundColor: method.color }}
                                    ></div>
                                    <span className="text-sm font-medium text-gray-900">{method.method}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-gray-900">{method.count} giao dịch</div>
                                    <div className="text-xs text-gray-500">
                                        {formatter.number(method.total)}đ ({method.revenuePercentage}%)
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Mini chart for payment methods */}
                    <div className="mt-4 h-32">
                        {chartData && (
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
                                        formatter={(value: number, name: string, props: any) => [
                                            `${value} giao dịch`,
                                            `Doanh thu: ${formatter.number(props.payload.total)}đ`,
                                        ]}
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar dataKey="count" radius={[2, 2, 0, 0]} fill="#3b82f6">
                                        {chartData &&
                                            chartData.paymentMethodData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
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
                                href="/admin/students"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {dashboard?.new_users?.slice(0, 5).map((user: any) => (
                                <Link
                                    key={user.id}
                                    href={`/admin/students/${user.id}`}
                                    target="_blank"
                                    className="flex items-center space-x-3"
                                >
                                    <DisplayAvatar fullName={user.full_name} avatar={user.avatar} ratio={"10"} />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">{user.full_name}</p>
                                        <p className="truncate text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="text-xs text-gray-400">Mới</div>
                                </Link>
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
                                href="/admin/courses"
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

                {/* Thanh toán gần đây */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900">Thanh Toán Gần Đây</h3>
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
                            {dashboard?.new_payments?.slice(0, 5).map((payment: any, index: number) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                                            <CreditCard className="h-4 w-4 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{payment.full_name}</p>
                                            <Link
                                                href={`/courses/${payment.slug}`}
                                                target="_blank"
                                                className="text-xs text-gray-500"
                                            >
                                                {payment.course_name}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className={`text-sm ${payment.amount > 0 ? "text-primary font-bold" : "font-medium text-green-600"}`}
                                        >
                                            {payment.amount === 0 ? "Miễn phí" : `${formatter.number(payment.amount)}đ`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Thao tác nhanh */}
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm" id="quick-actions">
                <h3 className="mb-4 text-base font-semibold text-gray-900">Thao Tác Nhanh</h3>
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

export default AdminDashboard;
