"use client";

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { TrendingUp, DollarSign, CreditCard, Target, Filter, Calendar } from "lucide-react";

// Demo data cho payment statistics
const mockPaymentStats = {
    // Overall stats
    totalRevenue: 2847250000, // 2.8 tỷ VNĐ
    monthlyGrowth: 24.5,
    totalTransactions: 8934,
    averageOrderValue: 318750, // 318,750 VNĐ
    conversionRate: 3.4,
    refundRate: 2.1,
    lastMonthRevenue: 2290800000,
    lastMonthTransactions: 7198,
    lastMonthConversion: 2.9,
    lastMonthRefund: 2.7,

    // Daily revenue trend for last 7 days
    dailyRevenue: [
        { date: "18/09", revenue: 24500000, transactions: 87 },
        { date: "19/09", revenue: 32100000, transactions: 112 },
        { date: "20/09", revenue: 28750000, transactions: 98 },
        { date: "21/09", revenue: 41200000, transactions: 145 },
        { date: "22/09", revenue: 35800000, transactions: 127 },
        { date: "23/09", revenue: 39400000, transactions: 139 },
        { date: "24/09", revenue: 42300000, transactions: 152 },
    ],

    // Hourly distribution
    hourlyDistribution: [
        { hour: "00-04", amount: 142750000, percentage: 5 },
        { hour: "04-08", amount: 227800000, percentage: 8 },
        { hour: "08-12", amount: 683175000, percentage: 24 },
        { hour: "12-16", amount: 854175000, percentage: 30 },
        { hour: "16-20", amount: 711806250, percentage: 25 },
        { hour: "20-24", amount: 227543750, percentage: 8 },
    ],

    // Payment methods
    paymentMethods: [
        { method: "VNPay", amount: 1138750000, percentage: 40, color: "#3b82f6", transactions: 3574 },
        { method: "MoMo", amount: 854250000, percentage: 30, color: "#ec4899", transactions: 2680 },
        { method: "ZaloPay", amount: 569500000, percentage: 20, color: "#06b6d4", transactions: 1787 },
        { method: "Chuyển khoản", amount: 284750000, percentage: 10, color: "#10b981", transactions: 893 },
    ],

    // Top courses by revenue
    topCourses: [
        { name: "React Native từ Zero to Hero", revenue: 285600000, transactions: 1904, growth: 34.2 },
        { name: "Node.js Backend Development", revenue: 241800000, transactions: 1612, growth: 28.7 },
        { name: "Vue.js Complete Guide", revenue: 198750000, transactions: 1325, growth: 19.4 },
        { name: "Python Data Science", revenue: 174250000, transactions: 1162, growth: 15.8 },
        { name: "Angular Advanced", revenue: 156900000, transactions: 1046, growth: 12.3 },
    ],
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

const StatsPayment = () => {
    const [timeFilter, setTimeFilter] = useState("7days");

    // Demo revenue data based on time filter
    const getRevenueData = () => {
        const data = {
            "7days": [
                { date: "18/09", revenue: 24500000, transactions: 87 },
                { date: "19/09", revenue: 32100000, transactions: 112 },
                { date: "20/09", revenue: 28750000, transactions: 98 },
                { date: "21/09", revenue: 41200000, transactions: 145 },
                { date: "22/09", revenue: 35800000, transactions: 127 },
                { date: "23/09", revenue: 39400000, transactions: 139 },
                { date: "24/09", revenue: 42300000, transactions: 152 },
            ],
            "30days": [
                { date: "Tuần 1", revenue: 187500000, transactions: 642 },
                { date: "Tuần 2", revenue: 234600000, transactions: 798 },
                { date: "Tuần 3", revenue: 198750000, transactions: 687 },
                { date: "Tuần 4", revenue: 276400000, transactions: 912 },
            ],
            "3months": [
                { date: "Tháng 7", revenue: 742500000, transactions: 2341 },
                { date: "Tháng 8", revenue: 865200000, transactions: 2756 },
                { date: "Tháng 9", revenue: 924800000, transactions: 2987 },
            ],
            "12months": [
                { date: "T1", revenue: 620000000, transactions: 1890 },
                { date: "T2", revenue: 735000000, transactions: 2234 },
                { date: "T3", revenue: 658000000, transactions: 2012 },
                { date: "T4", revenue: 789000000, transactions: 2456 },
                { date: "T5", revenue: 823000000, transactions: 2634 },
                { date: "T6", revenue: 756000000, transactions: 2298 },
                { date: "T7", revenue: 742500000, transactions: 2341 },
                { date: "T8", revenue: 865200000, transactions: 2756 },
                { date: "T9", revenue: 924800000, transactions: 2987 },
                { date: "T10", revenue: 0, transactions: 0 },
                { date: "T11", revenue: 0, transactions: 0 },
                { date: "T12", revenue: 0, transactions: 0 },
            ],
        };
        return data[timeFilter as keyof typeof data] || data["7days"];
    };

    return (
        <div className="w-full space-y-6 rounded-lg bg-white p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between border-b pb-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Phân Tích Thanh Toán</h2>
                    <p className="mt-1 text-gray-600">Chi tiết doanh thu và xu hướng thanh toán</p>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                        <SelectTrigger className="w-40">
                            <Calendar className="mr-2 h-4 w-4" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7days">7 ngày qua</SelectItem>
                            <SelectItem value="30days">30 ngày qua</SelectItem>
                            <SelectItem value="3months">3 tháng qua</SelectItem>
                            <SelectItem value="12months">12 tháng qua</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* KPI Cards với gradient backgrounds */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium text-blue-700">
                            <DollarSign className="mr-2 h-4 w-4" />
                            Doanh Thu Tháng
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">
                            {formatCurrency(mockPaymentStats.totalRevenue)}
                        </div>
                        <div className="mt-1 flex items-center text-sm">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                            <span className="font-medium text-green-600">+{mockPaymentStats.monthlyGrowth}%</span>
                            <span className="ml-1 text-gray-500">vs tháng trước</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium text-purple-700">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Trung Bình Ngày
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-900">
                            {formatCurrency(mockPaymentStats.totalRevenue / 30)}
                        </div>
                        <div className="mt-1 flex items-center text-sm">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                            <span className="font-medium text-green-600">
                                +
                                {(
                                    ((mockPaymentStats.totalRevenue / 30 - mockPaymentStats.lastMonthRevenue / 30) /
                                        (mockPaymentStats.lastMonthRevenue / 30)) *
                                    100
                                ).toFixed(1)}
                                %
                            </span>
                            <span className="ml-1 text-gray-500">tăng trưởng</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium text-green-700">
                            <Target className="mr-2 h-4 w-4" />
                            Tỷ Lệ Chuyển Đổi
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-900">{mockPaymentStats.conversionRate}%</div>
                        <div className="mt-1 flex items-center text-sm">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                            <span className="font-medium text-green-600">
                                +
                                {(
                                    ((mockPaymentStats.conversionRate - mockPaymentStats.lastMonthConversion) /
                                        mockPaymentStats.lastMonthConversion) *
                                    100
                                ).toFixed(1)}
                                %
                            </span>
                            <span className="ml-1 text-gray-500">cải thiện</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium text-orange-700">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Tỷ Lệ Hoàn Tiền
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-900">{mockPaymentStats.refundRate}%</div>
                        <div className="mt-1 flex items-center text-sm">
                            <TrendingUp className="mr-1 h-3 w-3 rotate-180 text-green-600" />
                            <span className="font-medium text-green-600">
                                -
                                {(
                                    ((mockPaymentStats.lastMonthRefund - mockPaymentStats.refundRate) /
                                        mockPaymentStats.lastMonthRefund) *
                                    100
                                ).toFixed(1)}
                                %
                            </span>
                            <span className="ml-1 text-gray-500">giảm tốt</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Daily Revenue Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Xu Hướng Doanh Thu Hàng Ngày</CardTitle>
                        <CardDescription>Biểu đồ doanh thu 7 ngày gần đây</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={getRevenueData()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                                <Tooltip
                                    formatter={(value: any) => [formatCurrency(value), "Doanh thu"]}
                                    labelFormatter={(label) => `Ngày ${label}`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Hourly Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Phân Bố Theo Giờ</CardTitle>
                        <CardDescription>Doanh thu theo khung giờ trong ngày</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mockPaymentStats.hourlyDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" />
                                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                                <Tooltip
                                    formatter={(value: any) => [formatCurrency(value), "Doanh thu"]}
                                    labelFormatter={(label) => `Khung giờ ${label}`}
                                />
                                <Bar dataKey="amount" fill="#8b5cf6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StatsPayment;
