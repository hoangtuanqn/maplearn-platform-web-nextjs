"use client";

import React from "react";
import { useAuth } from "~/hooks/useAuth";
import { useComments, UseCommentsProps, CommentActions } from "~/hooks/useComments";
import FormComment from "~/app/(student)/_components/Comment";
import ItemComment from "~/app/(student)/_components/Comment/DisplayComment/CommentItem";
import CommentSkeleton from "~/app/(student)/posts/[slug]/_components/CommentSkeleton";
import Loading from "~/app/(student)/_components/Loading";
import { ConfirmAlertDialog } from "~/components/Confirm";
import { CommentType } from "~/schemaValidate/comment.schema";
import { UserType } from "~/schemaValidate/user.schema";

export interface CommentSystemProps extends UseCommentsProps {
    /**
     * Show skeleton loading animation
     */
    showSkeleton?: boolean;
    /**
     * Number of skeleton items to show during loading
     */
    skeletonCount?: number;
    /**
     * Custom comment actions
     */
    commentActions?: CommentActions;
    /**
     * Custom permission checker for comment actions
     */
    canEdit?: (comment: CommentType, currentUser: UserType | null) => boolean;
    canDelete?: (comment: CommentType, currentUser: UserType | null) => boolean;
    canReply?: (comment: CommentType, currentUser: UserType | null) => boolean;
    /**
     * Custom rendering
     */
    renderComment?: (
        comment: CommentType,
        actions: {
            onEdit: () => void;
            onDelete: () => void;
            onReply: () => void;
        },
    ) => React.ReactNode;
    /**
     * Custom form component
     */
    FormComponent?: React.ComponentType<{
        comment: string;
        setComment: React.Dispatch<React.SetStateAction<string>>;
        handleSubmitComment: () => void;
        isEditing?: boolean;
        isReplying?: boolean;
        onCancel?: () => void;
    }>;
    /**
     * Custom styling classes
     */
    className?: string;
    /**
     * Show replies
     */
    showReplies?: boolean;
    /**
     * Maximum nesting level for replies
     */
    maxReplyDepth?: number;
}

const CommentSystem: React.FC<CommentSystemProps> = ({
    type,
    identifier,
    apiEndpoints,
    showSkeleton = true,
    skeletonCount = 6,
    commentActions,
    canEdit,
    canDelete,
    canReply,
    renderComment,
    FormComponent = FormComment,
    className = "",
    showReplies = true,
    maxReplyDepth = 1,
}) => {
    const { user } = useAuth();
    const {
        comments,
        isLoading,
        comment,
        setComment,
        editCommentId,
        replyToCommentId,
        isSubmitting,
        handleSubmitComment,
        handleDeleteComment,
        handleEditComment,
        handleReplyComment,
        handleCancelEdit,
        handleCancelReply,
    } = useComments({ type, identifier, apiEndpoints });

    // Default permission checkers
    const defaultCanEdit = (commentItem: CommentType, currentUser: UserType | null) => {
        return currentUser && currentUser.id === commentItem.user_id;
    };

    const defaultCanDelete = (commentItem: CommentType, currentUser: UserType | null) => {
        return currentUser && currentUser.id === commentItem.user_id;
    };

    const defaultCanReply = (commentItem: CommentType, currentUser: UserType | null) => {
        return Boolean(currentUser);
    };

    const checkCanEdit = canEdit || defaultCanEdit;
    const checkCanDelete = canDelete || defaultCanDelete;
    const checkCanReply = canReply || defaultCanReply;

    const renderCommentItem = (item: CommentType, depth: number = 0) => {
        const isEditing = item.id === editCommentId;
        const isReplying = item.id === replyToCommentId;

        if (renderComment) {
            return renderComment(item, {
                onEdit: () => handleEditComment(item.id, item.description),
                onDelete: () => handleDeleteComment(item.id.toString()),
                onReply: () => handleReplyComment(item.id),
            });
        }

        return (
            <div className="mt-4" key={item.id}>
                {isEditing ? (
                    <FormComponent
                        comment={comment}
                        setComment={setComment}
                        handleSubmitComment={handleSubmitComment}
                        isEditing={true}
                        onCancel={handleCancelEdit}
                    />
                ) : (
                    <ItemComment
                        role={item.creator?.role || "student"}
                        content={item.description}
                        name={item.creator?.full_name || "Vô danh"}
                        time={item.created_at || "10 năm trước"}
                    />
                )}

                {/* Action buttons */}
                {user && (
                    <div className="text-secondary-typo mt-2 flex items-center gap-2 text-sm xl:ml-14">
                        {checkCanReply(item, user) && depth < maxReplyDepth && (
                            <button
                                className="cursor-pointer hover:text-blue-600"
                                onClick={() => handleReplyComment(item.id)}
                            >
                                Trả lời
                            </button>
                        )}

                        {checkCanEdit(item, user) && (
                            <button
                                className="cursor-pointer hover:text-blue-600"
                                onClick={() => {
                                    handleEditComment(item.id, item.description);
                                    commentActions?.onEdit?.(item.id, item.description);
                                }}
                            >
                                Chỉnh sửa
                            </button>
                        )}

                        {checkCanDelete(item, user) && (
                            <ConfirmAlertDialog
                                message="Bạn có chắc chắn muốn xóa bình luận này không?"
                                action={() => {
                                    handleDeleteComment(item.id.toString());
                                    commentActions?.onDelete?.(item.id);
                                }}
                            >
                                <button className="cursor-pointer hover:text-red-600">Xóa</button>
                            </ConfirmAlertDialog>
                        )}
                    </div>
                )}

                {/* Reply form */}
                {isReplying && (
                    <div className="mt-4 ml-14">
                        <FormComponent
                            comment={comment}
                            setComment={setComment}
                            handleSubmitComment={handleSubmitComment}
                            isReplying={true}
                            onCancel={handleCancelReply}
                        />
                    </div>
                )}

                {/* Replies */}
                {showReplies && item.replies && item.replies.length > 0 && depth < maxReplyDepth && (
                    <div className="mt-2 space-y-4 pl-4 xl:py-4 xl:pl-12">
                        {item.replies.map((reply) => renderCommentItem({ ...reply, replies: [] }, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={className}>
            {isSubmitting && <Loading />}

            {/* Form Comment */}
            {!editCommentId && !replyToCommentId && (
                <>
                    <FormComponent
                        comment={comment}
                        setComment={setComment}
                        handleSubmitComment={handleSubmitComment}
                    />
                    <div className="mb-10" />
                </>
            )}

            {/* Comments */}
            {isLoading && showSkeleton && Array.from({ length: skeletonCount }, (_, i) => <CommentSkeleton key={i} />)}

            {comments.map((item) => renderCommentItem(item))}
        </div>
    );
};

export default CommentSystem;
