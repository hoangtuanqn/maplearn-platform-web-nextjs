"use client";
import React, { useEffect, useState } from "react";
import SearchDocument from "./SearchDocument";
import { useRouter } from "next/navigation";

const tabs = [
    { key: "all", label: "Tất cả" },
    { key: "toan", label: "Toán" },
    { key: "ly", label: "Lý" },
    { key: "sinh", label: "Sinh" },
    { key: "anh", label: "Anh" },
    { key: "hoa", label: "Hoá" },
    { key: "van", label: "Văn" },
];

const SelectCourse = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("all");
    const handleChoiceTab = (tab: string) => {
        const params = new URLSearchParams(window.location.search);
        setActiveTab(tab);
        params.set("course", tab);
        if (tab === "all") {
            params.delete("course");
        }
        router.push(`/documents?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
        const onPopState = () => {
            const params = new URLSearchParams(window.location.search);
            setActiveTab(params.get("course") || "all");
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);
    return (
        <div className="flex w-full flex-col items-end lg:flex-row">
            <div
                className="relative mt-6 flex w-full flex-wrap items-center overflow-x-auto [&>button]:cursor-pointer [&>button]:border-b-gray-300"
                style={{ scrollbarWidth: "none" }}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`relative min-w-[4.7rem] border-b-[1px] py-3 ${activeTab === tab.key ? "" : ""}`}
                        onClick={() => handleChoiceTab(tab.key)}
                    >
                        {activeTab === tab.key && (
                            <div
                                className="bg-primary absolute bottom-0 left-0 h-[2px] w-full rounded-full"
                                style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
                            />
                        )}
                        <p
                            className={`text-md font-medium ${
                                activeTab === tab.key ? "text-primary" : "text-[#999999]"
                            }`}
                        >
                            {tab.label}
                        </p>
                    </button>
                ))}
            </div>
            <SearchDocument />
        </div>
    );
};

export default SelectCourse;
