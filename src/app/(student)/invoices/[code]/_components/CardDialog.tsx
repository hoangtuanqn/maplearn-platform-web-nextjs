/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import z from "zod";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import invoiceApi from "~/apiRequest/invoices";
import Loading from "~/app/(student)/_components/Loading";
import axios from "axios";
import { toast } from "sonner";
import { ListCardSchemaResponseAPI } from "~/schemaValidate/invoice.schema";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { formatter } from "~/libs/format";
import { useState } from "react";
const amounts = [10_000, 20_000, 50_000, 100_000, 200_000, 500_000];
const formSchema = z.object({
    cards: z.array(
        z.object({
            telco: z.string().min(1, "Chọn nhà mạng"),
            amount: z.string().min(1, "Chọn mệnh giá"),
            serial: z.string().min(1, "Nhập số seri"),
            code: z.string().min(1, "Nhập mã thẻ"),
            isSuccess: z.boolean(),
        }),
    ),
});
type FormValues = z.infer<typeof formSchema>;

export function CardDialog({ totalPrice, code }: { totalPrice: number; code: string }) {
    "use no memo";
    const [total, setTotal] = useState(0);
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cards: [
                { telco: "", amount: "", serial: "", code: "", isSuccess: false }, // dòng đầu tiên
            ],
        },
        mode: "onBlur",
    });

    const { control, handleSubmit } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "cards",
    });
    const sendCartMuation = useMutation({
        mutationFn: ({ code, values }: { code: string; values: FormValues }) =>
            invoiceApi.sendCardToPartner(code, values),
        onSuccess: (data) => {
            toast.success(data.data.message);
        },

        onSettled: (data, error) => {
            if (!error) {
                // Xử lý nếu k lỗi (hoặc chỉ có 1 vài thẻ lỗi)
                const responseData = data?.data as ListCardSchemaResponseAPI;
                form.setValue(
                    "cards",
                    form.getValues("cards").map((card, index) => {
                        const cardRes = responseData.data.find((item) => item.serial == card.serial);
                        if (cardRes) {
                            if (cardRes["status"] == 1 || cardRes["status"] == 99) {
                                return {
                                    ...card,
                                    isSuccess: true,
                                };
                            } else {
                                form.setError(`cards.${index}.code`, { type: "manual", message: cardRes.message });
                            }
                        }
                        return card;
                    }),
                );
            } else if (axios.isAxiosError(error) && error.response) {
                // Xử lý nếu tất cả các thẻ đề lỗi
                type CardError = {
                    message: string;
                };
                const cardErrors = error.response.data.data as CardError[];
                cardErrors.forEach((item: CardError, idx: number) => {
                    form.setError(`cards.${idx}.code`, { type: "manual", message: item.message });
                });
            }
        },
    });

    function onSubmit(values: FormValues) {
        sendCartMuation.mutate({ code, values });
    }

    return (
        <Dialog defaultOpen={true} onOpenChange={() => {}}>
            {sendCartMuation.isPending && <Loading />}
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <DialogTrigger asChild>
                        <Button className="w-full text-white md:w-auto">Nạp thẻ</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white lg:max-w-7xl">
                        <DialogHeader>
                            <DialogTitle>Thanh toán bằng thẻ cào</DialogTitle>
                            <DialogDescription>Vui lòng nhập thông tin thẻ cào của bạn.</DialogDescription>
                        </DialogHeader>

                        <div className="grid max-h-[70vh] gap-8 overflow-y-auto px-2">
                            {fields.map((field, index) => (
                                // Thêm trạng thái disable ko ko thể nhập ô nào, có overlay
                                <div key={field.id} className={`flex flex-col items-start gap-2 md:flex-row`}>
                                    <div
                                        className={`grid flex-1 grid-cols-1 gap-2 md:grid-cols-4 ${field.isSuccess ? "pointer-events-none opacity-50" : ""}`}
                                    >
                                        {/* Nhà mạng */}
                                        <FormField
                                            control={control}
                                            name={`cards.${index}.telco`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select value={field.value} onValueChange={field.onChange}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Chọn nhà mạng" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Nhà mạng</SelectLabel>
                                                                    <SelectItem value="VIETTEL">Viettel</SelectItem>
                                                                    <SelectItem value="VINAPHONE">Vinaphone</SelectItem>
                                                                    <SelectItem value="MOBIFONE">Mobifone</SelectItem>
                                                                    <SelectItem value="GATE">Gate</SelectItem>
                                                                    <SelectItem value="VCOIN">Vcoin</SelectItem>
                                                                    <SelectItem value="GARENA">Garena</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Mệnh giá */}
                                        <FormField
                                            control={control}
                                            name={`cards.${index}.amount`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            value={field.value}
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
                                                                setTotal(
                                                                    form.getValues("cards").reduce((acc, card) => {
                                                                        return acc + (parseInt(card.amount, 10) || 0);
                                                                    }, 0),
                                                                );
                                                            }}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Chọn mệnh giá" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Mệnh giá</SelectLabel>
                                                                    {/* Logic: Chỉ hiển thị các mệnh giá nếu tổng mệnh giá đã chọn < tổng giá trị hóa đơn */}
                                                                    {amounts.map((amount) => {
                                                                        const caculate = form
                                                                            .getValues("cards")
                                                                            .slice(0, index)
                                                                            .reduce((acc, card) => {
                                                                                return (
                                                                                    acc +
                                                                                    (parseInt(card.amount, 10) || 0)
                                                                                );
                                                                            }, 0);

                                                                        return (
                                                                            <SelectItem
                                                                                key={amount}
                                                                                value={amount + ""}
                                                                                disabled={
                                                                                    caculate > totalPrice ||
                                                                                    caculate + amount > totalPrice ||
                                                                                    amount > totalPrice
                                                                                }
                                                                            >
                                                                                {formatter.number(amount)}đ
                                                                            </SelectItem>
                                                                        );
                                                                    })}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Seri */}
                                        <FormField
                                            control={control}
                                            name={`cards.${index}.serial`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Nhập số seri" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Mã thẻ */}
                                        <FormField
                                            control={control}
                                            name={`cards.${index}.code`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Nhập mã thẻ" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {field.isSuccess && (
                                            <p className="col-span-4 text-green-500">
                                                Đã gửi thẻ thành công! Đang chờ xử lý, có thể xóa dòng này!
                                            </p>
                                        )}
                                    </div>

                                    {/* Nút xóa dòng */}
                                    {fields.length > 1 && (
                                        <div className="mt-2 flex justify-end md:mt-0 md:items-center">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => remove(index)}
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="border-primary/80 border-b-1 pb-4">
                                {total < totalPrice && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="text-primary w-full md:w-fit"
                                        onClick={() =>
                                            append({ telco: "", amount: "", serial: "", code: "", isSuccess: false })
                                        }
                                    >
                                        <Plus className="mr-2" /> Thêm dòng mới
                                    </Button>
                                )}
                                <span className="block text-right">
                                    Số tiền đang chọn:{" "}
                                    <span className="font-semibold text-green-500">{formatter.number(total)}đ</span>
                                </span>
                            </div>
                        </div>

                        <DialogFooter className="flex flex-col items-center gap-2 md:flex-row">
                            {/* Nút thêm dòng mới */}
                            <DialogClose asChild>
                                <Button variant="outline" className="w-full md:w-auto">
                                    Đóng
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="w-full text-white md:w-auto"
                                onClick={async () => {
                                    const isValid = await form.trigger();
                                    if (isValid) {
                                        const values = form.getValues();
                                        const filteredCards = values.cards.filter((card) => !card.isSuccess);
                                        onSubmit({ cards: filteredCards });
                                    }
                                }}
                            >
                                Kiểm tra
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    );
}
