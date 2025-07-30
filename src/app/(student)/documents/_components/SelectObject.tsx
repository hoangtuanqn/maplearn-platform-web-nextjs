import { GraduationCap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const objectTabs = [
    { key: "dgtd", label: "DGTD" },
    { key: "dgnl", label: "DGNL" },
    { key: "lop12", label: "Lớp 12" },
    { key: "lop11", label: "Lớp 11" },
    { key: "lop10", label: "Lớp 10" },
];

const SelectObject = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("all");
    const handleChoiceTab = (tab: string) => {
        const params = new URLSearchParams(window.location.search);
        setActiveTab(tab);
        params.set("subject", tab);
        if (tab === "all") {
            params.delete("subject");
        }
        router.push(`/documents?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
        const onPopState = () => {
            const params = new URLSearchParams(window.location.search);
            setActiveTab(params.get("subject") || "all");
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    return (
        <div className="mt-6 flex flex-wrap gap-2 text-xs lg:text-sm xl:gap-4 [&>button]:flex [&>button]:gap-2">
            {objectTabs.map((tab) => (
                <button
                    key={tab.key}
                    className={`t1-flex-center flex w-fit cursor-pointer rounded-xl bg-[#F0F3F7] px-5 py-3 font-semibold text-gray-600 ${activeTab === tab.key ? "bg-primary text-white" : ""}`}
                    onClick={() => handleChoiceTab(tab.key)}
                >
                    <GraduationCap /> {tab.label}
                </button>
            ))}
        </div>
    );
};

export default SelectObject;
