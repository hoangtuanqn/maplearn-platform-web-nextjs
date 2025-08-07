"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import cartApi from "~/apiRequest/cart";
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { CheckoutResponse } from "~/schemaValidate/cart.schema";
import Loading from "../../_components/Loading";
import { notificationErrorApi } from "~/libs/apis/http";
import { useAuth } from "~/hooks/useAuth";

export function PaymentMethodsDialog() {
    const [paymentMethod, setPaymentMethod] = useState<string>("transfer");
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: async (paymentMethod: string) => {
            const res = await cartApi.checkout({ payment_method: paymentMethod });
            return res.data;
        },
        onSuccess: (data: CheckoutResponse) => {
            switch (data.data.payment_method) {
                case "transfer":
                    toast.success("Tạo hóa đơn thành công! Vui lòng thanh toán.");
                    router.push(`/carts/invoice/${data.data.id}`);
                    break;
                case "vnpay":
                    router.push(data.data.url_vnpay || "");
                    break;
            }
        },
        onError: notificationErrorApi,
    });
    const { user } = useAuth();
    return (
        <>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button className="mt-5 w-full text-white max-lg:mt-3" disabled={user?.cart_item_count === 0}>
                            Thanh toán ngay
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white sm:max-w-[600px]">
                        {mutation.isPending && <Loading />}
                        <DialogHeader>
                            <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
                            <DialogDescription>Vui long chọn phương thức thanh toán phù hợp với bạn.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn phương thức thanh toán" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="transfer">Chuyển khoản ngân hàng</SelectItem>
                                            <SelectItem value="momo">Ví MOMO</SelectItem>
                                            <SelectItem value="vnpay">Ví VNPAY</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Đóng</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="text-white"
                                disabled={mutation.isPending || user?.cart_item_count === 0}
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
