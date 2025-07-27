import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().nonempty("Vui lòng nhập tên tài khoản"),
    password: z.string().nonempty("Vui lòng nhập mật khẩu"),
});
