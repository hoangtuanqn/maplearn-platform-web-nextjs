"use client";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from "react";
import { configSymbolComment } from "~/app/(student)/_components/Comment/config";
import DragDrop from "~/app/(student)/exams/[slug]/doing/_components/DragDrop";
import MultipleChoice from "~/app/(student)/exams/[slug]/doing/_components/MultipleChoice";
import NumericInput from "~/app/(student)/exams/[slug]/doing/_components/NumericInput";
import SingleChoice from "~/app/(student)/exams/[slug]/doing/_components/SingleChoice";
import TrueFalseAnswer from "~/app/(student)/exams/[slug]/doing/_components/TrueFalseAnswer";
import { QuestionsExamResponse, ResultDetailExamResponse } from "~/schemaValidate/exam.schema";

const DetailResult = ({
    exam,
    resultRes,
}: {
    exam: QuestionsExamResponse["data"];
    resultRes: ResultDetailExamResponse["data"];
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
                                <MathJaxContext config={configSymbolComment}>
                                    <MathJax dynamic>
                                        <div
                                            className="mb-2 text-base leading-7"
                                            dangerouslySetInnerHTML={{
                                                __html: result.content,
                                            }}
                                        />
                                    </MathJax>
                                </MathJaxContext>
                                <div className="mt-2">
                                    {result.type === "single_choice" && (
                                        <SingleChoice
                                            activeAnswer={result.your_choice}
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
                            <span className="font-semibold">Giải thích:</span> {result.explanation}
                        </div>
                        <div className="text-primary mt-2 flex items-center gap-2">
                            <span className="font-bold">Đáp án đúng:</span>
                            <MathJaxContext config={configSymbolComment}>
                                <MathJax dynamic>
                                    {Array.isArray(result.correct_answer)
                                        ? result.correct_answer.join(", ")
                                        : result.correct_answer}
                                </MathJax>
                            </MathJaxContext>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailResult;
