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
    CircleCheckBig,
    Brain,
    Eye,
    PenTool,
    HelpCircle,
    Target,
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
    const [activeVideoTab, setActiveVideoTab] = useState("overview"); // "overview" | "comments" | "notes" | "resources" | "quiz"

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
                                    <p className="text-lg leading-tight font-semibold text-gray-900">
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

                    {/* Video Lesson Tabs */}
                    <div className="border-b border-gray-200 bg-white">
                        {/* Tab Navigation */}
                        <div className="flex border-b border-gray-100">
                            <button
                                onClick={() => setActiveVideoTab("overview")}
                                className={`px-4 py-3 text-sm font-medium transition-colors ${
                                    activeVideoTab === "overview"
                                        ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                <Eye className="mr-2 inline h-4 w-4" />
                                Tổng quan bài học
                            </button>
                            <button
                                onClick={() => setActiveVideoTab("discussion")}
                                className={`px-4 py-3 text-sm font-medium transition-colors ${
                                    activeVideoTab === "discussion"
                                        ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                <MessageCircle className="mr-2 inline h-4 w-4" />
                                Thảo luận
                            </button>
                            <button
                                onClick={() => setActiveVideoTab("notes")}
                                className={`px-4 py-3 text-sm font-medium transition-colors ${
                                    activeVideoTab === "notes"
                                        ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                <PenTool className="mr-2 inline h-4 w-4" />
                                Ghi chú
                            </button>
                            <button
                                onClick={() => setActiveVideoTab("resources")}
                                className={`px-4 py-3 text-sm font-medium transition-colors ${
                                    activeVideoTab === "resources"
                                        ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                <Download className="mr-2 inline h-4 w-4" />
                                Tài nguyên
                            </button>
                            <button
                                onClick={() => setActiveVideoTab("quiz")}
                                className={`px-4 py-3 text-sm font-medium transition-colors ${
                                    activeVideoTab === "quiz"
                                        ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                <HelpCircle className="mr-2 inline h-4 w-4" />
                                Bài tập & Quiz
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6 max-lg:p-4">
                            {activeVideoTab === "overview" && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-3 text-lg font-semibold text-gray-900">Mô tả bài học</h3>
                                        <p className="leading-relaxed text-gray-700">
                                            Trong bài học này, chúng ta sẽ tìm hiểu về dao động điều hòa của con lắc
                                            đơn. Bài học bao gồm các khái niệm cơ bản về chu kỳ, tần số, và các yếu tố
                                            ảnh hưởng đến dao động của con lắc đơn.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="mb-3 text-lg font-semibold text-gray-900">Mục tiêu học tập</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-3">
                                                <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                                <span className="text-gray-700">
                                                    Hiểu được định nghĩa và đặc điểm của con lắc đơn
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                                <span className="text-gray-700">
                                                    Nắm vững công thức tính chu kỳ dao động
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                                <span className="text-gray-700">
                                                    Phân tích các yếu tố ảnh hưởng đến dao động
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                                <span className="text-gray-700">
                                                    Giải được các bài tập cơ bản về con lắc đơn
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="mb-3 text-lg font-semibold text-gray-900">Kiến thức đạt được</h3>
                                        <div className="grid gap-3 lg:grid-cols-2">
                                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                                <h4 className="mb-2 font-medium text-blue-900">Lý thuyết</h4>
                                                <ul className="space-y-1 text-sm text-blue-800">
                                                    <li>• Định nghĩa con lắc đơn</li>
                                                    <li>• Công thức chu kỳ dao động</li>
                                                    <li>• Điều kiện dao động điều hòa</li>
                                                </ul>
                                            </div>
                                            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                                <h4 className="mb-2 font-medium text-green-900">Thực hành</h4>
                                                <ul className="space-y-1 text-sm text-green-800">
                                                    <li>• Bài tập tính chu kỳ</li>
                                                    <li>• Phân tích dao động</li>
                                                    <li>• Ứng dụng thực tế</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeVideoTab === "discussion" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Thảo luận bài học</h3>
                                        <Button size="sm">
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            Đặt câu hỏi
                                        </Button>
                                    </div>

                                    {/* Mock Comments */}
                                    <div className="space-y-4">
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                                                    N
                                                </div>
                                                <div className="flex-1">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <span className="font-medium text-gray-900">Nguyễn Văn A</span>
                                                        <span className="text-xs text-gray-500">2 giờ trước</span>
                                                    </div>
                                                    <p className="text-sm text-gray-700">
                                                        Em muốn hỏi tại sao khi tăng chiều dài dây thì chu kỳ dao động
                                                        lại tăng ạ?
                                                    </p>
                                                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                                                        <button className="hover:text-blue-600">Trả lời</button>
                                                        <button className="hover:text-blue-600">Thích (3)</button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Reply */}
                                            <div className="mt-3 ml-11 rounded-lg border border-gray-200 bg-white p-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs font-medium text-white">
                                                        GV
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="mb-1 flex items-center gap-2">
                                                            <span className="font-medium text-gray-900">
                                                                Thầy Vũ Ngọc Anh
                                                            </span>
                                                            <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                                                                Giảng viên
                                                            </span>
                                                            <span className="text-xs text-gray-500">1 giờ trước</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700">
                                                            Theo công thức T = 2π√(l/g), chu kỳ T tỉ lệ thuận với căn
                                                            bậc hai của chiều dài l. Vì vậy khi l tăng thì T cũng tăng
                                                            theo em nhé.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-sm font-medium text-white">
                                                    T
                                                </div>
                                                <div className="flex-1">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <span className="font-medium text-gray-900">Trần Thị B</span>
                                                        <span className="text-xs text-gray-500">4 giờ trước</span>
                                                    </div>
                                                    <p className="text-sm text-gray-700">
                                                        Bài giảng rất hay và dễ hiểu. Em đã nắm được phần lý thuyết. Cảm
                                                        ơn thầy!
                                                    </p>
                                                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                                                        <button className="hover:text-blue-600">Trả lời</button>
                                                        <button className="hover:text-blue-600">Thích (8)</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeVideoTab === "notes" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Ghi chú cá nhân</h3>
                                        <Button size="sm">
                                            <PenTool className="mr-2 h-4 w-4" />
                                            Thêm ghi chú
                                        </Button>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 p-4">
                                        <textarea
                                            placeholder="Viết ghi chú của bạn về bài học này..."
                                            className="h-32 w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Ghi chú sẽ được lưu tự động</span>
                                            <Button size="sm">Lưu ghi chú</Button>
                                        </div>
                                    </div>

                                    {/* Saved Notes */}
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900">Ghi chú đã lưu</h4>
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs font-medium text-blue-600">
                                                    1
                                                </div>
                                                <div className="flex-1">
                                                    <p className="mb-1 text-sm text-gray-700">
                                                        Công thức chu kỳ: T = 2π√(l/g) - l là chiều dài dây, g là gia
                                                        tốc trọng trường
                                                    </p>
                                                    <span className="text-xs text-gray-500">Đã lưu lúc 14:30</span>
                                                </div>
                                                <button className="text-gray-400 hover:text-red-600">
                                                    <FileText className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs font-medium text-blue-600">
                                                    2
                                                </div>
                                                <div className="flex-1">
                                                    <p className="mb-1 text-sm text-gray-700">
                                                        Điều kiện dao động điều hòa: góc lệch nhỏ (&alpha; &lt; 10°)
                                                    </p>
                                                    <span className="text-xs text-gray-500">Đã lưu lúc 14:25</span>
                                                </div>
                                                <button className="text-gray-400 hover:text-red-600">
                                                    <FileText className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeVideoTab === "resources" && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Tài nguyên bài học</h3>

                                    {/* Download Files */}
                                    <div>
                                        <h4 className="mb-3 font-medium text-gray-900">File tải xuống</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                                        <FileText className="h-5 w-5 text-red-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            Lý thuyết Con lắc đơn.pdf
                                                        </p>
                                                        <p className="text-sm text-gray-500">2.5 MB • PDF</p>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Tải xuống
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                                        <FileText className="h-5 w-5 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            Bài tập Con lắc đơn.docx
                                                        </p>
                                                        <p className="text-sm text-gray-500">1.8 MB • DOCX</p>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Tải xuống
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reference Links */}
                                    <div>
                                        <h4 className="mb-3 font-medium text-gray-900">Link tham khảo</h4>
                                        <div className="space-y-3">
                                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                                        <Share className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h5 className="font-medium text-gray-900">
                                                            Video thí nghiệm con lắc đơn
                                                        </h5>
                                                        <p className="mb-2 text-sm text-gray-600">
                                                            Video minh họa thí nghiệm con lắc đơn thực tế
                                                        </p>
                                                        <a
                                                            href="#"
                                                            className="text-sm text-blue-600 hover:text-blue-800"
                                                        >
                                                            https://youtube.com/watch?v=example
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                                                        <BookOpen className="h-4 w-4 text-purple-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h5 className="font-medium text-gray-900">
                                                            Bài viết chuyên sâu về dao động
                                                        </h5>
                                                        <p className="mb-2 text-sm text-gray-600">
                                                            Tài liệu tham khảo thêm về dao động cơ học
                                                        </p>
                                                        <a
                                                            href="#"
                                                            className="text-sm text-blue-600 hover:text-blue-800"
                                                        >
                                                            https://physicsworld.com/pendulum-motion
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeVideoTab === "quiz" && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Bài tập & Quiz</h3>
                                        <Button size="sm">
                                            <HelpCircle className="mr-2 h-4 w-4" />
                                            Làm bài kiểm tra
                                        </Button>
                                    </div>

                                    {/* Quiz Summary */}
                                    <div className="grid gap-4 lg:grid-cols-3">
                                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
                                            <div className="text-2xl font-bold text-blue-600">5</div>
                                            <div className="text-sm text-blue-800">Câu hỏi trắc nghiệm</div>
                                        </div>
                                        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
                                            <div className="text-2xl font-bold text-green-600">3</div>
                                            <div className="text-sm text-green-800">Bài tập tự luận</div>
                                        </div>
                                        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-center">
                                            <div className="text-2xl font-bold text-purple-600">15</div>
                                            <div className="text-sm text-purple-800">Phút hoàn thành</div>
                                        </div>
                                    </div>

                                    {/* Sample Questions */}
                                    <div>
                                        <h4 className="mb-4 font-medium text-gray-900">Câu hỏi mẫu</h4>
                                        <div className="space-y-4">
                                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                <h5 className="mb-3 font-medium text-gray-900">
                                                    Câu 1: Công thức tính chu kỳ dao động của con lắc đơn là:
                                                </h5>
                                                <div className="space-y-2">
                                                    <label className="flex cursor-pointer items-center gap-3">
                                                        <input type="radio" name="q1" className="text-blue-600" />
                                                        <span className="text-gray-700">A. T = 2π√(g/l)</span>
                                                    </label>
                                                    <label className="flex cursor-pointer items-center gap-3">
                                                        <input type="radio" name="q1" className="text-blue-600" />
                                                        <span className="text-gray-700">B. T = 2π√(l/g)</span>
                                                    </label>
                                                    <label className="flex cursor-pointer items-center gap-3">
                                                        <input type="radio" name="q1" className="text-blue-600" />
                                                        <span className="text-gray-700">C. T = π√(l/g)</span>
                                                    </label>
                                                    <label className="flex cursor-pointer items-center gap-3">
                                                        <input type="radio" name="q1" className="text-blue-600" />
                                                        <span className="text-gray-700">D. T = √(l/g)</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                <h5 className="mb-3 font-medium text-gray-900">
                                                    Câu 2: Yếu tố nào ảnh hưởng đến chu kỳ dao động của con lắc đơn?
                                                </h5>
                                                <div className="space-y-2">
                                                    <label className="flex cursor-pointer items-center gap-3">
                                                        <input type="checkbox" className="text-blue-600" />
                                                        <span className="text-gray-700">Chiều dài dây treo</span>
                                                    </label>
                                                    <label className="flex cursor-pointer items-center gap-3">
                                                        <input type="checkbox" className="text-blue-600" />
                                                        <span className="text-gray-700">Khối lượng vật nặng</span>
                                                    </label>
                                                    <label className="flex cursor-pointer items-center gap-3">
                                                        <input type="checkbox" className="text-blue-600" />
                                                        <span className="text-gray-700">Gia tốc trọng trường</span>
                                                    </label>
                                                    <label className="flex cursor-pointer items-center gap-3">
                                                        <input type="checkbox" className="text-blue-600" />
                                                        <span className="text-gray-700">Biên độ dao động</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Course Info - Udemy/Coursera Style */}
                    <div className="bg-white">
                        <div className="p-6 max-lg:p-4">
                            {/* Course Title & Description */}
                            <div className="mb-6 border-b border-gray-100 pb-6">
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                        Bestseller
                                    </span>
                                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                        Premium Course
                                    </span>
                                </div>

                                <h1 className="mb-3 text-2xl leading-tight font-bold text-gray-900 max-lg:text-xl">
                                    {mockCourseData.title}
                                </h1>

                                <p className="leading-relaxed text-gray-700 max-lg:text-sm">
                                    {mockCourseData.description}
                                </p>
                            </div>
                            <div>
                                {/* Instructor Section - Coursera Style */}
                                <div className="mb-6 border-b border-gray-100 pb-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Giáo viên</h3>
                                    <div className="flex items-start gap-4">
                                        <div className="relative flex-shrink-0">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white">
                                                {mockCourseData.instructor.avatar}
                                            </div>
                                            <div className="absolute -right-1 -bottom-1 rounded-full bg-white p-1 shadow-sm">
                                                <CheckCircle className="h-4 w-4 text-blue-500" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="mb-1 cursor-pointer text-lg font-semibold text-blue-600 hover:text-blue-800">
                                                {mockCourseData.instructor.name}
                                            </h4>
                                            <p className="mb-3 text-gray-600">{mockCourseData.instructor.title}</p>
                                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span>{mockCourseData.stats.rating} instructor rating</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    <span>
                                                        {formatter.number(mockCourseData.stats.totalStudents)} students
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Play className="h-4 w-4" />
                                                    <span>52 courses</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Content Overview */}
                                <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                                    <div className="text-center">
                                        <div className="mb-1 text-xl font-bold text-gray-900">
                                            {mockCourseData.progress.totalLessons}
                                        </div>
                                        <div className="text-sm text-gray-600">Lessons</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-1 text-xl font-bold text-gray-900">10h 5m</div>
                                        <div className="text-sm text-gray-600">Total length</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-1 text-xl font-bold text-gray-900">8</div>
                                        <div className="text-sm text-gray-600">Assignments</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-1 text-xl font-bold text-gray-900">✓</div>
                                        <div className="text-sm text-gray-600">Certificate</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 space-y-6 bg-white">
                                {/* Lợi ích sau khóa học */}
                                <div className="mt-6">
                                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                                        Bạn sẽ nhận được
                                    </h3>
                                    <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                                        <li>Nắm vững kiến thức trọng tâm của môn học.</li>
                                        <li>Phát triển kỹ năng giải nhanh các dạng bài tập.</li>
                                        <li>Tự tin tham gia các kỳ thi quan trọng.</li>
                                        <li>Nhận chứng chỉ hoàn thành khóa học.</li>
                                    </ul>
                                </div>

                                {/* Nội dung nổi bật */}
                                <div className="mt-6">
                                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                                        Nội dung nổi bật
                                    </h3>
                                    <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                                        <li>Sự điện li và ứng dụng trong thực tiễn.</li>
                                        <li>Este - Lipit: Cấu tạo, tính chất, bài tập vận dụng.</li>
                                        <li>Cacbonhidrat: Phân loại, phản ứng hóa học.</li>
                                        <li>Cân bằng hóa học và các dạng bài tập nâng cao.</li>
                                    </ul>
                                </div>

                                {/* Mô tả chi tiết */}
                                <div className="mt-6">
                                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Mô tả khóa học</h3>
                                    <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                                        - Bao phủ đầy đủ các chuyên đề Hóa 11 trọng tâm như: Sự điện li, Este - Lipit,
                                        Cacbonhidrat, Cân bằng hóa học,...
                                        <br />
                                        - Bài giảng dễ hiểu, kết hợp sơ đồ tư duy và hình ảnh trực quan.
                                        <br />- Có bài kiểm tra định kỳ giúp học sinh đánh giá tiến độ.
                                    </p>
                                </div>

                                {/* Đối tượng phù hợp */}
                                <div className="mt-6">
                                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                                        Đối tượng phù hợp
                                    </h3>
                                    <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                                        <li>Học sinh lớp 11 muốn học sớm, học chắc.</li>
                                        <li>Học sinh mất gốc cần học lại từ đầu.</li>
                                        <li>Học sinh muốn thi vào khối B, D.</li>
                                    </ul>
                                </div>

                                {/* Yêu cầu trước khi học */}
                                <div className="mt-6">
                                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                                        Yêu cầu trước khi học
                                    </h3>
                                    <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                                        <li>Kiến thức cơ bản môn Hóa học lớp 10.</li>
                                        <li>Có thiết bị (máy tính/điện thoại) có kết nối Internet.</li>
                                    </ul>
                                </div>

                                {/* Hình thức học */}
                                <div className="mt-6">
                                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Hình thức học</h3>
                                    <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                                        <li>100% học online, chủ động thời gian.</li>
                                        <li>Có thể xem lại bài giảng bất cứ lúc nào.</li>
                                        <li>Hỗ trợ hỏi đáp trực tuyến với giảng viên.</li>
                                        <li>Tài liệu PDF tải về miễn phí.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Course Rating & Stats */}
                            <div className="mb-6 flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    </div>
                                    <span className="font-semibold text-gray-900">{mockCourseData.stats.rating}</span>
                                    <span className="cursor-pointer text-blue-600 underline hover:no-underline">
                                        ({formatter.number(mockCourseData.stats.totalReviews)} ratings)
                                    </span>
                                </div>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">
                                    {formatter.number(mockCourseData.stats.totalStudents)} students enrolled
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">Last updated 1/2024</span>
                            </div>

                            {/* What You'll Learn - Udemy Style Box */}
                            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">What you&apos;ll learn</h3>
                                <div className="grid gap-3 lg:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                        <span className="text-sm text-gray-700">
                                            Nắm vững các khái niệm cơ bản về dao động cơ
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                        <span className="text-sm text-gray-700">
                                            Giải thành thạo các bài tập về sóng cơ
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                        <span className="text-sm text-gray-700">
                                            Hiểu rõ dòng điện xoay chiều và ứng dụng
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                        <span className="text-sm text-gray-700">
                                            Chuẩn bị tốt cho kỳ thi THPT Quốc gia
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download resources
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <Bookmark className="mr-2 h-4 w-4" />
                                    Save course
                                </Button>
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
                            <Brain className="mr-2 inline h-4 w-4" />
                            Trợ lý AI
                        </button>
                    </div>

                    {/* Your Progress - Sidebar */}
                    <div className="border-b border-gray-200 bg-gray-50 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">Tiến độ học tập</h3>
                            <span className="text-sm text-gray-600">
                                {mockCourseData.progress.completedLessons}/{mockCourseData.progress.totalLessons}
                            </span>
                        </div>

                        <div className="mb-2 h-2 w-full rounded-full bg-gray-200">
                            <div
                                className="h-2 rounded-full bg-green-500 transition-all duration-300"
                                style={{ width: `${mockCourseData.progress.percentComplete}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{mockCourseData.progress.percentComplete}% hoàn thành</span>
                            <span>
                                Còn {mockCourseData.progress.totalLessons - mockCourseData.progress.completedLessons}{" "}
                                bài
                            </span>
                        </div>
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
                                                className="w-full cursor-pointer p-4 text-left transition-colors hover:bg-gray-50"
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
                                                            <span className="flex items-center gap-1">
                                                                <FileText className="h-3 w-3" />
                                                                {chapter.lessons.length} bài học
                                                            </span>
                                                            <span className="h-1 w-1 rounded-full bg-gray-300" />
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="h-3 w-3" />
                                                                {chapter.duration}
                                                            </span>
                                                            {chapter.completedLessons > 0 && (
                                                                <>
                                                                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                                                                    <span className="flex items-center gap-1 text-green-600">
                                                                        <CircleCheckBig className="h-3 w-3" />
                                                                        {chapter.completedLessons}/
                                                                        {chapter.totalLessons} hoàn thành
                                                                    </span>
                                                                </>
                                                            )}
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
