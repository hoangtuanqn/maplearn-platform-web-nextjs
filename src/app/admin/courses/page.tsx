import React from "react";
import { Metadata } from "next";
import CourseList from "./_components/CourseList";
export const metadata: Metadata = {
    title: "Danh sách các khóa học",
};
const CoursePage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            <div className="item-center mt-5 flex justify-end"></div>
            <CourseList />
        </section>
    );
};

export default CoursePage;
