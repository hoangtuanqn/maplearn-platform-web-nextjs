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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

export function PaymentMethodsDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="mt-5 w-full text-white max-lg:mt-3">Thanh toán ngay</Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
                        <DialogDescription>Vui long chọn phương thức thanh toán phù hợp với bạn.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn phương thức thanh toán" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="transfer">Chuyển khoản ngân hàng (Tự động)</SelectItem>
                                        <SelectItem value="momo">Ví điện tử Momo</SelectItem>
                                        <SelectItem value="paypal">Paypal</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Đóng</Button>
                        </DialogClose>
                        <Button type="submit" className="text-white">
                            Tiếp tục
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
