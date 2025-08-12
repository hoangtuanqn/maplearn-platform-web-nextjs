"use client";
import { useQuery } from "@tanstack/react-query";
import { DownloadCloud, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import documentApi from "~/apiRequest/documents";
import PostSkeleton from "~/app/(student)/_components/SidebarRight/PostSkeleton";
import { formatter } from "~/libs/format";

const DocumentsByCategory = ({ idCategory }: { idCategory: number }) => {
    const { slug } = useParams();

    const { data: documents, isLoading } = useQuery({
        queryKey: ["documents", "same-category", slug],
        queryFn: async () => {
            const res = await documentApi.getDocumentSameCategory(slug as string);
            return res.data.data || [];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return (
        <div className="sticky top-[70px] h-fit flex-1/4 rounded-xl bg-white p-4 shadow-sm">
            <div className="text-primary flex items-center justify-between">
                <h2 className="text-base font-semibold uppercase">Tài liệu cùng danh mục</h2>
                <Link href={`/documents/categories/${idCategory}`} className="flex gap-2">
                    Xem tất cả <TrendingUp />
                </Link>
            </div>

            {isLoading && Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)}
            {documents?.map(({ id, title, download_count }) => {
                return (
                    <Link
                        key={id}
                        className="mt-3 flex gap-3 rounded-xl bg-[#EFF0F1] p-4"
                        href={`/documents/categories/${idCategory}}`}
                        title={title}
                    >
                        <div className="shrink-0">
                            <Image src="/assets/icons/pdf.svg" width={50} height={63} alt="PDF Icon" />
                        </div>
                        <div>
                            <h2 className="line-clamp-3 text-xs leading-5 font-bold text-slate-600 uppercase lg:text-sm">
                                {title}
                            </h2>
                            <span className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                                <DownloadCloud />
                                <span>Đã có {formatter.number(download_count)} lượt tải</span>
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default DocumentsByCategory;
