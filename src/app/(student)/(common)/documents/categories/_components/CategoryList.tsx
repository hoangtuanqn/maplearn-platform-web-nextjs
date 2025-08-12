"use client";
import React from "react";
import Image from "next/image";
import { ChevronRight, CloudDownload, Folder } from "lucide-react";
import Link from "next/link";
import Tag from "../../_components/Tag";

const CategoryList = () => {
    return (
        <div className="mt-4 grid gap-x-2.5 gap-y-4 lg:grid-cols-4">
            {[...Array(100)].map((_, index) => (
                <div key={index} className="rounded-xl bg-[#EFF0F1] px-2.5 py-4">
                    <Link className="flex gap-2.5" href="">
                        <div className="flex shrink-0 flex-col items-center">
                            <Image src="/assets/icons/file.svg" width={64} height={53} alt="File Icon" />
                            <Tag className="mt-2 inline-block">Lớp 12</Tag>
                        </div>

                        <div>
                            <div>
                                <h2 className="line-clamp-3 font-bold lg:text-base">
                                    Kho đề kiểm tra đầu năm - Vật lý 12
                                </h2>
                                <div className="flex items-center gap-5 py-1.5 text-slate-500">
                                    <span className="flex items-center gap-1 max-lg:text-xs">
                                        <Folder /> <span>530 tài liệu</span>
                                    </span>
                                    <span className="flex items-center gap-1 max-lg:text-xs">
                                        <CloudDownload /> <span>550 lượt tải</span>
                                    </span>
                                </div>
                            </div>
                            <p className="mt-2 text-[13.125px] text-slate-500">{}</p>
                        </div>
                    </Link>

                    <div className="mt-4 space-y-2 border-t border-slate-300 pt-4 [&>a]:flex">
                        <Link className="cursor-pointer text-[13.125px] text-slate-600" href="">
                            <ChevronRight className="shrink-0" />
                            <span className="line-clamp-1">
                                006. Đáp án – Đề khảo sát năng lực khóa hè – Nguyễn Khuyến 006. Đáp án – Đề khảo sát
                                năng lực khóa hè – Nguyễn Khuyến
                            </span>
                        </Link>
                        <Link className="cursor-pointer text-[13.125px] text-slate-600" href="">
                            <ChevronRight className="shrink-0" />
                            <span className="line-clamp-1">
                                006. Đáp án – Đề khảo sát năng lực khóa hè – Nguyễn Khuyến 006. Đáp án – Đề khảo sát
                                năng lực khóa hè – Nguyễn Khuyến
                            </span>
                        </Link>
                        <Link className="cursor-pointer text-[13.125px] text-slate-600" href="">
                            <ChevronRight className="shrink-0" />
                            <span className="line-clamp-1">
                                006. Đáp án – Đề khảo sát năng lực khóa hè – Nguyễn Khuyến 006. Đáp án – Đề khảo sát
                                năng lực khóa hè – Nguyễn Khuyến
                            </span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
