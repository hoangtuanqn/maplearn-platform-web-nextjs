"use client";
import { ChevronDown, GraduationCap } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import MultiSelectDropdown from "../courses/_components/MultiSelectDropdown";
import ExamList from "./_components/ExamList";

const ExamPage = () => {
    const handleOnChangeTeacher = (value: string[]) => {};
    const provinces = ["Quảng Ngãi", "Bình Định", "TP.HCM", "Hà Nội"];
    return (
        <section className="mt-10 flex min-h-screen gap-4 px-4 pb-10">
            <div className="sticky top-[70px] h-fit w-96 rounded-xl bg-white px-6 py-4 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-primary mb-2 text-base font-bold">Tìm kiếm</h2>
                    <Input name="search" placeholder="Tìm kiếm đề thi ...." />
                </div>
                <div className="space-y-6">
                    <h2 className="text-primary mb-3 text-base font-bold">Bộ lọc</h2>
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between text-[15.725px]">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="size-5" />
                                <span className="font-semibold text-gray-800">Môn học</span>
                            </div>
                            <button
                                type="button"
                                className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none"
                            >
                                <ChevronDown className="size-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {["Toán", "Lý", "Hóa", "Anh", "Văn"].map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <Checkbox id={item} />
                                    <Label htmlFor={item} className="text-sm text-gray-700">
                                        {item}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between text-[15.725px]">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="size-5" />
                                <span className="font-semibold text-gray-800">Phân loại học</span>
                            </div>
                            <button
                                type="button"
                                className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none"
                            >
                                <ChevronDown className="size-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {[
                                "ĐGNL HSA",
                                "ĐGNL V-ACT",
                                "ĐGTD TSA",
                                "Tốt nghiệp THPT",
                                "Thi cuối kì 1",
                                "Thi cuối kì 2",
                                "Thi giữa kì 1",
                                "Thi giữa kì 2",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <Checkbox id={item} />
                                    <Label htmlFor={item} className="cursor-pointer text-sm text-gray-700">
                                        {item}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between text-[15.725px]">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="size-5" />
                                <span className="font-semibold text-gray-800">Tỉnh/Thành phố</span>
                            </div>
                            <button
                                type="button"
                                className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none"
                            >
                                <ChevronDown className="size-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="mt-4 w-full space-y-3">
                            <MultiSelectDropdown
                                onChange={handleOnChangeTeacher}
                                label="Tỉnh / Thành phố ra đề"
                                // Chuyển value từ dạng 1,2,3 sang mảng
                                values={[]}
                                options={provinces.map((item) => ({
                                    label: item,
                                    value: item,
                                }))}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex gap-4 border-t border-gray-200 pt-4">
                    <Button className="flex-1 py-5" variant={"outline"}>
                        Đặt lại
                    </Button>

                    <Button className="bg-primary flex-1 py-5 text-white">Xác nhận lọc</Button>
                </div>
            </div>
            <ExamList />
        </section>
    );
};

export default ExamPage;
