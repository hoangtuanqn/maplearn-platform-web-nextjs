// libs/useNotificationSound.ts
"use client";
import { Howl } from "howler";

export const useNotificationSound = () => {
    const sound = new Howl({
        src: ["/assets/musics/notification.mp3"],
        volume: 1.0,
    });

    const playSound = () => {
        sound.play();
    };

    return { playSound };
};
