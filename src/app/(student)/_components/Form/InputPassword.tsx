import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { InputProps } from "./type/input.types";

const InputPassword = ({
    error,
    wrapperClassName,
    type = "password",
    errorClassName,
    className, // className của input cũng có thể truyền từ ngoài
    ...props
}: InputProps) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <div>
            <div
                className={`flex h-11 w-full items-center rounded-xl bg-[#F2F5F9] ${error ? `border-1 border-red-400` : ``} ${wrapperClassName}`}
            >
                <input
                    type={isShow ? "text" : type}
                    className={`placeholder:text-[#99AEBE]h-full h-full grow rounded-xl bg-transparent !px-4 outline-0 placeholder:text-[#99AEBE] ${className}`}
                    {...props}
                />
                <div className="t1-flex-center group h-full w-12 cursor-pointer">
                    {isShow ? (
                        <EyeOff
                            className="h-4.5 w-4.5 opacity-50 duration-150 group-hover:opacity-80"
                            onClick={() => setIsShow(false)}
                        />
                    ) : (
                        <Eye
                            className="h-4.5 w-4.5 opacity-50 duration-150 group-hover:opacity-80"
                            onClick={() => setIsShow(true)}
                        />
                    )}
                </div>
            </div>
            {error && <p className={`mt-1 ml-1 text-sm text-red-500 ${errorClassName}`}>{error}</p>}
        </div>
    );
};

export default InputPassword;
