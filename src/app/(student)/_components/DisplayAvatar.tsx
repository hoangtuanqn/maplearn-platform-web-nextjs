"use client";
import Image from "next/image";
import React from "react";
import { getCharacterName } from "~/libs/hepler";

const DisplayAvatar = ({
    ratio = "24",
    avatar,
    fullName = "Vô Danh",
}: {
    ratio: string;
    avatar: string | undefined | null;
    fullName: string | undefined | null;
}) => {
    return (
        <>
            {avatar ? (
                <Image
                    src={avatar}
                    alt={fullName || "Avatar"}
                    width={96}
                    height={96}
                    className={`h-${ratio} w-${ratio} border-primary shrink-0 items-center justify-center rounded-full border-2 object-cover`}
                />
            ) : (
                <div
                    className={`t1-flex-center h-${ratio} w-${ratio} shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] text-3xl leading-12 font-medium text-white`}
                >
                    {getCharacterName(fullName || "Vô Danh")}
                </div>
            )}
        </>
    );
};

export default DisplayAvatar;
