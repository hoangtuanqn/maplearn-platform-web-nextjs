"use client";
import VideoPlayer from "../(student)/_components/VideoPlayer";
import React, { useState } from "react";
import {
    ChevronDown,
    Play,
    CheckCircle,
    Clock,
    Users,
    Star,
    MessageCircle,
    Download,
    Share,
    BookOpen,
    Award,
    FileText,
    Lock,
    PlayCircle,
    ChevronLeft,
    ChevronRight,
    Bookmark,
    ThumbsUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatter } from "~/libs/format";
import { Button } from "~/components/ui/button";

// Types
interface Lesson {
    id: number;
    title: string;
    duration: string;
    isCompleted: boolean;
    isWatching: boolean;
    isFree: boolean;
    hasQuiz: boolean;
    hasResources: boolean;
}

// Mock data cho course với các trạng thái khác nhau
const mockCourseData = {
    id: "physics-12-advanced",
    title: "VẬT LÍ 12 - NÂNG CAO",
    description:
        "Khóa học Vật lí 12 nâng cao với đầy đủ lý thuyết và bài tập từ cơ bản đến nâng cao, giúp học sinh đạt điểm cao trong kỳ thi THPT Quốc gia.",
    instructor: {
        name: "Thầy Vũ Ngọc Anh",
        avatar: "V",
        isVerified: true,
        title: "Giáo viên Vật lý chuyên nghiệp",
    },
    stats: {
        rating: 4.8,
        totalReviews: 1245,
        totalStudents: 8450,
        lastUpdated: "2024-01-15",
    },
    progress: {
        completedLessons: 8,
        totalLessons: 24,
        percentComplete: 33,
    },
    currentLesson: {
        id: 3,
        title: "Bài 3: Con lắc đơn",
        duration: "22:15",
    },
};

