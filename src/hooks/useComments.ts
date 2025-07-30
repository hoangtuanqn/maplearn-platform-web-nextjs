"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import publicApi from "~/libs/apis/publicApi";
import { commentApiHelper } from "~/apiRequest/comment";
import { handleApiError2 } from "~/libs/apis/http";
import { CommentListResponse, CommentType } from "~/schemaValidate/comment.schema";

export interface ApiResponse {
    data: {
        message?: string;
        [key: string]: unknown;
    };
}

export interface UseCommentsProps {
    /**
     * The type of content being commented on (e.g., "post", "course", "lesson")
     */
    type: string;
    /**
     * The unique identifier for the content (slug, id, etc.)
     */
    identifier: string;
    /**
     * Custom API endpoints for comment operations
     */
    apiEndpoints?: {
        list?: string;
        create?: (data: CommentCreateData) => Promise<ApiResponse>;
        update?: (commentId: string, data: CommentUpdateData) => Promise<ApiResponse>;
        delete?: (commentId: string) => Promise<ApiResponse>;
    };
}

export interface CommentCreateData {
    comment: string;
    slug?: string;
    reply_id?: string | null;
    [key: string]: string | number | boolean | null | undefined;
}

export interface CommentUpdateData {
    comment: string;
    [key: string]: string | number | boolean | null | undefined;
}

export interface CommentActions {
    onReply?: (commentId: number, content: string) => void;
    onEdit?: (commentId: number, content: string) => void;
    onDelete?: (commentId: number) => void;
}

export const useComments = ({ type, identifier, apiEndpoints }: UseCommentsProps) => {
    const [comment, setComment] = useState("");
    const [editCommentId, setEditCommentId] = useState<number>(0);
    const [replyToCommentId, setReplyToCommentId] = useState<number>(0);
    const queryClient = useQueryClient();

    const queryKey = ["comments", type, identifier];

    // Get API functions for the specific type
    const api = commentApiHelper.getApiForType(type);

    // Fetch comments
    const {
        data: comments = [],
        isLoading,
        error,
    } = useQuery<CommentType[]>({
        queryKey,
        queryFn: async () => {
            if (apiEndpoints?.list) {
                const res = await publicApi.get<CommentListResponse>(apiEndpoints.list);
                return res.data.data.data || [];
            }
            // Use API helper for the specific type
            const res = await api.getComments(identifier);
            return (res.data as CommentListResponse).data.data || [];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Create comment mutation
    const commentMutation = useMutation({
        mutationFn: async (data: CommentCreateData) => {
            if (apiEndpoints?.create) {
                return apiEndpoints.create(data);
            }
            // Use API helper for the specific type
            return api.comment({
                identifier,
                comment: data.comment,
                reply_id: data.reply_id || null,
            });
        },
        onSuccess: (res) => {
            toast.success(res.data.message || "Đã gửi bình luận thành công!");
            queryClient.invalidateQueries({ queryKey });
            setComment("");
            setReplyToCommentId(0);
        },
        onError: handleApiError2,
    });

    // Update comment mutation
    const updateCommentMutation = useMutation({
        mutationFn: async ({ commentId, data }: { commentId: string; data: CommentUpdateData }) => {
            if (apiEndpoints?.update) {
                return apiEndpoints.update(commentId, data);
            }
            // Use API helper for the specific type
            return api.updateComment(commentId, { comment: data.comment });
        },
        onSuccess: (res) => {
            toast.success(res.data.message || "Đã cập nhật bình luận thành công!");
            queryClient.invalidateQueries({ queryKey });
            setEditCommentId(0);
            setComment("");
        },
        onError: handleApiError2,
    });

    // Delete comment mutation
    const deleteCommentMutation = useMutation({
        mutationFn: async (commentId: string) => {
            if (apiEndpoints?.delete) {
                return apiEndpoints.delete(commentId);
            }
            // Use API helper for the specific type
            return api.deleteComment(commentId);
        },
        onSuccess: (res) => {
            toast.success(res.data.message || "Đã xóa bình luận thành công!");
            queryClient.invalidateQueries({ queryKey });
        },
        onError: handleApiError2,
    });

    // Handlers
    const handleSubmitComment = () => {
        if (!comment.trim()) {
            return toast.error("Bình luận không được để trống!");
        }

        if (editCommentId > 0) {
            // Update existing comment
            updateCommentMutation.mutate({
                commentId: editCommentId.toString(),
                data: { comment },
            });
        } else {
            // Create new comment or reply
            commentMutation.mutate({
                comment,
                reply_id: replyToCommentId > 0 ? replyToCommentId.toString() : null,
            });
        }
    };

    const handleDeleteComment = (commentId: string) => {
        deleteCommentMutation.mutate(commentId);
    };

    const handleEditComment = (commentId: number, currentContent: string) => {
        setEditCommentId(commentId);
        setComment(currentContent);
        setReplyToCommentId(0);
    };

    const handleReplyComment = (commentId: number) => {
        setReplyToCommentId(commentId);
        setEditCommentId(0);
        setComment("");
    };

    const handleCancelEdit = () => {
        setEditCommentId(0);
        setComment("");
    };

    const handleCancelReply = () => {
        setReplyToCommentId(0);
        setComment("");
    };

    return {
        // Data
        comments,
        isLoading,
        error,

        // Form state
        comment,
        setComment,
        editCommentId,
        replyToCommentId,

        // Loading states
        isSubmitting: commentMutation.isPending || updateCommentMutation.isPending || deleteCommentMutation.isPending,

        // Handlers
        handleSubmitComment,
        handleDeleteComment,
        handleEditComment,
        handleReplyComment,
        handleCancelEdit,
        handleCancelReply,

        // Reset functions
        resetForm: () => {
            setComment("");
            setEditCommentId(0);
            setReplyToCommentId(0);
        },
    };
};
