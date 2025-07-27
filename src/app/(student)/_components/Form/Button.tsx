import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode; // Nội dung trong button
    className?: string; // Custom class ngoài
}

const Button = ({ children, className = "", type = "button", ...props }: ButtonProps) => {
    return (
        <button
            type={type}
            className={`bg-primary hover:bg-primary-light t1-flex-center mx-auto w-fit cursor-pointer rounded-xl border-2 border-transparent px-10 py-2 whitespace-nowrap text-white shadow-sm duration-150 ease-out ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
