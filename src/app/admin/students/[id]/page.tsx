import React from "react";

import { Metadata } from "next";
import FormEditStudent from "./_components/FormEditStudent";
import HistoryActivities from "./_components/HistoryActivities";
import { redirect } from "next/navigation";
import studentApiServer from "~/apiRequest/server/admin/student";
export const metadata: Metadata = {
    title: "Chỉnh sửa người dùng",
};
const EditStudentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    let student;
    try {
        const res = await studentApiServer.getDetailStudent(id);
        student = res.data.data;
    } catch {
        redirect("/admin/students");
    }
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            {/* <div className="item-center mt-5 flex justify-end">
                <Button variant={"black"}>Chỉnh sửa thông tin học sinh</Button>
            </div> */}
            <div className="mt-8">
                <FormEditStudent studentData={student} />
            </div>
            <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
                <h3 className="text-xl font-bold">Lịch sử hoạt động</h3>
                <p className="text-sm text-slate-500">Lịch sử hoạt động của học sinh này.</p>
                <HistoryActivities />
            </div>
        </section>
    );
};

export default EditStudentPage;
