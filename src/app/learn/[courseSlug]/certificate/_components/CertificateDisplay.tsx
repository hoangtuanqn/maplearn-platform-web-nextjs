"use client";
import React, { useRef } from "react";
import { Download } from "lucide-react";
import { ShareButton } from "~/app/(student)/_components/Shared/ShareButton";
import { Button } from "~/components/ui/button";
import Certificate from "./Certificate";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
const mockUserData = {
    fullName: "Phạm Hoàng Tuấn",
    email: "tranvannam@email.com",
};
const mockCourseData = {
    title: "Lập trình React.js từ cơ bản đến nâng cao",
    instructor: "Nguyễn Văn A",
    completionDate: "15/09/2024",
    duration: "40 giờ",
    totalLessons: 45,
    completedLessons: 45,
    grade: "A+",
    skills: ["React.js", "JavaScript ES6+", "Redux", "React Router", "API Integration"],
};
const CertificateDisplay = () => {
    const certRef = useRef<HTMLDivElement | null>(null);
    const downloadPNG = async () => {
        if (!certRef.current) return;
        const dataUrl = await htmlToImage.toPng(certRef.current, {
            cacheBust: true,
            pixelRatio: 2,
        });
        saveAs(dataUrl, "certificate.png");
    };
    return (
        <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Chứng chỉ của bạn</h2>
                    <div className="flex gap-3">
                        <Button variant={"outline"} onClick={downloadPNG}>
                            <Download className="h-4 w-4" />
                            Tải xuống
                        </Button>
                        <ShareButton />
                    </div>
                </div>
                {/* Certificate Component */}
                <div className="flex justify-center">
                    <div className="h-fit w-fit transform">
                        <Certificate
                            fullName={mockUserData.fullName}
                            eventName={mockCourseData.title}
                            eventDate={mockCourseData.completionDate}
                            ref={certRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateDisplay;
