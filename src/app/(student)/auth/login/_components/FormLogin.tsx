"use client";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../login.schema";
import useCapsLockWarning from "~/hooks/useCapsLockWarning";
import Loading from "~/app/(student)/_components/Loading";
import LoginGoogle from "~/app/(student)/_components/Button/LoginGoogle";
import LoginFacebook from "~/app/(student)/_components/Button/LoginFacebook";
import { Button } from "~/components/ui/button";
import { FormLoginValues, OTPType } from "../../types/auth.type";
import publicApi from "~/libs/apis/publicApi";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { setLocalStorage } from "~/libs/localStorage";
import { setUser } from "~/store/userSlice";
import { useDispatch } from "react-redux";

const FormLogin = () => {
    const { isCapsLockOn, handleKeyEvent, handleFocus } = useCapsLockWarning();
    const dispatch = useDispatch();
    const router = useRouter();
    const form = useForm<FormLoginValues>({
        mode: "onBlur",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    // Khai báo mutation
    const loginMutation = useMutation({
        mutationFn: (data: FormLoginValues | OTPType) => publicApi.post("/auth/login", data),

        onSuccess: (res) => {
            // Người dùng bật bảo vệ 2 lớp
            if (res.data?.["2fa_required"] && res.data?.token) {
                // console.log(res.data);

                // setVerify2fa({ required: true, token: res.data.token });
                toast.info("Vui lòng nhập 2FA để tiếp tục!");
                setLocalStorage("token2fa", res.data?.token ?? "");
                router.push("/auth/verify-otp/" + res.data?.token);
                // Bật phần nhập mã 2FA
            } else {
                dispatch(setUser(res.data.data));
                toast.success("Đăng nhập thành công!");
                // Login thành công
                router.push("/");
            }
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.code === "ERR_NETWORK") {
                    toast.error("Không thể kết nối tới server!");
                } else {
                    toast.error("Thông tin đăng nhập không hợp lệ!");
                }
            } else {
                toast.error("Đã xảy ra lỗi không xác định!");
            }
        },
    });

    const onSubmit: SubmitHandler<FormLoginValues> = async (data) => {
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
                        <Button type="submit" className="w-full cursor-pointer text-white">
                            Đăng nhập
                        </Button>
                    </form>
                </Form>

                <div className="mt-12 flex flex-col gap-2">
                    <div className="t1-flex-center gap-2 text-gray-500">
                        <span className="block h-[1.5px] w-20 bg-black/40"></span> <span>hoặc tiếp tục với</span>
                        <span className="block h-[1.5px] w-20 bg-black/40"></span>
                    </div>
                    <div className="mt-4 flex justify-center gap-2 text-[12px] sm:flex-row sm:text-sm">
                        <LoginGoogle />
                        <LoginFacebook />
                    </div>
                </div>
                <div className="mt-10 text-center text-sm">
                    <span>Chưa có tài khoản? </span>
                    <Link className="underline hover:text-gray-900" href="/register">
                        Đăng ký
                    </Link>
                </div>
            </div>
        </>
    );
};

export default FormLogin;
