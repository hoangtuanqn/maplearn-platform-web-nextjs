import Image from "next/image";
import React, { cache } from "react";
import { Clock, DownloadCloud } from "lucide-react";
import { formatter } from "~/libs/format";
import ListDocumentInCategory from "./_components/ListDocumentInCategory";
import { documentApi } from "~/apiRequest/documents";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import CategoryOtherSidebar from "./_components/CategoryOtherSidebar";
import SearchDocumentInCategory from "./_components/SearchDocumentInCategory";

const getDocument = cache(async (id: string) => {
    const { data } = await documentApi.getCategory(id);
    return data.data;
});

// ✅ Tạo metadata động từ dữ liệu bài viết
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const document = await getDocument(id);
    return {
        title: document.name || "Chi tiết tài liệu",
        description: document.name || "Chi tiết tài liệu",
        openGraph: {
            title: document.name,
        },
    };
}
const DocumentCategoryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    let document;
    try {
        document = await getDocument(id);
    } catch {
        redirect("/documents");
    }
    return (
        <section className="min-h-screen pb-10">
            <div className="flex flex-col gap-8 lg:flex-row">
                <div className="flex-1 rounded-xl bg-white p-4 lg:flex-3/4">
                    <div className="flex flex-col items-end justify-between gap-4 lg:flex-row">
                        <div className="t1-flex-center gap-4">
                            <div className="hidden space-y-2 lg:block">
                                <Image src={"/assets/icons/file.svg"} width={64} height={63} alt="Icon" />
                            </div>
                            <div className="flex flex-col max-lg:items-center">
                                <h1 className="text-primary inline-block text-center text-base font-bold uppercase">
                                    {document.name}
                                </h1>
                                <div className="mt-2 flex flex-row items-start gap-x-4 gap-y-2 text-gray-400 max-lg:text-xs">
                                    <div className="t1-flex-center gap-1">
                                        <DownloadCloud />
                                        <span>Đã có {formatter.number(document.total_downloads)} lượt tải</span>
                                    </div>
                                    <div className="t1-flex-center gap-1">
                                        <Clock />
                                        {formatter.date(new Date(document.created_at))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SearchDocumentInCategory id={+id} />
                    </div>
                    <div>
                        <ListDocumentInCategory id={+id} />
                    </div>
                </div>
                <CategoryOtherSidebar id={+id} />
            </div>
        </section>
    );
};

export default DocumentCategoryPage;
