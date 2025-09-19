import React from "react";

import { Metadata } from "next";
import TeacherList from "./_components/TeacherList";

export const metadata: Metadata = {
    title: "Danh sách giáo viên",
};
const StudentPage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-primary text-xl font-bold">Danh sách giáo viên</h3>
                        <p className="text-sm text-slate-500">Danh sách giáo viên sẽ được hiển thị ở đây.</p>
                    </div>
                </div>
                <TeacherList />
            </div>
        </section>
    );
};

export default StudentPage;
