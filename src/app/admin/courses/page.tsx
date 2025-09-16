import React, { Suspense } from "react";
import { Metadata } from "next";
import CourseList from "./_components/CourseList";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Danh sách các khóa học",
};
const CoursePage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            <div className="item-center mt-5 flex justify-end">
                <Link href="/admin/courses/create">
                    <Button variant="primary">Thêm khóa học</Button>
                </Link>
            </div>
           
            <Suspense>
                <CourseList />
            </Suspense>
        </section>
    );
};

export default CoursePage;
