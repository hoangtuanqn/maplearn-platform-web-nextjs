import { GraduationCap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gradesLevelApi } from "~/apiRequest/gradesLevel";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const SelectObject = () => {
    const { data: objects, isLoading } = useQuery({
        queryKey: ["user/objects"],
        queryFn: async () => {
            const response = await gradesLevelApi.getGradesLevels();
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("all");
    const handleChoiceTab = (tab: string) => {
        const params = new URLSearchParams(window.location.search);
        setActiveTab(tab);
        params.set("grade_level", tab);
        if (tab === "all") {
            params.delete("grade_level");
        }
        router.push(`/documents?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
        const onPopState = () => {
            const params = new URLSearchParams(window.location.search);
            setActiveTab(params.get("grade_level") || "all");
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    return (
        <>
            {isLoading && (
                <div className="mt-6 flex w-full lg:mr-8">
                    <div className="flex-1">
                        <Skeleton height={44} className="!w-full !rounded-xl" />
                    </div>
                </div>
            )}
            <div className="mt-6 flex flex-wrap gap-2 text-xs lg:text-sm xl:gap-4 [&>button]:flex [&>button]:gap-2">
                {objects?.map((tab) => (
                    <button
                        key={tab.id}
                        className={`t1-flex-center flex w-fit cursor-pointer rounded-xl bg-[#F0F3F7] px-5 py-3 font-semibold text-gray-600 ${activeTab === tab.slug ? "bg-primary text-white" : ""}`}
                        onClick={() => handleChoiceTab(tab.slug)}
                    >
                        <GraduationCap /> {tab.name}
                    </button>
                ))}
            </div>
        </>
    );
};

export default SelectObject;
