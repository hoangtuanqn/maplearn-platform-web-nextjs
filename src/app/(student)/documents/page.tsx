import { Metadata } from "next";
import DocumentList from "./_components/DocumentList";
export const metadata: Metadata = {
    title: "Tổng hợp tài liệu học tập",
};

const DocumentPage = () => {
    return (
        <section className="min-h-screen px-5 pb-10">
            <DocumentList />
        </section>
    );
};

export default DocumentPage;
