import Image from "next/image";

const ExamCountdown = ({ className = "" }: { className?: string }) => {
    return (
        <a
            className={`relative block overflow-hidden rounded-lg border-2 border-[#459F52] bg-[#BFE7C3] p-12 ${className}`}
            href="/dem-nguoc-ky-thi-thpt"
        >
            <Image
                width={24}
                height={24}
                className="absolute top-0 left-0 w-[42%] -translate-x-[10%] -translate-y-[20%]"
                alt=""
                src="/assets/images/exam-wishes/home-count-tl.png"
            />
            <Image
                width={24}
                height={24}
                className="absolute top-0 right-0 w-[20%] translate-x-[27%] -translate-y-[13%]"
                alt=""
                src="/assets/images/exam-wishes/home-count-tr.png"
            />
            <Image
                width={24}
                height={24}
                className="absolute right-0 bottom-0 w-[42%] translate-x-[13%] translate-y-[22%]"
                alt=""
                src="/assets/images/exam-wishes/home-count-br.png"
            />
            <Image
                width={24}
                height={24}
                className="absolute bottom-0 left-0 w-[20%] -translate-x-[32%] translate-y-[15%]"
                alt=""
                src="/assets/images/exam-wishes/home-count-bl.png"
            />
            <div className="relative z-10 flex flex-col items-center gap-5 text-center">
                <div className="text-xl font-bold text-[#124E1C]">
                    Đếm ngược ngày thi
                    <br />
                    THPT QG 2025
                </div>
                <div className="t1-flex-center my-[5px] min-w-[220px] flex-col gap-1 rounded-xl bg-white py-4 text-[24px] font-bold text-[#167E5D]">
                    Đã kết thúc
                </div>
                <div
                    className="relative z-10 w-[210px] rounded-lg py-3.5 font-bold text-white hover:opacity-90"
                    style={{
                        background: "linear-gradient(90deg, rgb(37, 136, 52) 0%, rgb(28, 112, 41) 100%)",
                        boxShadow: "rgba(13, 94, 21, 0.26) 0px 0px 6px 0px",
                    }}
                >
                    Gửi đôi lời muốn nói
                </div>
            </div>
        </a>
    );
};

export default ExamCountdown;
