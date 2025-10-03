"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import courseApi from "~/apiRequest/course";
import { formatter } from "~/libs/format";
import { AddChapterDialog } from "./AddChapterDialog";
import { AddLessonDialog } from "./AddLessonDialog";
import DeleteLessonButton from "./DeleteLessonButton";
import DeleteChapterButton from "./DeleteChapterButton";
import Loading from "~/app/(student)/_components/Loading";
import { EditChapterButton } from "./EditChapterButton";
import { EditLessonDialog } from "./EditLessonDialog";

const ChaptersList = ({ slug }: { slug: string }) => {
    const { data: chapters } = useQuery({
        queryKey: ["course", "chapters", slug],
        queryFn: async () => {
            const res = await courseApi.getChapterLessonList(slug);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 phút
    });

    // State để theo dõi các chapter đang mở
    const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

    // Hàm toggle chapter
    const toggleChapter = (chapterId: number) => {
        setExpandedChapters(
            (prev) =>
                prev.includes(chapterId)
                    ? prev.filter((id) => id !== chapterId) // Đóng nếu đã mở
                    : [...prev, chapterId], // Mở nếu chưa mở
        );
    };

    if (!chapters) {
        return <Loading />;
    }

    return (
        <>
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center md:mb-6">
                <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Nội dung khóa học</h2>
                <AddChapterDialog courseSlug={slug} maxPosition={chapters.length || 0} style={1} />
            </div>

            <div className="space-y-3 md:space-y-4">
                {chapters.map((chapter, chapterIndex) => (
                    <div key={chapter.id} className="overflow-hidden rounded-lg border border-gray-200 shadow-xs">
                        {/* Chapter Header */}
                        <div className="bg-gray-80 flex cursor-pointer items-center justify-between gap-2 p-3 transition-colors hover:bg-blue-50 max-2xl:flex-col md:p-4">
                            <div className="w-full" onClick={() => toggleChapter(chapter.id)}>
                                <div className="flex items-center gap-2 md:gap-3">
                                    {expandedChapters.includes(chapter.id) ? (
                                        <ChevronDown className="h-4 w-4 text-blue-600 md:h-5 md:w-5" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-gray-600 md:h-5 md:w-5" />
                                    )}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 md:text-base">
                                            Chương {chapterIndex + 1}: {chapter.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 md:text-sm">
                                            {chapter.lessons.length} bài học
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 md:gap-2">
                                <div className="hidden items-center gap-2 sm:flex">
                                    <AddLessonDialog
                                        slugCourse={slug}
                                        chapterId={chapter.id}
                                        nameChapterCourse={chapter.title}
                                        maxPosition={chapter.lessons.length || 0}
                                        style={1}
                                    />
                                    <EditChapterButton
                                        chapterId={chapter.id}
                                        nameChapterCourse={chapter.title}
                                        currentPosition={chapter.position ?? 0}
                                    />
                                    <DeleteChapterButton
                                        slugCourse={slug}
                                        name={chapter.title}
                                        chapterId={chapter.id}
                                    />
                                </div>

                                {/* Mobile menu button - hiển thị khi cần */}
                                <div className="flex items-center gap-1 sm:hidden">
                                    <EditChapterButton
                                        chapterId={chapter.id}
                                        nameChapterCourse={chapter.title}
                                        currentPosition={chapter.position ?? 0}
                                    />
                                    <DeleteChapterButton
                                        slugCourse={slug}
                                        name={chapter.title}
                                        chapterId={chapter.id}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Chapter Content */}
                        {expandedChapters.includes(chapter.id) && (
                            <div className="border-t border-gray-200">
                                {/* Mobile Add Lesson Button */}
                                <div className="border-b border-gray-100 bg-blue-50 p-3 sm:hidden">
                                    <AddLessonDialog
                                        slugCourse={slug}
                                        chapterId={chapter.id}
                                        nameChapterCourse={chapter.title}
                                        maxPosition={chapter.lessons.length || 0}
                                        style={2}
                                    />
                                </div>

                                {chapter.lessons.map((lesson, lessonIndex) => (
                                    <div
                                        key={lesson.id}
                                        className={`flex flex-col justify-between gap-3 p-3 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center md:p-4 ${
                                            lessonIndex < chapter.lessons.length - 1 ? "border-b border-gray-100" : ""
                                        }`}
                                    >
                                        <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
                                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600 md:h-8 md:w-8 md:text-sm">
                                                {lessonIndex + 1}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="truncate text-sm font-medium text-gray-900 md:text-base">
                                                    Bài {lessonIndex + 1}: {lesson.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 md:text-sm">
                                                    {formatter.duration(lesson.duration)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-2 sm:justify-start">
                                            <EditLessonDialog
                                                lesson={{
                                                    slug: lesson.slug,
                                                    title: lesson.title,
                                                    content: lesson.content,
                                                    position: lesson.position,
                                                    duration: lesson.duration,
                                                    is_free: lesson.is_free,
                                                    video_url: lesson.video_url,
                                                }}
                                            />
                                            <DeleteLessonButton
                                                slugCourse={slug}
                                                slugLesson={lesson.slug}
                                                name={lesson.title}
                                            />
                                        </div>
                                    </div>
                                ))}

                                {/* Add lesson button in chapter - Desktop only */}
                                <div className="hidden border-t border-gray-100 bg-gray-50 p-3 sm:block md:p-4">
                                    <AddLessonDialog
                                        slugCourse={slug}
                                        chapterId={chapter.id}
                                        nameChapterCourse={chapter.title}
                                        maxPosition={chapter.lessons.length || 0}
                                        style={2}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 border-t border-gray-200 pt-4 md:mt-6 md:pt-6">
                <AddChapterDialog courseSlug={slug} maxPosition={chapters.length || 0} style={2} />
            </div>
        </>
    );
};

export default ChaptersList;
