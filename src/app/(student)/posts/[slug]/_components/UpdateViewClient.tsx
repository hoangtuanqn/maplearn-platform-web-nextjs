"use client";

import { useEffect, useRef } from "react";
import publicApi from "~/libs/apis/publicApi";

export default function UpdateViewClient({ slug }: { slug: string }) {
    const calledRef = useRef(false); // Đảm bảo chỉ gọi 1 lần
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!calledRef.current) {
                publicApi.post(`/posts/${slug}/view`).catch(console.error);
                calledRef.current = true;
            }
        }, 15000); // người dùng đọc 1 giây sẽ update số view lên

        return () => clearTimeout(timeout);
    }, [slug]);

    return null; // Không render gì cả
}
