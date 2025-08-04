import axios from "axios";
import { toast } from "sonner";

export const handleApiError = (error: unknown, message?: string) => {
    if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
            toast.error("Không thể kết nối tới server!");
        } else {
            toast.error(message || error.response?.data?.message || "Lỗi không xác định! Vui lòng thử lại sau!");
        }
    } else {
        toast.error("Lỗi không xác định! Vui lòng thử lại sau!");
    }
};
export const handleApiError2 = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const errors = error.response?.data?.errors;
        for (const key in errors) {
            return toast.error(`${errors?.[key]}`);
        }
    }
};
