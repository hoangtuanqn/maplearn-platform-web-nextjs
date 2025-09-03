"use client";
import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";

type Props = {
    src: string;
    type?: "video/mp4" | "youtube";
    poster?: string;
    ratio?: string | undefined;
    defaultTime?: number; // 👉 Thời gian lấy từ DB (giây)
    onTimeUpdate?: (time: number) => void; // 👉 Callback để lưu vào DB
};

const VideoPlayer = ({ src, type = "video/mp4", poster, ratio, defaultTime = 0, onTimeUpdate }: Props) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        let player: any;

        import("plyr").then((module) => {
            const Plyr = module.default;

            if (videoRef.current) {
                player = new Plyr(videoRef.current, {
                    ratio,
                    keyboard: { focused: true, global: true },
                });

                // Khi player ready → đặt lại vị trí saved
                player.once("ready", () => {
                    // console.log("Video player is ready");
                    if (defaultTime > 0) {
                        player.currentTime = defaultTime;
                    }
                });

                // Cập nhật thời gian → gọi callback để lưu DB
                player.on("timeupdate", () => {
                    // console.log("Video player is playing", player.currentTime);
                    if (onTimeUpdate) {
                        if (Math.round(player.currentTime) % 10 === 0) onTimeUpdate(Math.round(player.currentTime));
                    }
                });
            }
        });

        return () => {
            if (player) {
                player.destroy();
            }
        };
    }, [ratio, defaultTime, onTimeUpdate]);

    return (
        <div className="h-full w-full">
            <video ref={videoRef} className="plyr-react plyr" playsInline controls poster={poster}>
                <source src={src} type={type} />
            </video>
        </div>
    );
};

export default VideoPlayer;
