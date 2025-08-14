"use client";
import { useQuery } from "@tanstack/react-query";
import { CirclePlay, Clock, Disc, OctagonMinus, PenTool, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import examApi from "~/apiRequest/exam";
import { AnswerLocalStorage } from "~/app/(student)/exams/[slug]/doing/exam.type";
import useCountDown from "~/hooks/useCountDown";
import { formatter } from "~/libs/format";
import { getLocalStorage } from "~/libs/localStorage";
const DetailExamPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [infoExam, setInfoExam] = useState<AnswerLocalStorage>();
    const { timeLeft, setTimeLeft } = useCountDown(0);
    const { data: exam, isLoading } = useQuery({
        queryKey: ["exam", "questions", slug],
        queryFn: async () => {
            const res = await examApi.getQuestions(slug);
            return res.data.data;
        },
    });
    // Lấy dữ liệu từ localStorage khi load lần đầu
    useEffect(() => {
        const dataStr = getLocalStorage(slug);
        if (dataStr && exam) {
            const data: AnswerLocalStorage = JSON.parse(dataStr);
            setInfoExam(data);
            if (data.start) {
                const durationSec = exam.duration_minutes * 60;
                const passedSec = Math.floor((Date.now() - data.start) / 1000);
                setTimeLeft(Math.max(durationSec - passedSec, 0));
            }
        }
    }, [exam, setTimeLeft, slug]);
    return (
        <section className="mt-10 flex min-h-screen gap-4 px-4 pb-10">
            <section className="flex-1">
                <section className="space-y-4 rounded-lg bg-white px-6 py-4 shadow-sm">
                    <h1 className="text-primary text-xl font-bold">{exam?.title}</h1>
                    <div className="space-y-3 text-[13.125px]">
                        <div className="flex items-center gap-1">
                            <PenTool className="text-primary" />
                            <span>Tổng số câu: {exam?.questions.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="text-primary" />
                            <span>Thời gian làm bài: {exam?.duration_minutes} phút</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Play className="text-primary" />
                            <span>Đề thi bắt đầu vào thúc: 11:10 - 30/7/2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <OctagonMinus className="text-primary" />
                            <span>Đề thi kết thúc vào thúc: 11:10 - 30/10/2025</span>
                        </div>
                    </div>
                    <div className="text-md mt-8 grid w-full grid-cols-3 justify-end gap-3">
                        {infoExam && (
                            <Link
                                href={`/exams/${slug}/doing`}
                                className="t1-flex-center bg-primary col-start-2 h-[3.25rem] w-full cursor-pointer gap-2 rounded-full"
                            >
                                <Disc className="size-5 text-white" />
                                <span className="font-medium text-white">
                                    Làm tiếp ({formatter.parseMinutesSeconds(timeLeft)})
                                </span>
                            </Link>
                        )}

                        <Link
                            className="t1-flex-center col-start-3 h-[3.25rem] w-full cursor-pointer gap-2 rounded-full bg-[#12AD50]"
                            href={`/exams/${slug}/doing`}
                        >
                            <CirclePlay className="size-5 text-white" />
                            {infoExam ? (
                                <span className="font-medium text-white">Làm lại từ đầu</span>
                            ) : (
                                <span className="font-medium text-white">Vào phòng thi</span>
                            )}
                        </Link>
                    </div>

                    <div className="mb-2.5 w-full rounded-lg bg-sky-300/20 p-6 text-justify shadow-sm">
                        <div className="mb-1 text-base font-bold text-blue-500">Hướng dẫn làm bài:</div>
                        <div className="flex flex-col gap-1">
                            <div>
                                * Bài thi TSA gồm năm dạng câu hỏi trắc nghiệm, thí sinh sử dụng chuột, bàn phím để trả
                                lời các câu hỏi khác nhau.
                            </div>
                            <div>
                                * Đối với ba dạng câu hỏi: <b>câu hỏi chọn một trong nhiều đáp án</b>,{" "}
                                <b>câu hỏi dạng nhiều đáp án đúng</b> , <b>câu hỏi đúng sai</b> thí sinh dùng chuột để
                                chọn đáp án đúng.
                            </div>
                            <div>
                                * Đối với dạng câu hỏi kéo thả thí sinh dùng chuột để chọn và đưa đáp án vào ô trả lời
                            </div>
                            <div>
                                * Đối với các câu hỏi điền đáp án, thí sinh nhập đáp án vào ô trống dạng số thập phân,
                                nguyên dương, nguyên âm, cụm từ (Ví dụ: -1, 1, 1,2, -1,2) và{" "}
                                <strong>không nhập đơn vị vào đáp án</strong>.
                                <div className="pl-4">
                                    • Ví dụ số âm: <strong className="text-sm text-red-600">-1; -1,23</strong>
                                </div>
                                <div className="pl-4">
                                    • Ví dụ số thập phân: <strong className="text-sm text-red-600">1,2; -1,234</strong>
                                </div>
                            </div>
                            <div>
                                * Đối với các câu hỏi có nhiều ý, ví dụ như những câu hỏi có nhiều đáp án đúng, thí sinh
                                phải trả lời <strong>đúng tất cả các ý thì mới được tính điểm</strong> cho câu hỏi đó.
                                Hãy thận trọng trước khi lựa chọn đáp án của mình.
                            </div>
                        </div>
                        <div className="mt-2 mb-2 text-base font-bold text-blue-500 not-italic">
                            Tiến trình làm bài thi trên máy tính:
                        </div>
                        <div>
                            Khi <strong>BẮT ĐẦU</strong> làm bài, màn hình máy tính sẽ hiển thị phần thi thứ nhất:
                        </div>
                        <div className="mt-3 italic">
                            <strong>Phần 1: </strong>Tư duy toán học (40 câu hỏi - 60 phút)
                        </div>
                        <div>
                            Thí sinh làm lần lượt các câu hỏi. Nếu bạn kết thúc phần 1 trước thời gian quy định. Bạn có
                            thể nhấn nộp bài chuyển sang phần thi thứ hai. Khi hết thời gian phần 1, máy tính sẽ tự động
                            chuyển sang phần thi thứ hai.
                        </div>
                        <div className="mt-3 italic">
                            <strong>Phần 2: </strong>Tư duy đọc hiểu (20 câu hỏi - 1 phút)
                        </div>
                        <div>
                            Các câu hỏi sẽ được chia theo từng nhóm chủ đề. Nếu bạn kết thúc phần 2 trước thời gian quy
                            định, bạn có thể nhấn nộp bài chuyển sang phần thi thứ ba. Khi hết thời gian quy định, máy
                            tính sẽ tự động chuyển sang phần thi thứ ba.
                        </div>
                        <div className="mt-3 italic">
                            <strong>Phần 3: </strong>Khoa học/ giải quyết vấn đề (40 câu hỏi - 5 phút)
                        </div>
                        <div>
                            Các câu hỏi sẽ được chia theo từng nhóm chủ đề. Nếu bạn kết thúc phần 3 trước thời gian quy
                            định, bạn có thể bấm NỘP BÀI để hoàn thành bài thi sớm. Khi hết thời gian theo quy định, máy
                            tính sẽ tự động NỘP BÀI.
                        </div>
                        <div>
                            Khi <span className="font-black text-red-500">KẾT THÚC</span> bài thi, màn hình máy tính sẽ
                            hiển thị kết quả thi của bạn.
                        </div>
                    </div>
                    <div className="mb-2.5 w-full rounded-lg p-4 text-justify text-sm text-red-500 italic">
                        <strong className="block pb-2 text-base">Lưu ý làm bài thi:</strong>
                        <div>* Chỉ phiên làm bài đầu tiên mới được tính xếp hạng.</div>
                        <div>
                            * Một bài thi được coi là hợp lệ để tính xếp hạng khi không có gian lận (Không làm bài cùng
                            1 lúc trên nhiều trình duyệt, không di chuyển sang các tab khác nhiều lần khi đang làm bài
                            ...).
                        </div>
                        <div>
                            * Khi đang trong 1 phiên làm bài thi được tính xếp hạng và bị out ra, hãy vào lại đề thi và
                            chọn tiếp tục làm bài, chọn <b>Làm lại từ đầu</b> sẽ huỷ kết quả và không được tính xếp
                            hạng.
                        </div>
                    </div>
                </section>
                <section className="mt-5 min-h-40 rounded-xl bg-white p-6 shadow-sm">
                    <h2 className="text-primary text-base font-bold">Lịch sử làm bài</h2>
                    <div className="mt-5">Chưa có lịch sử bài làm</div>
                </section>
            </section>
            <div className="sticky top-[70px] h-fit w-96 rounded-xl bg-white py-4 shadow-sm">
                <h2 className="text-primary mb-2 px-4 text-base font-bold">Bảng xếp hạng</h2>
                <div className="mt-2">
                    <div className="flex items-center gap-3.5 py-3 pr-6 pl-5 even:bg-[#F3F7FA]">
                        <div className="t1-flex-center w-7.5 shrink-0">
                            <div className="h-8.5 w-8.5 shrink-0 rounded-full bg-gradient-to-b from-[#FFEDB7] to-[#FF9800] p-0.5">
                                <div className="t1-flex-center h-full w-full rounded-full bg-gradient-to-b from-[#F32114] to-[#880404] text-[1.25rem] font-medium text-white">
                                    1
                                </div>
                            </div>
                        </div>
                        <div className="relative h-11 w-11 shrink-0 rounded-full bg-gradient-to-b from-[#FFEDB7] to-[#FF9B08] p-[3px] shadow-md">
                            <Image
                                alt="Phạm Hoàng Tuấn"
                                className="h-full w-full shrink-0 rounded-full object-cover"
                                width={32.5}
                                height={32.5}
                                src="https://res.cloudinary.com/dbu1zfbhv/image/upload/v1755032358/avatar/urwizwtbosve0rg7miq2.jpg"
                            />
                            <div className="t1-flex-center absolute inset-x-0 -top-6">
                                <svg
                                    // width={25}
                                    // height={16}
                                    className="size-8"
                                    viewBox="0 0 20 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.47403 3.06079L9.99991 8.15717V11.725L3.55322 9.64163L5.47403 3.06079Z"
                                        fill="url(#paint0_linear_842_1441)"
                                    />
                                    <path
                                        d="M14.5259 3.06079L10 8.15717V11.725L16.4467 9.64163L14.5259 3.06079Z"
                                        fill="url(#paint1_linear_842_1441)"
                                    />
                                    <path
                                        d="M15.6652 13V11.725L10 11L4.33838 11.725V13L7.36175 12.733C9.11717 12.578 10.8828 12.5779 12.6383 12.7328L15.6652 13Z"
                                        fill="url(#paint2_linear_842_1441)"
                                    />
                                    <path
                                        d="M13.4353 7.7125L10.0001 1.40356L6.56831 7.7125L1.3269 3.88745L4.33837 11.7249L7.46052 11.3251C9.14666 11.1092 10.8535 11.1092 12.5396 11.3249L15.6652 11.7249L18.6767 3.88745L13.4353 7.7125Z"
                                        fill="url(#paint3_linear_842_1441)"
                                    />
                                    <path
                                        d="M11.3268 1.40362C11.3268 0.628321 10.7328 0 9.99995 0C9.26705 0 8.6731 0.628321 8.6731 1.40362C8.6731 2.17891 9.26705 2.80724 9.99995 2.80724C10.7328 2.80724 11.3268 2.17891 11.3268 1.40362Z"
                                        fill="url(#paint4_linear_842_1441)"
                                    />
                                    <path
                                        d="M19.9999 3.8875C19.9999 3.11221 19.4059 2.48389 18.673 2.48389C17.9401 2.48389 17.3462 3.11221 17.3462 3.8875C17.3462 4.6628 17.9401 5.29112 18.673 5.29112C19.4059 5.29112 19.9999 4.6628 19.9999 3.8875Z"
                                        fill="url(#paint5_linear_842_1441)"
                                    />
                                    <path
                                        d="M2.65028 3.8875C2.65028 3.11221 2.05632 2.48389 1.32343 2.48389C0.590538 2.48389 -0.00341797 3.11221 -0.00341797 3.8875C-0.00341797 4.6628 0.590538 5.29112 1.32343 5.29112C2.05632 5.29112 2.65028 4.6628 2.65028 3.8875Z"
                                        fill="url(#paint6_linear_842_1441)"
                                    />
                                    <path
                                        d="M9.9999 6.56616L8.87451 8.46215L9.9999 10.3581L11.1253 8.46215L9.9999 6.56616Z"
                                        fill="#FF2929"
                                    />
                                    <path
                                        d="M9.99995 6.56616L9.81934 8.46215L9.99995 10.3581L11.1253 8.46215L9.99995 6.56616Z"
                                        fill="#C40101"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_842_1441"
                                            x1="6.77656"
                                            y1="-1.06923"
                                            x2="6.77656"
                                            y2="9.186"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0.01" stopColor="#FED33C" />
                                            <stop offset="0.16" stopColor="#FEC831" />
                                            <stop offset="0.71" stopColor="#FEA50D" />
                                            <stop offset={1} stopColor="#FF9800" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_842_1441"
                                            x1="13.2233"
                                            y1="2.21177e-05"
                                            x2="13.2233"
                                            y2="2.21177e-05"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0.01" stopColor="#FED33C" />
                                            <stop offset="0.16" stopColor="#FEC831" />
                                            <stop offset="0.71" stopColor="#FEA50D" />
                                            <stop offset={1} stopColor="#FF9800" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint2_linear_842_1441"
                                            x1="10.0001"
                                            y1="11.3906"
                                            x2="10.0001"
                                            y2="13.1764"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0.01" stopColor="#FED33C" />
                                            <stop offset="0.16" stopColor="#FEC831" />
                                            <stop offset="0.71" stopColor="#FEA50D" />
                                            <stop offset={1} stopColor="#FF9800" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint3_linear_842_1441"
                                            x1="10.0001"
                                            y1="2.06496"
                                            x2="10.0001"
                                            y2="13.1873"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0.01" stopColor="#FED33C" />
                                            <stop offset="0.16" stopColor="#FEC831" />
                                            <stop offset="0.71" stopColor="#FEA50D" />
                                            <stop offset={1} stopColor="#FF9800" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint4_linear_842_1441"
                                            x1="9.99995"
                                            y1="-0.143301"
                                            x2="9.99995"
                                            y2="2.56105"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0.01" stopColor="#FED33C" />
                                            <stop offset="0.16" stopColor="#FEC831" />
                                            <stop offset="0.71" stopColor="#FEA50D" />
                                            <stop offset={1} stopColor="#FF9800" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint5_linear_842_1441"
                                            x1="18.6765"
                                            y1="2.49124"
                                            x2="18.6765"
                                            y2="5.51159"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0.01" stopColor="#FED33C" />
                                            <stop offset="0.16" stopColor="#FEC831" />
                                            <stop offset="0.71" stopColor="#FEA50D" />
                                            <stop offset={1} stopColor="#FF9800" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint6_linear_842_1441"
                                            x1="1.32691"
                                            y1="2.34793"
                                            x2="1.32691"
                                            y2="5.12577"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0.01" stopColor="#FED33C" />
                                            <stop offset="0.16" stopColor="#FEC831" />
                                            <stop offset="0.71" stopColor="#FEA50D" />
                                            <stop offset={1} stopColor="#FF9800" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="grow">
                            <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Phạm Hoàng Tuấn</div>
                            <div className="text-cp text-[#7B7B7B]">0 giây</div>
                        </div>
                        <div className="ml-3 shrink-0 text-[#189BD3]">
                            <span className="text-base font-bold text-[#F32114]">10</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3.5 py-3 pr-6 pl-5 even:bg-[#F3F7FA]">
                        <div className="t1-flex-center w-7.5 shrink-0">
                            <div className="h-7.5 w-7.5 shrink-0 rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#B4B5B7] p-0.5">
                                <div className="t1-flex-center h-full w-full rounded-full bg-gradient-to-b from-[#8CB5E9] to-[#0034DF] text-base font-medium text-white">
                                    2
                                </div>
                            </div>
                        </div>
                        <div className="relative h-11 w-11 shrink-0 rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#B3B3B3] p-[3px] shadow-md">
                            <div
                                className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] font-medium text-white"
                                style={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
                            >
                                K
                            </div>
                        </div>
                        <div className="grow">
                            <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Nguyễn Đức Anh Kiệt</div>
                            <div className="text-cp text-[#7B7B7B]">1 phút 23 giây </div>
                        </div>
                        <div className="ml-3 shrink-0 text-[#189BD3]">
                            <span className="text-base font-bold text-[#3d82dc]">10</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3.5 py-3 pr-6 pl-5 even:bg-[#F3F7FA]">
                        <div className="t1-flex-center w-7.5 shrink-0">
                            <div className="h-7.5 w-7.5 shrink-0 rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#B4B5B7] p-0.5">
                                <div className="t1-flex-center h-full w-full rounded-full bg-gradient-to-b from-[#8CB5E9] to-[#0034DF] text-base font-medium text-white">
                                    3
                                </div>
                            </div>
                        </div>
                        <div className="relative h-11 w-11 shrink-0 rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#B3B3B3] p-[3px] shadow-md">
                            <div
                                className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] font-medium text-white"
                                style={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
                            >
                                N
                            </div>
                        </div>
                        <div className="grow">
                            <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Như phan</div>
                            <div className="text-cp text-[#7B7B7B]">28 phút 47 giây </div>
                        </div>
                        <div className="ml-3 shrink-0 text-[#189BD3]">
                            <span className="text-base font-bold text-[#3d82dc]">9.25</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3.5 py-3 pr-6 pl-5 even:bg-[#F3F7FA]">
                        <div className="t1-flex-center w-7.5 shrink-0">
                            <div className="h-6.5 w-6.5 shrink-0 rounded-full bg-gradient-to-b from-[#D2F1D5] to-[#A5D04B] p-0.5">
                                <div className="t1-flex-center text-md h-full w-full rounded-full bg-gradient-to-b from-[#A3DF7E] to-[#027940] font-medium text-white">
                                    4
                                </div>
                            </div>
                        </div>
                        <div className="relative h-11 w-11 shrink-0 rounded-full bg-gradient-to-b from-[#D4F2D9] to-[#63AD4C] p-[3px] shadow-md">
                            <div
                                className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] font-medium text-white"
                                style={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
                            >
                                X
                            </div>
                        </div>
                        <div className="grow">
                            <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Lương Ngọc My </div>
                            <div className="text-cp text-[#7B7B7B]">20 phút 16 giây </div>
                        </div>
                        <div className="ml-3 shrink-0 text-[#189BD3]">
                            <span className="text-base font-bold text-[#4cc533]">8.5</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3.5 py-3 pr-6 pl-5 even:bg-[#F3F7FA]">
                        <div className="t1-flex-center w-7.5 shrink-0">
                            <div className="h-6.5 w-6.5 shrink-0 rounded-full bg-gradient-to-b from-[#D2F1D5] to-[#A5D04B] p-0.5">
                                <div className="t1-flex-center text-md h-full w-full rounded-full bg-gradient-to-b from-[#A3DF7E] to-[#027940] font-medium text-white">
                                    5
                                </div>
                            </div>
                        </div>
                        <div className="relative h-11 w-11 shrink-0 rounded-full bg-gradient-to-b from-[#D4F2D9] to-[#63AD4C] p-[3px] shadow-md">
                            <div
                                className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] font-medium text-white"
                                style={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
                            >
                                T
                            </div>
                        </div>
                        <div className="grow">
                            <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Tống Quốc Anh Tài</div>
                            <div className="text-cp text-[#7B7B7B]">30 phút 18 giây </div>
                        </div>
                        <div className="ml-3 shrink-0 text-[#189BD3]">
                            <span className="text-base font-bold text-[#4cc533]">8.25</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3.5 py-3 pr-6 pl-5 even:bg-[#F3F7FA]">
                        <div className="t1-flex-center w-7.5 shrink-0">
                            <div className="h-6.5 w-6.5 shrink-0 rounded-full bg-gradient-to-b from-[#fff] to-[#fff] p-0.5">
                                <div className="t1-flex-center text-md h-full w-full rounded-full bg-gradient-to-b from-[#d8d8d8] to-[#aeaeae] font-medium text-white">
                                    6
                                </div>
                            </div>
                        </div>
                        <div className="relative h-11 w-11 shrink-0 rounded-full bg-white p-[3px] shadow-md">
                            <div
                                className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] font-medium text-white"
                                style={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
                            >
                                M
                            </div>
                        </div>
                        <div className="grow">
                            <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Trần Nhật Tân </div>
                            <div className="text-cp text-[#7B7B7B]">30 phút 24 giây </div>
                        </div>
                        <div className="ml-3 shrink-0 text-[#189BD3]">
                            <span className="text-base font-bold text-gray-500">8.25</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3.5 py-3 pr-6 pl-5 even:bg-[#F3F7FA]">
                        <div className="t1-flex-center w-7.5 shrink-0">
                            <div className="h-6.5 w-6.5 shrink-0 rounded-full bg-gradient-to-b from-[#fff] to-[#fff] p-0.5">
                                <div className="t1-flex-center text-md h-full w-full rounded-full bg-gradient-to-b from-[#d8d8d8] to-[#aeaeae] font-medium text-white">
                                    7
                                </div>
                            </div>
                        </div>
                        <div className="relative h-11 w-11 shrink-0 rounded-full bg-white p-[3px] shadow-md">
                            <div
                                className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] font-medium text-white"
                                style={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
                            >
                                W
                            </div>
                        </div>
                        <div className="grow">
                            <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Quỳnh Trang</div>
                            <div className="text-cp text-[#7B7B7B]">53 phút 25 giây </div>
                        </div>
                        <div className="ml-3 shrink-0 text-[#189BD3]">
                            <span className="text-base font-bold text-gray-500">8.25</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3.5 py-3 pr-6 pl-5 even:bg-[#F3F7FA]">
                        <div className="t1-flex-center w-7.5 shrink-0">
                            <div className="h-6.5 w-6.5 shrink-0 rounded-full bg-gradient-to-b from-[#fff] to-[#fff] p-0.5">
                                <div className="t1-flex-center text-md h-full w-full rounded-full bg-gradient-to-b from-[#d8d8d8] to-[#aeaeae] font-medium text-white">
                                    8
                                </div>
                            </div>
                        </div>
                        <div className="relative h-11 w-11 shrink-0 rounded-full bg-white p-[3px] shadow-md">
                            <div
                                className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] font-medium text-white"
                                style={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
                            >
                                H
                            </div>
                        </div>
                        <div className="grow">
                            <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Vũ Hoàng Linh</div>
                            <div className="text-cp text-[#7B7B7B]">26 phút </div>
                        </div>
                        <div className="ml-3 shrink-0 text-[#189BD3]">
                            <span className="text-base font-bold text-gray-500">8</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3.5 py-3 pr-6 pl-5 even:bg-[#F3F7FA]">
                        <div className="t1-flex-center w-7.5 shrink-0">
                            <div className="h-6.5 w-6.5 shrink-0 rounded-full bg-gradient-to-b from-[#fff] to-[#fff] p-0.5">
                                <div className="t1-flex-center text-md h-full w-full rounded-full bg-gradient-to-b from-[#d8d8d8] to-[#aeaeae] font-medium text-white">
                                    9
                                </div>
                            </div>
                        </div>
                        <div className="relative h-11 w-11 shrink-0 rounded-full bg-white p-[3px] shadow-md">
                            <div
                                className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] font-medium text-white"
                                style={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
                            >
                                L
                            </div>
                        </div>
                        <div className="grow">
                            <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Ngô Trần Lộc</div>
                            <div className="text-cp text-[#7B7B7B]">23 phút 27 giây </div>
                        </div>
                        <div className="ml-3 shrink-0 text-[#189BD3]">
                            <span className="text-base font-bold text-gray-500">7.75</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3.5 py-3 pr-6 pl-5 even:bg-[#F3F7FA]">
                        <div className="t1-flex-center w-7.5 shrink-0">
                            <div className="h-6.5 w-6.5 shrink-0 rounded-full bg-gradient-to-b from-[#fff] to-[#fff] p-0.5">
                                <div className="t1-flex-center text-md h-full w-full rounded-full bg-gradient-to-b from-[#d8d8d8] to-[#aeaeae] font-medium text-white">
                                    10
                                </div>
                            </div>
                        </div>
                        <div className="relative h-11 w-11 shrink-0 rounded-full bg-white p-[3px] shadow-md">
                            <div
                                className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] font-medium text-white"
                                style={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
                            >
                                H
                            </div>
                        </div>
                        <div className="grow">
                            <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">Hồ Anh Khoa</div>
                            <div className="text-cp text-[#7B7B7B]">25 phút 21 giây </div>
                        </div>
                        <div className="ml-3 shrink-0 text-[#189BD3]">
                            <span className="text-base font-bold text-gray-500">7.75</span>
                        </div>
                    </div>
                    <div className="t1-flex-center text-primary-light relative bottom-2 -mb-3 h-12 text-4xl">. . .</div>
                    <div className="text-primary-light mt-3 text-center">73 kết quả</div>
                </div>
            </div>
            {/* <ExamList /> */}
        </section>
    );
};

export default DetailExamPage;
