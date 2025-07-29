"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import publicApi from "~/libs/apis/publicApi";
import { PostListResponse } from "~/schemaValidate/post.schema";
import SearchPosts from "./SearchPosts";
import PostIItem from "./PostIItem";
import PostSkeleton from "../../_components/SidebarRight/PostSkeleton";
import { PaginationNav } from "../../_components/Pagination";

const USERS_PER_PAGE = 16;

async function fetchPosts(page: number, limit: number, search: string) {
    const res = await publicApi.get<PostListResponse>(
        search ? `/posts?page=${page}&limit=${limit}&filter[title]=${search}` : `/posts?page=${page}&limit=${limit}`,
    );
    const allPosts = res.data;
    return {
        posts: allPosts.data.data,
        total: allPosts.data.total,
    };
}
const PostList = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";

    const { data, isLoading } = useQuery({
        queryKey: ["posts", page, search],
        queryFn: () => fetchPosts(page, USERS_PER_PAGE, search),
    });

    const posts = data?.posts || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / USERS_PER_PAGE);
    return (
        <>
            <SearchPosts />
            {posts.length == 0 && !isLoading && (
                <p className="text-center text-xl font-bold">Không tìm thấy bài viết phù hợp</p>
            )}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {isLoading
                    ? Array.from({ length: USERS_PER_PAGE }).map((_, i) => <PostSkeleton key={i} />)
                    : posts.map((post) => (
                          <PostIItem
                              key={post.id}
                              title={post.title}
                              url={`/posts/${post.slug}`}
                              image={post.thumbnail}
                              createdAt={post.created_at}
                          />
                      ))}
            </div>
            {!isLoading && <PaginationNav totalPages={totalPages} basePath="/posts" />}
        </>
    );
};

export default PostList;
