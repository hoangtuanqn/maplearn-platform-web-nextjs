import React, { Suspense } from "react";
import { Metadata } from "next";
import PaymentList from "./_components/PaymentList";
import StatsPayment from "./_components/StatsPayment";
import Breadcrumb from "../_components/Breadcrumb";

export const metadata: Metadata = {
    title: "Danh sách hóa đơn",
};
const breadcrumbData = [
    { label: "Dashboard", href: "/admin" },
    { label: "Thanh toán", href: "/admin/payments" },
];
const ExamPage = () => {
    return (
        <section className="mt-3 bg-[#F5F5F5] md:mt-5">
            <div className="mb-4 flex flex-col gap-3 md:mb-6 md:gap-5">
                <Breadcrumb breadcrumbData={breadcrumbData} />
            </div>
            {/* Thống kê */}
            <Suspense>
                <StatsPayment />
            </Suspense>
            <div className="mt-3 rounded-lg bg-white p-3 pb-6 shadow-sm md:p-4 md:pb-8">
                <div className="flex items-start justify-between md:items-center">
                    <div className="flex w-full items-start justify-between md:items-center">
                        <div>
                            <h3 className="text-primary text-lg font-bold md:text-xl">Hóa đơn đã thanh toán</h3>
                            <p className="mt-1 text-xs text-slate-500 md:text-sm">
                                Quản lý và theo dõi các hóa đơn trong hệ thống.
                            </p>
                        </div>
                    </div>
                </div>

                <Suspense>
                    <PaymentList />
                </Suspense>
            </div>
        </section>
    );
};

export default ExamPage;
