"use client";
import { SendHorizontal } from "lucide-react";
import React from "react";
import Choice from "./Choice";

const FormCommentNoMath = ({
    choice,
    setChoice,
    comment,
    setComment,
    handleSubmitComment,
}: {
    choice: number;
    setChoice: React.Dispatch<React.SetStateAction<number>>;
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    handleSubmitComment: () => void;
}) => {
    return (
        <div className="bg-primary/3 rounded-xl p-4 text-gray-500">
            <textarea
                className="w-full resize-none border-none outline-none [&::-webkit-scrollbar]:hidden"
                maxLength={1000}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                value={comment}
                placeholder="Bình luận dưới tên của bạn ..."
            ></textarea>
            <div className="flex justify-between">
                <Choice choice={choice} setChoice={setChoice} />
                <div className="t1-flex-center gap-3">
                    <span className="font-semibold">{comment.length}/1000 kí tự</span>
                    <SendHorizontal
                        className={`size-5 ${comment.length == 0 ? "disabled:text-primary/30 cursor-not-allowed" : "text-primary cursor-pointer"}`}
                        onClick={() => handleSubmitComment()}
                    />
                </div>
            </div>
        </div>
    );
};

export default FormCommentNoMath;
