import Image from "next/image";
import React from "react";
import Tag from "../_components/Tag";
import { CloudDownload, Folder } from "lucide-react";
import Link from "next/link";
import { documentApi } from "~/apiRequest/documents";
import { formatter } from "~/libs/format";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Danh mục tài liệu",
};
const CategoriesPage = async () => {
    const {
        data: {
            data: { data: categories },
        },
    } = await documentApi.getCategories();

    return (
        <section className="min-h-screen pb-10">
            <div className="flex-1 rounded-xl bg-white p-4">
                <h1 className="text-primary text-lg font-semibold">Tổng hợp kho tài liệu</h1>
                <div className="mt-4 grid gap-x-2.5 gap-y-4 lg:grid-cols-4">
                    {categories.map((cate) => (
                        <div key={cate.id} className="rounded-xl bg-[#EFF0F1] px-2.5 py-4">
                            <Link className="flex gap-2.5" href={`/documents/categories/${cate.id}`}>
                                <div className="flex shrink-0 flex-col items-center">
                                    <Image src="/assets/icons/file.svg" width={64} height={53} alt="File Icon" />
                                    <Tag className="mt-2 inline-block">Lớp 12</Tag>
                                </div>

                                <div>
                                    <div>
                                        <h2
                                            className={`line-clamp-3 font-bold lg:text-base ${cate.total_documents == 0 && "text-slate-400"}`}
                                        >
                                            {cate.name}
                                        </h2>
                                        <div className="flex items-center gap-5 py-1.5 text-slate-500">
                                            <span className="flex items-center gap-1 max-lg:text-xs">
                                                <Folder />
                                                <span>{formatter.number(cate.total_documents)} tài liệu</span>
                                            </span>
                                            <span className="flex items-center gap-1 max-lg:text-xs">
                                                <CloudDownload />
                                                <span>{formatter.number(cate.total_downloads)} lượt tải</span>
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-[13.125px] text-slate-500">{cate.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesPage;
