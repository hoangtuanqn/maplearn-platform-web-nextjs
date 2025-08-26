import React from "react";

import { Button } from "~/components/ui/button";

import { Metadata } from "next";
import FormEditStudent from "./_components/FormEditStudent";
export const metadata: Metadata = {
    title: "Danh sách học sinh",
};
const EditStudentPage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            <div className="item-center mt-5 flex justify-end">
                <Button variant={"black"}>Chỉnh sửa thông tin học sinh</Button>
            </div>
            <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
                <h3 className="text-xl font-bold">Chỉnh sửa thông tin học sinh</h3>
                <p className="text-sm text-slate-500">Danh sách học sinh sẽ được hiển thị ở đây.</p>
                <FormEditStudent />
            </div>
        </section>
    );
};

export default EditStudentPage;
