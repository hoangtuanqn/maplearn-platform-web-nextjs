import { Metadata } from "next";
import DocumentList from "./_components/DocumentList";
import { Suspense } from "react";
import Loading from "~/app/(student)/_components/Loading";
export const metadata: Metadata = {
    title: "Tổng hợp tài liệu học tập",
};

const DocumentPage = () => {
    return (
        <section className="min-h-screen px-4 pb-10">
            <Suspense fallback={<Loading />}>
                <DocumentList />
            </Suspense>
        </section>
    );
};

export default DocumentPage;
