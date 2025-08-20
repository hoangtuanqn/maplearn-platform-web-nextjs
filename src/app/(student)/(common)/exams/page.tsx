import { Metadata } from "next";
import ExamList from "./_components/ExamList";
import FilterExam from "./_components/FilterExam";
import { Suspense } from "react";
export const metadata: Metadata = {
    title: "Kho đề thi - Ngân hàng đề thi",
};
const ExamPage = () => {
    return (
        <section className="mt-10 flex min-h-screen gap-4 px-4 pb-10">
            <Suspense>
                <FilterExam />
                <ExamList />
            </Suspense>
        </section>
    );
};

export default ExamPage;