const mockChapters = [
    {
        id: 1,
        title: "Chương 1: Dao động cơ",
        duration: "2h 30m",
        completedLessons: 4,
        totalLessons: 6,
        isCompleted: false,
        lessons: [
            {
                id: 1,
                title: "Dao động điều hòa",
                duration: "15:30",
                isCompleted: true,
                isWatching: false,
                isFree: true,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 2,
                title: "Con lắc lò xo",
                duration: "18:45",
                isCompleted: true,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: false,
            },
            {
                id: 3,
                title: "Con lắc đơn",
                duration: "22:15",
                isCompleted: false,
                isWatching: true,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 4,
                title: "Tổng hợp dao động",
                duration: "20:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: true,
            },
            {
                id: 5,
                title: "Bài tập dao động",
                duration: "25:00",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: false,
            },
            {
                id: 6,
                title: "Kiểm tra chương 1",
                duration: "30:00",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
        ],
    },
    {
        id: 2,
        title: "Chương 2: Sóng cơ",
        duration: "3h 15m",
        completedLessons: 2,
        totalLessons: 5,
        isCompleted: false,
        lessons: [
            {
                id: 7,
                title: "Sóng cơ và sự truyền sóng",
                duration: "25:20",
                isCompleted: true,
                isWatching: false,
                isFree: true,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 8,
                title: "Giao thoa sóng",
                duration: "28:30",
                isCompleted: true,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: true,
            },
            {
                id: 9,
                title: "Sóng dừng",
                duration: "22:45",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: false,
            },
            {
                id: 10,
                title: "Sóng âm",
                duration: "30:15",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 11,
                title: "Ứng dụng sóng âm",
                duration: "20:00",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: true,
            },
        ],
    },
    {
        id: 3,
        title: "Chương 3: Dòng điện xoay chiều",
        duration: "4h 20m",
        completedLessons: 0,
        totalLessons: 6,
        isCompleted: false,
        lessons: [
            {
                id: 12,
                title: "Đại cương về dòng điện xoay chiều",
                duration: "35:20",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 13,
                title: "Các loại mạch điện xoay chiều",
                duration: "40:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 14,
                title: "Công suất trong mạch xoay chiều",
                duration: "32:45",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: false,
            },
            {
                id: 15,
                title: "Máy biến áp",
                duration: "28:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 16,
                title: "Truyền tải điện năng",
                duration: "25:15",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: true,
            },
            {
                id: 17,
                title: "Bài tập tổng hợp",
                duration: "45:00",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
        ],
    },
    {
        id: 3,
        title: "Chương 3: Dòng điện xoay chiều",
        duration: "4h 20m",
        completedLessons: 0,
        totalLessons: 6,
        isCompleted: false,
        lessons: [
            {
                id: 12,
                title: "Đại cương về dòng điện xoay chiều",
                duration: "35:20",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 13,
                title: "Các loại mạch điện xoay chiều",
                duration: "40:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 14,
                title: "Công suất trong mạch xoay chiều",
                duration: "32:45",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: false,
            },
            {
                id: 15,
                title: "Máy biến áp",
                duration: "28:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 16,
                title: "Truyền tải điện năng",
                duration: "25:15",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: true,
            },
            {
                id: 17,
                title: "Bài tập tổng hợp",
                duration: "45:00",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
        ],
    },
    {
        id: 3,
        title: "Chương 3: Dòng điện xoay chiều",
        duration: "4h 20m",
        completedLessons: 0,
        totalLessons: 6,
        isCompleted: false,
        lessons: [
            {
                id: 12,
                title: "Đại cương về dòng điện xoay chiều",
                duration: "35:20",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 13,
                title: "Các loại mạch điện xoay chiều",
                duration: "40:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 14,
                title: "Công suất trong mạch xoay chiều",
                duration: "32:45",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: false,
            },
            {
                id: 15,
                title: "Máy biến áp",
                duration: "28:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 16,
                title: "Truyền tải điện năng",
                duration: "25:15",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: true,
            },
            {
                id: 17,
                title: "Bài tập tổng hợp",
                duration: "45:00",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
        ],
    },
    {
        id: 4,
        title: "Chương 3: Dòng điện xoay chiều",
        duration: "4h 20m",
        completedLessons: 0,
        totalLessons: 6,
        isCompleted: false,
        lessons: [
            {
                id: 12,
                title: "Đại cương về dòng điện xoay chiều",
                duration: "35:20",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 13,
                title: "Các loại mạch điện xoay chiều",
                duration: "40:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 14,
                title: "Công suất trong mạch xoay chiều",
                duration: "32:45",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: false,
            },
            {
                id: 15,
                title: "Máy biến áp",
                duration: "28:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 16,
                title: "Truyền tải điện năng",
                duration: "25:15",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: true,
            },
            {
                id: 17,
                title: "Bài tập tổng hợp",
                duration: "45:00",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
        ],
    },
    {
        id: 5,
        title: "Chương 3: Dòng điện xoay chiều",
        duration: "4h 20m",
        completedLessons: 0,
        totalLessons: 6,
        isCompleted: false,
        lessons: [
            {
                id: 12,
                title: "Đại cương về dòng điện xoay chiều",
                duration: "35:20",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 13,
                title: "Các loại mạch điện xoay chiều",
                duration: "40:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 14,
                title: "Công suất trong mạch xoay chiều",
                duration: "32:45",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: false,
            },
            {
                id: 15,
                title: "Máy biến áp",
                duration: "28:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 16,
                title: "Truyền tải điện năng",
                duration: "25:15",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: true,
            },
            {
                id: 17,
                title: "Bài tập tổng hợp",
                duration: "45:00",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
        ],
    },
    {
        id: 6,
        title: "Chương 3: Dòng điện xoay chiều",
        duration: "4h 20m",
        completedLessons: 0,
        totalLessons: 6,
        isCompleted: false,
        lessons: [
            {
                id: 12,
                title: "Đại cương về dòng điện xoay chiều",
                duration: "35:20",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 13,
                title: "Các loại mạch điện xoay chiều",
                duration: "40:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 14,
                title: "Công suất trong mạch xoay chiều",
                duration: "32:45",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: false,
            },
            {
                id: 15,
                title: "Máy biến áp",
                duration: "28:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 16,
                title: "Truyền tải điện năng",
                duration: "25:15",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: true,
            },
            {
                id: 17,
                title: "Bài tập tổng hợp",
                duration: "45:00",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
        ],
    },
    {
        id: 7,
        title: "Chương 3: Dòng điện xoay chiều",
        duration: "4h 20m",
        completedLessons: 0,
        totalLessons: 6,
        isCompleted: false,
        lessons: [
            {
                id: 12,
                title: "Đại cương về dòng điện xoay chiều",
                duration: "35:20",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 13,
                title: "Các loại mạch điện xoay chiều",
                duration: "40:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 14,
                title: "Công suất trong mạch xoay chiều",
                duration: "32:45",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: false,
            },
            {
                id: 15,
                title: "Máy biến áp",
                duration: "28:30",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
            {
                id: 16,
                title: "Truyền tải điện năng",
                duration: "25:15",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: false,
                hasResources: true,
            },
            {
                id: 17,
                title: "Bài tập tổng hợp",
                duration: "45:00",
                isCompleted: false,
                isWatching: false,
                isFree: false,
                hasQuiz: true,
                hasResources: true,
            },
        ],
    },
];

const VideoPage = () => {
    const [openChapter, setOpenChapter] = useState(1);
    const [activeTab, setActiveTab] = useState("lessons"); // "lessons" | "comments" | "resources"

    const handleChapterToggle = (chapterId: number) => {
        setOpenChapter((prev) => (prev === chapterId ? 0 : chapterId));
    };

    const getLessonIcon = (lesson: Lesson) => {
        if (lesson.isCompleted) return <CheckCircle className="h-4 w-4 text-green-600" />;
        if (lesson.isWatching) return <PlayCircle className="h-4 w-4 text-blue-600" />;
        return <Play className="h-4 w-4 text-gray-400" />;
    };

    const getLessonStatus = (lesson: Lesson) => {
        if (lesson.isCompleted) return "Đã hoàn thành";
        if (lesson.isWatching) return "Đang xem";
        return "";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex h-full gap-0 max-lg:flex-col">
                {/* Video Section */}
                <div className="flex-12/15">
                    {/* Video Player */}
                    <div className="bg-black">
                        <VideoPlayer src="/video.mp4" ratio="16:6" />

                        {/* Simple Video Info Overlay */}
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/20">
                                    <PlayCircle className="h-5 w-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-900 leading-tight">
                                        {mockCourseData.currentLesson.title}
                                    </p>
                                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                            Bài 3 của 6
                                        </span>
                                        <span className="text-gray-400">•</span>
                                        <span>Chương 1</span>
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium text-blue-600">
                                    {mockCourseData.currentLesson.duration}
                                </div>
                                <div className="mt-1 text-xs text-gray-500">Thời lượng</div>
                            </div>
                        </div>
                    </div>

                    {/* Simple Video Controls */}
                    <div className="border-b border-gray-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm">
                                    <ChevronLeft className="mr-1 h-4 w-4" />
                                    Bài trước
                                </Button>
                                <div className="h-4 w-px bg-gray-300"></div>
                                <Button size="sm" className="bg-primary/90 text-white">
                                    Bài tiếp theo
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                    <ThumbsUp className="mr-1 h-4 w-4" />
                                    Thích (42)
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Bookmark className="mr-1 h-4 w-4" />
                                    Lưu
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Share className="mr-1 h-4 w-4" />
                                    Chia sẻ
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Simple Video Info */}
                    <div className="bg-white">
                        <div className="p-6 max-lg:p-4">
                            {/* Course Header */}
                            <div className="mb-6">
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                                        <Award className="h-3 w-3" />
                                        Pro
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                        <Star className="h-3 w-3" />
                                        Bán chạy
                                    </span>
                                </div>

                                <h1 className="mb-3 text-2xl font-bold text-gray-900 max-lg:text-xl">
                                    {mockCourseData.title}
                                </h1>

                                <p className="text-gray-600 max-lg:text-sm">{mockCourseData.description}</p>
                            </div>

                            {/* Simple Instructor Card */}
                            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                                            {mockCourseData.instructor.avatar}
                                        </div>
                                        <div className="absolute -right-1 -bottom-1 rounded-full bg-white p-1">
                                            <CheckCircle className="h-3 w-3 text-blue-500" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">
                                            {mockCourseData.instructor.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">{mockCourseData.instructor.title}</p>
                                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-medium">{mockCourseData.stats.rating}</span>
                                            <span>
                                                ({formatter.number(mockCourseData.stats.totalReviews)} đánh giá)
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Nhắn tin
                                    </Button>
                                </div>
                            </div>

                            {/* Simple Progress Section */}
                            <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-5">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <PlayCircle className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Tiến độ học tập</h3>
                                            <p className="text-sm text-gray-600">Bạn đang học tốt!</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-blue-600">
                                            {mockCourseData.progress.percentComplete}%
                                        </div>
                                        <div className="text-xs text-gray-600">hoàn thành</div>
                                    </div>
                                </div>

                                <div className="mb-3 h-2 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                                        style={{ width: `${mockCourseData.progress.percentComplete}%` }}
                                    ></div>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>{mockCourseData.progress.completedLessons} bài đã hoàn thành</span>
                                    <span>
                                        Còn lại{" "}
                                        {mockCourseData.progress.totalLessons -
                                            mockCourseData.progress.completedLessons}{" "}
                                        bài
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="border-l border-gray-200 bg-white max-lg:border-t max-lg:border-l-0 lg:w-[500px]">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab("lessons")}
                            className={`flex-1 cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
                                activeTab === "lessons"
                                    ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <BookOpen className="mr-2 inline h-4 w-4" />
                            Nội dung
                        </button>
                        <button
                            onClick={() => setActiveTab("comments")}
                            className={`flex-1 cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
                                activeTab === "comments"
                                    ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <MessageCircle className="mr-2 inline h-4 w-4" />
                            Bình luận
                        </button>
                        <button
                            onClick={() => setActiveTab("resources")}
                            className={`flex-1 cursor-pointer px-4 py-3 text-sm font-medium transition-colors ${
                                activeTab === "resources"
                                    ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <FileText className="mr-2 inline h-4 w-4" />
                            Tài liệu
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="h-full">
                        {activeTab === "lessons" && (
                            <div className="p-4">
                                {/* Course Overview */}
                                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                                    <h3 className="mb-2 font-semibold text-gray-900">Tổng quan khóa học</h3>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-gray-500" />
                                            <span>{mockCourseData.progress.totalLessons} bài học</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-500" />
                                            <span>10h 5m</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Award className="h-4 w-4 text-gray-500" />
                                            <span>Chứng chỉ</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-gray-500" />
                                            <span>Trọn đời</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chapters */}
                                <div className="space-y-2">
                                    {mockChapters.map((chapter, chapterIndex) => (
                                        <div key={chapter.id} className={`rounded-lg border border-gray-200`}>
                                            {/* Chapter Header */}
                                            <button
                                                onClick={() => handleChapterToggle(chapter.id)}
                                                className="w-full p-4 text-left transition-colors hover:bg-gray-50"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-600">
                                                        {chapterIndex + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="mb-1 text-sm font-semibold text-gray-900">
                                                            {chapter.title}
                                                        </h4>
                                                        <div className="flex items-center gap-3 text-xs text-gray-600">
                                                            <span>{chapter.lessons.length} bài học</span>
                                                            <span>{chapter.duration}</span>
                                                            <span className="text-green-600">
                                                                {chapter.completedLessons}/{chapter.totalLessons} hoàn
                                                                thành
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ChevronDown
                                                        className={`h-5 w-5 text-gray-400 transition-transform ${
                                                            openChapter === chapter.id ? "rotate-180" : ""
                                                        }`}
                                                    />
                                                </div>
                                            </button>

                                            {/* Lessons */}
                                            <AnimatePresence>
                                                {openChapter === chapter.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden bg-gray-50"
                                                    >
                                                        {chapter.lessons.map((lesson, lessonIndex) => (
                                                            <div
                                                                key={lesson.id}
                                                                className={`ml-4 flex cursor-pointer items-center gap-3 border-l-2 p-3 transition-colors hover:bg-white ${
                                                                    lesson.isWatching
                                                                        ? "border-l-blue-500 bg-blue-50"
                                                                        : lesson.isCompleted
                                                                          ? "border-l-green-400 bg-green-50"
                                                                          : "border-l-gray-200"
                                                                }`}
                                                            >
                                                                {/* Lesson Status Icon */}
                                                                <div className="flex-shrink-0">
                                                                    {getLessonIcon(lesson)}
                                                                </div>

                                                                {/* Lesson Info */}
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="mb-1 flex items-center gap-2">
                                                                        <span className="text-xs text-gray-500">
                                                                            {lessonIndex + 1}.
                                                                        </span>
                                                                        <h5
                                                                            className={`truncate text-sm font-medium ${
                                                                                lesson.isWatching
                                                                                    ? "text-blue-700"
                                                                                    : lesson.isCompleted
                                                                                      ? "text-green-700"
                                                                                      : "text-gray-900"
                                                                            }`}
                                                                        >
                                                                            {lesson.title}
                                                                        </h5>
                                                                    </div>

                                                                    <div className="flex items-center gap-2 text-xs">
                                                                        <span className="flex items-center gap-1 text-gray-600">
                                                                            <Clock className="h-3 w-3" />
                                                                            {lesson.duration}
                                                                        </span>

                                                                        {lesson.isFree && (
                                                                            <span className="rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-700">
                                                                                Miễn phí
                                                                            </span>
                                                                        )}

                                                                        {!lesson.isFree &&
                                                                            !lesson.isCompleted &&
                                                                            !lesson.isWatching && (
                                                                                <Lock className="h-3 w-3 text-gray-400" />
                                                                            )}
                                                                    </div>

                                                                    {/* Lesson Status */}
                                                                    {getLessonStatus(lesson) && (
                                                                        <div className="mt-1">
                                                                            <span
                                                                                className={`text-xs font-medium ${
                                                                                    lesson.isCompleted
                                                                                        ? "text-green-600"
                                                                                        : "text-blue-600"
                                                                                }`}
                                                                            >
                                                                                {getLessonStatus(lesson)}
                                                                            </span>
                                                                        </div>
                                                                    )}

                                                                    {/* Lesson Resources */}
                                                                    <div className="mt-1 flex items-center gap-2">
                                                                        {lesson.hasQuiz && (
                                                                            <span className="flex items-center gap-1 rounded bg-orange-100 px-1.5 py-0.5 text-xs text-orange-600">
                                                                                <Award className="h-3 w-3" />
                                                                                Quiz
                                                                            </span>
                                                                        )}
                                                                        {lesson.hasResources && (
                                                                            <span className="flex items-center gap-1 rounded bg-purple-100 px-1.5 py-0.5 text-xs text-purple-600">
                                                                                <FileText className="h-3 w-3" />
                                                                                Tài liệu
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Play Button */}
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8 w-8 p-2"
                                                                >
                                                                    <Play className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "comments" && (
                            <div className="p-4">
                                <div className="py-8 text-center">
                                    <MessageCircle className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                                    <p className="text-gray-600">Chức năng bình luận đang được phát triển</p>
                                </div>
                            </div>
                        )}

                        {activeTab === "resources" && (
                            <div className="p-4">
                                <div className="py-8 text-center">
                                    <FileText className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                                    <p className="text-gray-600">Chức năng tài liệu đang được phát triển</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
