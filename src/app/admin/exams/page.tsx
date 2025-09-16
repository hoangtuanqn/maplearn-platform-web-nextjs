import React, { Suspense } from "react";
import { Metadata } from "next";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import ExamList from "./_components/ExamList";
import { FilterExams } from "./_components/FilterExams";

export const metadata: Metadata = {
    title: "Danh sách các bài thi",
};
const ExamPage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            <div className="item-center mt-5 flex justify-end">
                <Link href="/admin/exams/create">
                    <Button variant="primary">Thêm bài thi</Button>
                </Link>
            </div>
            <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                        <div>
                            <h3 className="text-primary text-xl font-bold">Danh sách đề thi</h3>
                            <p className="text-sm text-slate-500">Quản lý và theo dõi các đề thi trong hệ thống.</p>
                        </div>
                        <FilterExams />
                    </div>
                </div>

                <Suspense>
                    <ExamList />
                </Suspense>
            </div>
        </section>
    );
};

export default ExamPage;
