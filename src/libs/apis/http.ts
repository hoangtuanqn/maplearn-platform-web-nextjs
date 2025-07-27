import axios from "axios";
import { toast } from "sonner";

export const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
            toast.error("Không thể kết nối tới server!");
        }
    } else {
        toast.error("Lỗi không xác định! Vui lòng thử lại sau!");
    }
};
