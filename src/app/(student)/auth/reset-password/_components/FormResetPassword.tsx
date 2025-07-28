"use client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCapsLockWarning from "~/hooks/useCapsLockWarning";
import Loading from "~/app/(student)/_components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useAuth } from "~/hooks/useAuth";
import { FormResetPasswordType, resetPasswordSchema } from "../../auth.schema";
import axios from "axios";
import authApi from "~/apiRequest/auth";
import { useEffect, useMemo } from "react";
import PasswordStrengthMeter from "~/app/(student)/_components/Auth/PasswordStrengthMeter";

const FormResetPassword = () => {
    const searchParams = useSearchParams();
    // Parse token và email từ query param
    const config = useMemo(() => {
        try {
            const tokenParam = searchParams.get("token");
            return tokenParam ? JSON.parse(atob(tokenParam)) : null;
        } catch {
            return null;
        }
    }, [searchParams]);

    const { isCapsLockOn, handleKeyEvent, handleFocus } = useCapsLockWarning();
    const { login } = useAuth();
    const router = useRouter();
    const form = useForm<FormResetPasswordType>({
        mode: "onBlur",
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: config?.email ?? "",
            password: "",
            confirmPassword: "",
        },
    });

    // Khai báo mutation
    const registerMutaion = useMutation({
        mutationFn: (data: FormResetPasswordType) => authApi.resetPassword(data),
        onSuccess: (res) => {
            login(res.data.data);
            router.push("/");
            toast.success("Đã đặt lại mật khẩu thành công!");
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

    const onSubmit: SubmitHandler<FormResetPasswordType> = async (data) => {
        registerMutaion.mutate(data);
    };
    useEffect(() => {
        // Xác minh thêm token có đúng hay k? để đẩy người dùng đi luôn
        if (!config?.token || !config?.email) {
            router.push("/auth/forgot-password");
        }
    }, [config, router]);
    return (
        <>
            {registerMutaion.isPending && <Loading />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Địa chỉ email của bạn</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Nhập địa chỉ email của bạn" {...field} disabled />
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
                                <FormLabel>Mật khẩu mới</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập mật khẩu mới của bạn"
                                        onKeyDown={handleKeyEvent}
                                        onKeyUp={handleKeyEvent}
                                        onFocus={handleFocus}
                                        {...field}
                                    />
                                </FormControl>
                                <PasswordStrengthMeter password={form.watch("password")} />

                                {isCapsLockOn && <span className="text-yellow-500">Chú ý: Bạn đang bật Caps Lock</span>}
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

                                {isCapsLockOn && <span className="text-yellow-500">Chú ý: Bạn đang bật Caps Lock</span>}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full text-white">
                        Xác nhận
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default FormResetPassword;
