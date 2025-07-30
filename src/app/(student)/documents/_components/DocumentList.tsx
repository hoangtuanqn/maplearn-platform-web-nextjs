"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { documentApi, DOCUMENTS_PER_PAGE } from "~/apiRequest/documents";
import DocumentSkeleton from "./DocumentSkeleton";
import { useSearchParams } from "next/navigation";
import { PaginationNav } from "../../_components/Pagination";
import SelectCourse from "./SelectCourse";
import SelectObject from "./SelectObject";
import CategorySidebar from "./CategorySidebar";
import DocumentItem from "./DocumentItem";
import { buildLaravelFilterQuery } from "~/libs/hepler";
async function fetchDocuments(
    page: number,
    limit: number,
    search: string,
    sort: string = "",
    { subject = "", grade_level = "" } = {},
) {
    const queryString = buildLaravelFilterQuery({
        subject,
        grade_level,
    });
    const res = await documentApi.getDocuments(page, limit, search, sort, queryString);
    const allDocuments = res.data;
    return {
        documents: allDocuments.data.data,
        total: allDocuments.data.total,
    };
}
export const handleIncrementDownload = async (documentId: string) => {
    try {
        await documentApi.incrementDownload(documentId);
    } catch (error) {
        console.error("Error incrementing download count:", error);
    }
};
const DocumentList = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const subject = searchParams.get("subject") || "";
    const grade_level = searchParams.get("grade_level") || "";
    const sort = searchParams.get("sort") || "";

    const { data, isLoading } = useQuery({
        queryKey: ["user/documents", page, search, sort, subject, grade_level],
        queryFn: () => fetchDocuments(page, DOCUMENTS_PER_PAGE, search, sort, { subject, grade_level }),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const documents = data?.documents || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / DOCUMENTS_PER_PAGE);

    return (
        <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1 lg:flex-3/4">
                <h1 className="text-primary text-xl font-bold uppercase">THƯ VIỆN TÀI LIỆU</h1>
                <SelectObject />
                <SelectCourse />
                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {isLoading ? (
                        [...Array(20).keys()].map((index) => <DocumentSkeleton key={index} />)
                    ) : documents?.length === 0 ? (
                        <div className="col-span-full flex items-center justify-center py-10">
                            <span>Không có tài liệu nào.</span>
                        </div>
                    ) : (
                        documents?.map((document) => (
                            <DocumentItem key={document.id} {...document} callback={handleIncrementDownload} />
                        ))
                    )}
                </div>
                {!isLoading && <PaginationNav totalPages={totalPages} basePath="/documents" />}
            </div>
            <CategorySidebar />
        </div>
    );
};

export default DocumentList;
