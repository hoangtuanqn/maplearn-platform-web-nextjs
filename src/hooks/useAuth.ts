"use client";

import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import privateApi from "~/libs/apis/privateApi";
import { AppDispatch, RootState } from "~/store";
import { setUser } from "~/store/userSlice";
import { UserType } from "~/schemaValidate/user.schema";

export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user.user) ?? null;

    // ✅ Hàm login
    const login = (user: UserType) => {
        dispatch(setUser(user));
    };

    // ✅ Query để lấy thông tin user

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
        login,
        logout: () => logoutUser.mutate(),
    };
}
