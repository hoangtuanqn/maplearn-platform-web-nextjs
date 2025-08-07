import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Badge } from "~/components/ui/badge";

import invoiceApiServer from "~/apiRequest/server/invoice";
import { formatter } from "~/libs/format";
import Link from "next/link";
import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import ActionPrint from "./_components/ActionPrint";

import Pusher from "pusher-js";
import PusherNotification from "../../_components/PusherNotification";
import InfoUser from "./_components/InfoUser";
import { Info } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
    const { code } = await params;
    return {
        title: `Hóa đơn #${code}`,
    };
}
const InvoicePage = async ({ params }: { params: Promise<{ code: string }> }) => {
    const { code } = await params;

    let invoice;
    try {
        const res = await invoiceApiServer.getInvoiceDetail(code);
        invoice = res.data.data;
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
                <PusherNotification />
                <div className="mb-8">
                    <div className="flex items-center justify-between border-b-2 border-blue-100 pb-5">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-extrabold">Hóa đơn #{code}</h1>
                            {invoice.status === "paid" ? (
                                <Badge variant={"success"}>Đã thanh toán</Badge>
                            ) : invoice.status === "failed" ? (
                                <Badge variant={"danger"}>Đã hủy hóa đơn</Badge>
                            ) : invoice.status === "expired" ? (
                                <Badge variant={"danger"}>Đã hết hạn</Badge>
                            ) : (
                                <Badge variant={"warning"}>Chưa thanh toán</Badge>
                            )}
                        </div>
                        <div className="mb-2 space-y-1 text-right">
                            <p className="text-sm text-slate-500">
                                Ngày tạo hóa đơn:{" "}
                                <span className="font-semibold text-slate-700">{formatter.date(new Date())}</span>
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
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <div className="w-72 rounded-xl border border-blue-100 bg-blue-50 p-5 shadow">
                            <div className="flex justify-between py-2 text-slate-700">
                                <span>Tổng phụ</span>
                                <span className="font-semibold">{formatter.number(invoice.total_price)} đ</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span>VAT: </span>
                                <span className="font-semibold">0 đ</span>
                            </div>
                            <div className="mt-2 flex justify-between border-t pt-3 text-base font-bold text-blue-800">
                                <span>Tổng cộng</span>
                                <span>{formatter.number(invoice.total_price)} đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-fit flex-3/12 shrink-0">
                <div className="h-fit flex-3/12 shrink-0 rounded-xl border border-slate-100 bg-white p-8 shadow-xs">
                    <div>
                        <h2 className="mb-2 text-lg font-semibold text-slate-700">Số tiền phải thanh toán</h2>
                        <p className="text-primary mt-2 text-4xl font-extrabold tracking-wide drop-shadow-sm">
                            {invoice.status == "pending" ? formatter.number(invoice.total_price) : 0} đ
                        </p>
                        {invoice.status == "pending" && (
                            <>
                                <Select>
                                    <SelectTrigger className="focus:ring-primary/30 my-5 w-full rounded-lg border-slate-200 shadow-sm focus:ring-2">
                                        <SelectValue placeholder="Hình thức thanh toán" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="transfer">Chuyển khoản ngân hàng</SelectItem>
                                            <SelectItem value="vnpay">VNPay</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <div className="mt-4 flex flex-col items-center gap-4">
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <Image
                                            src={`https://qr.sepay.vn/img?bank=MBBank&acc=259876543210&template=qronly&amount=${invoice.total_price}&des=${code}`}
                                            width={220}
                                            height={220}
                                            alt="QR Code"
                                            className="rounded-lg"
                                        />
                                    </div>

                                    <div className="flex w-full flex-col gap-1 rounded-lg border border-slate-100 bg-slate-50 p-4 text-base">
                                        <span className="font-medium text-slate-600">
                                            Ngân hàng: <span className="font-semibold text-slate-800">MBBank</span>
                                        </span>
                                        <span className="font-medium text-slate-600">
                                            Số tài khoản:{" "}
                                            <span className="font-semibold text-slate-800">259876543210</span>
                                        </span>
                                        <span className="font-medium text-slate-600">
                                            Chủ tài khoản:{" "}
                                            <span className="font-semibold text-slate-800">Phạm Hoàng Tuấn</span>
                                        </span>
                                        <span className="font-medium text-slate-600">
                                            Chi nhánh: <span className="font-semibold text-slate-800">Quảng Ngãi</span>
                                        </span>
                                    </div>
                                    <div className="mt-2 flex w-full items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-2">
                                        <Info className="h-5 w-5 flex-shrink-0 text-amber-400" />
                                        <span className="text-sm font-medium text-amber-500">
                                            Hệ thống tự động xác nhận sau khi quý khách thanh toán thành công.
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <ActionPrint />
            </div>
        </section>
    );
};
export default InvoicePage;
