"use client";

import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useRef, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { formatter } from "~/libs/format";
import { motion, AnimatePresence } from "framer-motion";
import { CourseGetDetailResponse, CourseType } from "~/schemaValidate/course.schema";
import { PaymentMethodsDialog } from "../../(common)/courses/[slug]/_components/PaymentMethodsDialog";

const tooltipOffset = 210;

const DisplayCourse = ({ course }: { course: CourseType }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [position, setPosition] = useState<"left" | "right">("right");
    const [isDesktop, setIsDesktop] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // Xác định thiết bị có chuột (PC, laptop)
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsDesktop(window.matchMedia("(pointer: fine)").matches);
        }
    }, []);

    // Auto adjust tooltip direction
    useEffect(() => {
        if (showInfo && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const spaceRight = window.innerWidth - rect.right;
            const tooltipWidth = 320;

            setPosition(spaceRight < tooltipWidth ? "left" : "right");
        }
    }, [showInfo]);
    const url = course.is_enrolled
        ? `/learn/${course.slug}/lecture/${course.current_lesson.slug}`
        : `/courses/${course.slug}`;
    return (
        <div
            className="relative inline-block w-full"
            onMouseEnter={() => isDesktop && setShowInfo(true)}
            onMouseLeave={() => isDesktop && setShowInfo(false)}
            ref={containerRef}
        >
            {position === "left" ? (
                <div className="absolute top-0 bottom-0 -left-4 z-10 w-4 bg-transparent"></div>
            ) : (
                <div className="absolute top-0 -right-4 bottom-0 z-10 w-4 bg-transparent"></div>
            )}

            <Link href={url} className="text-secondary-typo relative block h-full w-full rounded-xl">
                <div className="relative">
                    <Image
                        width={184}
                        height={184}
                        src={course.thumbnail}
                        alt={course.teacher.full_name}
                        className="aspect-square w-full rounded-xl object-cover"
                    />
                    {course.is_best_seller && (
                        <div className="absolute top-2 right-2 rounded bg-gradient-to-r from-yellow-500 to-orange-500 px-2 py-1 text-[10.125px] font-bold text-white shadow-md">
                            Bán chạy
                        </div>
                    )}
                </div>
                <h3 className="mt-4 w-full font-medium lg:line-clamp-2">{course.name}</h3>
                <div className="my-1 flex items-center gap-1 text-xs font-medium">
                    <User style={{ fill: "currentColor" }} />
                    <span className="line-clamp-2">{course.teacher?.full_name}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                    <span className="font-bold text-[#FFB23F]">{4}</span>
                    <Rating style={{ maxWidth: 60 }} value={4} readOnly />
                    <span className="text-slate-400">(20)</span>
                </div>
                {course.is_enrolled ? (
                    <span className="mt-1 inline-block rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        Bạn đã mua khóa học này
                    </span>
                ) : (
                    <span className="text-sm font-bold text-black">
                        {course.price === 0 ? "Miễn phí" : formatter.number(course.price ?? 0) + "đ"}
                    </span>
                )}
            </Link>

            {/* Tooltip chỉ hiển thị nếu là PC */}
            {isDesktop && (
                <AnimatePresence>
                    {showInfo && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.09 }}
                            transition={{ duration: 0.1 }}
                            className="absolute top-0 z-50 w-[320px]"
                            style={{
                                left: position === "right" ? `${tooltipOffset}px` : "auto",
                                right: position === "left" ? `${tooltipOffset}px` : "auto",
                            }}
                            onMouseEnter={() => setShowInfo(true)}
                            onMouseLeave={() => setShowInfo(false)}
                        >
                            <div className={`absolute top-5 ${position === "left" ? "right-[0]" : "left-[-18px]"}`}>
                                {position === "right" ? (
                                    <>
                                        <div className="absolute top-[2px] h-0 w-0 border-y-[13px] border-r-[18px] border-y-transparent border-r-gray-800" />
                                        <div className="absolute top-[2px] h-0 w-0 border-y-[13px] border-r-[18px] border-y-transparent border-r-white" />
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute top-[2px] h-0 w-0 border-y-[13px] border-l-[18px] border-y-transparent border-l-gray-800" />
                                        <div className="absolute top-[2px] h-0 w-0 border-y-[13px] border-l-[18px] border-y-transparent border-l-white" />
                                    </>
                                )}
                            </div>

                            <div className="border-muted rounded-lg border bg-white px-4 py-6 shadow-lg">
                                <h3 className="text-primary text-base font-bold">
                                    <Link href={url}>{course.name}</Link>
                                </h3>
                                <p className="mt-1 text-xs text-slate-600">Đã cập nhật gần nhất vào tháng 4 năm 2025</p>
                                <p className="mt-2 text-gray-600">{course.description}</p>
                                {!course.is_enrolled && course && (
                                    <PaymentMethodsDialog course={course as CourseGetDetailResponse["data"]} />
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};

export default memo(DisplayCourse);
