import React, { cache } from "react";
import { postApi } from "~/apiRequest/post";
import { Metadata } from "next";

const getPost = cache(async (slug: string) => {
    const {
        data: { data: post },
    } = await postApi.getDetail(slug);
    return post;
});

// ✅ Tạo metadata động từ dữ liệu bài viết
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    return {
        title: post.posts.title,
        description: post.posts.description || "Chi tiết tài liệu",
        openGraph: {
            title: post.posts.title,
            images: [post.posts.thumbnail],
        },
    };
}

const DetailPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const post = await getPost(slug); // Dùng lại, không gọi API thêm

    return (
        <div className="flex min-h-screen gap-5 max-2xl:flex-col">
            <h1>Đang là chi tiết tài liệu 2024</h1>
        </div>
    );
};

export default DetailPostPage;
