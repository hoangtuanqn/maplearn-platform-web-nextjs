"use client";
import React from "react";
import FormCommentMath from "./MathForm";
import { getCharacterName } from "~/libs/hepler";
import { useAuth } from "~/hooks/useAuth";
import Link from "next/link";
import { Info } from "lucide-react";
import DisplayAvatar from "../DisplayAvatar";

const FormComment = ({
    comment,
    setComment,
    handleSubmitComment,
}: {
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    handleSubmitComment: () => void;
}) => {
    const { user: profile } = useAuth();

    return (
        <div className="flex gap-3">
            {profile ? (
                <>
    
                    <DisplayAvatar avatar={profile.avatar} fullName={profile.full_name} ratio="12" />
                    <FormCommentMath
                        comment={comment}
                        setComment={setComment}
                        handleSubmitComment={handleSubmitComment}
                    />
                </>
            ) : (
                <div
                    className="mb-4 flex w-full gap-2 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
                    role="alert"
                >
                    <span className="flex gap-2">
                        <Info /> Bạn cần đăng nhập để có thể bình luận.
                    </span>
                    <Link className="underline" href="/auth/login">
                        Đăng nhập ngay
                    </Link>
                </div>
            )}
        </div>
    );
};

export default FormComment;
