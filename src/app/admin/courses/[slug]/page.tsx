import React from "react";
import { Plus, Edit, BookOpen, Users, Clock, BarChart3 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";
import { formatter } from "~/libs/format";
import courseApi from "~/apiRequest/course";
import ChaptersList from "./_components/ChaptersList";

const DetailCourse = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let course;
    try {
        const res = await courseApi.getDetailCourse(slug);
        course = res.data.data;
        console.log("course >>", course);
    } catch {
        redirect("/admin/courses");
    }
    return (
        <div className="min-h-screen bg-[#F5F5F5] p-6">
            {/* Header */}
            <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h1 className="mb-2 text-2xl font-bold text-gray-900">{course.name}</h1>
                        <p className="mb-4 text-gray-600">{course.description}</p>

                        <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{course.enrollments_count} học viên</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                <span>{course.lesson_count} bài học</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{formatter.duration(course.duration)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                <span className="font-medium text-green-600">{formatter.number(course.price)} đ</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button className="flex items-center gap-2 text-white">
                            <Edit className="h-4 w-4" />
                            Chỉnh sửa khóa học
                        </Button>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Nội dung khóa học</h2>
                    <Button className="flex items-center gap-2 text-white">
                        <Plus className="h-4 w-4" />
                        Thêm chương mới
                    </Button>
                </div>

                {/* Chapters List */}
                <ChaptersList slug={slug} />

                {/* Add Chapter Button */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                    <Button
                        variant="outline"
                        className="flex h-12 w-full items-center justify-center gap-2 border-dashed text-gray-600"
                    >
                        <Plus className="h-5 w-5" />
                        Thêm chương học mới
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DetailCourse;
