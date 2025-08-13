"use client";
import React, { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { configSymbolComment } from "~/app/(student)/_components/Comment/config";
import { Button } from "~/components/ui/button";
import DragDrop from "./_components/DragDrop";
import FullScreen from "./_components/FullScreen";

const DoingExamPage = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    // Câu hỏi và danh sách đáp án
    const question = `Sau một năm đi làm, bạn Nam đã tiết kiệm được $50$ triệu đồng. Nam gửi tiết kiệm với lãi suất $6,5$% một năm. Giả sử lãi suất không thay đổi. Hỏi sau bao nhiêu năm bạn Nam có thể mua được một chiếc xe máy với giá <-Drag-> triệu đồng? Và mất bao nhiêu lâu <-Drag->?`;
    const items = ["1", "2", "3", "4"];
    return (
        <>
            <FullScreen />
            <section className="mt-5 min-h-screen px-4 pb-10">
                <h2 className="text-primary mb-4 text-xl font-bold">
                    KHẢO SÁT CHẤT LƯỢNG THÁNG 8 - KỲ THI TSA - MÔN TOÁN
                </h2>
                <div className="flex gap-4">
                    <section className="flex-1">
                        <section className="space-y-4 rounded-lg bg-white px-6 py-8 shadow-xs">
                            <h1 className="text-primary text-base font-bold">Câu hỏi:</h1>
                            <div className="flex items-start justify-start gap-4">
                                <div className="flex-center t1-flex-center size-8.5 shrink-0 rounded-full bg-slate-300 font-bold">
                                    1
                                </div>
                                <div className="flex flex-col">
                                    {mounted && (
                                        <>
                                            <MathJaxContext config={configSymbolComment}>
                                                <MathJax dynamic>
                                                    {/* <div
                                                        className="leading-9"
                                                        dangerouslySetInnerHTML={{
                                                            __html: `
                                            Cho $A$ và $B$ là hai biến cố xung khắc. Xét các biểu thức sau:
                                            <br />
                                            1. $P(A \\cup B) = P(A) + P(B)$
                                            <br />
                                            2. $P(A \\cap B) = 0$
                                            <br />
                                            3. $P(A|B) = \\frac{P(A \\cap B)}{P(B)} = 0$
                                            <br />
                                            4. $P(A^c) = 1 - P(A)$
                                            <br />
                                            5. $P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(A \\cap C) - P(B \\cap C) + P(A \\cap B \\cap C)$
                                            <br />
                                            6. $\\sum_{k=0}^n \\binom{n}{k} = 2^n$
                                            <br />
                                            7. $\\int_0^1 x^2 dx = \\frac{1}{3}$
                                            <br />
                                            8. $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$
                                            <br />
                                            9. $\\frac{d}{dx} e^{ax} = a e^{ax}$
                                            <br />
                                            10. $\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$
                                            <br />
                                            <image src="https://mapstudy.sgp1.digitaloceanspaces.com/qa/attachment/8y3537j00abo/1754040513151.png" width="80%"/>
                                            Hãy chọn khẳng định sai trong các khẳng định trên.
                                        `,
                                                        }}
                                                    /> */}
                                                    {/* <div
                                                        className="leading-9"
                                                        dangerouslySetInnerHTML={{
                                                            __html: `Sau một năm đi làm, bạn Nam đã tiết kiệm được $50$ triệu đồng. Nam gửi tiết kiệm với lãi suất $6,5$% một năm. Giả sử lãi suất không thay đổi. Hỏi sau bao nhiêu năm bạn Nam có thể mua được một chiếc xe máy với giá $drop_1$ triệu đồng?`,
                                                        }}
                                                    ></div> */}
                                                </MathJax>
                                            </MathJaxContext>
                                            {mounted && <DragDrop question={question} items={items} />}
                                            {/* <SingleChoice /> */}
                                            {/* <MultipleChoice /> */}
                                            {/* <NumericInput /> */}
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>
                    </section>
                    <div className="sticky top-[70px] h-fit w-96 rounded-xl bg-white px-5 pt-8 pb-10 shadow-xs">
                        <div className="flex h-full flex-col gap-3 bg-white pb-0 text-black">
                            <div className="text-base font-medium">Thông tin thí sinh</div>
                            <div className="flex justify-between">
                                <span>Họ tên</span>
                                <span>Phạm Hoàng Tuấn</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-md border border-slate-400 p-2">
                                <div className="flex-1">Thời gian còn lại:</div>
                                <div className="text-base font-bold">
                                    <div>55:44</div>
                                </div>
                                <Button className="cursor-pointer rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-500/90">
                                    Nộp bài
                                </Button>
                            </div>
                            <div className="my-4">
                                <div className="mb-2 font-bold">Chỉ thị màu sắc</div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-6 items-center justify-center rounded-full bg-slate-300" />
                                        <span className="text-sm font-medium">Chưa chọn đáp án</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary border-primary flex size-6 items-center justify-center rounded-full border" />
                                        <span className="text-sm font-medium">Đang làm câu này</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-6 items-center justify-center rounded-full border border-green-600 bg-green-500 text-white" />
                                        <span className="text-sm font-medium">Đã chọn đáp án</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {[...Array(40)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`t1-flex-center size-9 rounded-full ${index == 0 ? "bg-primary font-bold text-white" : "bg-slate-300 text-black"} cursor-pointer`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* <ExamList /> */}
                </div>
            </section>
        </>
    );
};

export default DoingExamPage;
