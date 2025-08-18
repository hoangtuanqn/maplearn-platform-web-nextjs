"use client";
import React, { useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import examApi from "~/apiRequest/exam";
import { getLocalStorage, setLocalStorage } from "~/libs/localStorage";
import { Question } from "~/schemaValidate/exam.schema";
import FullScreen from "./_components/FullScreen";
import Skeleton from "react-loading-skeleton";
import { AnswerLocalStorage } from "./exam.type";
import useCountDown from "~/hooks/useCountDown";
import { formatter } from "~/libs/format";

import Sidebar from "./_components/Sidebar";
import Footer from "./_components/Footer";
import Questions from "./_components/Questions";
import { toast } from "sonner";
import { useUnsavedChangesWarning } from "~/hooks/useUnsavedChangesWarning";
import Loading from "~/app/(student)/_components/Loading";

const slug = "de-minh-hoa-thi-tot-nghiep-thpt-2025-mon-toan-xwj9asdvfxuq";

const DoingExamPage = () => {
    const [mounted, setMounted] = useState(false);
    const [questionActive, setQuestionActive] = useState(0); // index câu hiện tại
    const [infoExam, setInfoExam] = useState<AnswerLocalStorage>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<number, string[]>>({});
    const [violationCount, setViolationCount] = useState(1); // tính số lần vi phạm
    const { timeLeft, setTimeLeft } = useCountDown(0);
    const { timeLeft: countdownSubmit, setTimeLeft: setCountdownSubmit } = useCountDown(0);

    const { data: questionsRes, isLoading } = useQuery({
        queryKey: ["exam", "questions", slug],
        queryFn: async () => {
            const res = await examApi.getQuestions(slug);
            return res.data.data;
        },
    });
    // Còn thời gian làm bài mà reload sẽ có cảnh báo
    useUnsavedChangesWarning(timeLeft > 0);

    // Chọn đáp án
    // idx: chỉ dành cho cái drag_drop thôi nhé
    const handleChoiceAnswer = (questionId: number, answer: string, idx?: number) => {
        const question = questions.find((ques) => ques.id === questionId);
        switch (question?.type) {
            case "single_choice":
            case "numeric_input":
            case "true_false":
                setAnswers((prev) => ({ ...prev, [questionId]: [answer] }));
                break;
            case "multiple_choice":
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
                break;
            case "drag_drop":
                if (idx) {
                    setAnswers((prev) => {
                        const countAnswer = question.answers.length ?? 0;
                        // Loại bỏ phần tử rỗng k có giá trị
                        const newAnswers = Array.from(
                            { length: countAnswer },
                            (_, i) => prev?.[questionId]?.[i],
                        ).filter((ans) => ans);
                        newAnswers[idx - 1] = answer; // idx - 1 vì mảng bắt đầu từ 0
                        return { ...prev, [questionId]: newAnswers };
                    });
                }
            default:
                toast.error("Loại câu hỏi không hợp lệ!");
        }
    };
    const submitAnswerMutation = useMutation({
        mutationFn: (data: AnswerLocalStorage) => examApi.submitAnswer(slug, data),
        onSuccess: (data) => {
            console.log(data);

            toast.success("Đã nộp bài làm thành công");
        },
        onError: () => {
            toast.error("Đã có lỗi xảy ra khi nộp bài");
        },
    });

    const handleSubmitExam = () => {
        // console.log("Đã submit bài làm thành công", slug, answers);
        const answers = JSON.parse(getLocalStorage(slug) ?? "") as AnswerLocalStorage;
        submitAnswerMutation.mutate(answers);
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
            setCountdownSubmit(5 * 60 - Math.floor((Date.now() - data.start) / 1000)); // tính thời gian còn lại
        } else {
            const startTime = Date.now();
            const newData: AnswerLocalStorage = { answers: {}, start: startTime, questionActive: 0 };
            setInfoExam(newData);
            setLocalStorage(slug, JSON.stringify(newData));
            setCountdownSubmit(5 * 60);
        }
    }, [setCountdownSubmit]);

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

    // đã hoàn thành %

    return (
        <>
            {submitAnswerMutation.isPending && <Loading />}
            {questionsRes?.anti_cheat_enabled && (
                <FullScreen violationCount={violationCount} setViolationCount={setViolationCount} />
            )}

            <section className="mt-5 h-screen pl-4 max-xl:pr-4">
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
                {/* Hiển thị cảnh báo khi còn 3p là hết giờ làm bài */}
                {!isLoading && timeLeft <= 180 && (
                    <div className="mb-4 flex items-center gap-3 rounded-lg bg-red-100 px-4 py-2">
                        <span className="font-semibold text-red-700">Cảnh báo:</span>
                        <span className="font-bold text-red-600">
                            Thời gian làm bài còn lại: {formatter.parseMinutesSeconds(timeLeft)}
                        </span>
                    </div>
                )}

                <div className="flex flex-col gap-4 xl:flex-row">
                    {/* Nội dung câu hỏi */}
                    <Questions
                        payload={{
                            questions,
                            isLoading,
                            questionActive,
                            answers,
                            handleChoiceAnswer,
                            mounted,
                            setQuestionActive,
                        }}
                    />

                    <Sidebar
                        payload={{
                            handleSubmitExam,
                            setQuestionActive,
                            questions,
                            countdownSubmit,
                            timeLeft,
                            questionActive,
                            answers,
                        }}
                    />
                </div>
                <Footer payload={{ setQuestionActive, questionActive, countQuestion: questions.length, answers }} />
            </section>
        </>
    );
};

export default DoingExamPage;
