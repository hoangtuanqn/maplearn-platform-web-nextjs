"use client";

import React from "react";
import { useAuth } from "~/hooks/useAuth";
import Link from "next/link";
import { Info, X } from "lucide-react";
import FormCommentMath from "~/app/(student)/_components/Comment/MathForm";
import DisplayAvatar from "~/app/(student)/_components/DisplayAvatar";

export interface EnhancedFormCommentProps {
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    handleSubmitComment: () => void;
    isEditing?: boolean;
    isReplying?: boolean;
    onCancel?: () => void;
    placeholder?: string;
    showMathSupport?: boolean;
    className?: string;
}

const EnhancedFormComment: React.FC<EnhancedFormCommentProps> = ({
    comment,
    setComment,
    handleSubmitComment,
    isEditing = false,
    isReplying = false,
    onCancel,
    placeholder,
    showMathSupport = true,
    className = "",
}) => {
    const { user: profile } = useAuth();

    const getPlaceholderText = () => {
        if (placeholder) return placeholder;
        if (isEditing) return "Chỉnh sửa bình luận...";
        if (isReplying) return "Viết phản hồi...";
        return "Viết bình luận...";
    };

    const getSubmitButtonText = () => {
        if (isEditing) return "Cập nhật";
        if (isReplying) return "Phản hồi";
        return "Gửi bình luận";
    };

    if (!profile) {
        return (
            <div
                className={`mb-4 flex w-full gap-2 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400 ${className}`}
                role="alert"
            >
                <span className="flex gap-2">
                    <Info /> Bạn cần đăng nhập để có thể bình luận.
                </span>
                <Link className="underline" href="/auth/login">
                    Đăng nhập ngay
                </Link>
            </div>
        );
    }

    return (
        <div className={`flex gap-3 ${className}`}>
            <DisplayAvatar avatar={profile.avatar} fullName={profile.full_name} ratio="10" />

            <div className="flex-1">
                {showMathSupport ? (
                    <FormCommentMath
                        comment={comment}
                        setComment={setComment}
                        handleSubmitComment={handleSubmitComment}
                    />
                ) : (
                    <div className="space-y-3">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={getPlaceholderText()}
                            className="min-h-[100px] w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            rows={4}
                        />
                        <div className="flex justify-end gap-2">
                            {(isEditing || isReplying) && onCancel && (
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="flex items-center gap-1 rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200"
                                >
                                    <X size={16} />
                                    Hủy
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleSubmitComment}
                                disabled={!comment.trim()}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                {getSubmitButtonText()}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhancedFormComment;
