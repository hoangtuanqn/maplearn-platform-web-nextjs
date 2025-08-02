import React, { Suspense } from "react";
import SelectObject from "../documents/_components/SelectObject";
import SelectCourse from "../documents/_components/SelectCourse";

import SearchDocument from "../documents/_components/SearchDocument";
import Skeleton from "react-loading-skeleton";
import { FilterDocuments } from "../documents/_components/FilterDocuments";
import { Metadata } from "next";
import SelectCategory from "./_components/SelectCategory";
import CourseList from "./_components/CourseList";
export const metadata: Metadata = {
    title: "Tất cả khóa học",
};
const CoursePage = () => {
    return (
        <div className="flex min-h-screen gap-2 rounded-xl bg-white shadow-sm max-lg:flex-col">
            <SelectCategory url="/courses" />

            <div className="rounded-xl bg-white px-5 py-8 w-full">
                <h1 className="text-primary text-xl font-bold uppercase">Khóa học</h1>
                <SelectObject url="/courses" />
                <div className="flex w-full flex-col items-end lg:flex-row">
                    <SelectCourse url="/courses" />
                    <div className="flex w-full flex-1 gap-2 max-lg:mt-6 lg:min-w-[400px]">
                        <Suspense fallback={<Skeleton height={44} className="!w-full !rounded-xl" />}>
                            <SearchDocument url="/courses" />
                        </Suspense>
                        <FilterDocuments />
                    </div>
                </div>
              
                    <CourseList />
             
            </div>
        </div>
    );
};

export default CoursePage;
