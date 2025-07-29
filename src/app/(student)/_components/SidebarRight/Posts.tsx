"use client";

import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import NewLink from "./NewLink";
import { PostListResponse, PostType } from "~/schemaValidate/post.schema";
import publicApi from "~/libs/apis/publicApi";
import PostSkeleton from "./PostSkeleton";

export default function News() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["posts", 10],
        queryFn: async () => {
            const res = await publicApi.get<PostListResponse>("/posts?limit=10");
            return res.data.data.data || [];
        },
    });
    return (
        <>
            <div className="mt-6 mb-2 flex items-center justify-between">
                <p className="text-primary text-base font-medium">Tin tức</p>
                <Link className="cursor-pointer" href="/posts">
                    <p className="t1-flex-center justify-between gap-1 text-gray-500 italic">
                        <span>Xem tất cả</span>
                        <TrendingUp />
                    </p>
                </Link>
            </div>

            {isLoading && Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)}

            {!isLoading &&
                data?.map(({ id, title, slug, thumbnail, created_at }: PostType) => (
                    <NewLink key={id} title={title} url={`/posts/${slug}`} image={thumbnail} createdAt={created_at} />
                ))}

            {error && <p className="mt-2 text-sm text-red-500">Đã có lỗi xảy ra khi tải tin tức.</p>}
        </>
    );
}
