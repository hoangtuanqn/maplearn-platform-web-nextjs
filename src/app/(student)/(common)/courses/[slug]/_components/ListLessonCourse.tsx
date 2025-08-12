"use client";
import React, { useState } from "react";
import { Award, ChevronDown, CircleCheckBig, Clock, FileText, Lock, MonitorPause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import courseApi from "~/apiRequest/course";
import { useParams } from "next/navigation";
import { formatter } from "~/libs/format";
import { Button } from "~/components/ui/button";

// const mockChapters = [
//     {
//         id: 1,
//         title: "Chương 1: Dao động cơ",
//         duration: "2h 30m",
//         completedLessons: 4,
//         totalLessons: 6,
//         isCompleted: false,
//         lessons: [
//             {
//                 id: 1,
//                 title: "Dao động điều hòa",
//                 duration: "15:30",
//                 isCompleted: true,
//                 isWatching: false,
//                 isFree: true,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 2,
//                 title: "Con lắc lò xo",
//                 duration: "18:45",
//                 isCompleted: true,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: false,
//             },
//             {
//                 id: 3,
//                 title: "Con lắc đơn",
//                 duration: "22:15",
//                 isCompleted: false,
//                 isWatching: true,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 4,
//                 title: "Tổng hợp dao động",
//                 duration: "20:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: true,
//             },
//             {
//                 id: 5,
//                 title: "Bài tập dao động",
//                 duration: "25:00",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: false,
//             },
//             {
//                 id: 6,
//                 title: "Kiểm tra chương 1",
//                 duration: "30:00",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//         ],
//     },
//     {
//         id: 2,
//         title: "Chương 2: Sóng cơ",
//         duration: "3h 15m",
//         completedLessons: 2,
//         totalLessons: 5,
//         isCompleted: false,
//         lessons: [
//             {
//                 id: 7,
//                 title: "Sóng cơ và sự truyền sóng",
//                 duration: "25:20",
//                 isCompleted: true,
//                 isWatching: false,
//                 isFree: true,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 8,
//                 title: "Giao thoa sóng",
//                 duration: "28:30",
//                 isCompleted: true,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: true,
//             },
//             {
//                 id: 9,
//                 title: "Sóng dừng",
//                 duration: "22:45",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: false,
//             },
//             {
//                 id: 10,
//                 title: "Sóng âm",
//                 duration: "30:15",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 11,
//                 title: "Ứng dụng sóng âm",
//                 duration: "20:00",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: true,
//             },
//         ],
//     },
//     {
//         id: 3,
//         title: "Chương 3: Dòng điện xoay chiều",
//         duration: "4h 20m",
//         completedLessons: 0,
//         totalLessons: 6,
//         isCompleted: false,
//         lessons: [
//             {
//                 id: 12,
//                 title: "Đại cương về dòng điện xoay chiều",
//                 duration: "35:20",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 13,
//                 title: "Các loại mạch điện xoay chiều",
//                 duration: "40:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 14,
//                 title: "Công suất trong mạch xoay chiều",
//                 duration: "32:45",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: false,
//             },
//             {
//                 id: 15,
//                 title: "Máy biến áp",
//                 duration: "28:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 16,
//                 title: "Truyền tải điện năng",
//                 duration: "25:15",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: true,
//             },
//             {
//                 id: 17,
//                 title: "Bài tập tổng hợp",
//                 duration: "45:00",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//         ],
//     },
//     {
//         id: 3,
//         title: "Chương 3: Dòng điện xoay chiều",
//         duration: "4h 20m",
//         completedLessons: 0,
//         totalLessons: 6,
//         isCompleted: false,
//         lessons: [
//             {
//                 id: 12,
//                 title: "Đại cương về dòng điện xoay chiều",
//                 duration: "35:20",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 13,
//                 title: "Các loại mạch điện xoay chiều",
//                 duration: "40:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 14,
//                 title: "Công suất trong mạch xoay chiều",
//                 duration: "32:45",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: false,
//             },
//             {
//                 id: 15,
//                 title: "Máy biến áp",
//                 duration: "28:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 16,
//                 title: "Truyền tải điện năng",
//                 duration: "25:15",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: true,
//             },
//             {
//                 id: 17,
//                 title: "Bài tập tổng hợp",
//                 duration: "45:00",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//         ],
//     },
//     {
//         id: 3,
//         title: "Chương 3: Dòng điện xoay chiều",
//         duration: "4h 20m",
//         completedLessons: 0,
//         totalLessons: 6,
//         isCompleted: false,
//         lessons: [
//             {
//                 id: 12,
//                 title: "Đại cương về dòng điện xoay chiều",
//                 duration: "35:20",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 13,
//                 title: "Các loại mạch điện xoay chiều",
//                 duration: "40:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 14,
//                 title: "Công suất trong mạch xoay chiều",
//                 duration: "32:45",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: false,
//             },
//             {
//                 id: 15,
//                 title: "Máy biến áp",
//                 duration: "28:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 16,
//                 title: "Truyền tải điện năng",
//                 duration: "25:15",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: true,
//             },
//             {
//                 id: 17,
//                 title: "Bài tập tổng hợp",
//                 duration: "45:00",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//         ],
//     },
//     {
//         id: 4,
//         title: "Chương 3: Dòng điện xoay chiều",
//         duration: "4h 20m",
//         completedLessons: 0,
//         totalLessons: 6,
//         isCompleted: false,
//         lessons: [
//             {
//                 id: 12,
//                 title: "Đại cương về dòng điện xoay chiều",
//                 duration: "35:20",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 13,
//                 title: "Các loại mạch điện xoay chiều",
//                 duration: "40:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 14,
//                 title: "Công suất trong mạch xoay chiều",
//                 duration: "32:45",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: false,
//             },
//             {
//                 id: 15,
//                 title: "Máy biến áp",
//                 duration: "28:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 16,
//                 title: "Truyền tải điện năng",
//                 duration: "25:15",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: true,
//             },
//             {
//                 id: 17,
//                 title: "Bài tập tổng hợp",
//                 duration: "45:00",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//         ],
//     },
//     {
//         id: 5,
//         title: "Chương 3: Dòng điện xoay chiều",
//         duration: "4h 20m",
//         completedLessons: 0,
//         totalLessons: 6,
//         isCompleted: false,
//         lessons: [
//             {
//                 id: 12,
//                 title: "Đại cương về dòng điện xoay chiều",
//                 duration: "35:20",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 13,
//                 title: "Các loại mạch điện xoay chiều",
//                 duration: "40:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 14,
//                 title: "Công suất trong mạch xoay chiều",
//                 duration: "32:45",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: false,
//             },
//             {
//                 id: 15,
//                 title: "Máy biến áp",
//                 duration: "28:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 16,
//                 title: "Truyền tải điện năng",
//                 duration: "25:15",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: true,
//             },
//             {
//                 id: 17,
//                 title: "Bài tập tổng hợp",
//                 duration: "45:00",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//         ],
//     },
//     {
//         id: 6,
//         title: "Chương 3: Dòng điện xoay chiều",
//         duration: "4h 20m",
//         completedLessons: 0,
//         totalLessons: 6,
//         isCompleted: false,
//         lessons: [
//             {
//                 id: 12,
//                 title: "Đại cương về dòng điện xoay chiều",
//                 duration: "35:20",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 13,
//                 title: "Các loại mạch điện xoay chiều",
//                 duration: "40:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 14,
//                 title: "Công suất trong mạch xoay chiều",
//                 duration: "32:45",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: false,
//             },
//             {
//                 id: 15,
//                 title: "Máy biến áp",
//                 duration: "28:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 16,
//                 title: "Truyền tải điện năng",
//                 duration: "25:15",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: true,
//             },
//             {
//                 id: 17,
//                 title: "Bài tập tổng hợp",
//                 duration: "45:00",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//         ],
//     },
//     {
//         id: 7,
//         title: "Chương 3: Dòng điện xoay chiều",
//         duration: "4h 20m",
//         completedLessons: 0,
//         totalLessons: 6,
//         isCompleted: false,
//         lessons: [
//             {
//                 id: 12,
//                 title: "Đại cương về dòng điện xoay chiều",
//                 duration: "35:20",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 13,
//                 title: "Các loại mạch điện xoay chiều",
//                 duration: "40:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 14,
//                 title: "Công suất trong mạch xoay chiều",
//                 duration: "32:45",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: false,
//             },
//             {
//                 id: 15,
//                 title: "Máy biến áp",
//                 duration: "28:30",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//             {
//                 id: 16,
//                 title: "Truyền tải điện năng",
//                 duration: "25:15",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: false,
//                 hasResources: true,
//             },
//             {
//                 id: 17,
//                 title: "Bài tập tổng hợp",
//                 duration: "45:00",
//                 isCompleted: false,
//                 isWatching: false,
//                 isFree: false,
//                 hasQuiz: true,
//                 hasResources: true,
//             },
//         ],
//     },
// ];

const ListLessonCourse = () => {
    const params = useParams<{ slug: string }>();
    const [open, setOpen] = useState(1);
    const { data: chapters } = useQuery({
        queryKey: ["course", "chapters"],
        queryFn: async () => {
            const res = await courseApi.getChapterLessonList(params.slug);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 phút
    });
    const handleChapterToggle = (chapterId: number) => {
        setOpen((prev) => (prev === chapterId ? 0 : chapterId));
    };
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-8">
            <p className="text-base font-bold">Nội dung khóa học</p>
            <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                {chapters?.map((chapter, chapterIndex) => (
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
                                    <h4 className="mb-1 text-sm font-semibold text-gray-900">{chapter.title}</h4>
                                    <div className="flex items-center gap-3 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <FileText className="h-3 w-3" />
                                            {chapter.lessons.length} bài học
                                        </span>
                                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {formatter.duration(
                                                chapter.lessons.reduce((acc, lesson) => acc + lesson.duration, 0),
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown
                                    className={`h-5 w-5 text-gray-400 transition-transform ${
                                        open === chapter.id ? "rotate-180" : ""
                                    }`}
                                />
                            </div>
                        </button>

                        {/* Lessons */}
                        <AnimatePresence>
                            {open === chapter.id && (
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
                                            className={`ml-4 flex cursor-pointer items-center gap-3 border-l-2 border-l-gray-200 p-3 transition-colors hover:bg-white`}
                                        >
                                            {/* Lesson Status Icon */}
                                            <div className="flex-shrink-0">
                                                <Play className="h-4 w-4 text-gray-400" />
                                            </div>

                                            {/* Lesson Info */}
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <span className="text-xs text-gray-500">{lessonIndex + 1}.</span>
                                                    <h5 className={`truncate text-sm font-medium text-gray-900`}>
                                                        {lesson.title}
                                                    </h5>
                                                </div>

                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className="flex items-center gap-1 text-gray-600">
                                                        <Clock className="h-3 w-3" />
                                                        {formatter.duration(lesson.duration)}
                                                    </span>

                                                    {lesson.is_free && (
                                                        <span className="rounded-full bg-green-100 px-4 py-0.5 font-medium text-green-700">
                                                            Miễn phí
                                                        </span>
                                                    )}

                                                    {!lesson.is_free && <Lock className="h-3 w-3 text-gray-400" />}
                                                </div>

                                                {/* Lesson Resources */}
                                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                                    <span className="flex items-center gap-1 rounded-sm bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                                                        <Award className="h-3 w-3" />
                                                        Quiz
                                                    </span>

                                                    <span className="flex items-center gap-1 rounded-sm bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                                                        <FileText className="h-3 w-3" />
                                                        Bài tập
                                                    </span>

                                                    <span className="flex items-center gap-1 rounded-sm bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                                                        <FileText className="h-3 w-3" />
                                                        Tài liệu
                                                    </span>

                                                    <span className="flex items-center gap-1 rounded-sm bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                                       <CircleCheckBig className="h-3 w-3" />
                                                        Hoàn thành
                                                    </span>

                                                    <span className="flex items-center gap-1 rounded-sm bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-700">
                                                        <MonitorPause className="h-3 w-3" />
                                                        Đang học
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Play Button */}
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-2">
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
    );
};

export default ListLessonCourse;
