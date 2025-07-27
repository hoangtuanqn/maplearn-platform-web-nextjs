import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().nonempty("Vui lòng nhập tên tài khoản"),
    password: z.string().nonempty("Vui lòng nhập mật khẩu"),
});
export type FormLoginType = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        full_name: z.string().max(50, "Chỉ được nhập tối đa 50 kí tự").nonempty("Vui lòng nhập họ và tên"),
        email: z
            .string()
            .nonempty("Vui lòng nhập email")
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
            .max(255, "Chỉ được nhập tối đa 255 kí tự")
            .email("Email không hợp lệ"),
        username: z.string().max(50, "Chỉ được nhập tối đa 50 kí tự").nonempty("Vui lòng nhập tên đăng nhập"),
        password: z.string().max(255, "Chỉ được nhập tối đa 255 kí tự").nonempty("Vui lòng nhập mật khẩu"),
        confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"], // hiển thị lỗi ở confirmPassword
    });

export type FormRegisterType = z.infer<typeof registerSchema>;
