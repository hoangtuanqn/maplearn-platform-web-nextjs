"use client";
import { CalendarRange, Eye } from "lucide-react";
import React, { useState } from "react";
import FormComment from "~/app/(student)/_components/Comment";

import { formatter } from "~/libs/format";
import { PostType } from "~/schemaValidate/post.schema";

const PostContent = ({ post }: { post: { posts: PostType } }) => {
    const [comment, setComment] = useState("");
    const handleSubmitComment = () => {
        console.log(comment);
    };
    return (
        <>
            <div className="h-fit rounded-xl bg-white p-8 2xl:flex-3/4">
                <div className="flex justify-between text-sm text-gray-500">
                    <span className="t1-flex-center gap-1">
                        <CalendarRange /> <span>{post.posts.created_at}</span>
                    </span>
                    <span className="t1-flex-center gap-1">
                        <Eye />
                        <span>{formatter.number(Number(post.posts.views))} lượt xem</span>
                    </span>
                </div>
                <div className="mt-10 mb-20">
                    <div className="post-detail mt-5">
                        <h1>{post.posts.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: post.posts?.content ?? "" }}></div>
                    </div>
                </div>
                <FormComment comment={comment} setComment={setComment} handleSubmitComment={handleSubmitComment} />
            </div>
        </>
    );
};

export default PostContent;
