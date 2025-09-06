import React from "react";
import { Metadata } from "next";
import FormEditCourse from "./_components/FormEditCourse";
export const metadata: Metadata = {
    title: "Thêm khóa học mới",
};
const EditCoursePage = () => {
    return (
        <>
            <div className="mt-6 flex gap-5">
                <div className="flex-1 rounded-lg bg-white p-6 pb-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold">Thêm khóa học</h3>
                            <p className="mb-4 text-sm text-slate-500">Thêm thông tin khóa học tại đây.</p>
                        </div>
                    </div>
                    {/* <FormEditCourse /> */}
                </div>
            </div>
        </>
    );
};

export default EditCoursePage;
