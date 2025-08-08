"use client";
import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Ban, Info, Printer } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Invoice } from "~/schemaValidate/invoice.schema";
import { formatter } from "~/libs/format";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import invoiceApi from "~/apiRequest/invoices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { notificationErrorApi } from "~/libs/apis/http";
import Loading from "~/app/(student)/_components/Loading";
import { DangerConfirm } from "~/components/DangerConfirm";
const SummaryInvoice = ({ invoice }: { invoice: Invoice }) => {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState(invoice.payment_method);
    const paymentMutation = useMutation({
        mutationFn: async () => {
            const res = await invoiceApi.createInvoiceVNPay(invoice.transaction_code);
            return res.data.data;
            // Handle other payment methods if needed
        },
        onSuccess: (data) => {
            toast.success("Đang chuyển hướng đến VNPAY...");
            router.push(data.url_vnpay);
        },
        onError: notificationErrorApi,
    });
    const cancelMutation = useMutation({
        mutationFn: async () => {
            await invoiceApi.cancelInvoice(invoice.transaction_code);
        },
        onSuccess: () => {
            toast.success("Hóa đơn đã được hủy.");
            router.push("/profile/invoices");
        },
        onError: notificationErrorApi,
    });
    const handlePayment = () => {
        if (paymentMethod === "vnpay") {
            paymentMutation.mutate();
        } else {
            toast.error("Chức năng này chưa được hỗ trợ.");
        }
    };

    return (
        <>
            {(paymentMutation.isPending || cancelMutation.isPending) && <Loading />}
            <div className="h-fit flex-3/12 shrink-0">
                <div className="h-fit flex-3/12 shrink-0 rounded-xl border border-slate-100 bg-white p-8 shadow-xs">
                    <div>
                        <h2 className="mb-2 text-lg font-semibold text-slate-700">Số tiền phải thanh toán</h2>
                        <p className="text-primary mt-2 text-4xl font-extrabold tracking-wide drop-shadow-sm">
                            {invoice.status == "pending" ? formatter.number(invoice.total_price) : 0} đ
                        </p>
                        {invoice.status == "pending" && (
                            <>
                                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <SelectTrigger className="focus:ring-primary/30 my-5 w-full rounded-lg border-slate-200 shadow-sm focus:ring-2">
                                        <SelectValue placeholder="Chọn phương thức thanh toán" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="transfer">Chuyển khoản ngân hàng</SelectItem>
                                            <SelectItem value="vnpay">Ví VNPAY</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <div className="mt-4 flex flex-col items-center gap-4">
                                    {paymentMethod === "vnpay" && (
                                        <Button className="text-white" onClick={handlePayment}>
                                            Đi đến VNPAY
                                        </Button>
                                    )}
                                    {paymentMethod === "transfer" && (
                                        <>
                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <Image
                                                    src={`https://qr.sepay.vn/img?bank=MBBank&acc=259876543210&template=qronly&amount=${invoice.total_price}&des=${invoice.transaction_code}`}
                                                    width={220}
                                                    height={220}
                                                    alt="QR Code"
                                                    className="rounded-lg"
                                                />
                                            </div>

                                            <div className="flex w-full flex-col gap-1 rounded-lg border border-slate-100 bg-slate-50 p-4 text-base">
                                                <span className="font-medium text-slate-600">
                                                    Ngân hàng:{" "}
                                                    <span className="font-semibold text-slate-800">MBBank</span>
                                                </span>
                                                <span className="font-medium text-slate-600">
                                                    Số tài khoản:{" "}
                                                    <span className="font-semibold text-slate-800">259876543210</span>
                                                </span>
                                                <span className="font-medium text-slate-600">
                                                    Chủ tài khoản:{" "}
                                                    <span className="font-semibold text-slate-800">
                                                        Phạm Hoàng Tuấn
                                                    </span>
                                                </span>
                                                <span className="font-medium text-slate-600">
                                                    Chi nhánh:{" "}
                                                    <span className="font-semibold text-slate-800">Quảng Ngãi</span>
                                                </span>
                                            </div>
                                            <div className="mt-2 flex w-full items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-2">
                                                <Info className="h-5 w-5 flex-shrink-0 text-amber-400" />
                                                <span className="text-sm font-medium text-amber-500">
                                                    Hệ thống tự động xác nhận sau khi quý khách thanh toán thành công.
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-6 px-2">
                    <p className="mb-2 text-base font-bold text-slate-700">Thao tác</p>
                    <div className="flex items-center gap-1">
                        {["pending", "paid"].includes(invoice.status) && (
                            <Button className="text-primary gap-2" onClick={() => window?.print()} variant={"outline"}>
                                <Printer className="h-5 w-5" /> <span>In hóa đơn</span>
                            </Button>
                        )}
                        {invoice.status === "pending" && (
                            <DangerConfirm
                                message="Bạn có chắc chắn muốn hủy hóa đơn này không?"
                                action={() => cancelMutation.mutate()}
                            >
                                <Button
                                    className="ml-2 gap-2 border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    variant="outline"
                                >
                                    <Ban /> <span>Hủy hóa đơn</span>
                                </Button>
                            </DangerConfirm>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SummaryInvoice;
