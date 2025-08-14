"use client";
import React, { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { configSymbolComment } from "~/app/(student)/_components/Comment/config";
import { Button } from "~/components/ui/button";
import SingleChoice from "./_components/SingleChoice";
import { useQuery } from "@tanstack/react-query";
import examApi from "~/apiRequest/exam";
import { getLocalStorage, setLocalStorage } from "~/libs/localStorage";
import { Question } from "~/schemaValidate/exam.schema";
import clsx from "clsx";
import FullScreen from "./_components/FullScreen";
import { ChevronFirst, ChevronLast } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import QuestionSkeleton from "./_components/QuestionSkeleton";
import { AnswerLocalStorage } from "./exam.type";
import useCountDown from "~/hooks/useCountDown";
import { formatter } from "~/libs/format";
import Image from "next/image";
import MultipleChoice from "./_components/MultipleChoice";
import DragDrop from "./_components/DragDrop";

const slug = "de-minh-hoa-thi-tot-nghiep-thpt-2025-mon-toan-xwj9asdvfxuq";

const DoingExamPage = () => {
    const [mounted, setMounted] = useState(false);
    const [questionActive, setQuestionActive] = useState(0); // index câu hiện tại
    const [infoExam, setInfoExam] = useState<AnswerLocalStorage>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<number, string[]>>({});
    const [violationCount, setViolationCount] = useState(1); // tính số lần vi phạm
    const { timeLeft, setTimeLeft } = useCountDown(0);

    const { data: questionsRes, isLoading } = useQuery({
        queryKey: ["exam", "questions", slug],
        queryFn: async () => {
            const res = await examApi.getQuestions(slug);
            return res.data.data;
        },
    });

    // Chọn đáp án
    // idx: chỉ dành cho cái drag_drop thôi nhé
    const handleChoiceAnswer = (questionId: number, answer: string, idx?: number) => {
        const question = questions.find((ques) => ques.id === questionId);

        if (question?.type === "single_choice") {
            console.log("single_choice");

            setAnswers((prev) => ({ ...prev, [questionId]: [answer] }));
        } else if (question?.type === "multiple_choice") {
            setAnswers((prev) => {
                const currentAnswers = prev[questionId] || [];

                if (currentAnswers.includes(answer)) {
                    // Nếu đã chọn rồi thì bỏ chọn
                    return { ...prev, [questionId]: currentAnswers.filter((ans) => ans !== answer) };
                } else {
                    // Nếu chưa chọn thì thêm vào
                    return { ...prev, [questionId]: [...currentAnswers, answer] };
                }
            });
        } else if (question?.type === "drag_drop") {
            // idx: là ô số idx. VD: idx = 4, các ô từ 1 đến 4 chưa có giá trị thì để trống, ô nào có rồi thì để yên, nếu idx = 4 đã có giá trị thì thay thế giá trị mới
            if (idx) {
                setAnswers((prev) => {
                    // console.log("prev >>", prev);

                    const countAnswer = question.answers.length ?? 0;
                    const newAnswers = Array.from({ length: countAnswer }, (_, i) => prev?.[questionId]?.[i] || "");
                    newAnswers[idx - 1] = answer; // idx - 1 vì mảng bắt đầu từ 0

                    return { ...prev, [questionId]: newAnswers };
                });
            }
        }
        // else if (questions[questionId].type === "drag_drop") {
        //     setAnswers((prev) => ({ ...prev, [questionId]: [answer] }));
        // }
    };

    // Mount
    useEffect(() => setMounted(true), []);

    // Lấy dữ liệu từ localStorage khi load lần đầu
    useEffect(() => {
        const dataStr = getLocalStorage(slug);
        if (dataStr) {
            const data: AnswerLocalStorage = JSON.parse(dataStr);
            setInfoExam(data);
            setAnswers(data.answers || {});
            setQuestionActive(data.questionActive || 0);
        } else {
            const startTime = Date.now();
            const newData: AnswerLocalStorage = { answers: {}, start: startTime, questionActive: 0 };
            setInfoExam(newData);
            setLocalStorage(slug, JSON.stringify(newData));
        }
    }, []);

    // Khi có dữ liệu câu hỏi
    useEffect(() => {
        if (questionsRes) {
            setQuestions(questionsRes.questions || []);
            // Thiết lập thời gian ban đầu
            if (questionsRes.duration_minutes && infoExam?.start) {
                const durationSec = questionsRes.duration_minutes * 60;
                const passedSec = Math.floor((Date.now() - infoExam.start) / 1000);
                setTimeLeft(Math.max(durationSec - passedSec, 0));
            }
        }
    }, [questionsRes, infoExam, setTimeLeft]);

    // Lưu lại answers vào localStorage mỗi khi thay đổi
    useEffect(() => {
        if (infoExam) {
            setLocalStorage(
                slug,
                JSON.stringify({
                    answers,
                    start: infoExam.start, // Giữ nguyên start ban đầu
                    questionActive, // Giữ nguyên questionActive ban đầu
                }),
            );
        }
    }, [answers, infoExam, questionActive]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                // sang câu tiếp
                setQuestionActive((prev) => Math.min(prev + 1, questions.length - 1));
            }
            if (e.key === "ArrowLeft") {
                // quay lại câu trước
                setQuestionActive((prev) => Math.max(prev - 1, 0));
            }
            // Chỉ nhận khi đã chọn đáp án
            if (e.key === "Enter" && answers[questions[questionActive]?.id]) {
                // enter cũng sang câu tiếp
                setQuestionActive((prev) => Math.min(prev + 1, questions.length - 1));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [questionActive, answers, questions]);
    // đã hoàn thành %
    const progress = (Object.keys(answers).length / questions.length) * 100;
    // console.log("answers[questions[questionActive].id] ?>? ", questions[questionActive].answers);

    return (
        <>
            {questionsRes?.anti_cheat_enabled && (
                <FullScreen violationCount={violationCount} setViolationCount={setViolationCount} />
            )}
            <section className="mt-5 min-h-screen px-4 pb-10">
                {isLoading ? (
                    <Skeleton className="mb-4 h-7 !w-[30%]" />
                ) : (
                    <h2 className="text-primary mb-4 text-xl font-bold">{questionsRes?.title}</h2>
                )}

                {questionsRes?.anti_cheat_enabled && violationCount > 0 && (
                    <div className="mb-4 flex items-center gap-3 rounded-lg bg-yellow-100 px-4 py-2">
                        <span className="font-semibold text-yellow-700">Cảnh báo vi phạm:</span>
                        <span className="font-bold text-red-600">
                            {violationCount}/{questionsRes?.max_violation_attempts}
                        </span>
                        <span className="text-sm text-yellow-800">
                            Nếu bạn vi phạm quá {questionsRes?.max_violation_attempts} lần, hệ thống sẽ tự động hủy bài
                            thi.
                        </span>
                    </div>
                )}

                <div className="flex gap-4">
                    {/* Nội dung câu hỏi */}
                    <section className="flex-1">
                        <section className="space-y-4 rounded-lg bg-white px-6 py-8 shadow-xs">
                            <h1 className="text-primary text-base font-bold">Câu hỏi:</h1>
                            <div className="flex items-start gap-4">
                                <div className="t1-flex-center size-8.5 shrink-0 rounded-full bg-slate-300 font-bold">
                                    {questionActive + 1}
                                </div>
                                <div className="flex w-full flex-col">
                                    {isLoading || !questions[questionActive] || !mounted ? (
                                        <QuestionSkeleton />
                                    ) : (
                                        <>
                                            {questions[questionActive].type === "drag_drop" ? (
                                                <DragDrop
                                                    question={questions[questionActive].content || ""}
                                                    items={questions[questionActive].answers || []}
                                                    activeAnswers={answers[questions[questionActive].id] ?? []}
                                                    idQuestion={questions[questionActive].id}
                                                    handleChoiceAnswer={handleChoiceAnswer}
                                                />
                                            ) : (
                                                <>
                                                    <MathJaxContext config={configSymbolComment}>
                                                        <MathJax dynamic>
                                                            <div
                                                                className="leading-7"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: questions[questionActive].content || "",
                                                                }}
                                                            ></div>
                                                        </MathJax>
                                                    </MathJaxContext>
                                                    {questions[questionActive].images &&
                                                        questions[questionActive].images.map((item) => (
                                                            <div className="mt-2" key={item}>
                                                                <Image
                                                                    src={item}
                                                                    width={250}
                                                                    height={210}
                                                                    alt={`Question Image ${item}`}
                                                                    className="aspect-auto rounded-md"
                                                                />
                                                            </div>
                                                        ))}
                                                    <div className="mt-2">
                                                        {questions[questionActive].type === "single_choice" && (
                                                            <SingleChoice
                                                                activeAnswer={
                                                                    answers[questions[questionActive].id] || []
                                                                }
                                                                handleChoiceAnswer={handleChoiceAnswer}
                                                                idQuestion={questions[questionActive].id}
                                                                answers={questions[questionActive].answers || []}
                                                            />
                                                        )}
                                                        {questions[questionActive].type === "multiple_choice" && (
                                                            <MultipleChoice
                                                                activeAnswers={
                                                                    answers[questions[questionActive].id] ?? []
                                                                }
                                                                handleChoiceAnswer={handleChoiceAnswer}
                                                                idQuestion={questions[questionActive].id}
                                                                answers={questions[questionActive].answers || []}
                                                            />
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>
                    </section>

                    {/* Sidebar */}
                    <div className="sticky top-[70px] h-fit w-96 rounded-xl bg-white px-5 pt-8 pb-10 shadow-xs">
                        <div className="flex flex-col gap-3">
                            <div className="text-base font-medium">Thông tin thí sinh</div>
                            <div className="flex justify-between">
                                <span>Họ tên</span>
                                <span>Phạm Hoàng Tuấn</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-md border border-slate-400 p-2">
                                <div className="flex-1">Thời gian còn lại:</div>
                                <div className="text-base font-bold">{formatter.parseMinutesSeconds(timeLeft)}</div>
                                <Button className="bg-red-500 text-white hover:bg-red-500/90">Nộp bài</Button>
                            </div>

                            {/* Chỉ thị màu */}
                            <div className="my-4">
                                <div className="mb-2 font-bold">Chỉ thị màu sắc</div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="size-6 rounded-full bg-slate-300" />
                                        <span className="text-sm">Chưa chọn đáp án</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="border-primary bg-primary size-6 rounded-full border" />
                                        <span className="text-sm">Đang làm câu này</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="size-6 rounded-full border border-green-600 bg-green-500" />
                                        <span className="text-sm">Đã chọn đáp án</span>
                                    </div>
                                </div>
                            </div>

                            {/* Danh sách câu hỏi */}
                            <div className="flex flex-wrap gap-3">
                                {questions.map((q, index) => (
                                    <button
                                        key={q.id}
                                        onClick={() => setQuestionActive(index)}
                                        className={clsx("t1-flex-center size-9 cursor-pointer rounded-full", {
                                            "bg-primary font-bold text-white": index === questionActive,
                                            "bg-green-500 font-bold text-white": !!answers[q.id],
                                            "bg-slate-300 text-black": index !== questionActive && !answers[q.id],
                                        })}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed right-0 bottom-0 left-0 flex h-20 items-center justify-between bg-white px-15 py-2 shadow-lg">
                    <div className="flex items-center gap-4">
                        <Button
                            className="bg-primary cursor-pointer rounded-lg px-3 py-6 text-white shadow-xs"
                            onClick={() => setQuestionActive((prev) => Math.min(prev + 1, questions.length - 1))}
                            disabled={questionActive === 0}
                        >
                            <ChevronFirst className="size-6" />
                        </Button>
                        <Button
                            className="t1-flex-center bg-primary cursor-pointer gap-2 rounded-lg px-3 py-6 text-white shadow-xs"
                            disabled={questionActive === questions.length - 1}
                            onClick={() => setQuestionActive((prev) => Math.min(prev + 1, questions.length - 1))}
                        >
                            <span>Câu tiếp</span> <ChevronLast className="size-6" />
                        </Button>
                        <span className="t1-flex-center gap-1">
                            <span>Thời gian làm câu hiện tại:</span> <span className="text-2xl font-bold">5:50</span>
                        </span>
                    </div>
                    <div className="w-96">
                        <div className="mb-3 flex items-end justify-between">
                            <span>Bạn đã hoàn thành</span>{" "}
                            <span>
                                <span className="mr-1 ml-auto text-base font-bold">
                                    {Object.keys(answers).length}/{questions.length}
                                </span>
                                <span>câu</span>
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="h-2 w-full rounded-full bg-gray-200">
                                <div
                                    className="h-2 rounded-full bg-green-500 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-xs">{Math.round(progress)}%</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DoingExamPage;
