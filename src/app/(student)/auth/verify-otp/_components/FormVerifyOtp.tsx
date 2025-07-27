"use client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import Loading from "~/app/(student)/_components/Loading";
import publicApi from "~/libs/apis/publicApi";
import { Button } from "~/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/components/ui/input-otp";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLayoutEffect, useState } from "react";
import { getLocalStorage, removeLocalStorage } from "~/libs/localStorage";
import { useDispatch } from "react-redux";
import { setUser } from "~/store/userSlice";

const FormVerifyOtp = () => {
    const dispatch = useDispatch();
    const params = useParams<{ token: string }>();
    const router = useRouter();
    const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
    const verify2faMutation = useMutation({
        mutationFn: (data: { otp: string; token: string }) => publicApi.post("/auth/verify-2fa", data),
        onSuccess: (res) => {
            router.push("/");
            removeLocalStorage("token2fa");
            dispatch(setUser(res.data.data));
            toast.success("Đăng nhập tài khoản thành công!");
        },
        onError: () => {
            toast.error("Mã xác nhận không hợp lệ!");
        },
    });

    const FormSchema = z.object({
        pin: z.string().length(6, {
            message: "Mã xác nhận phải có đúng 6 kí tự!",
        }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    });
    function onSubmit(data: z.infer<typeof FormSchema>) {
        const { pin } = data;
        if (!pin) {
            toast.error("Vui lòng nhập mã xác nhận!");
        } else if (pin.length !== 6) {
            toast.error("Mã xác nhận phải có đúng 6 kí tự!");
        } else {
            verify2faMutation.mutate({
                token: params.token ?? "",
                otp: pin,
            });
        }
    }
    useLayoutEffect(() => {
        if (getLocalStorage("token2fa") !== params.token) {
            toast.error("Truy cập không hợp lệ!");
            return router.push("/auth/login");
        }
        setIsValidToken(true);
    }, [router, params.token]);
    if (isValidToken === null) return <Loading />;
    return (
        <>
            {verify2faMutation.isPending && <Loading />}
            <div className="mx-auto max-w-full rounded-xl px-4 py-10 text-center sm:px-8">
                <header className="mb-8">
                    <h1 className="mb-1 text-2xl font-bold">Mã xác nhận</h1>
                    <p className="text-sm text-slate-500">
                        Nhập mã 6 chữ số trong ứng dụng <b className="font-bold text-gray-500">Google Authenticator</b>
                    </p>
                </header>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-6">
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem className="mx-auto">
                                    <FormControl className="mx-auto">
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mx-auto w-fit cursor-pointer text-white">
                            Xác nhận
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};
export default FormVerifyOtp;
