"use client";
import { SendHorizontal } from "lucide-react";
import React, { useState } from "react";

import Choice from "./Choice";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import FormCommentNoMath from "./NormalForm";
import FxMath from "./SymbolMath/FxMath";
import HashMath from "./SymbolMath/HashMath";
import AlphaMath from "./SymbolMath/AlphaMath";
import { configSymbolComment } from "./config";
const FormCommentMath = ({
    comment,
    setComment,
    handleSubmitComment,
}: {
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    handleSubmitComment: () => void;
}) => {

    const [choice, setChoice] = useState<number>(0);
    const dataPayload = {
        choice,
        setChoice,
        comment,
        setComment,
        handleSubmitComment,
    };
    const htmlContent = comment.replace(/\n/g, "<br />"); // Thay \n thành <br />
    return (
        <div className="flex-1">
            {choice != 0 ? (
                <>
                    <div className="bg-primary/3 rounded-xl p-4 text-gray-500">
                        <div className="mb-3.5 h-fit min-h-20 rounded-xl bg-white px-4 py-2">
                            <span className="mb-2 block text-xs">Xem trước:</span>
                            <div className="text-black">
                                <div className="h-fit">
                                    <MathJaxContext config={configSymbolComment}>
                                        <MathJax className="text-sm" dynamic inline>
                                            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                                        </MathJax>
                                    </MathJaxContext>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white p-4">
                            <div className="mb-5 h-fit min-h-20">
                                <span className="mb-2 block text-xs">Bình luận của bạn:</span>
                                <textarea
                                    className="w-full resize-none border-none outline-none [&::-webkit-scrollbar]:hidden"
                                    maxLength={1000}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                    value={comment}
                                    placeholder="Bình luận dưới tên của bạn ..."
                                ></textarea>
                            </div>
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
                        {choice === 1 && <FxMath setComment={setComment} />}
                        {choice === 2 && <HashMath setComment={setComment} />}
                        {choice === 3 && <AlphaMath setComment={setComment} />}
                    </div>
                </>
            ) : (
                <FormCommentNoMath {...dataPayload} />
            )}
        </div>
    );
};

export default FormCommentMath;
