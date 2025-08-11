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
import { notificationErrorApi } from "~/libs/apis/http";
import { toast } from "sonner";

const formSchema = z.object({
    cards: z.array(
        z.object({
            telco: z.string().min(1, "Chọn nhà mạng"),
            amount: z.string().min(1, "Chọn mệnh giá"),
            serial: z.string().min(1, "Nhập số seri"),
            code: z.string().min(1, "Nhập mã thẻ"),
        }),
    ),
});

type FormValues = z.infer<typeof formSchema>;

export function CardDialog({ code }: { code: string }) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cards: [
                { telco: "", amount: "", serial: "", code: "" }, // dòng đầu tiên
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
        onSuccess: (res) => {
            toast.success("Thanh toán bằng thẻ cào thành công!");

            // form.reset();
        },
        onError: notificationErrorApi,

        // Json return array (
        //   'success' => true,
        //   'message' => 'Thanh toán bằng thẻ cào thành công!',
        //   'data' =>
        //   array (
        //     0 =>
        //     array (
        //       'trans_id' => NULL,
        //       'request_id' => 862525641,
        //       'amount' => NULL,
        //       'value' => NULL,
        //       'declared_value' => '10000',
        //       'telco' => 'VIETTEL',
        //       'serial' => '1',
        //       'code' => '2',
        //       'status' => 3,
        //       'message' => 'Mã thẻ hoặc seri không đúng định dạng, vui lòng kiểm tra lại!',
        //     ),
        //     1 =>
        //     array (
        //       'trans_id' => NULL,
        //       'request_id' => 1641930657,
        //       'amount' => NULL,
        //       'value' => NULL,
        //       'declared_value' => '20000',
        //       'telco' => 'VINAPHONE',
        //       'serial' => '3',
        //       'code' => '4',
        //       'status' => 3,
        //       'message' => 'Mã thẻ hoặc seri không đúng định dạng, vui lòng kiểm tra lại!',
        //     ),
        //   ),
        // )

        onSettled: (_, error) => {
            if (axios.isAxiosError(error) && error.response && Array.isArray(error.response.data.data)) {
                type CardError = {
                    message: string;
                };
                const cardErrors = error.response.data.data as CardError[];
                cardErrors.forEach((item: CardError, idx: number) => {
                    console.log(item);

                    form.setError(`cards.${idx}.code`, { message: item.message });
                });
            }
        },
    });

    function onSubmit(values: FormValues) {
        sendCartMuation.mutate({ code, values });
        // form.setError(`cards.0.code`, { type: "manual", message: "ngon" });
        console.log("Đã bắn error");
    }

    return (
        <Dialog open={true}>
            {sendCartMuation.isPending && <Loading />}
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <DialogContent className="bg-white lg:max-w-7xl">
                        <DialogHeader>
                            <DialogTitle>Thanh toán bằng thẻ cào</DialogTitle>
                            <DialogDescription>Vui lòng nhập thông tin thẻ cào của bạn.</DialogDescription>
                        </DialogHeader>

                        <div className="grid max-h-[70vh] gap-8 overflow-y-auto px-2">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex flex-col items-start gap-2 md:flex-row">
                                    <div className="grid flex-1 grid-cols-1 gap-2 md:grid-cols-4">
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
                                                        <Select value={field.value} onValueChange={field.onChange}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Chọn mệnh giá" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Mệnh giá</SelectLabel>
                                                                    <SelectItem value="10000">10.000đ</SelectItem>
                                                                    <SelectItem value="20000">20.000đ</SelectItem>
                                                                    <SelectItem value="50000">50.000đ</SelectItem>
                                                                    <SelectItem value="100000">100.000đ</SelectItem>
                                                                    <SelectItem value="200000">200.000đ</SelectItem>
                                                                    <SelectItem value="500000">500.000đ</SelectItem>
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
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-primary w-full md:w-fit"
                                    onClick={() => append({ telco: "", amount: "", serial: "", code: "" })}
                                >
                                    <Plus className="mr-2" /> Thêm dòng mới
                                </Button>
                            </div>
                        </div>

                        <DialogFooter className="flex flex-col items-center gap-2 md:flex-row">
                            {/* Nút thêm dòng mới */}
                            <DialogClose asChild>
                                <Button variant="outline" className="w-full md:w-auto">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="w-full text-white md:w-auto"
                                onClick={async () => {
                                    const isValid = await form.trigger();
                                    if (isValid) {
                                        onSubmit(form.getValues());
                                    }
                                }}
                            >
                                Nạp thẻ
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    );
}
