import React, { Suspense } from "react";
import { Metadata } from "next";

import ListCourseFavorite from "./_components/ListCourseFavorite";
import Loading from "../../_components/Loading";
export const metadata: Metadata = {
    title: "Khóa học yêu thích",
};
const MyCoursesPage = () => {
    return (
        <>
            <h3 className="block-heading mb-6">Khóa học yêu thích</h3>
            <div className="flex flex-col gap-4 font-medium">
                <Suspense fallback={<Loading />}>
                    <ListCourseFavorite />
                </Suspense>
            </div>
        </>
    );
};

export default MyCoursesPage;
