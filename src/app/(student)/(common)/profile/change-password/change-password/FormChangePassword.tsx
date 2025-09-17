"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordSchema, FormChangePasswordType } from "~/schemaValidate/user.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import profileApi from "~/apiRequest/profile";
import Loading from "~/app/(student)/_components/Loading";
import PasswordStrengthMeter from "~/app/(student)/_components/Auth/PasswordStrengthMeter";
import { useAuth } from "~/hooks/useAuth";
import { useRouter } from "next/navigation";
import axios from "axios";
import zxcvbn from "zxcvbn";
import { Lock, Shield, Eye, EyeOff, AlertTriangle, Key } from "lucide-react";
import { useState } from "react";

const FormChangePassword = () => {
    const { logout } = useAuth();
    const router = useRouter();
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const form = useForm<FormChangePasswordType>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onBlur",
        defaultValues: {
            password_old: "",
            password_new: "",
            confirmPassword: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: FormChangePasswordType) => profileApi.changePassword(data),
        onSuccess: (_) => {
            toast.success("Đã thay đổi mật khẩu thành công! Vui lòng đăng nhập lại!");
            logout();
            router.push("/auth/login");
        },
        onError: (data) => {
            if (axios.isAxiosError(data)) {
                const errors = data.response?.data?.message;
                toast.error(errors);
            }
        },
    });

    const onSubmit = (data: FormChangePasswordType) => {
        if (isPending) {
            toast.warning("Thao tác quá nhanh!");
            return;
        }
        if (zxcvbn(form.watch("password_new")).score < 2) {
            toast.error("Mật khẩu mới quá yếu! Vui lòng nhập mật khẩu khác mạnh hơn!");
            return;
        }
        mutate(data);
    };

    const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <>
            {isPending && <Loading />}

            <div className="space-y-8">
                {/* Header Section */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                <Lock className="text-primary h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Thay đổi mật khẩu</h1>
                                <p className="text-gray-600">Cập nhật mật khẩu để bảo vệ tài khoản của bạn</p>
                            </div>
                        </div>
                    </div>

                    {/* Security Tips */}
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                        <div className="flex items-start gap-3">
                            <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                            <div>
                                <h3 className="mb-2 font-medium text-amber-900">Lời khuyên bảo mật</h3>
                                <ul className="space-y-1 text-sm text-amber-800">
                                    <li>• Sử dụng mật khẩu dài ít nhất 8 ký tự</li>
                                    <li>• Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
                                    <li>• Không sử dụng thông tin cá nhân dễ đoán</li>
                                    <li>• Không chia sẻ mật khẩu với bất kỳ ai</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Current Password */}
                            <FormField
                                control={form.control}
                                name="password_old"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <Key size={14} />
                                            Mật khẩu hiện tại *
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    placeholder="Nhập mật khẩu hiện tại"
                                                    type={showPasswords.old ? "text" : "password"}
                                                    className="focus:border-primary focus:ring-primary h-11 border-gray-300 pr-12"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility("old")}
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPasswords.old ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* New Password */}
                            <FormField
                                control={form.control}
                                name="password_new"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <Lock size={14} />
                                            Mật khẩu mới *
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    placeholder="Nhập mật khẩu mới"
                                                    type={showPasswords.new ? "text" : "password"}
                                                    className="focus:border-primary focus:ring-primary h-11 border-gray-300 pr-12"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility("new")}
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <PasswordStrengthMeter password={form.watch("password_new")} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <Shield size={14} />
                                            Xác nhận mật khẩu mới *
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    placeholder="Nhập lại mật khẩu mới"
                                                    type={showPasswords.confirm ? "text" : "password"}
                                                    className="focus:border-primary focus:ring-primary h-11 border-gray-300 pr-12"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility("confirm")}
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <div className="border-t border-gray-100 pt-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-sm text-gray-600">
                                        <p>* Tất cả các trường đều bắt buộc</p>
                                        <p className="mt-1 text-xs">Sau khi đổi mật khẩu, bạn sẽ cần đăng nhập lại</p>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="bg-primary hover:bg-primary/90 h-auto px-8 py-3 font-medium text-white"
                                    >
                                        <Lock size={16} className="mr-2" />
                                        {isPending ? "Đang cập nhật..." : "Đổi mật khẩu"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>

                {/* Warning Notice */}
                <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                        <div>
                            <h3 className="mb-1 font-medium text-red-900">Lưu ý quan trọng</h3>
                            <p className="text-sm text-red-700">
                                Sau khi thay đổi mật khẩu thành công, bạn sẽ được tự động đăng xuất và cần đăng nhập lại
                                bằng mật khẩu mới. Hãy đảm bảo bạn nhớ mật khẩu mới trước khi thực hiện thay đổi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormChangePassword;
