import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategorySidebar = () => {
    return (
        <div className="sticky top-[56px] h-fit lg:flex-1/4">
            <h2 className="text-primary mt-6 text-base font-bold uppercase">Kho tài liệu</h2>
            <Link className="mt-3 flex gap-3 rounded-xl bg-[#EFF0F1] p-4" href={"/documents/category/1"}>
                <div className="shrink-0">
                    <Image
                        src="/assets/icons/file.svg"
                        width={72}
                        height={92}
                        alt="Icon SVG PDF"
                        className="h-auto max-sm:w-[80%]"
                    />
                    <span className="bg-primary mt-2 inline-block rounded-xl px-5 py-1 text-xs text-white">Lớp 12</span>
                </div>
                <div>
                    <h2 className="line-clamp-3 text-xs leading-5 font-bold text-slate-600 uppercase lg:text-sm">
                        Kho đề thi kiểm tra đầu năm - Vật lý 12 Kho đề thi kiểm tra đầu năm - Vật lý 12 Kho đề thi kiểm
                        tra đầu năm - Vật lý 12
                    </h2>
                    <span className="mt-2 inline-block text-gray-400">Đang có 560 tài liệu</span>
                </div>
            </Link>
        </div>
    );
};

export default CategorySidebar;
