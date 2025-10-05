import React from "react";
import { MapPin, Target, TrendingUp, ArrowRight, Sparkles, Star } from "lucide-react";
import Link from "next/link";

const Roadmap = () => {
    return (
        <section className="relative mt-3.5 overflow-hidden border border-blue-100/60 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 px-4 py-6 shadow-lg md:rounded-xl xl:mt-6">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-gradient-to-tr from-cyan-400/10 to-blue-500/10 blur-2xl"></div>
            <div className="absolute top-4 left-4 text-blue-200/40">
                <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div className="absolute right-4 bottom-4 text-indigo-200/40">
                <Star className="h-5 w-5 animate-bounce" />
            </div>

            {/* Header */}
            <div className="relative z-10 mb-4">
                <div className="t1-flex-center justify-between">
                    <div className="t1-flex-center gap-2">
                        <div className="h-4 w-1 rounded-full bg-gradient-to-b from-[#3899D1] to-[#1C51CA] shadow-sm"></div>
                        <h3 className="block-heading relative font-extrabold uppercase">
                            <span className="bg-[linear-gradient(90deg,_#3899D1_13.99%,_#1C51CA_104.92%)] bg-clip-text font-bold text-transparent drop-shadow-sm">
                                Lộ trình học tập
                            </span>
                            <div className="absolute -top-1 -right-2 h-2 w-2 animate-ping rounded-full bg-yellow-400"></div>
                        </h3>
                    </div>
                </div>
            </div>

            {/* Enhanced Content */}
            <div className="relative z-10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
                    {/* Left Content */}
                    <div className="flex-1">
                        <h4 className="relative mb-2 text-lg font-bold text-gray-800 md:text-xl">
                            Chưa biết bắt đầu hành trình học tập sao cho{" "}
                            <span className="relative bg-[linear-gradient(90deg,_#3899D1_13.99%,_#1C51CA_104.92%)] bg-clip-text text-transparent">
                                tối ưu
                                <div className="absolute right-0 -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-[#3899D1] to-[#1C51CA] opacity-30"></div>
                            </span>
                            ?
                        </h4>
                        <p className="mb-4 text-sm leading-relaxed text-gray-600">
                            Hãy để <span className="font-semibold text-blue-600">MapLearn</span> giúp bạn xây dựng lộ
                            trình học tập phù hợp và khoa học.
                        </p>

                        {/* Enhanced Features */}
                        <div className="mb-4 flex flex-wrap gap-4">
                            <div className="group flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#3899D1] to-[#1C51CA] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                                    <Target className="h-4 w-4 text-white group-hover:animate-pulse" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-800">
                                    Xác định mục tiêu
                                </span>
                            </div>
                            <div className="group flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#3899D1] to-[#1C51CA] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                                    <MapPin className="h-4 w-4 text-white group-hover:animate-pulse" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-800">
                                    Lộ trình cá nhân
                                </span>
                            </div>
                            <div className="group flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#3899D1] to-[#1C51CA] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                                    <TrendingUp className="h-4 w-4 text-white group-hover:animate-pulse" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-800">
                                    Theo dõi tiến độ
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced CTA */}
                    <div className="lg:flex-shrink-0">
                        <Link href="/roadmap" className="lg:inline-block">
                            <button
                                type="button"
                                className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#3899D1] to-[#1C51CA] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-[#4BA5DC] hover:to-[#2C5FD4] hover:shadow-xl active:scale-[0.98] lg:w-auto"
                            >
                                {/* Button glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                <span className="relative z-10">Tạo lộ trình học tập ngay</span>
                                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

                                {/* Sparkle effect */}
                                <div className="absolute top-1 right-1 h-1 w-1 animate-ping rounded-full bg-white opacity-0 group-hover:opacity-100"></div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
