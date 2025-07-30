"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { postApi } from "~/apiRequest/post";
import NewLink from "~/app/(student)/_components/SidebarRight/NewLink";
import PostSkeleton from "~/app/(student)/_components/SidebarRight/PostSkeleton";
import { PostType } from "~/schemaValidate/post.schema";

const PostListSidebar = ({ slugCurrent }: { slugCurrent: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["user/posts", "sidebar"],
        queryFn: async () => {
            const res = await postApi.getPosts(1, 10);
            return res.data.data.data || [];
        },
        staleTime: 1000 * 60 * 5,
    });
    return (
        <div className="sticky top-[54px] right-0 h-fit shrink-0 rounded-xl bg-white p-8 shadow-sm 2xl:flex-1/4">
            <p className="text-primary text-base font-semibold">Các tin tức khác</p>
            {isLoading && Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)}

            {!isLoading &&
                data?.map(({ id, title, slug, thumbnail, created_at }: PostType) => {
                    if (slug != slugCurrent)
                        return (
                            <NewLink
                                key={id}
                                title={title}
                                url={`/posts/${slug}`}
                                image={thumbnail}
                                createdAt={created_at}
                            />
                        );
                })}
        </div>
    );
};

export default PostListSidebar;
