// Import Swiper React components
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import HeaderSection from "./HeaderSection";
import publicApi from "~/libs/apis/publicApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { UserType } from "~/schemaValidate/user.schema";
import Skeleton from "react-loading-skeleton";

const fetchTeachers = async () => {
    const res = await publicApi.get<UserType[]>("/user?filter[role]=teacher");
    return res.data;
};

const Teachers = () => {
    const { data: teachers = [], isLoading } = useQuery<UserType[]>({
        queryKey: ["teachers"],
        queryFn: fetchTeachers,
    });
    return (
        <div className="mt-3.5 bg-white px-4 py-6 shadow-sm md:rounded-xl xl:mt-6">
            <HeaderSection title="Giáo viên MapLearn" />
            <div className="overflow-hidden rounded-xl py-4">
                <Swiper
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 2.2,
                        },
                        640: {
                            slidesPerView: 4.1,
                        },
                        1024: {
                            slidesPerView: 5.7,
                        },
                        1280: {
                            slidesPerView: 6.1,
                        },
                        1536: {
                            slidesPerView: 5.5,
                        },
                    }}
                >
                    {isLoading ? (
                        // Hiển thị 6 khung skeleton trong Swiper khi đang tải
                        <>
                            {[...Array(6)].map((_, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="block !h-45 w-32 shrink-0 overflow-hidden rounded-xl pr-2"
                                >
                                    <Skeleton className="block h-full shrink-0 overflow-hidden rounded-xl" />
                                </SwiperSlide>
                            ))}
                        </>
                    ) : (
                        // Khi đã có dữ liệu
                        teachers.map(({ full_name, avatar, gender }) => (
                            <SwiperSlide key={full_name}>
                                <a href="#" className="relative block h-45 w-32 shrink-0 overflow-hidden rounded-xl">
                                    <Image
                                        src={avatar ?? ""}
                                        alt={full_name}
                                        className="aspect-[11/16] h-full w-full object-cover"
                                        width={128}
                                        height={180}
                                    />
                                    <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-[rgba(0,0,0,0.6)] from-0% via-[rgba(0,0,0,0.2)] via-30% to-transparent to-40%"></div>
                                    <span className="absolute bottom-3 w-full px-2 text-center text-xs font-medium text-white">
                                        {`${gender === "male" ? "Thầy" : "Cô"} ${full_name}`}
                                    </span>
                                </a>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default Teachers;
