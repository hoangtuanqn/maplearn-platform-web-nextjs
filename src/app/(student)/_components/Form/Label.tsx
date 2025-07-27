import React from "react";
import { LabelType } from "./type/lable.type";

const Label = ({ children, id = "", required = false, className = "", ...props }: LabelType) => {
    return (
        <label htmlFor={id} className={`mb-1.5 block text-sm font-medium text-gray-700 ${className}`} {...props}>
            {children} {required && <span className="text-red-400">*</span>}
        </label>
    );
};

export default Label;
