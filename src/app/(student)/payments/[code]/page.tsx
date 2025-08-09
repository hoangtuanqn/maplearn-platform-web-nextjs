import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { formatter } from "~/libs/format";
import Link from "next/link";
import Image from "next/image";

import PusherNotification from "../../_components/PusherNotification";
import InfoUser from "./_components/InfoUser";
import { getStatusBadge } from "~/libs/statusBadge";
import paymentApiServer from "~/apiRequest/server/payment";
import SummaryPayment from "./_components/SummaryPayment";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
    const { code } = await params;
    return {
        title: `Hóa đơn tổng hợp #${code}`,
    };
}
const InvoicePage = async ({ params }: { params: Promise<{ code: string }> }) => {
    const { code } = await params;

    let payments;
    try {
        const res = await paymentApiServer.getPaymentDetail(code);
        payments = res.data.data;
    } catch {
        redirect("/profile/invoices");
    }

    if (!payments) {
        redirect("/profile/invoices");
    }
    const totalPrice = payments.invoices.reduce((total, invoice) => total + invoice.total_price, 0);
    return (
        <section className="flex min-h-screen gap-6 rounded-2xl bg-gradient-to-br p-8 max-lg:flex-col max-lg:gap-3 max-lg:pt-6">
            <div
                className="mb-8 h-fit flex-9/12 rounded-2xl bg-white p-12 shadow-sm max-lg:mb-3 max-lg:p-5"
                id="action-to-print"
            >
                <PusherNotification />
                <div className="mb-8">
                    <div className="flex items-center justify-between border-b-2 border-blue-100 pb-5">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-extrabold">Hóa đơn tổng hợp #{code}</h1>
                                {getStatusBadge("invoice", payments.status)}
                            </div>
                        </div>
                        <div className="mb-2 space-y-1 text-right">
                            <p className="text-sm text-slate-500">
                                Ngày tạo hóa đơn:{" "}
                                <span className="font-semibold text-slate-700">
                                    {formatter.date(payments.created_at)}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-8 grid grid-cols-2 gap-8 max-lg:grid-cols-1">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow">
                        <h3 className="mb-3 text-lg font-semibold text-blue-700">Thanh toán cho:</h3>
                        <div className="space-y-1 text-sm text-slate-700">
                            <p className="font-medium">Công ty cổ phần MapLearn</p>
                            <p>Địa chỉ: Quận Thủ Đức, TP HCM.</p>
                            <p>
                                Hotline thanh toán/kế toán:{" "}
                                <a href="tel:0812665001" className="text-primary">
                                    0812.665.001
                                </a>
                            </p>
                            <p>
                                Email:{" "}
                                <a className="text-primary" href="mailto:maplearn@fpt.edu.vn">
                                    maplearn@fpt.edu.vn
                                </a>
                            </p>
                            <p className="pt-2">
                                Khiếu nại/Góp ý: <span className="font-semibold text-blue-700">0812.665.001</span>
                            </p>
                            <p>
                                Mã Số Thuế: <span className="font-semibold">0313755538</span>
                            </p>
                        </div>
                    </div>

                    <InfoUser />
                </div>

                <div className="mb-8">
                    <h3 className="mb-5 text-lg font-semibold">Các mục trong hóa đơn</h3>
                    <div className="overflow-x-auto rounded-xl border-2 border-blue-100 bg-white shadow">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b bg-slate-100">
                                    <th className="p-4 text-left font-bold text-slate-700">Mô tả</th>
                                    <th className="p-4 text-right font-bold text-slate-700">Số tiền</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {payments.invoices.map((invoice) => (
                                    <React.Fragment key={invoice.id}>
                                        <tr className="bg-blue-50">
                                            <td colSpan={2} className="p-4 font-semibold">
                                                <span className="mr-2 inline-block">
                                                    Hóa đơn{" "}
                                                    <Link
                                                        className="text-primary"
                                                        href={`/invoices/${invoice.transaction_code}`}
                                                    >
                                                        #{invoice.transaction_code}
                                                    </Link>
                                                </span>
                                                {getStatusBadge("invoice", invoice.status)}
                                            </td>
                                        </tr>
                                        {invoice.items.map((item) => (
                                            <tr key={item.id} className="border-b transition hover:bg-blue-50">
                                                <td className="flex items-center gap-2 p-4">
                                                    <Image
                                                        src={item.course.thumbnail}
                                                        alt={item.course.name}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-md"
                                                    />
                                                    <Link
                                                        href={`/courses/${item.course.slug}`}
                                                        className="text-primary font-bold"
                                                    >
                                                        {item.course.name}
                                                    </Link>
                                                </td>
                                                <td className="p-4 text-right font-semibold">
                                                    {formatter.number(item.course.final_price)} đ
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <div className="w-72 rounded-xl border border-blue-100 bg-blue-50 p-5 shadow">
                            <div className="flex justify-between py-2 text-slate-700">
                                <span>Tổng phụ</span>
                                <span className="font-semibold">{formatter.number(totalPrice)} đ</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span>VAT: </span>
                                <span className="font-semibold">0 đ</span>
                            </div>
                            <div className="mt-2 flex justify-between border-t pt-3 text-base font-bold text-blue-800">
                                <span>Tổng cộng</span>
                                <span>{formatter.number(totalPrice)} đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SummaryPayment payments={payments} />
        </section>
    );
};
export default InvoicePage;
