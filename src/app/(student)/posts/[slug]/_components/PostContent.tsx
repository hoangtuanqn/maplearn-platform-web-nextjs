"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarRange, Eye } from "lucide-react";
import { toast } from "sonner";

import FormComment from "~/app/(student)/_components/Comment";
import ItemComment from "~/app/(student)/_components/Comment/DisplayComment/CommentItem";
import CommentSkeleton from "./CommentSkeleton";
import Loading from "~/app/(student)/_components/Loading";
import { ConfirmAlertDialog } from "~/components/Confirm";

import publicApi from "~/libs/apis/publicApi";
import { postApi } from "~/apiRequest/post";
import { handleApiError2 } from "~/libs/apis/http";
import { formatter } from "~/libs/format";

import { useAuth } from "~/hooks/useAuth";
import { CommentListResponse } from "~/schemaValidate/comment.schema";
import { PostType } from "~/schemaValidate/post.schema";

const PostContent = ({ post }: { post: { posts: PostType } }) => {
    const { user } = useAuth();
    const [comment, setComment] = useState("");
    const [editCommentId, setEditCommentId] = useState<number>(0);
    const queryClient = useQueryClient();

    const queryKey = ["comments", post.posts.slug];

    const { data: comments = [], isLoading } = useQuery({
        queryKey,
        queryFn: async () => {
            const res = await publicApi.get<CommentListResponse>(`/comments?type=post&slug=${post.posts.slug}`);
            return res.data.data.data || [];
        },
        staleTime: 1000 * 60 * 5,
    });

    const commentMutation = useMutation({
        mutationFn: (data: { slug: string; comment: string; reply_id: string | null }) => postApi.comment(data),
        onSuccess: (res) => {
            toast.success(res.data.message || "Đã gửi bình luận thành công!");
            queryClient.invalidateQueries({ queryKey });
            setComment("");
        },
        onError: handleApiError2,
    });

    const deleteCommentMutation = useMutation({
        mutationFn: (commentId: string) => postApi.deleteComment(commentId),
        onSuccess: (res) => {
            toast.success(res.data.message || "Đã xóa bình luận thành công!");
            queryClient.invalidateQueries({ queryKey });
        },
        onError: handleApiError2,
    });

    const handleSubmitComment = () => {
        if (!comment.trim()) return toast.error("Bình luận không được để trống!");

        commentMutation.mutate({
            comment,
            slug: post.posts.slug,
            reply_id: null,
        });
    };

    const handleDeleteComment = (commentId: string) => {
        deleteCommentMutation.mutate(commentId);
    };

    return (
        <>
            {(commentMutation.isPending || deleteCommentMutation.isPending) && <Loading />}
            <div className="h-fit shrink-0 rounded-xl bg-white p-8 2xl:flex-3/4">
                {/* Header */}
                <div className="flex justify-between text-sm text-gray-500">
                    <span className="t1-flex-center gap-1">
                        <CalendarRange /> <span>{post.posts.created_at}</span>
                    </span>
                    <span className="t1-flex-center gap-1">
                        <Eye />
                        <span>{formatter.number(Number(post.posts.views))} lượt xem</span>
                    </span>
                </div>

                {/* Content */}
                <div className="mt-10 mb-20">
                    <div className="post-detail mt-5">
                        <h1>{post.posts.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: post.posts?.content ?? "" }}></div>
                    </div>
                </div>

                {/* Form Comment */}
                <FormComment comment={comment} setComment={setComment} handleSubmitComment={handleSubmitComment} />
                <div className="mb-10" />

                {/* Comments */}
                {isLoading && [1, 2, 3, 4, 5, 6].map((i) => <CommentSkeleton key={i} />)}

                {comments.map((item) => (
                    <div className="mt-4" key={item.id}>
                        {item.id === editCommentId ? (
                            <FormComment
                                comment={comment}
                                setComment={setComment}
                                handleSubmitComment={handleSubmitComment}
                            />
                        ) : (
                            <ItemComment
                                content={item.description}
                                name={item.creator?.full_name || "Vô danh"}
                                time={item.created_at || "10 năm trước"}
                            />
                        )}

                        {user && (
                            <div className="text-secondary-typo mt-2 ml-14 flex items-center gap-2 text-sm">
                                <button className="cursor-pointer">Trả lời</button>

                                {user.id === item.user_id && (
                                    <>
                                        <button className="cursor-pointer" onClick={() => setEditCommentId(item.id)}>
                                            Chỉnh sửa
                                        </button>

                                        <ConfirmAlertDialog
                                            message="Bạn có chắc chắn muốn xóa bình luận này không?"
                                            action={() => handleDeleteComment(item.id.toString())}
                                        >
                                            <button className="cursor-pointer">Xóa</button>
                                        </ConfirmAlertDialog>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Replies */}
                        {item.replies?.length > 0 && (
                            <div className="mt-2 space-y-4 py-4 pl-12">
                                {item.replies.map((reply) => (
                                    <ItemComment
                                        key={reply.id}
                                        content={reply.description}
                                        name={reply.creator?.full_name || "Vô danh"}
                                        time={reply.created_at || "10 năm trước"}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default PostContent;
