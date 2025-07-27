"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import publicApi from "~/libs/apis/publicApi";
import { setUser } from "~/store/userSlice";

export default function LayoutGetInfoMe({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await publicApi.post("/auth/me");
                const user = res.data.data;
                // Htuanqn: Lưu thông tin user
                dispatch(setUser(user));
            } catch {
            } finally {
            }
        };

        fetchUser();
    }, [dispatch, router]);

    return children;
}
