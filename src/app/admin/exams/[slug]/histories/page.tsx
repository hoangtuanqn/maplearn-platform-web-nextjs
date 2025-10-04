import React, { Suspense } from "react";
import { Metadata } from "next";
import Breadcrumb from "~/app/admin/_components/Breadcrumb";
import { FilterAttemptExams } from "./_components/FilterAttemptExams";
import HistoryExamList from "./_components/HistoryExamList";

export const metadata: Metadata = {
    title: "Lịch sử làm bài thi",
};
const HistoriesExamPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const breadcrumbData = [
        { label: "Dashboard", href: "/admin" },
        { label: "Đề thi", href: "/admin/exams" },
        { label: "Lịch sử bài thi", href: `/admin/exams/${slug}/histories` },
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
                            <h3 className="text-primary text-xl font-bold">Lịch sử làm bài thi</h3>
                            <p className="text-sm text-slate-500">
                                Danh sách lịch sử làm bài thi sẽ được hiển thị ở đây.
                            </p>
                        </div>
                        <Suspense>
                            <FilterAttemptExams />
                        </Suspense>
                    </div>
                </div>
                <Suspense>
                    <HistoryExamList slug={slug} />
                </Suspense>
            </div>
        </section>
    );
};

export default HistoriesExamPage;
