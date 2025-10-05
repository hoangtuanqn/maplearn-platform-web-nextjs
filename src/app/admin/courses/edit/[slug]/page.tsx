import React from "react";
import { Metadata } from "next";
import FormEditCourse from "./_components/FormEditCourse";
import { redirect } from "next/navigation";
import courseApi from "~/apiRequest/course";
import Breadcrumb from "~/app/admin/_components/Breadcrumb";

export const metadata: Metadata = {
    title: "Chỉnh sửa khóa học",
};
const EditCoursePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const breadcrumbData = [
        { label: "Dashboard", href: "/admin" },
        { label: "Khóa học", href: "/admin/courses" },
        { label: "Chi tiết khóa học", href: `/admin/courses/${slug}` },
        { label: "Chỉnh sửa khóa học", href: `/admin/courses/edit/${slug}` },
    ];
    let course;
    try {
        const res = await courseApi.getDetailCourse(slug);
        course = res.data.data;
    } catch {
        redirect("/admin/courses");
    }
    return (
        <>
            <div className="mt-6 flex-col gap-5">
                <div className="mb-6 flex flex-col gap-5">
                    <Breadcrumb breadcrumbData={breadcrumbData} />
                </div>
                <div className="flex-1 rounded-lg bg-white p-6 pb-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-primary text-xl font-bold">Chỉnh sửa khóa học</h3>
                            <p className="mb-4 text-sm text-slate-500">Cập nhật thông tin khóa học tại đây.</p>
                        </div>
                    </div>

                    <FormEditCourse course={course} />
                </div>
            </div>
        </>
    );
};

export default EditCoursePage;
