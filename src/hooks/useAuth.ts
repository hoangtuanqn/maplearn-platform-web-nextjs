"use client";

import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import privateApi from "~/libs/apis/privateApi";
import { AppDispatch, RootState } from "~/store";
import { setUser } from "~/store/userSlice";
import { UserType } from "~/schemaValidate/user.schema";
import { notificationErrorApi } from "~/libs/apis/http";

export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user.user) ?? null;

    // ✅ Hàm login
    const login = (user: UserType) => {
        dispatch(setUser(user));
    };

    const updateProfile = (payload: Partial<UserType>) => {
        dispatch(
            setUser({
                ...user,
                ...payload,
            } as UserType),
        );
    };
    // Mutation resend verify email
    const resendVerifyEmail = useMutation({
        mutationFn: () => privateApi.post("/profile/resend-verify-email", {
            email: user?.email,
        }),
        onSuccess: () => {
            toast.success("Đã gửi lại email xác thực!");
        },
        onError: (error) => {
            notificationErrorApi(error);
        },
    });

    // ✅ Mutation để logout
    const logoutUser = useMutation({
        mutationFn: async () => {
            await privateApi.post("/auth/logout");
        },
        onSettled: () => {
            dispatch(setUser(null)); // Xoá user khỏi Redux
            router.push("/auth/login");
            toast.success("Đăng xuất thành công!");
        },
        onError: () => {
            toast.error("Có lỗi khi đăng xuất!");
        },
    });
    // if (error) {
    //     toast.error("Đã tự động đăng xuất, yêu cầu đăng nhập lại!");
    //     router.push("/auth/login");
    //     logoutUser.mutate();
    // }

    return {
        user,
        updateProfile,
        resendVerifyEmail,
        login,
        logout: () => logoutUser.mutate(),
    };
}
