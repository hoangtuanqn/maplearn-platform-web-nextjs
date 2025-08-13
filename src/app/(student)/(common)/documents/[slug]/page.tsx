import { Clock, DownloadCloud } from "lucide-react";
import Image from "next/image";
import React, { cache } from "react";
import { formatter } from "~/libs/format";
import { Report } from "./_components/Report";
import { ShareButton } from "../../../_components/Shared/ShareButton";
import DocumentsByCategory from "./_components/DocumentsByCategory";
import documentApi from "~/apiRequest/documents";
import { Metadata } from "next";
import { redirect } from "next/navigation";
const getDocument = cache(async (slug: string) => {
    const {
        data: { data: document },
    } = await documentApi.getDetailDocument(slug);
    return document;
});

// ✅ Tạo metadata động từ dữ liệu bài viết
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const document = await getDocument(slug);
    return {
        title: document.title,
        description: document.title || "Chi tiết bài viết",
        openGraph: {
            title: document.title,
        },
    };
}
const DocumentDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let document;
    try {
        document = await getDocument(slug); // Dùng lại, không gọi API thêm
    } catch (error) {
        console.error("Error fetching document:", error);
        redirect("/404"); // Redirect to 404 page if document not found
    }

    return (
        <section className="min-h-screen pb-10">
            <div className="flex flex-1 gap-4 rounded-xl max-lg:flex-col">
                <div className="flex-3/4 rounded-xl bg-white p-4 shadow-sm">
                    <div className="mb-10 flex justify-between max-lg:flex-col">
                        <div className="flex gap-3">
                            <Image
                                width={32}
                                height={42}
                                src={"/assets/icons/pdf.svg"}
                                alt="PDF Icon"
                                className="max-lg:hidden"
                            />
                            <div className="flex flex-col max-lg:gap-y-4">
                                <h1 className="text-primary text-lg font-semibold">{document.title}</h1>
                                <div className="flex flex-row items-start gap-x-4 gap-y-2 text-gray-400 max-lg:text-xs">
                                    <div className="t1-flex-center gap-1">
                                        <DownloadCloud />
                                        <span>Đã có {formatter.number(document.download_count)} lượt tải</span>
                                    </div>
                                    <div className="t1-flex-center gap-1">
                                        <Clock />
                                        {formatter.date(new Date(document.created_at))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 max-lg:mt-2">
                            <ShareButton />
                            <Report id={document.id} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <iframe src={document.source} width="100%" className="min-h-screen border"></iframe>
                    </div>
                </div>
                <DocumentsByCategory idCategory={document.category_id} />
            </div>
        </section>
    );
};

export default DocumentDetailPage;
