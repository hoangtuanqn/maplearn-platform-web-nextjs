import React from "react";

const NumericInput = () => {
    return (
        <div className="flex items-center gap-2 text-xs">
            <span>Câu trả lời: </span>
            <div>
                <input className="focus:border-primary w-full border-b border-gray-300 py-1 outline-none" />
            </div>
        </div>
    );
};

export default NumericInput;
