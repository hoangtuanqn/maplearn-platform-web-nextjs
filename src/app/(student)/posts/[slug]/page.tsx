import { CalendarRange, Eye } from "lucide-react";
import { Metadata } from "next";
import React, { cache } from "react";
import publicApi from "~/libs/apis/publicApi";
import { formatter } from "~/libs/format";
import "~/styles/custom-post.scss";
import PostListSidebar from "./_components/PostListSidebar";
import UpdateViewClient from "./_components/UpdateViewClient";

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
            <div className="h-fit rounded-xl bg-white p-8 2xl:flex-3/4 overflow-auto">
                <div className="flex justify-between text-sm text-gray-500">
                    <span className="t1-flex-center gap-1">
                        <CalendarRange /> <span>{post.posts.created_at}</span>
                    </span>
                    <span className="t1-flex-center gap-1">
                        <Eye />
                        <span>{formatter.number(Number(post.posts.views))} lượt xem</span>
                    </span>
                </div>
                <div className="mt-10">
                    <div className="post-detail mt-5">
                        <h1>{post.posts.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: post.posts.content }}></div>
                    </div>
                </div>
            </div>
            <PostListSidebar slugCurrent={slug} />
        </div>
    );
};

export default DetailPostPage;
