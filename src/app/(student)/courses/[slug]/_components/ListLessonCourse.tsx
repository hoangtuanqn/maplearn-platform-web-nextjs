"use client";
import React, { useState } from "react";
import { ChevronDown, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
const chapters = [
    {
        id: 1,
        title: "Chương 1: Phương trình bậc nhất",
        lessons: [
            "Bài 1: Khái niệm phương trình",
            "Bài 2: Phương trình bậc nhất một ẩn",
            "Bài 3: Biến đổi và giải phương trình đơn giản",
            "Bài 4: Dạng tổng quát và phương pháp giải",
            "Bài 5: Ứng dụng thực tế của phương trình bậc nhất",
        ],
    },
    {
        id: 2,
        title: "Chương 2: Hệ phương trình",
        lessons: [
            "Bài 1: Giới thiệu về hệ phương trình",
            "Bài 2: Phương pháp thế",
            "Bài 3: Phương pháp cộng đại số",
            "Bài 4: Phương pháp đồ thị",
            "Bài 5: Bài toán thực tế liên quan đến hệ phương trình",
        ],
    },
    {
        id: 3,
        title: "Chương 3: Bất phương trình",
        lessons: [
            "Bài 1: Bất phương trình bậc nhất một ẩn",
            "Bài 2: Biểu diễn tập nghiệm trên trục số",
            "Bài 3: Giải bất phương trình chứa tham số",
            "Bài 4: Ứng dụng bất phương trình vào bài toán thực tế",
        ],
    },
    {
        id: 4,
        title: "Chương 4: Hàm số và đồ thị",
        lessons: [
            "Bài 1: Khái niệm về hàm số",
            "Bài 2: Hàm số bậc nhất",
            "Bài 3: Đồ thị hàm số bậc nhất",
            "Bài 4: Sự biến thiên và tính đơn điệu",
            "Bài 5: Bài toán liên quan đến đồ thị",
        ],
    },
    {
        id: 5,
        title: "Chương 5: Ôn tập cuối kỳ",
        lessons: [
            "Bài 1: Ôn tập phương trình và hệ phương trình",
            "Bài 2: Ôn tập bất phương trình",
            "Bài 3: Ôn tập hàm số và đồ thị",
            "Bài 4: Giải đề kiểm tra mẫu",
        ],
    },
];
const ListLessonCourse = () => {
    const [open, setOpen] = useState(1);
    const percentage = 20;
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-8">
            <p className="text-base font-bold">Nội dung khóa học</p>
            <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                {chapters.map((chapter) => (
                    <div key={chapter.id} className="rounded-md">
                        <div
                            className="flex cursor-pointer items-center gap-2 rounded-md bg-[#f3f3f3] px-3 py-2 duration-150 hover:bg-[#ebebeb] sm:gap-3.5 sm:px-5"
                            onClick={() => setOpen((prev) => (prev === chapter.id ? 0 : chapter.id))}
                        >
                            <div className="aspect-square w-7 shrink-0 sm:w-8">
                                <CircularProgressbar
                                    value={percentage}
                                    text={`${percentage}%`}
                                    styles={{
                                        root: { width: "100%", height: "100%" },
                                        path: {
                                            stroke: `rgba(62, 152, 199, ${percentage / 100})`,
                                            strokeLinecap: "butt",
                                            transition: "stroke-dashoffset 0.5s ease 0s",
                                            transform: "rotate(0.25turn)",
                                            transformOrigin: "center center",
                                        },
                                        trail: {
                                            stroke: "#d6d6d6",
                                            strokeLinecap: "butt",
                                            transform: "rotate(0.25turn)",
                                            transformOrigin: "center center",
                                        },
                                        text: {
                                            fill: "#155e94",
                                            fontSize: "18px",
                                            fontWeight: 600,
                                        },
                                        background: { fill: "#3e98c7" },
                                    }}
                                />
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <h3 className="text-sm font-medium sm:text-[14.875px]">{chapter.title}</h3>
                                <div>
                                    <ChevronDown
                                        className={`text-primary size-5 transition-transform duration-200 ${open === chapter.id ? "rotate-180" : ""}`}
                                    />
                                </div>
                            </div>
                        </div>
                        <AnimatePresence initial={false}>
                            {open === chapter.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2 overflow-hidden sm:mt-3 [&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-[#e5e5e5]"
                                >
                                    {chapter.lessons.map((lesson, index) => (
                                        <div key={index} className="py-0.5 sm:py-1">
                                            <div className="flex w-full cursor-pointer justify-between gap-2 rounded-lg px-3 py-2 text-xs duration-150 hover:bg-[#f3f3f3] sm:px-5 sm:text-sm">
                                                <div className="text-xs text-slate-600 sm:text-[13.125px]">
                                                    <span>#{index + 1}. </span>
                                                    <span>{lesson}</span>
                                                </div>
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    <span className="text-xs font-normal text-[#828B9E] sm:text-sm">
                                                        70
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListLessonCourse;
