"use client";
import React from "react";
import { Input } from "~/components/ui/input";
import useSearch from "~/hooks/useSearch";
import { FilterDocuments } from "../../../_components/FilterDocuments";

const SearchDocumentInCategory = ({ id }: { id: number }) => {
    const { keyword, setKeyword } = useSearch(`/documents/categories/${id}`);
    return (
        <div className="flex flex-1 gap-2 max-lg:w-full">
            <div className="w-full">
                <Input
                    placeholder="Tìm kiếm tài liệu theo từ khóa"
                    className="ml-auto lg:w-[400px]"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <FilterDocuments />
        </div>
    );
};

export default SearchDocumentInCategory;
