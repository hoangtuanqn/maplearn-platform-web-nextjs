import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
    Award,
    BadgeCheck,
    CalendarDays,
    CheckCircle2,
    Clock,
    ListChecks,
    RefreshCcw,
    Timer,
    Trophy,
    XCircle,
} from "lucide-react";
import { Progress } from "~/components/ui/progress";

const ResultExamPage = () => {
    // UI-only demo data; wire real data later
    const examTitle = "TH-7091-Sem 2 - Java Programming II";
    const totalQuestions = 40;
    const durationMinutes = 60;
    const spentMinutes = 29;
    const score10 = 2; // thang điểm 10
    const correct = 36;
    const wrong = 3;
    const skipped = 1;
    const accuracy = Math.round((correct / totalQuestions) * 100);
    const passed = score10 >= 5; // demo logic

    return (
        <section className="mt-10 min-h-screen px-4 pb-10">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Exam info */}
                <section className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-primary text-2xl font-bold">{examTitle}</h1>
                            <div className="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <ListChecks className="text-primary size-4" />
                                    <span>Tổng số câu hỏi: </span>
                                    <span className="font-medium">{totalQuestions}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Clock className="text-primary size-4" />
                                    <span>Thời lượng: </span>
                                    <span className="font-medium">{durationMinutes} phút</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CalendarDays className="text-primary size-4" />
                                    <span>Nộp bài: </span>
                                    <span className="font-medium">19/08/2025 11:10</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Timer className="text-primary size-4" />
                                    <span>Thời gian làm: </span>
                                    <span className="font-medium">{spentMinutes} phút</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:block">
                            <div
                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${
                                    passed
                                        ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                                        : "bg-red-50 text-red-700 ring-1 ring-red-200"
                                }`}
                            >
                                {passed ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />}
                                <span className="font-medium">{passed ? "Đạt" : "Không đạt"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Summary cards */}
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-lg border bg-white p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Điểm số</span>
                                <Trophy className="size-4 text-yellow-500" />
                            </div>
                            <div className="mt-3 text-3xl font-bold">{score10.toFixed(1)}</div>
                            <div className="mt-1 text-xs text-gray-500">Điểm tối đa: 10</div>
                        </div>
                        <div className="rounded-lg border bg-white p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Độ chính xác</span>
                                <Award className="text-primary size-4" />
                            </div>
                            <div className="mt-3">
                                <Progress className="h-2" value={accuracy} />
                                <div className="mt-2 text-3xl font-bold">{accuracy}%</div>
                                <div className="mt-1 text-xs text-gray-500">
                                    Đúng {correct}/{totalQuestions}
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border bg-white p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Câu sai</span>
                                <XCircle className="size-4 text-red-500" />
                            </div>
                            <div className="mt-3 text-3xl font-bold">{wrong}</div>
                            <div className="mt-1 text-xs text-gray-500">Ảnh hưởng đến điểm số</div>
                        </div>
                        <div className="rounded-lg border bg-white p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Bỏ qua</span>
                                <BadgeCheck className="size-4 text-blue-500" />
                            </div>
                            <div className="mt-3 text-3xl font-bold">{skipped}</div>
                            <div className="mt-1 text-xs text-gray-500">Chưa trả lời</div>
                        </div>
                    </div>
                    {!passed && (
                        <div className="mt-6 rounded-lg bg-red-100 p-4 text-center font-semibold text-red-700">
                            Bài thi không được tính điểm do phát hiện gian lận.
                        </div>
                    )}
                    {/* Breakdown & Actions */}
                    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div className="rounded-lg border bg-white p-4 lg:col-span-2">
                            <h3 className="mb-4 text-base font-semibold text-gray-900">Tóm tắt</h3>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 ring-1 ring-green-100">
                                    <CheckCircle2 className="size-5 shrink-0 text-green-600" />
                                    <div>
                                        <div className="text-sm text-gray-600">Số câu đúng</div>
                                        <div className="text-lg font-semibold text-gray-900">{correct}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3 ring-1 ring-red-100">
                                    <XCircle className="size-5 shrink-0 text-red-600" />
                                    <div>
                                        <div className="text-sm text-gray-600">Số câu sai</div>
                                        <div className="text-lg font-semibold text-gray-900">{wrong}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 ring-1 ring-blue-100">
                                    <ListChecks className="size-5 shrink-0 text-blue-600" />
                                    <div>
                                        <div className="text-sm text-gray-600">Số câu bỏ qua</div>
                                        <div className="text-lg font-semibold text-gray-900">{skipped}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-amber-50 p-3 ring-1 ring-amber-100">
                                    <Timer className="size-5 shrink-0 text-amber-600" />
                                    <div>
                                        <div className="text-sm text-gray-600">Thời gian làm bài</div>
                                        <div className="text-lg font-semibold text-gray-900">{spentMinutes} phút</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border bg-white p-4">
                            <h3 className="mb-4 text-base font-semibold text-gray-900">Hành động</h3>
                            <div className="flex flex-col gap-3">
                                <Link href=".." className="w-full">
                                    <Button variant="outline" className="w-full justify-start gap-2">
                                        <CalendarDays className="size-4" />
                                        Về trang đề thi
                                    </Button>
                                </Link>
                                <Link href="../doing" className="w-full">
                                    <Button className="w-full justify-start gap-2 bg-[#12AD50] text-white hover:bg-[#0f9a47]">
                                        <RefreshCcw className="size-4" />
                                        Làm lại từ đầu
                                    </Button>
                                </Link>
                                <Link href="../review" className="w-full">
                                    <Button variant="outline" className="w-full justify-start gap-2">
                                        <ListChecks className="size-4" />
                                        Xem đáp án chi tiết
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Status card (desktop stacks to side) */}
                <aside className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        {passed ? (
                            <CheckCircle2 className="size-6 text-green-600" />
                        ) : (
                            <XCircle className="size-6 text-red-600" />
                        )}
                        <div>
                            <div className="text-sm text-gray-500">Trạng thái</div>
                            <div className={`text-lg font-semibold ${passed ? "text-green-700" : "text-red-700"}`}>
                                {passed ? "Đạt" : "Không đạt"}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 rounded-lg border p-4">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Điểm</span>
                            <span className="font-semibold text-gray-900">{score10.toFixed(1)} / 10</span>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">Độ chính xác</div>
                        <Progress className="mt-2 h-2" value={accuracy} />
                        <div className="mt-2 text-right text-sm font-semibold text-gray-900">{accuracy}%</div>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default ResultExamPage;
