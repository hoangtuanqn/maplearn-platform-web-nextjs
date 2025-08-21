import { Brain } from "lucide-react";
import Image from "next/image";
import React from "react";

const HeaderTab = () => {
    return (
        <div className="t1-flex-center mx-auto mb-5 h-12 w-xl cursor-pointer justify-between rounded-xl bg-white font-bold shadow-sm max-md:hidden">
            <div className="t1-flex-center bg-primary h-full flex-1 gap-2 rounded-xl p-2 text-center text-white">
                <Image
                    src="/assets/icons/logo.svg"
                    width={64}
                    height={64}
                    alt="Logo"
                    className="h-8 w-8 object-contain"
                />
                <span>Đáp án chi tiết</span>
            </div>
            <div className="t1-flex-center h-full flex-1 gap-2 rounded-xl bg-white p-2 text-[#979797]">
                <Brain />
                <span>Trợ lý ảo</span>
            </div>
        </div>
    );
};

export default HeaderTab;
