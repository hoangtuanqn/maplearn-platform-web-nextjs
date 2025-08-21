"use client";
import { Brain } from "lucide-react";
import React, { memo } from "react";
import DragDrop from "~/app/(student)/exams/[slug]/doing/_components/DragDrop";

import { Button } from "~/components/ui/button";
import { QuestionsExamResponse, ResultDetailExamResponse } from "~/schemaValidate/exam.schema";

import RenderLatex from "~/components/RenderLatex";
import TrueFalseAnswer from "~/app/(student)/exams/[slug]/doing/_components/TrueFalseAnswer";
import NumericInput from "~/app/(student)/exams/[slug]/doing/_components/NumericInput";
import MultipleChoice from "~/app/(student)/exams/[slug]/doing/_components/MultipleChoice";
import SingleChoice from "~/app/(student)/exams/[slug]/doing/_components/SingleChoice";

const DetailResult = ({
    exam,
    resultRes,
    payload: { handleSubmit, setTab },
}: {
    exam: QuestionsExamResponse["data"];
    resultRes: ResultDetailExamResponse["data"];
    payload: {
        handleSubmit: (message: string) => void;
        setTab: React.Dispatch<React.SetStateAction<"detail" | "explain">>;
    };
}) => {
    return (
        <div className="rounded-xl bg-white p-6">
            <h1 className="text-primary text-xl font-bold">Đáp án chi tiết {exam.title}</h1>

            <div className="mt-8 flex flex-col gap-8">
                {resultRes.map((result, index) => (
                    <div key={result.id} className="border-b pb-6">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-primary text-[17px] font-bold">Câu {index + 1}:</span>
                            {result.is_correct ? (
                                <span className="font-semibold text-green-600">Đúng</span>
                            ) : (
                                <span className="font-semibold text-red-600">Sai</span>
                            )}
                        </div>
                        {result.type === "drag_drop" ? (
                            <DragDrop
                                question={result.content || ""}
                                items={result.answers || []}
                                activeAnswers={result.your_choice ?? []}
                                idQuestion={result.id}
                                handleChoiceAnswer={() => {}}
                                disabled={true}
                            />
                        ) : (
                            <>
                                <div className="text-base">
                                    <RenderLatex content={result.content} />
                                </div>
                                <div className="mt-3">
                                    {result.type === "single_choice" && (
                                        <SingleChoice
                                            // Check nếu là string thì đưa vô array, còn array thì truyền thẳng
                                            activeAnswer={
                                                Array.isArray(result.your_choice)
                                                    ? result.your_choice
                                                    : [result.your_choice]
                                            }
                                            handleChoiceAnswer={() => {}}
                                            idQuestion={result.id}
                                            answers={result.answers}
                                        />
                                    )}
                                    {result.type === "multiple_choice" && (
                                        <MultipleChoice
                                            activeAnswers={result.your_choice}
                                            handleChoiceAnswer={() => {}}
                                            idQuestion={result.id}
                                            answers={result.answers}
                                        />
                                    )}
                                    {result.type === "numeric_input" && (
                                        <NumericInput
                                            handleChoiceAnswer={() => {}}
                                            idQuestion={result.id}
                                            activeAnswer={result.your_choice}
                                        />
                                    )}
                                    {result.type === "true_false" && (
                                        <TrueFalseAnswer
                                            idQuestion={result.id}
                                            answers={result.answers || []}
                                            activeAnswer={result.your_choice}
                                            handleChoiceAnswer={() => {}}
                                        />
                                    )}
                                </div>
                            </>
                        )}
                        <div className="mt-4 text-gray-700">
                            <span className="font-semibold">Giải thích:</span>{" "}
                            <RenderLatex content={result.explanation ?? ""} />
                        </div>
                        <div className="text-primary mt-2 flex items-center gap-2">
                            <span className="font-bold">Đáp án đúng:</span>
                            <RenderLatex content={result.correct_answer.join(", ")} />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button
                                type="button"
                                className="border-primary text-primary hover:bg-primary flex items-center gap-2 rounded-lg border bg-white px-4 py-2 font-semibold shadow-sm transition-colors hover:text-white"
                                onClick={() => {
                                    handleSubmit(
                                        `Câu hỏi: ${result.content}` +
                                            `Đáp án chính xác: ${Array.isArray(result.correct_answer) ? result.correct_answer.join(", ") : result.correct_answer}\n` +
                                            `Giải thích từ giáo viên: ${result.explanation}` +
                                            `Tôi chưa hiểu lắm, bạn có thể giải thích thêm không?`,
                                    );
                                    setTab("explain");
                                }}
                            >
                                <Brain />
                                Giải thích thêm
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(DetailResult);
