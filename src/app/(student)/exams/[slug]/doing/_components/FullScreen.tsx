/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";

const FullScreen = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Hàm bật full screen cho toàn bộ trang
    const goFullScreen = () => {
        const elem = document.documentElement as any;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
    };

    // Hàm kiểm tra trạng thái fullscreen hiện tại
    const checkFullScreen = () => {
        const fsElement =
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).msFullscreenElement;
        setIsFullScreen(!!fsElement);
    };

    useEffect(() => {
        // Kiểm tra khi component mount
        checkFullScreen();

        // Lắng nghe sự kiện thay đổi fullscreen
        document.addEventListener("fullscreenchange", checkFullScreen);
        document.addEventListener("webkitfullscreenchange", checkFullScreen);
        document.addEventListener("MSFullscreenChange", checkFullScreen);

        // Cleanup
        return () => {
            document.removeEventListener("fullscreenchange", checkFullScreen);
            document.removeEventListener("webkitfullscreenchange", checkFullScreen);
            document.removeEventListener("MSFullscreenChange", checkFullScreen);
        };
    }, []);

    if (isFullScreen) {
        // Đã vào fullscreen thì không hiện màn hình chặn
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-[#155e94] text-center text-base font-bold text-white opacity-100 transition-opacity duration-300 ease-in-out">
            <div>Bạn phải vào chế độ toàn màn hình (Full Screen) mới làm được bài thi.</div>
            <button
                onClick={goFullScreen}
                className="text-primary mt-7 cursor-pointer rounded-md bg-white px-6 py-2 hover:bg-slate-200"
            >
                VÀO CHẾ ĐỘ FULL SCREEN
            </button>
        </div>
    );
};

export default FullScreen;
