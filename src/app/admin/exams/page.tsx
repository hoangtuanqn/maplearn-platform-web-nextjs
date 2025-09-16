import React, { Suspense } from "react";
import { Metadata } from "next";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import ExamList from "./_components/ExamList";

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

            <Suspense>
                <ExamList />
            </Suspense>
        </section>
    );
};

export default ExamPage;
