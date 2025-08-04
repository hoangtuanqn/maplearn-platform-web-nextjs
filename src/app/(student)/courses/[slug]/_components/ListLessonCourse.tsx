"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import { useQuery } from "@tanstack/react-query";
import courseApi from "~/apiRequest/course.schema";
import { useParams } from "next/navigation";
import { formatter } from "~/libs/format";

const ListLessonCourse = () => {
    const params = useParams<{ slug: string }>();
    const [open, setOpen] = useState(1);
    const percentage = 20;
    const { data: chapters } = useQuery({
        queryKey: ["course", "chapters"],
        queryFn: async () => {
            const res = await courseApi.getChapterLessonList(params.slug);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 phút
    });
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-8">
            <p className="text-base font-bold">Nội dung khóa học</p>
            <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                {chapters?.map((chapter) => (
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
                                    {chapter.lessons?.map((lesson, index) => (
                                        <div key={lesson.id} className="py-0.5 sm:py-1">
                                            <div className="flex w-full cursor-pointer justify-between gap-2 rounded-lg px-3 py-2 text-xs duration-150 hover:bg-[#f3f3f3] max-lg:flex-col sm:px-5 sm:text-sm">
                                                <div className="items-cente flex gap-2">
                                                    <div className="text-xs text-slate-600 sm:text-[13.125px]">
                                                        <span>#{index + 1}. </span>
                                                        <span>{lesson.title}</span>
                                                    </div>
                                                    {/* Học thử */}
                                                    {lesson.is_free && (
                                                        <span className="rounded-md border border-green-400 bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                                                            Được học thử
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 max-lg:justify-between">
                                                    {/* <span className="bg-primary/90 ml-2 rounded-md px-2 py-0.5 text-xs font-semibold text-white">
                                                                Đã hoàn thành
                                                            </span> */}
                                                    {/* Chưa hoàn thành */}
                                                    <span className="ml-2 rounded-md bg-[#F3F4F6] px-2 py-0.5 text-xs font-semibold text-[#6B7280]">
                                                        Chưa hoàn thành
                                                    </span>

                                                    <div className="flex items-center gap-1">
                                                        <span className="text-xs font-normal text-[#828B9E]">
                                                            {formatter.duration(40 * 60 * 200)}
                                                        </span>
                                                    </div>
                                                    {/* Hiển thị badge bạn đã xem */}
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
