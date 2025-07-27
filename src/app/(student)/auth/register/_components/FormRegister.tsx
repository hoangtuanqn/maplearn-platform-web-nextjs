"use client";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCapsLockWarning from "~/hooks/useCapsLockWarning";
import Loading from "~/app/(student)/_components/Loading";
import LoginGoogle from "~/app/(student)/_components/Button/LoginGoogle";
import LoginFacebook from "~/app/(student)/_components/Button/LoginFacebook";
import { Button } from "~/components/ui/button";
import publicApi from "~/libs/apis/publicApi";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useAuth } from "~/hooks/useAuth";
import { FormRegisterType, registerSchema } from "../../auth.schema";
import axios from "axios";

const FormLogin = () => {
    const { isCapsLockOn, handleKeyEvent, handleFocus } = useCapsLockWarning();
    const { login } = useAuth();
    const router = useRouter();
    const form = useForm<FormRegisterType>({
        mode: "onBlur",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            full_name: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Khai báo mutation
    const registerMutaion = useMutation({
        mutationFn: (data: FormRegisterType) => publicApi.post("/auth/register", data),

        onSuccess: (res) => {
            login(res.data.data);
            router.push("/");
            toast.success("Tạo tài khoản thành công!");
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const errors = error.response?.data?.errors;
                for (const key in errors) {
                    return toast.error(`${errors?.[key]}`);
                }
            }
        },
    });

    const onSubmit: SubmitHandler<FormRegisterType> = async (data) => {
        registerMutaion.mutate(data);
    };
    return (
        <>
            {registerMutaion.isPending && <Loading />}
            <div className="w-full">
                <h3 className="mb-10 text-center text-xl font-semibold uppercase">Tạo tài khoản</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Họ và tên </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập họ và tên của bạn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Địa chỉ email của bạn</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập địa chỉ email của bạn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên tài khoản</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập tên tài khoản của bạn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Nhập mật khẩu của bạn"
                                            onKeyDown={handleKeyEvent}
                                            onKeyUp={handleKeyEvent}
                                            onFocus={handleFocus}
                                            {...field}
                                        />
                                    </FormControl>

                                    {isCapsLockOn && (
                                        <span className="text-yellow-500">Chú ý: Bạn đang bật Caps Lock</span>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Xác nhận lại mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Xác nhận lại mật khẩu"
                                            onKeyDown={handleKeyEvent}
                                            onKeyUp={handleKeyEvent}
                                            onFocus={handleFocus}
                                            {...field}
                                        />
                                    </FormControl>

                                    {isCapsLockOn && (
                                        <span className="text-yellow-500">Chú ý: Bạn đang bật Caps Lock</span>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full cursor-pointer text-white">
                            Tạo tài khoản
                        </Button>
                    </form>
                </Form>

                <div className="mt-12 flex flex-col gap-2">
                    <div className="t1-flex-center gap-2 text-gray-500">
                        <span className="block h-[1.5px] w-20 bg-black/40"></span> <span>hoặc tiếp tục với</span>
                        <span className="block h-[1.5px] w-20 bg-black/40"></span>
                    </div>
                    <div className="mt-4 flex justify-center gap-4 text-[12px] sm:flex-row sm:text-sm">
                        <LoginGoogle />
                        <LoginFacebook />
                    </div>
                </div>
                <div className="mt-10 text-center text-sm">
                    <span>Bạn đã có tài khoản? </span>
                    <Link className="underline hover:text-gray-900" href="/auth/login">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </>
    );
};

export default FormLogin;
