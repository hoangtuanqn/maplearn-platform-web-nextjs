"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { documentApi, DOCUMENTS_PER_PAGE } from "~/apiRequest/documents";
import DocumentItem from "../../../_components/DocumentItem";
import { handleIncrementDownload } from "../../../_components/DocumentList";
import DocumentSkeleton from "../../../_components/DocumentSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";

const ListDocumentInCategory = ({ id }: { id: number }) => {
    const { data: documents, isLoading } = useQuery({
        queryKey: ["documents/in-category", id],
        queryFn: () => documentApi.getDocumentsInCategory(1, 20, id, ""),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    const total = documents?.data.data.total || 0;
    const totalPages = Math.ceil(total / DOCUMENTS_PER_PAGE);
    return (
        <>
            <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {isLoading && [...Array(20).keys()].map((index) => <DocumentSkeleton key={index} />)}

                {documents?.data.data?.data.map((document) => (
                    <DocumentItem key={document.id} {...document} callback={handleIncrementDownload} />
                ))}
            </div>
            {!isLoading && <PaginationNav totalPages={totalPages} />}
        </>
    );
};

export default ListDocumentInCategory;
