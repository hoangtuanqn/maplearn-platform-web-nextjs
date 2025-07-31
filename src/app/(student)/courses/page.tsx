import React, { Suspense } from "react";
import SelectObject from "../documents/_components/SelectObject";
import SelectCourse from "../documents/_components/SelectCourse";
import DisplayCourse from "../_components/Courses/DisplayCourse";
import SearchDocument from "../documents/_components/SearchDocument";
import Skeleton from "react-loading-skeleton";
import { FilterDocuments } from "../documents/_components/FilterDocuments";
import SelectCategory from "./_components/SelectCategory";
import { Metadata } from "next";
const courses = [
    {
        id: 1,
        title: "KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN VẬT LÝ NĂM 2026",
        teacher: "Thầy Phạm Hoàng Tuấn",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5iqo800qho/khoa-i---chuyen-de-co-ban-mon-vat-ly-nam-2026-1731491263660.jpg",
        url: "/khoa-hoc/lap-trinh-tu-duy-tu-truong-va-hat-nhan",
    },
    {
        id: 2,
        title: "KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN VẬT LÝ NĂM 2026",
        teacher: "Thầy Phạm Hoàng Tuấn",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5iqo800qho/khoa-i---chuyen-de-co-ban-mon-vat-ly-nam-2026-1731491263660.jpg",
        url: "/khoa-hoc/lap-trinh-tu-duy-tu-truong-va-hat-nhan",
    },
    {
        id: 3,
        title: "KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN VẬT LÝ NĂM 2026",
        teacher: "Thầy Phạm Hoàng Tuấn",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5iqo800qho/khoa-i---chuyen-de-co-ban-mon-vat-ly-nam-2026-1731491263660.jpg",
        url: "/khoa-hoc/lap-trinh-tu-duy-tu-truong-va-hat-nhan",
    },
    {
        id: 4,
        title: "KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN VẬT LÝ NĂM 2026",
        teacher: "Thầy Phạm Hoàng Tuấn",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5iqo800qho/khoa-i---chuyen-de-co-ban-mon-vat-ly-nam-2026-1731491263660.jpg",
        url: "/khoa-hoc/lap-trinh-tu-duy-tu-truong-va-hat-nhan",
    },
    {
        id: 5,
        title: "KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN VẬT LÝ NĂM 2026",
        teacher: "Thầy Phạm Hoàng Tuấn",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5iqo800qho/khoa-i---chuyen-de-co-ban-mon-vat-ly-nam-2026-1731491263660.jpg",
        url: "/khoa-hoc/lap-trinh-tu-duy-tu-truong-va-hat-nhan",
    },
    {
        id: 6,
        title: "KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN VẬT LÝ NĂM 2026",
        teacher: "Thầy Phạm Hoàng Tuấn",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5iqo800qho/khoa-i---chuyen-de-co-ban-mon-vat-ly-nam-2026-1731491263660.jpg",
        url: "/khoa-hoc/lap-trinh-tu-duy-tu-truong-va-hat-nhan",
    },
    {
        id: 7,
        title: "KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN VẬT LÝ NĂM 2026",
        teacher: "Thầy Phạm Hoàng Tuấn",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5iqo800qho/khoa-i---chuyen-de-co-ban-mon-vat-ly-nam-2026-1731491263660.jpg",
        url: "/khoa-hoc/lap-trinh-tu-duy-tu-truong-va-hat-nhan",
    },

    {
        id: 8,
        title: "KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN VẬT LÝ NĂM 2026",
        teacher: "Thầy Phạm Hoàng Tuấn",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5iqo800qho/khoa-i---chuyen-de-co-ban-mon-vat-ly-nam-2026-1731491263660.jpg",
        url: "/khoa-hoc/lap-trinh-tu-duy-tu-truong-va-hat-nhan",
    },
    {
        id: 9,
        title: "KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN VẬT LÝ NĂM 2026",
        teacher: "Thầy Phạm Hoàng Tuấn",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5iqo800qho/khoa-i---chuyen-de-co-ban-mon-vat-ly-nam-2026-1731491263660.jpg",
        url: "/khoa-hoc/lap-trinh-tu-duy-tu-truong-va-hat-nhan",
    },
];
export const metadata: Metadata = {
    title: "Tất cả khóa học",
};
const CoursePage = () => {
    return (
        <div className="flex min-h-screen gap-2 rounded-xl bg-white max-lg:flex-col">
            <div className="w-full shrink-0 p-5 lg:w-[350px]">
                <h2 className="text-primary text-base font-semibold">Danh mục</h2>
                <div className="mt-4 flex flex-col gap-3.5">
                    <SelectCategory url="/courses" />
                </div>
            </div>
            <div className="rounded-xl bg-white p-5">
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
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-5">
                    {courses.map((course) => (
                        <DisplayCourse
                            key={course.id}
                            thumbnail={course.thumbnail}
                            title={course.title}
                            teacher={course.teacher}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
