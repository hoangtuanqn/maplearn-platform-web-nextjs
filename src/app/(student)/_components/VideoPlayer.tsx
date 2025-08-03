"use client";
import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";

type Props = {
    src: string;
    type?: "video/mp4" | "youtube";
    poster?: string;
};

const VideoPlayer = ({ src, type = "video/mp4", poster }: Props) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let player: any;

        // ❗ Chỉ import Plyr phía client
        import("plyr").then((module) => {
            const Plyr = module.default;

            if (videoRef.current) {
                player = new Plyr(videoRef.current, {
                    settings: ["speed", "quality"],
                    loop: { active: true },
                    previewThumbnails: { enabled: true, src: "/maplearn.png" },
                });
            }
        });

        return () => {
            if (player) {
                player.destroy(); // cleanup khi unmount
            }
        };
    }, []);

    return (
        <div className="overflow-hidden rounded-xl">
            <video ref={videoRef} className="plyr-react plyr" playsInline controls poster={poster}>
                <source src={src} type={type || "video/mp4"} />
            </video>
        </div>
    );
};

export default VideoPlayer;
