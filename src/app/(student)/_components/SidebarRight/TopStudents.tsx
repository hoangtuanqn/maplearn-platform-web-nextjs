import Image from "next/image";

const TopStudents = ({ className = "" }: { className?: string }) => {
    return (
        <div
            className={`rounded-xl border border-[#90caf9] bg-gradient-to-br from-[#e3f0ff] via-[#f1f8ff] to-[#e0f7fa] pt-4 shadow-sm ${className}`}
        >
            <h2 className="text-primary mb-2 px-4 text-base font-bold">Top 5 học sinh xuất sắc</h2>
            <div className="mt-2 [&>div]:py-2 [&>div]:pr-2 [&>div]:pl-5">
                <div className="flex items-center gap-2.5 even:bg-[#f5faff]">
                    <div className="t1-flex-center w-7.5 shrink-0">
                        <div className="h-8.5 w-8.5 shrink-0 rounded-full bg-gradient-to-b from-[#FFEDB7] to-[#FF9800] p-0.5 shadow-md">
                            <div className="t1-flex-center h-full w-full rounded-full bg-gradient-to-b from-[#F32114] to-[#880404] text-base text-[1.25rem] font-medium text-white">
                                1
                            </div>
                        </div>
                    </div>
                    <div className="relative size-10 shrink-0 rounded-full bg-gradient-to-b from-[#FFF8E1] to-[#FFD180] p-[3px] shadow-lg">
                        <Image
                            alt="Phạm Hoàng Tuấn"
                            className="h-full w-full shrink-0 rounded-full object-cover"
                            width={32.5}
                            height={32.5}
                            src="https://res.cloudinary.com/dbu1zfbhv/image/upload/v1755032358/avatar/urwizwtbosve0rg7miq2.jpg"
                        />
                    </div>
                    <div className="grow">
                        <div className="t1-gradient-text mb-1 line-clamp-1 font-bold">Phạm Hoàng Tuấn</div>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 even:bg-[#f0f4fa]">
                    <div className="t1-flex-center w-7.5 shrink-0">
                        <div className="h-7.5 w-7.5 shrink-0 rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#B4B5B7] p-0.5 shadow">
                            <div className="t1-flex-center h-full w-full rounded-full bg-gradient-to-b from-[#8CB5E9] to-[#0034DF] text-base font-medium text-white">
                                2
                            </div>
                        </div>
                    </div>
                    <div className="relative size-10 shrink-0 rounded-full bg-gradient-to-b from-[#f3f7fa] to-[#e0e7ef] p-[3px] shadow">
                        <div className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] text-base font-medium text-white">
                            K
                        </div>
                    </div>
                    <div className="grow">
                        <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Nguyễn Đức Anh Kiệt</div>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 even:bg-[#f5faff]">
                    <div className="t1-flex-center w-7.5 shrink-0">
                        <div className="h-7.5 w-7.5 shrink-0 rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#B4B5B7] p-0.5 shadow">
                            <div className="t1-flex-center h-full w-full rounded-full bg-gradient-to-b from-[#8CB5E9] to-[#0034DF] text-base font-medium text-white">
                                3
                            </div>
                        </div>
                    </div>
                    <div className="relative size-10 shrink-0 rounded-full bg-gradient-to-b from-[#f3f7fa] to-[#e0e7ef] p-[3px] shadow">
                        <div className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] text-base font-medium text-white">
                            N
                        </div>
                    </div>
                    <div className="grow">
                        <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Như phan</div>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 even:bg-[#f5faff]">
                    <div className="t1-flex-center w-7.5 shrink-0">
                        <div className="h-6.5 w-6.5 shrink-0 rounded-full bg-gradient-to-b from-[#D2F1D5] to-[#A5D04B] p-0.5">
                            <div className="t1-flex-center text-md h-full w-full rounded-full bg-gradient-to-b from-[#A3DF7E] to-[#027940] text-base font-medium text-white">
                                4
                            </div>
                        </div>
                    </div>
                    <div className="relative size-10 shrink-0 rounded-full bg-gradient-to-b from-[#f3f7fa] to-[#e0e7ef] p-[3px] shadow">
                        <div className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] text-base font-medium text-white">
                            N
                        </div>
                    </div>
                    <div className="grow">
                        <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Như phan</div>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 even:bg-[#f5faff]">
                    <div className="t1-flex-center w-7.5 shrink-0">
                        <div className="h-6.5 w-6.5 shrink-0 rounded-full bg-gradient-to-b from-[#D2F1D5] to-[#A5D04B] p-0.5">
                            <div className="t1-flex-center text-md h-full w-full rounded-full bg-gradient-to-b from-[#A3DF7E] to-[#027940] text-base font-medium text-white">
                                5
                            </div>
                        </div>
                    </div>
                    <div className="relative size-10 shrink-0 rounded-full bg-gradient-to-b from-[#f3f7fa] to-[#e0e7ef] p-[3px] shadow">
                        <div className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] text-base font-medium text-white">
                            N
                        </div>
                    </div>
                    <div className="grow">
                        <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Như phan</div>
                    </div>
                </div>
                <div className="text-primary-light mt-3 text-center">Bạn chưa có xếp hạng</div>
            </div>
        </div>
    );
};

export default TopStudents;
