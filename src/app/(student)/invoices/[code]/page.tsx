import React from "react";
import { Badge } from "~/components/ui/badge";
import SummaryInvoice from "./_components/SummaryInvoice";
import invoiceApi from "~/apiRequest/invoices";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Chi tiết hóa đơn",
};
const InvoicePage = async ({ params }: { params: Promise<{ code: string }> }) => {
    const { code } = await params;
    console.log(code);

    let invoice;
    try {
        const { data } = await invoiceApi.getInvoiceDetail(code);
        invoice = data.data;
    } catch {
        redirect("/profile/invoices");
    }
    if (!invoice) {
        redirect("/profile/invoices");
    }
    return (
        <section className="flex min-h-screen gap-6 rounded-2xl bg-gradient-to-br p-8 max-lg:flex-col max-lg:gap-3 max-lg:pt-6">
            <div
                className="mb-8 h-fit flex-9/12 rounded-2xl bg-white p-12 shadow-sm max-lg:mb-3 max-lg:p-5"
                id="action-to-print"
            >
                <div className="mb-8">
                    <div className="flex items-center justify-between border-b-2 border-blue-100 pb-5">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-extrabold tracking-tight text-blue-800 drop-shadow-sm">
                                Hóa đơn #{code}
                            </h1>
                            <Badge variant={"warning"}>Chưa thanh toán</Badge>
                        </div>
                        <div className="mb-2 space-y-1 text-right">
                            <p className="text-sm text-slate-500">
                                Ngày tạo hóa đơn:{" "}
                                <span className="font-semibold text-slate-700">{invoice.created_at}</span>
                            </p>
                            <p className="text-sm text-slate-500">
                                Ngày đến hạn: <span className="font-semibold text-slate-700">16/10/2022</span>
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

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow">
                        <h3 className="mb-3 text-lg font-semibold text-blue-700">Hóa đơn gửi đến:</h3>
                        <div className="space-y-1 text-sm text-slate-700">
                            <p className="font-semibold text-blue-700">Phạm Hoàng Tuấn</p>
                            <p>Quảng Ngãi, Việt Nam</p>
                            <p>Mô Đức, Quảng Ngãi, 57000</p>
                            <p>Việt Nam</p>
                            <p className="pt-2">
                                Loại chú thế: <span className="font-semibold">Cá nhân</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="mb-5 text-lg font-bold text-blue-800">Các mục trong hóa đơn</h3>
                    <div className="overflow-x-auto rounded-xl border-2 border-blue-100 bg-white shadow">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b bg-slate-100">
                                    <th className="p-4 text-left font-bold text-slate-700">Mô tả</th>
                                    <th className="p-4 text-right font-bold text-slate-700">Số tiền</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                <tr className="border-b transition hover:bg-blue-50">
                                    <td className="p-4">AZ PRO 2 - subviet16.vn (16/10/2022 - 15/01/2023) *</td>
                                    <td className="p-4 text-right font-semibold">148,000 đ</td>
                                </tr>
                                <tr className="border-b transition hover:bg-blue-50">
                                    <td className="p-4">AZ PRO 2 - subviet16.vn (16/10/2022 - 15/01/2023) *</td>
                                    <td className="p-4 text-right font-semibold">148,000 đ</td>
                                </tr>
                                <tr className="border-b transition hover:bg-blue-50">
                                    <td className="p-4">AZ PRO 2 - subviet16.vn (16/10/2022 - 15/01/2023) *</td>
                                    <td className="p-4 text-right font-semibold">148,000 đ</td>
                                </tr>
                                <tr className="border-b transition hover:bg-blue-50">
                                    <td className="p-4">AZ PRO 2 - subviet16.vn (16/10/2022 - 15/01/2023) *</td>
                                    <td className="p-4 text-right font-semibold">148,000 đ</td>
                                </tr>
                                <tr className="border-b transition hover:bg-blue-50">
                                    <td className="p-4">AZ PRO 2 - subviet16.vn (16/10/2022 - 15/01/2023) *</td>
                                    <td className="p-4 text-right font-semibold">148,000 đ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <div className="w-72 rounded-xl border border-blue-100 bg-blue-50 p-5 shadow">
                            <div className="flex justify-between py-2 text-slate-700">
                                <span>Tổng phụ</span>
                                <span className="font-semibold">148,000 đ</span>
                            </div>
                            <div className="flex justify-between py-2 text-green-700">
                                <span>Tiết kiệm</span>
                                <span className="font-semibold">200,000 đ</span>
                            </div>
                            <div className="mt-2 flex justify-between border-t pt-3 text-base font-bold text-blue-800">
                                <span>Tổng cộng</span>
                                <span>162,800 đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SummaryInvoice />
        </section>
    );
};
export default InvoicePage;
