import { InputProps } from "./type/input.types";

const Input = ({
    error,
    wrapperClassName,
    errorClassName,
    type = "text",
    className, // className của input cũng có thể truyền từ ngoài
    disabled = false,
    ...props
}: InputProps) => {
    return (
        <div>
            <div className={`flex h-11 w-full items-center rounded-xl bg-[#F2F5F9] ${wrapperClassName}`}>
                <input
                    type={type}
                    className={`h-full grow rounded-xl !px-4 outline-0 placeholder:text-[#99AEBE] ${error ? `border-1 border-red-400` : ``} ${disabled ? `cursor-not-allowed bg-gray-300` : `bg-transparent`} ${className}`}
                    {...props}
                />
            </div>
            {error && <p className={`mt-1 ml-1 text-sm text-red-500 ${errorClassName}`}>{error}</p>}
        </div>
    );
};

export default Input;
