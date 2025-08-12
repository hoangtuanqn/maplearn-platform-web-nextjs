import React from "react";

const ExamList = () => {
    return (
        <section className="flex-1 space-y-4 rounded-xl">
            {[...Array(20)].map((_, index) => (
                <div
                    key={index}
                    className="max-lap:hidden relative flex h-[72px] w-full items-center justify-between gap-4 overflow-hidden rounded-lg border border-red-500 bg-white px-6 shadow-sm"
                >
                    <div className="t1-flex-center absolute -top-[1px] -left-[1px] h-[24px] rounded-br-[5px] bg-red-700 px-[8px] text-[13px] font-medium text-white">
                        TSA
                    </div>
                    <div className="flex h-full grow items-center justify-between text-[15.75px]">
                        <a
                            className="text-secondary-typo-light line-clamp-1 w-[70%] pr-6 font-medium text-red-700"
                            href="/exams/khao-sat-chat-luong-thang-8---ky-thi-tsa---mon-toan-8s224qe013qt"
                        >
                            1. KHẢO SÁT CHẤT LƯỢNG THÁNG 8 - KỲ THI TSA - MÔN TOÁN
                        </a>
                        <div className="text-primary-typo w-[25%] font-medium" style={{ color: "rgb(196, 29, 23)" }}>
                            ĐGTD TSA
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ExamList;
