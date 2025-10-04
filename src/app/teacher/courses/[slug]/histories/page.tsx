import React, { Suspense } from "react";
import { Metadata } from "next";

import HistoryLessonList from "./_components/HistoryLessonList";
import Breadcrumb from "~/app/admin/_components/Breadcrumb";

export const metadata: Metadata = {
    title: "Lịch sử học bài",
};

const HistoriesLessonPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const breadcrumbData = [
        { label: "Dashboard", href: "/teacher" },
        { label: "Khóa học", href: "/teacher/courses" },
        { label: "Chi tiết khóa học", href: `/teacher/courses/${slug}` },
        { label: "Lịch sử học bài", href: `/teacher/courses/${slug}/histories` },
    ];
    return (
        <section className="mt-5 bg-[#F5F5F5]">
            <div className="mb-6 flex flex-col gap-5">
                <Breadcrumb breadcrumbData={breadcrumbData} />
            </div>
            <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                        <div>
                            <h3 className="text-primary text-xl font-bold">Lịch sử học bài gần đây</h3>
                            <p className="text-sm text-slate-500">Danh sách lịch sử học bài sẽ được hiển thị ở đây.</p>
                        </div>
                        <Suspense>{/* <FilterAttemptExams /> */}</Suspense>
                    </div>
                </div>
                <Suspense>
                    <HistoryLessonList slug={slug} />
                </Suspense>
            </div>
        </section>
    );
};

export default HistoriesLessonPage;
