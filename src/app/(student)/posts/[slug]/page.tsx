import { Metadata } from "next";
import React, { cache } from "react";
import publicApi from "~/libs/apis/publicApi";
import "~/styles/custom-post.scss";
import PostListSidebar from "./_components/PostListSidebar";
import UpdateViewClient from "./_components/UpdateViewClient";
import PostContent from "./_components/PostContent";

const getPost = cache(async (slug: string) => {
    const {
        data: { data: post },
    } = await publicApi.get(`/posts/${slug}`);
    return post;
});

// ✅ Tạo metadata động từ dữ liệu bài viết
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPost(params.slug);
    return {
        title: post.posts.title,
        description: post.posts.description || "Chi tiết bài viết",
        openGraph: {
            title: post.posts.title,
            images: [post.posts.thumbnail],
        },
    };
}

// ✅ Trang chi tiết bài viết
const DetailPostPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const post = await getPost(slug); // Dùng lại, không gọi API thêm

    return (
        <div className="flex min-h-screen gap-5 max-2xl:flex-col">
            <UpdateViewClient slug={slug} />
            <PostContent post={post} />
            <PostListSidebar slugCurrent={slug} />
        </div>
    );
};

export default DetailPostPage;
