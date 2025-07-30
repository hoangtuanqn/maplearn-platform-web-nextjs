import Image from "next/image";
import React, { cache } from "react";
import { Clock, DownloadCloud } from "lucide-react";
import { formatter } from "~/libs/format";
import { Input } from "~/components/ui/input";
import ListDocumentInCategory from "./_components/ListDocumentInCategory";
import { documentApi } from "~/apiRequest/documents";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
        <section className="min-h-screen px-5 pb-10">
            <div className="flex h-[2000px] flex-col gap-8 lg:flex-row">
                <div className="flex-1 rounded-xl bg-white p-4 lg:flex-3/4">
                    <div className="flex items-end justify-between gap-4">
                        <div className="t1-flex-center gap-4">
                            <div className="space-y-2">
                                <Image src={"/assets/icons/file.svg"} width={64} height={63} alt="Icon" />
                            </div>
                            <div>
                                <h1 className="text-primary text-base font-bold uppercase">{document.name}</h1>
                                <div className="mt-2 flex gap-4 text-gray-400">
                                    <div className="t1-flex-center gap-1">
                                        <DownloadCloud />{" "}
                                        <span>Đã có {formatter.number(document.total_downloads)} lượt tải</span>
                                    </div>
                                    <div className="t1-flex-center gap-1">
                                        <Clock />
                                        {formatter.date(new Date(document.created_at))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Input placeholder="Tìm kiếm tài liệu theo từ khóa" className="min-w-[400px]" />
                    </div>
                    <div>
                        <ListDocumentInCategory />
                    </div>
                </div>
                <div className="sticky top-[70px] h-fit rounded-xl bg-white p-4 lg:flex-1/4">
                    <h2 className="text-primary text-base font-bold uppercase">Kho tài liệu khác</h2>
                </div>
            </div>
        </section>
    );
};

export default DocumentCategoryPage;
