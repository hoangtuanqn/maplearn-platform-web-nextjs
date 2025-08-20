import { Metadata } from "next";
import ExamList from "./_components/ExamList";
import FilterExam from "./_components/FilterExam";
import { Suspense } from "react";
export const metadata: Metadata = {
    title: "Kho đề thi - Ngân hàng đề thi",
};
const ExamPage = () => {
    return (
        <section className="mt-10 min-h-screen">
            <div className="flex flex-col gap-4 px-4 pb-10 lg:flex-row">
                <Suspense>
                    <FilterExam />
                    <ExamList />
                </Suspense>
            </div>
        </section>
    );
};

export default ExamPage;
