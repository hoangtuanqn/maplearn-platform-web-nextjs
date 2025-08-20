"use client";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import otherApi from "~/apiRequest/others";
import { ProvinceType } from "~/schemaValidate/other.schama";
import { useQuery } from "@tanstack/react-query";
import examApi, { difficulties } from "~/apiRequest/exam";
import subjectApi from "~/apiRequest/subject";
import { ChevronDown, GraduationCap } from "lucide-react";
import MultiSelectDropdown from "../../courses/_components/MultiSelectDropdown";
import FilterSkeleton from "./FilterSkeleton";
import Link from "next/link";
const FilterExam = () => {
    const [provinces, setProvinces] = useState<ProvinceType>([]);
    const handleOnChangeTeacher = () => {};
    const { data: examCategories, isLoading: isLoadingExamCategories } = useQuery({
        queryKey: ["exam", "categories"],
        queryFn: async () => {
            const res = await examApi.getExamCategories();
            return res.data.data;
        },
    });
    const { data: subjects, isLoading: isLoadingSubjects } = useQuery({
        queryKey: ["user", "subjects"],
        queryFn: async () => {
            const response = await subjectApi.getSubjects();
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await otherApi.getProvinces(); // gọi API
                setProvinces(res ?? []);
            } catch (err) {
                console.error("Lỗi lấy tỉnh:", err);
            }
        };

        fetchProvinces();
    }, []);
    return (
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
                        {isLoadingSubjects ? (
                            <>
                                {[...Array(6)].map((_, index) => (
                                    <FilterSkeleton key={index} />
                                ))}
                            </>
                        ) : (
                            <>
                                {subjects?.map((subject) => (
                                    <div key={subject.id} className="flex items-center gap-2">
                                        <Checkbox id={subject.name} />
                                        <Label htmlFor={subject.name} className="w-full text-sm text-gray-700">
                                            {subject.name}
                                        </Label>
                                    </div>
                                ))}
                            </>
                        )}
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
                        {isLoadingExamCategories ? (
                            <>
                                {[...Array(8)].map((_, index) => (
                                    <FilterSkeleton key={index} />
                                ))}
                            </>
                        ) : (
                            <>
                                {examCategories?.map((category) => (
                                    <div key={category.id} className="flex items-center gap-2">
                                        <Checkbox id={category.name} />
                                        <Label htmlFor={category.name} className="w-full text-sm text-gray-700">
                                            {category.name}
                                        </Label>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-[15.725px]">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="size-5" />
                            <span className="font-semibold text-gray-800">Độ khó</span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none"
                        >
                            <ChevronDown className="size-5 text-gray-500" />
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        {difficulties.map((difficulty) => (
                            <div key={difficulty.id} className="flex items-center gap-2">
                                <Checkbox id={difficulty.slug} />
                                <Label htmlFor={difficulty.slug} className="w-full text-sm text-gray-700">
                                    {difficulty.name}
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
                                label: item.name,
                                value: item.province_code,
                            }))}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5 flex gap-2 border-t border-gray-200 pt-4">
                <Link href="/exams">
                    <Button className="flex-1 py-4" variant={"outline"}>
                        Đặt lại
                    </Button>
                </Link>

                <Button className="bg-primary flex-1 py-4 text-white">Xác nhận lọc</Button>
            </div>
        </div>
    );
};

export default FilterExam;
