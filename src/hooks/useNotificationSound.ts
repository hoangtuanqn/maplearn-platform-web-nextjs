// libs/useNotificationSound.ts
"use client";
import { Howl } from "howler";

export const useNotificationSound = (file = "notification.mp3") => {
    const sound = new Howl({
        src: [`/assets/musics/${file}`],
        volume: 1.0,
    });

    const playSound = () => {
        sound.play();
    };

    return { playSound };
};
