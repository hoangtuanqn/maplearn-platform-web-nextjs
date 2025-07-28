"use client";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLoginType, loginSchema } from "../../auth.schema";
import useCapsLockWarning from "~/hooks/useCapsLockWarning";
import Loading from "~/app/(student)/_components/Loading";
import LoginGoogle from "~/app/(student)/_components/Button/LoginGoogle";
import LoginFacebook from "~/app/(student)/_components/Button/LoginFacebook";
import { Button } from "~/components/ui/button";
import publicApi from "~/libs/apis/publicApi";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { setLocalStorage } from "~/libs/localStorage";
import { useAuth } from "~/hooks/useAuth";
import { handleApiError } from "~/libs/apis/http";

const FormLogin = () => {
    const { isCapsLockOn, handleKeyEvent, handleFocus } = useCapsLockWarning();
    const { login } = useAuth();
    const router = useRouter();
    const form = useForm<FormLoginType>({
        mode: "onBlur",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    // Khai báo mutation
    const loginMutation = useMutation({
        mutationFn: (data: FormLoginType) => publicApi.post("/auth/login", data),

        onSuccess: (res) => {
            // Người dùng bật bảo vệ 2 lớp
            if (res.data?.["2fa_required"] && res.data?.token) {
                toast.info("Vui lòng nhập 2FA để tiếp tục!");
                setLocalStorage("token2fa", res.data?.token ?? "");
                router.push("/auth/verify-otp/" + res.data?.token);
            } else {
                login(res.data.data);
                router.push("/");
                toast.success("Đăng nhập thành công!");
            }
        },

        onError: (error) => {
            handleApiError(error);
        },
    });

    const onSubmit: SubmitHandler<FormLoginType> = async (data) => {
        loginMutation.mutate(data);
    };
    return (
        <>
            {loginMutation.isPending && <Loading />}
            <div className="w-full">
                <h3 className="mb-10 text-center text-xl font-semibold uppercase">Đăng nhập</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        <Button type="submit" className="w-full text-white">
                            Đăng nhập
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
                    <span>Chưa có tài khoản? </span>
                    <Link className="underline hover:text-gray-900" href="/auth/register">
                        Đăng ký
                    </Link>
                </div>
            </div>
        </>
    );
};

export default FormLogin;
