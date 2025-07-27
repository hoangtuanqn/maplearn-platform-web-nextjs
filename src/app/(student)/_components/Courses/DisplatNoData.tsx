import Image from "next/image";

const DisplatNoData = ({ title = "Không có dữ liệu để hiển thị" }: { title: string }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <Image
                src="/assets/images/common/study.png"
                alt="Nothing to display"
                className="w-full object-cover"
                width={887}
                height={548}
            />
            <span className="mt-8 text-center text-lg font-semibold text-[#295779]">{title}</span>
        </div>
    );
};

export default DisplatNoData;
