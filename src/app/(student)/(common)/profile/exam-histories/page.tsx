import { Suspense } from "react";
import { Metadata } from "next";
import AttemptExams from "./_components/AttemptExams";
export const metadata: Metadata = {
    title: "Lịch sử làm bài kiểm tra",
};
const RecentlyViewedExamPage = () => {
    return (
        <>
            <h3 className="block-heading mb-6 uppercase">Lịch sử làm bài kiểm tra</h3>
            <Suspense>
                <AttemptExams />
            </Suspense>
        </>
    );
};

export default RecentlyViewedExamPage;
