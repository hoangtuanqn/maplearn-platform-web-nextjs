import React from "react";
import PostIItem from "./_components/PostIItem";
import { PaginationNav } from "../_components/Pagination";
import { Metadata } from "next";
import publicApi from "~/libs/apis/publicApi";
import { PostListResponse } from "~/schemaValidate/post.schema";
import SearchPosts from "./_components/SearchPosts";
export const metadata: Metadata = {
    title: "Danh sách bài viết mới nhất",
};
const USERS_PER_PAGE = 16;

async function fetchPosts(page: number = 1, limit: number = 16, search: string = "") {
    let res;
    if (search) {
        res = await publicApi.get<PostListResponse>(`/posts?page=${page}&limit=${limit}&filter[title]=${search}`);
    } else {
        res = await publicApi.get<PostListResponse>(`/posts?page=${page}&limit=${limit}`);
    }
    const allPosts = res.data;
    return {
        posts: allPosts.data.data,
        total: allPosts.data.total,
    };
}
const PostsPage = async ({ searchParams }: { searchParams: { page?: string; search?: string } }) => {
    const currentPage = Number(searchParams.page) || 1;
    const search = searchParams.search || "";
    const { posts, total } = await fetchPosts(currentPage, USERS_PER_PAGE, search);
    const totalPages = Math.ceil(total / USERS_PER_PAGE);
    return (
        <section className="min-h-screen px-5 pb-10">
            <SearchPosts />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {posts.map((post) => (
                    <PostIItem
                        key={post.id}
                        title={post.title}
                        url={post.slug}
                        image={post.thumbnail}
                        createdAt={post.created_at}
                    />
                ))}
            </div>
            <PaginationNav totalPages={totalPages} basePath="/posts" />
        </section>
    );
};

export default PostsPage;
