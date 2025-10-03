"use client";
import React from "react";
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
} from "recharts";
import { Last7DaysItemSchema } from "~/schemaValidate/admin/student.schema";
const LearingChart7Days = ({ learningStats }: { learningStats: Last7DaysItemSchema[] }) => {
    return (
        <div className="mb-6 grid grid-cols-1 gap-4 md:mb-8 md:gap-6 xl:grid-cols-2">
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:p-6">
                <h2 className="mb-3 text-sm font-semibold text-gray-900 md:mb-4 md:text-base">
                    <span className="hidden sm:inline">Biểu đồ số bài giảng đã học (7 ngày gần nhất)</span>
                    <span className="sm:hidden">Bài giảng (7 ngày)</span>
                </h2>
                <div className="h-64 sm:h-72 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={learningStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "white",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                }}
                            />
                            <Legend />
                            <Bar dataKey="lessons_completed" fill="#3b82f6" name="Bài giảng" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:p-6">
                <h2 className="mb-3 text-sm font-semibold text-gray-900 md:mb-4 md:text-base">
                    <span className="hidden sm:inline">Biểu đồ thời lượng học (7 ngày gần nhất)</span>
                    <span className="sm:hidden">Thời lượng học (7 ngày)</span>
                </h2>
                <div className="h-64 sm:h-72 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={learningStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "white",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="total_duration"
                                stroke="#8b5cf6"
                                name="Giờ học"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default LearingChart7Days;
