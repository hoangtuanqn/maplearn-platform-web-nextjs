"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useNotificationSound } from "~/hooks/useNotificationSound";
import { useRouter } from "next/navigation";
const PusherNotification = () => {
    const router = useRouter();
    const { playSound } = useNotificationSound("ting.mp3");
    useEffect(() => {
        // Kết nối đến Pusher
        const pusher = new Pusher("8610646d0a376d1ac24e", {
            cluster: "ap1",
        });
        // Đăng ký kênh và sự kiện
        const channel = pusher.subscribe("my-channel");
        // data: { message: string }
        channel.bind("my-event", () => {
            playSound();
            router.refresh();
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [playSound, router]);
    return null;
};
export default PusherNotification;
