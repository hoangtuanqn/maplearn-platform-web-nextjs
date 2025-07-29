"use client";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";
import { getCharacterName, getGender } from "~/libs/hepler";

const ShowProfile = () => {
    const { user: profile } = useAuth();
    if (!profile) return;
    return (
        <>
            <div className="flex w-fit flex-col gap-4 font-medium">
                <div className="mb-5 flex items-center gap-8">
                    <div
                        className="t1-flex-center text- h-24 w-24 shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] text-3xl leading-12 font-medium text-white"
                        // style={{
                        //     width: "7rem",
                        //     height: "7rem",
                        //     fontSize: "calc(3.5rem)",
                        //     lineHeight: "calc(3.5rem)",
                        // }}
                    >
                        {getCharacterName(profile.full_name || null)}
                    </div>
                    <div className="flex flex-col gap-3 leading-5 font-normal">
                        <Link href="/profile/edit">
                            <Button className="px-5 text-white">Chỉnh sửa thông tin</Button>
                        </Link>
                        <Link href="/profile/change-password">
                            <Button variant={"outline"} className="px-5">
                                Thay đổi mật khẩu
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-48 text-gray-400">Họ và tên</div>
                    <div>{profile.full_name}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-48 text-gray-400">Tài khoản</div>
                    <div>{profile.username}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-48 text-gray-400">Email</div>
                    <div>{profile.email}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-48 text-gray-400">Số điện thoại</div>
                    <div>{profile.phone_number}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-48 text-gray-400">Giới tính</div>
                    <div>{getGender(profile.gender)}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-48 text-gray-400">Năm sinh</div>
                    <div>{profile.birth_year}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-48 text-gray-400">Tỉnh thành</div>
                    <div>{profile.city}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-48 text-gray-400">Trường học</div>
                    <div>{profile.school}</div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-48 text-gray-400">Link Facebook</div>
                    <Link
                        href={profile.facebook_link ?? ""}
                        target="_blank"
                        className="text-primary break-all duration-75 hover:opacity-75"
                    >
                        {profile.facebook_link}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ShowProfile;
