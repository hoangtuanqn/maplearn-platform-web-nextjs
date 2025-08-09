"use client";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import Loading from "~/app/(student)/_components/Loading";
import { Invoice } from "~/schemaValidate/invoice.schema";
import { notificationErrorApi } from "~/libs/apis/http";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import paymentApi from "~/apiRequest/payment";
import MethodPayment from "~/app/(student)/_components/MethodPayment";
const ActionPayment = ({ invoices, selected }: { invoices: Invoice[]; selected: number[] }) => {
    const [paymentMethod, setPaymentMethod] = useState("transfer");
    const router = useRouter();
    const paymentMutation = useMutation({
        mutationFn: async (invoiceIds: number[]) => {
            const res = await paymentApi.createPayment(invoiceIds, paymentMethod);
            return res.data.data;
        },
        onSuccess: (data) => {
            switch (data.payment_method) {
                case "vnpay":
                case "momo":
                case "zalopay":
                    toast.success("Đã tạo hóa đơn tổng hợp thành công. Vui lòng chờ ....");
                    router.push(data?.url_payment || `/payments/${data.transaction_code}`);
                    break;
                case "transfer":
                    toast.success("Đã tạo hóa đơn tổng hợp thành công. Vui lòng chờ ....");
                    router.push(`/payments/${data.transaction_code}`);
                    break;
                default:
                    toast.error("Thao tác củ bạn không hợp lệ.");
            }
        },
        onError: notificationErrorApi,
    });
    return (
        <>
            {paymentMutation.isPending && <Loading />}
            {selected.length == 1 ? (
                // Nếu chọn 1 cái thì chuyển thẳng đến phần hóa đơn của cái đó luôn
                <Button
                    className=""
                    variant="outline"
                    onClick={() =>
                        router.push(`/invoices/${invoices.filter((inv) => inv.id === selected[0])[0].transaction_code}`)
                    }
                >
                    Thanh toán ({selected.length})
                </Button>
            ) : (
                // TH chọn nhiều cái
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button className="text-xs" variant="outline" disabled={selected.length === 0}>
                                Thanh toán ({selected.length})
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white sm:max-w-[600px]">
                            {/* {mutation.isPending && <Loading />} */}
                            <DialogHeader>
                                <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
                                <DialogDescription>
                                    Vui lòng chọn phương thức thanh toán phù hợp với bạn.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <MethodPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Đóng</Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    className="text-white"
                                    disabled={paymentMutation.isPending}
                                    onClick={() => paymentMutation.mutate(selected)}
                                >
                                    Xác nhận
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            )}
        </>
    );
};

export default ActionPayment;
