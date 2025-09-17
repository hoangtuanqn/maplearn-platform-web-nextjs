"use client";
import React from "react";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import QRCode from "react-qr-code";
import QRCodeBadge from "./QRCodeBadge";
import Image from "next/image";

// Font config
const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "600", "700", "900"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const Certificate = ({
    fullName,
    eventName,
    eventDate,
    verifyUrl = "https://maplearn.vn/verify/demo-0001",
    ref,
}: {
    fullName: string;
    eventName: string;
    eventDate: string;
    verifyUrl?: string;
    ref?: React.Ref<HTMLDivElement>;
}) => {
    return (
        <div
            className="relative mx-auto w-full max-w-[900px] rounded-2xl border-[10px] border-indigo-100 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-8 text-center select-none md:p-14"
            ref={ref}
        >
            {/* Watermark */}
            <div className="pointer-events-none absolute inset-0 flex -rotate-45 items-center justify-center text-[120px] font-black tracking-[0.5em] text-indigo-900/5 select-none">
                MAPLEARN
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-8">
                {/* Header */}
                <div className="mb-6 flex flex-col items-center gap-2">
                    <h1
                        className={`${playfairDisplay.className} bg-gradient-to-r from-indigo-800 via-blue-500 to-sky-400 bg-clip-text text-4xl font-black tracking-[0.2em] text-transparent uppercase md:text-6xl`}
                    >
                        Certificate
                    </h1>
                    <h2
                        className={`${inter.className} text-xl font-bold tracking-[0.3em] text-slate-600 uppercase md:text-2xl`}
                    >
                        of Completion
                    </h2>
                </div>

                {/* Presented to */}
                <p className={`${inter.className} mb-2 text-base font-medium text-slate-600 md:text-lg`}>
                    This certificate is proudly presented to
                </p>

                {/* Student Name */}
                <div
                    className={`${dancingScript.className} mb-4 inline-block border-b-4 border-indigo-800 bg-gradient-to-r from-slate-800 to-indigo-800 bg-clip-text pb-2 text-3xl font-bold text-transparent md:text-5xl`}
                >
                    {fullName}
                </div>

                {/* Achievement */}
                <p className={`${inter.className} mx-auto max-w-2xl text-base leading-7 text-slate-600 md:text-lg`}>
                    for successfully completing the course
                    <br />
                    <span className="text-lg font-bold text-black">“{eventName}”</span>
                    <br />
                    and demonstrating exceptional dedication to learning and professional development
                </p>

                {/* Date & Seal */}
                <div className="mt-6 flex flex-col items-center justify-center gap-8">
                    <div className="flex flex-col items-center">
                        <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                            Date of Completion
                        </div>
                        <div className="mt-1 text-lg font-bold text-slate-800">{eventDate}</div>
                    </div>
                </div>

                {/* Signatures */}
                <div className="mt-10 grid grid-cols-1 gap-8 border-t-2 border-slate-200 pt-8 md:grid-cols-2">
                    <div className="flex flex-col items-center">
                        <Image
                            width={150}
                            height={50}
                            src="/assets/images/signature/signature-instructor.png"
                            alt="Instructor Signature"
                            className="mb-2 h-10 object-contain contrast-125"
                        />
                        <div className="mb-2 h-px w-32 bg-slate-300" />
                        <div className={`${inter.className} font-bold text-slate-800`}>Le Thanh Nhan</div>
                        <div className={`${inter.className} text-xs text-slate-600`}>Course Instructor</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image
                            width={150}
                            height={50}
                            src="/assets/images/signature/signature-director.svg"
                            alt="Director Signature"
                            className="mb-2 h-10 object-contain contrast-125"
                        />
                        <div className="mb-2 h-px w-32 bg-slate-300" />
                        <div className={`${inter.className} font-bold text-slate-800`}>Tran Phuoc Sinh</div>
                        <div className={`${inter.className} text-xs text-slate-600`}>Academic Director</div>
                    </div>
                </div>

                {/* QR Code */}
                {/* <div className="mt-10 flex flex-col items-center gap-2">
                    <div className="rounded-lg border border-slate-300 bg-white p-2 shadow-sm">
                        <QRCode value={verifyUrl} size={400} bgColor="#ffffff" fgColor="#1e293b" />
                    </div>
                    <p className="text-xs text-slate-500">Scan to verify certificate</p>
                </div> */}
                <QRCodeBadge />
            </div>
        </div>
    );
};

export default Certificate;
