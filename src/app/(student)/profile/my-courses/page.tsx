import React from "react";
import { Metadata } from "next";
import CourseList from "./_components/CourseList";
export const metadata: Metadata = {
    title: "Khóa học của tôi",
};

const MyCoursesPage = () => {
    return (
        <>
            <h3 className="block-heading mb-6">Khóa học của tôi</h3>
            <div className="flex flex-col gap-4 font-medium">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                    <CourseList />
                </div>
            </div>
        </>
    );
};

export default MyCoursesPage;
