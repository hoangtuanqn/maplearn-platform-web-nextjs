"use client";
import React from "react";
import Link from "next/link";
import HomeIcon from "../../Icons/HomeIcon";
import GraduationIcon from "../../Icons/GraduationIcon";
import DocumentIcon from "../../Icons/DocumentIcon";
import NewsIcon from "../../Icons/NewsIcon";
import Image from "next/image";
import HeaderLink from "./HeaderLink";
import BlurBackdrop from "../BlurBackdrop";
import { Button } from "~/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { ChevronDown } from "lucide-react";
import { useAuth } from "~/hooks/useAuth";
import DisplayAvatar from "../../DisplayAvatar";
const headerLinks = [
    {
        label: "Trang chủ",
        icon: HomeIcon,
        href: "/",
        macher: ["/"],
    },
    {
        label: "Khóa học",
        icon: GraduationIcon,
        href: "/courses",
        macher: ["/courses"],
    },
    {
        label: "Thi thử",
        icon: DocumentIcon,
        href: "/exams",
        macher: ["/exams"],
    },
    {
        label: "Tin tức",
        icon: NewsIcon,
        href: "/posts",
        macher: ["/posts", "/posts/:slug"],
    },
];
const HeaderLaptop = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const { logout } = useAuth();

    return (
        <>
            <header className="fixed top-0 z-30 hidden w-full md:block">
                <div
                    className="padding-scrollbar text-primary flex h-[56px] w-full items-center bg-white/50 backdrop-blur-md"
                    // style={{
                    //     color: "var(--primary)",
                    //     height: "56px",
                    //     backgroundColor: "rgba(255, 255, 255, 0.5)",
                    // }}
                >
                    <div className="max-w-8xl mx-auto w-full items-center px-4 pl-6.5">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center max-xl:hidden">
                                <div>
                                    <Link className="cursor-pointer" href={"/"}>
                                        <span className="sr-only">MapLearn</span>
                                        <Image
                                            width={40}
                                            height={40}
                                            className="rounded-xl object-contain"
                                            alt="Logo"
                                            src="/assets/images/logo/logo-64.png"
                                        />
                                    </Link>
                                </div>
                                {/* <div className="block w-[calc(100%-1.25rem)] pr-4 text-base"></div> */}
                                {/* <button className="flex w-48 cursor-pointer items-center justify-between"> */}
                                {/* <div className="pr-4 text-base"> */}
                                {/* <p className="line-clamp-1 w-full text-start text-[#a3b6c6]">Tìm kiếm</p> */}
                                {/* </div> */}
                                {/* <Search /> */}
                                {/* </button> */}
                            </div>
                            <div className="flex shrink-1 justify-center">
                                <div className="relative flex items-center">
                                    <div className="relative">
                                        <div data-el="portal-host" id="navigation" className="relative">
                                            <div className="mx-auto flex items-center">
                                                {headerLinks.map((link) => (
                                                    <HeaderLink key={link.href} {...link} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                {user ? (
                                    <div className="flex items-center gap-4.5">
                                        <div className="dropdown" style={{ position: "relative" }} tabIndex={0}>
                                            <div>
                                                <div className="flex cursor-pointer items-center gap-1">
                                                    <DisplayAvatar
                                                        avatar={user.avatar}
                                                        fullName={user.full_name}
                                                        ratio="10"
                                                    />
                                                    <ChevronDown />
                                                </div>
                                            </div>
                                            <div
                                                className="dropdown-menu"
                                                style={{
                                                    position: "absolute",
                                                    width: "max-content",
                                                    zIndex: 20,
                                                    top: "120%",
                                                    right: 0,
                                                    left: "auto",
                                                    transitionDuration: "150ms",
                                                    transitionTimingFunction: "ease-in-out",
                                                    opacity: 0,
                                                    visibility: "hidden",
                                                }}
                                            >
                                                <div className="w-36 rounded-lg bg-white p-1 shadow-md">
                                                    <Link href="/profile">
                                                        <button className="w-full cursor-pointer rounded-md px-2 py-1.5 text-left text-black duration-150 hover:bg-[#ededed]">
                                                            Cá nhân
                                                        </button>
                                                    </Link>
                                                    <Link href="/profile/my-courses">
                                                        <button className="w-full cursor-pointer rounded-md px-2 py-1.5 text-left text-black duration-150 hover:bg-[#ededed]">
                                                            Khóa học của tôi
                                                        </button>
                                                    </Link>
                                                    <Link href="/profile/payments">
                                                        <button className="w-full cursor-pointer rounded-md px-2 py-1.5 text-left text-black duration-150 hover:bg-[#ededed]">
                                                            Hóa đơn của tôi
                                                        </button>
                                                    </Link>
                                                    <button
                                                        className="w-full cursor-pointer rounded-md px-2 py-1.5 text-left text-red-500 duration-150 hover:bg-[#ededed]"
                                                        onClick={() => logout()}
                                                    >
                                                        Đăng xuất
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    zIndex: 10,
                                                    opacity: 0,
                                                    width: "100%",
                                                    top: "100%",
                                                    height: "20%",
                                                    visibility: "hidden",
                                                }}
                                            ></div>
                                            <style>
                                                {`
                                                .dropdown:hover .dropdown-menu,
                                                .dropdown:focus-within .dropdown-menu {
                                                    opacity: 1 !important;
                                                    visibility: visible !important;
                                                    transform: scale(1) !important;
                                                }
                                            `}
                                            </style>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Link href={"/auth/register"}>
                                            <Button className="cursor-pointer text-white">Đăng ký</Button>
                                        </Link>
                                        <Link href={"/auth/login"}>
                                            <Button variant={"outline"} className="cursor-pointer">
                                                Đăng nhập
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full"></div>
            </header>
            <BlurBackdrop />
        </>
    );
};

export default HeaderLaptop;
