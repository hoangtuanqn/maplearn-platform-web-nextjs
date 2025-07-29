import { z } from "zod";

export const userSchema = z.object({
    id: z.number().int().positive().optional(),
    username: z
        .string()
        .min(3, "Tên người dùng phải có ít nhất 3 ký tự")
        .max(30, "Tên người dùng không được vượt quá 30 ký tự")
        .regex(/^[a-zA-Z0-9_]+$/, "Tên người dùng chỉ bao gồm chữ, số và dấu gạch dưới")
        .optional(),
    full_name: z
        .string()
        .min(2, "Họ và tên phải có ít nhất 2 ký tự")
        .max(50, "Họ và tên không được vượt quá 50 ký tự")
        .nonempty("Vui lòng không bỏ trống họ và tên"),
    email: z.string().min(1, "Vui lòng không bỏ trống email").email("Email không hợp lệ").optional(),
    phone_number: z
        .string()
        .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
        .max(15, "Số điện thoại không hợp lệ")
        .regex(/^[0-9+() -]+$/, "Số điện thoại không hợp lệ")
        .optional()
        .or(z.literal("").transform(() => undefined)),
    gender: z.enum(["male", "female", "other"]),
    avatar: z.string().url("URL avatar không hợp lệ").optional(),
    birth_year: z
        .number()
        .min(1900, "Năm sinh không hợp lệ")
        .max(new Date().getFullYear(), "Năm sinh không hợp lệ")
        .optional()
        .nullable(),
    facebook_link: z
        .string()
        .url("URL Facebook không hợp lệ")
        .optional()
        .or(z.literal("").transform(() => undefined)),
    school: z.string().min(2, "Tên trường phải có ít nhất 2 ký tự").optional(),
    city: z.string().min(2, "Tên thành phố phải có ít nhất 2 ký tự").optional(),
    role: z.enum(["student", "teacher", "admin"]).optional(),
    banned: z.boolean().optional(),
    email_verified_at: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

export type UserType = z.infer<typeof userSchema>;

export const changePasswordSchema = z
    .object({
        password_old: z.string().nonempty("Vui lòng nhập mật khẩu cũ"),
        password_new: z
            .string()
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
            .max(255, "Chỉ được nhập tối đa 255 kí tự")
            .nonempty("Vui lòng nhập mật khẩu"),
        confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu"),
    })
    .refine((data) => data.password_new !== data.password_old, {
        message: "Mật khẩu mới và cũ phải khác nhau",
        path: ["password_new"], // hiển thị lỗi ở confirmPassword
    })
    .refine((data) => data.password_new === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"], // hiển thị lỗi ở confirmPassword
    });
export type FormChangePasswordType = z.infer<typeof changePasswordSchema>;
