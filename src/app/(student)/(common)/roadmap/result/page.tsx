"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Clock, Star, Users, Award, ExternalLink, Code, Database, Monitor, BookOpen } from "lucide-react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
const ResultRoadMapPage = () => {
    // Mock data - bạn sẽ thay thế bằng dữ liệu thật
    const roadmapData = {
        title: "Lộ Trình Học Tập",
        subtitle: "Các cột mốc quan trọng để bạn phát triển kỹ năng và sự nghiệp.",
        courses: [
            {
                id: 1,
                title: "Object-Oriented Programming (OOP)",
                description:
                    "Nắm vững các nguyên tắc OOP (Encapsulation, Inheritance, Polymorphism, Abstraction) để xây dựng các ứng dụng backend có cấu trúc tốt, dễ bảo trì và mở rộng.",
                level: "Cơ bản",
                duration: "8 tuần",
                isRecommended: true,
                category: "Backend Development",
                icon: <Code className="h-4 w-4" />,
                color: "#3B82F6",
            },
            {
                id: 2,
                title: "Database Fundamentals & SQL",
                description:
                    "Nắm vững kiến thức cơ bản về cơ sở dữ liệu quan hệ, ngôn ngữ SQL để thao tác và lưu trữ dữ liệu.",
                level: "Cơ bản",
                duration: "6 tuần",
                isRecommended: false,
                category: "Database",
                icon: <Database className="h-4 w-4" />,
                color: "#10B981",
            },
            {
                id: 3,
                title: "Data Structures and Algorithms",
                description:
                    "Hiểu và sử dụng các cấu trúc dữ liệu và giải thuật cơ bản để giải quyết các vấn đề về hiệu năng trong backend.",
                level: "Trung bình",
                duration: "10 tuần",
                isRecommended: true,
                category: "Computer Science",
                icon: <Monitor className="h-4 w-4" />,
                color: "#8B5CF6",
            },
            {
                id: 4,
                title: "Web Development Fundamentals",
                description:
                    "Học các kiến thức cơ bản về phát triển web, HTML, CSS, JavaScript để xây dựng giao diện người dùng.",
                level: "Cơ bản",
                duration: "8 tuần",
                isRecommended: false,
                category: "Frontend Development",
                icon: <BookOpen className="h-4 w-4" />,
                color: "#F59E0B",
            },
        ],
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "Cơ bản":
                return "border-green-200 text-green-800 bg-green-50";
            case "Trung bình":
                return "border-yellow-200 text-yellow-800 bg-yellow-50";
            case "Nâng cao":
                return "border-red-200 text-red-800 bg-red-50";
            default:
                return "border-gray-200 text-gray-800 bg-gray-50";
        }
    };

    return (
        <div className="min-h-screen rounded-xl bg-white p-8">
            <div className="container mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h1 className="text-primary text-3xl font-bold">{roadmapData.title}</h1>
                        <p className="mx-auto max-w-2xl text-base text-gray-600">{roadmapData.subtitle}</p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-8 flex justify-center gap-8"
                    >
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{roadmapData.courses.length}</div>
                            <div className="text-sm text-gray-500">Khóa học</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {roadmapData.courses.filter((c) => c.isRecommended).length}
                            </div>
                            <div className="text-sm text-gray-500">Được gợi ý</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {roadmapData.courses.reduce((acc, course) => acc + parseInt(course.duration), 0)}
                            </div>
                            <div className="text-sm text-gray-500">Tổng tuần</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <VerticalTimeline lineColor="#E5E7EB">
                        {roadmapData.courses.map((course, index) => (
                            <VerticalTimelineElement
                                key={course.id}
                                className="vertical-timeline-element--work"
                                contentStyle={{
                                    background: "white",
                                    color: "#1F2937",
                                    boxShadow:
                                        "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                    border: "1px solid #F3F4F6",
                                    borderRadius: "12px",
                                    padding: "24px",
                                }}
                                contentArrowStyle={{
                                    borderRight: `7px solid white`,
                                }}
                                date={`Chặng ${index + 1}`}
                                iconStyle={{
                                    background: course.color,
                                    color: "#fff",
                                    boxShadow: `0 0 0 4px white, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)`,
                                    width: "60px",
                                    height: "60px",
                                }}
                                icon={course.icon}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.4 + index * 0.2 }}
                                >
                                    {/* Course Header */}
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                                                {course.category}
                                            </span>
                                        </div>
                                        {course.isRecommended && (
                                            <Badge className="border-blue-200 bg-blue-100 text-xs text-blue-800">
                                                <Star className="mr-1 h-3 w-3" />
                                                Gợi ý
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Course Title */}
                                    <h3 className="mb-3 text-xl font-bold text-gray-900">{course.title}</h3>

                                    {/* Course Description */}
                                    <p className="mb-4 leading-relaxed text-gray-600">{course.description}</p>

                                    {/* Course Metadata */}
                                    <div className="mt-2 mb-4 flex items-center gap-3">
                                        <Badge variant="outline" className={`text-xs ${getLevelColor(course.level)}`}>
                                            {course.level}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Clock className="h-3 w-3" />
                                            {course.duration}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            className="w-full text-sm text-white"
                                            style={{
                                                background: `linear-gradient(135deg, ${course.color}, ${course.color}dd)`,
                                            }}
                                            size="sm"
                                        >
                                            <ExternalLink className="mr-2 h-3 w-3" />
                                            Xem khóa học
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </VerticalTimelineElement>
                        ))}

                        {/* End Element */}
                        <VerticalTimelineElement
                            iconStyle={{
                                background: "linear-gradient(135deg, #10B981, #059669)",
                                color: "#fff",
                                boxShadow: `0 0 0 4px white, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)`,
                                width: "60px",
                                height: "60px",
                            }}
                            icon={<Award className="h-6 w-6" />}
                        />
                    </VerticalTimeline>
                </motion.div>

                {/* Bottom Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="mt-12 flex justify-center gap-4"
                >
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                    >
                        <Users className="mr-2 h-4 w-4" />
                        Bắt đầu học ngay
                    </Button>
                    <Button variant="outline" size="lg">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Tạo roadmap mới
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};

export default ResultRoadMapPage;
