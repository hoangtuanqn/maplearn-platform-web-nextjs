import React from "react";
import MapLearnIcon from "../../_components/Icons/MapLearnIcon";

const SelectCategory = ({ url }: { url: string }) => {
    return (
        <>
            {[...Array(10)].map((_, index) => (
                <div
                    key={index}
                    className="group hover:bg-primary t1-flex-center cursor-pointer gap-3.5 rounded-xl bg-[#eaf0f9] px-4 py-5.5 shadow-sm duration-200 hover:text-white"
                >
                    <div className="t1-flex-center bg-primary group-hover:text-primary size-10 rounded-full text-white duration-200 group-hover:bg-white">
                        <MapLearnIcon />
                    </div>

                    <div>
                        <p className="text-primary font-bold uppercase group-hover:text-white">
                            2k8 - Xuất phát sớm lớp 12
                        </p>
                        <span className="text-sm text-gray-500 group-hover:text-white">MapLearn</span>
                    </div>
                </div>
            ))}
        </>
    );
};

export default SelectCategory;
