"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
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
import { notificationErrorApi } from "~/libs/apis/http";
import { useAuth } from "~/hooks/useAuth";
import MethodPayment from "../../../../_components/MethodPayment";
import paymentApi from "~/apiRequest/payment";

export function PaymentMethodsDialog() {
    const [paymentMethod, setPaymentMethod] = useState<string>("transfer");
    const router = useRouter();
    const { user, updateProfile } = useAuth();
    const mutation = useMutation({
        mutationFn: async (paymentMethod: string) => {
            console.log(paymentMethod);

            const res = await paymentApi.createPayment(1, paymentMethod);
            return res.data.data;
        },
        onSuccess: (data) => {
            toast.success("Tạo hóa đơn thành công! Vui lòng chờ 1 xíu ....");

            switch (data.payment_method) {
                case "transfer":
                    router.push(`/payments/${data.transaction_code}`);
                    break;
                case "vnpay":
                case "momo":
                case "zalopay":
                    router.push(data.url_payment || "");
                    break;
                default:
                    router.push(`/profile/payments`);
            }
        },
        onError: notificationErrorApi,
    });

    return (
        <>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button className="text-primary mt-2 w-full" variant={"outline"}>
                            <span>Mua ngay</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white sm:max-w-[600px]">
                        {mutation.isPending && <Loading />}
                        <DialogHeader>
                            <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
                            <DialogDescription>Vui lòng chọn phương thức thanh toán phù hợp với bạn.</DialogDescription>
                        </DialogHeader>
                        <div className="mt-2 grid gap-4">
                            <div className="grid gap-4">
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
                                disabled={mutation.isPending}
                                onClick={() => mutation.mutate(paymentMethod)}
                            >
                                Xác nhận
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}
