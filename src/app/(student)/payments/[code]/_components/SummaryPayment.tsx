"use client";
import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Info, Printer } from "lucide-react";
import { Button } from "~/components/ui/button";
import { formatter } from "~/libs/format";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import invoiceApi from "~/apiRequest/invoices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { notificationErrorApi } from "~/libs/apis/http";
import Loading from "~/app/(student)/_components/Loading";
import { PaymentDetail } from "~/schemaValidate/payment.schema";

const SummaryPayment = ({ payments }: { payments: PaymentDetail }) => {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<string>(payments.payment_method);
    const paymentMutation = useMutation({
        mutationFn: async (method: string) => {
            const res = await invoiceApi.createInvoice(method, payments.transaction_code, "payment");
            return res.data.data;
            // Handle other payment methods if needed
        },
        onSuccess: (data, method: string) => {
            toast.success(`Đang chuyển hướng đến ${method.toUpperCase()}...`);
            router.push(data.url_payment);
        },
        onError: notificationErrorApi,
    });

    const handlePayment = () => {
        if (["momo", "vnpay", "zalopay"].includes(paymentMethod)) {
            paymentMutation.mutate(paymentMethod);
        } else {
            toast.error("Chức năng này chưa được hỗ trợ.");
        }
    };
    const totalPrice = payments.invoices.reduce((total, invoice) => total + invoice.total_price, 0);

    return (
        <>
            {paymentMutation.isPending && <Loading />}
            <div className="h-fit flex-3/12 shrink-0">
                <div className="h-fit flex-3/12 shrink-0 rounded-xl border border-slate-100 bg-white p-8 shadow-xs">
                    <div>
                        <h2 className="mb-2 text-lg font-semibold text-slate-700">Số tiền phải thanh toán</h2>
                        <p className="text-primary mt-2 text-4xl font-extrabold tracking-wide drop-shadow-sm">
                            {payments.status == "pending" ? formatter.number(totalPrice) : 0} đ
                        </p>
                        {payments.status == "pending" && (
                            <>
                                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <SelectTrigger className="focus:ring-primary/30 mt-5 w-full rounded-lg border-slate-200 shadow-sm focus:ring-2">
                                        <SelectValue placeholder="Chọn phương thức thanh toán" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="transfer">Chuyển khoản ngân hàng</SelectItem>
                                            <SelectItem value="vnpay">Ví VNPay</SelectItem>
                                            <SelectItem value="momo">Ví MOMO</SelectItem>
                                            <SelectItem value="zalopay">Ví ZaloPay</SelectItem>
                                            <SelectItem value="card">Thanh toán thẻ cào</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <p className="mt-2 text-center text-xs font-semibold text-slate-400">
                                    Dễ dàng thay đổi phương thức thanh toán
                                </p>
                                <div className="mt-4 flex flex-col items-center gap-4">
                                    {["zalopay", "momo", "vnpay"].includes(paymentMethod) && (
                                        <Button className="text-white" onClick={handlePayment}>
                                            Đi đến {paymentMethod.toUpperCase()}
                                        </Button>
                                    )}

                                    {paymentMethod === "transfer" && (
                                        <>
                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <Image
                                                    src={`https://qr.sepay.vn/img?bank=MBBank&acc=259876543210&template=qronly&amount=${totalPrice}&des=${payments.transaction_code}`}
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
                        {["pending", "paid"].includes(payments.status) && (
                            <Button className="text-primary gap-2" onClick={() => window?.print()} variant={"outline"}>
                                <Printer className="h-5 w-5" /> <span>In hóa đơn</span>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SummaryPayment;
