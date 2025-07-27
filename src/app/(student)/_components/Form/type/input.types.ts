import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string; // Thông báo lỗi
    wrapperClassName?: string; // Class cho wrapper
    errorClassName?: string; // Class cho error
}
