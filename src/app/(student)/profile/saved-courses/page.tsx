import React from "react";
import { Metadata } from "next";

import ListCourseFavorite from "./_components/ListCourseFavorite";
export const metadata: Metadata = {
    title: "Khóa học đã lưu",
};
const MyCoursesPage = () => {
    return (
        <>
            <h3 className="block-heading mb-6">Khóa học đã lưu</h3>
            <div className="flex flex-col gap-4 font-medium">
                <ListCourseFavorite />
            </div>
        </>
    );
};

export default MyCoursesPage;
