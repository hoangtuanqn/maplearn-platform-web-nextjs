import { UsersRound } from "lucide-react";
import Image from "next/image";
const HomeTab = () => {
    return (
        <div className="t1-flex-center h-12 cursor-pointer justify-between rounded-xl bg-white font-bold shadow-sm max-md:hidden">
            <div className="t1-flex-center bg-primary h-full flex-1 gap-2 rounded-xl p-2 text-center text-white">
                <Image
                    src="/assets/icons/logo.svg"
                    width={64}
                    height={64}
                    alt="Logo"
                    className="h-8 w-8 object-contain"
                />
                <span>Trang chủ</span>
            </div>
            <div className="t1-flex-center h-full flex-1 gap-2 rounded-xl bg-white p-2 text-[#979797]">
                <UsersRound />
                <span>Cộng đồng</span>
            </div>
        </div>
    );
};

export default HomeTab;
