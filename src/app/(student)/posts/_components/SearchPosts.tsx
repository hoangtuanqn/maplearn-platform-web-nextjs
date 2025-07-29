"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { Input } from "~/components/ui/input";

const SearchPosts = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultKeyword = searchParams.get("search") || "";
    const [keyword, setKeyword] = useState(defaultKeyword);

    // Hàm debounce để cập nhật URL sau 500ms người dùng ngưng nhập
    const debouncedSearch = useMemo(
        () =>
            debounce((search: string) => {
                const params = new URLSearchParams(window.location.search);
                if (search) {
                    params.set("search", search);
                    params.set("page", "1"); // Reset lại về trang đầu tiên
                } else {
                    params.delete("search");
                    params.set("page", "1");
                }
                router.push(`/posts?${params.toString()}`);
            }, 500),
        [router],
    );

    // Kích hoạt debounce mỗi khi keyword thay đổi
    useEffect(() => {
        debouncedSearch(keyword);
        return () => {
            debouncedSearch.cancel();
        };
    }, [keyword, debouncedSearch]);

    return (
        <div className="mb-5 ml-auto w-md max-w-full">
            <Input
                className="bg-white"
                placeholder="Tìm kiếm bài viết theo từ khóa"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>
    );
};

export default SearchPosts;
