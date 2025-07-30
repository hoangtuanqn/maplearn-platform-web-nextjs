"use client";
import { Clock, Eye, GraduationCap } from "lucide-react";
import Image from "next/image";
import React from "react";

const DocumentList = () => {
    return (
        <div className="flex gap-8">
            <div className="flex-1 lg:flex-3/4">
                <h1 className="text-primary text-xl font-bold uppercase">THƯ VIỆN TÀI LIỆU</h1>
                <div className="mt-6 flex flex-wrap gap-2 text-xs lg:text-sm xl:gap-4 [&>button]:flex [&>button]:gap-2">
                    <button className="t1-flex-center flex w-fit cursor-pointer rounded-xl bg-[#F0F3F7] px-5 py-3 font-semibold text-gray-600">
                        <GraduationCap /> DGTD
                    </button>
                    <button className="t1-flex-center flex w-fit cursor-pointer rounded-xl bg-[#F0F3F7] px-5 py-3 font-semibold text-gray-600">
                        <GraduationCap /> DGNL
                    </button>
                    <button className="t1-flex-center flex w-fit cursor-pointer rounded-xl bg-[#F0F3F7] px-5 py-3 font-semibold text-gray-600">
                        <GraduationCap /> Lớp 12
                    </button>
                    <button className="w-ffitcursor-pointer t1-flex-center flex rounded-xl bg-[#F0F3F7] px-5 py-3 font-semibold text-gray-600">
                        <GraduationCap /> Lớp 11
                    </button>
                    <button className="t1-flex-center flex w-fit cursor-pointer rounded-xl bg-[#F0F3F7] px-5 py-3 font-semibold text-gray-600">
                        <GraduationCap /> Lớp 10
                    </button>
                </div>
                <div
                    className="relative mt-6 flex w-full flex-wrap items-center overflow-x-auto [&>button]:cursor-pointer [&>button]:border-b-gray-300"
                    style={{ scrollbarWidth: "none" }}
                >
                    <button className="relative min-w-20 border-b-[1px] py-3">
                        <p className="text-md font-medium text-[#999999]">Tất cả</p>
                    </button>
                    <button className="relative min-w-[4.7rem] border-b-[1px] py-3">
                        <p className="text-md font-medium text-[#999999]">Toán</p>
                    </button>
                    <button className="relative min-w-[4.7rem] border-b-[1px] py-3">
                        <div
                            className="bg-primary absolute bottom-0 left-0 h-[2px] w-full rounded-full"
                            style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
                        />
                        <p className="text-md text-primary font-medium">Lý</p>
                    </button>
                    <button className="relative min-w-[4.7rem] border-b-[1px] py-3">
                        <p className="text-md font-medium text-[#999999]">Sinh</p>
                    </button>
                    <button className="relative min-w-[4.7rem] border-b-[1px] py-3">
                        <p className="text-md font-medium text-[#999999]">Anh</p>
                    </button>
                    <button className="relative min-w-[4.7rem] border-b-[1px] py-3">
                        <p className="text-md font-medium text-[#999999]">Hoá</p>
                    </button>
                    <button className="relative min-w-[4.7rem] border-b-[1px] py-3">
                        <p className="text-md font-medium text-[#999999]">Văn</p>
                    </button>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {[...Array(100)].map((_, index) => (
                        <div key={index} className="flex gap-3 rounded-xl bg-[#EFF0F1] p-4">
                            <div className="shrink-0">
                                <Image
                                    src="/assets/icons/pdf.svg"
                                    width={72}
                                    height={92}
                                    alt="Icon SVG PDF"
                                    className="h-auto max-sm:w-[80%]"
                                />
                            </div>

                            <div>
                                <h2 className="line-clamp-3 text-xs leading-5 font-bold text-slate-600 uppercase lg:text-sm">
                                    006. ĐÁP ÁN - ĐỀ KHẢO SÁT NĂNG LỰC KHÓA HÈ - NGUYỄN KHUYẾN 006. ĐÁP ÁN - ĐỀ KHẢO SÁT
                                    NĂNG LỰC KHÓA HÈ - NGUYỄN KHUYẾN 006. ĐÁP ÁN - ĐỀ KHẢO SÁT NĂNG LỰC KHÓA HÈ - NGUYỄN
                                    KHUYẾN006. ĐÁP ÁN - ĐỀ KHẢO SÁT NĂNG LỰC KHÓA HÈ - NGUYỄN KHUYẾN 006. ĐÁP ÁN - ĐỀ
                                    KHẢO SÁT NĂNG LỰC KHÓA HÈ - NGUYỄN KHUYẾN 006. ĐÁP ÁN - ĐỀ KHẢO SÁT NĂNG LỰC KHÓA HÈ
                                    - NGUYỄN KHUYẾN006. ĐÁP ÁN - ĐỀ KHẢO SÁT NĂNG LỰC KHÓA HÈ - NGUYỄN KHUYẾN 006. ĐÁP
                                    ÁN - ĐỀ KHẢO SÁT NĂNG LỰC KHÓA HÈ - NGUYỄN KHUYẾN 006. ĐÁP ÁN - ĐỀ KHẢO SÁT NĂNG LỰC
                                    KHÓA HÈ - NGUYỄN KHUYẾN
                                </h2>
                                <div className="mt-3">
                                    <span className="bg-primary rounded-xl px-5 py-1 text-xs text-white">Lý</span>
                                </div>
                                <div className="mt-3 h-[1px] bg-gray-300"></div>
                                <div className="mt-3 flex justify-between text-xs text-gray-500">
                                    <div className="t1-flex-center gap-1">
                                        <Eye /> 300
                                    </div>
                                    <div className="t1-flex-center gap-1">
                                        <Clock /> 17:50 - 20/6/2006
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="sticky top-[56px] h-fit lg:flex-1/4">
                <h2 className="text-primary mt-6 text-base font-bold uppercase">Kho tài liệu</h2>
                <div className="mt-3 flex gap-3 rounded-xl bg-[#EFF0F1] p-4">
                    <div className="shrink-0">
                        <Image
                            src="/assets/icons/file.svg"
                            width={72}
                            height={92}
                            alt="Icon SVG PDF"
                            className="h-auto max-sm:w-[80%]"
                        />
                        <span className="bg-primary mt-2 inline-block rounded-xl px-5 py-1 text-xs text-white">
                            Lớp 12
                        </span>
                    </div>
                    <div>
                        <h2 className="line-clamp-3 text-xs leading-5 font-bold text-slate-600 uppercase lg:text-sm">
                            Kho đề thi kiểm tra đầu năm - Vật lý 12 Kho đề thi kiểm tra đầu năm - Vật lý 12 Kho đề thi
                            kiểm tra đầu năm - Vật lý 12
                        </h2>
                        <span className="mt-2 inline-block text-gray-400">Đang có 560 tài liệu</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentList;
