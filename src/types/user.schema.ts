import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    username: z.string(),
    full_name: z.string(),
    email: z.string().email(), // Kiểm tra định dạng email
    phone_number: z.string(),
    gender: z.string(),
    avatar: z.string().url().optional(), // Giả sử avatar là một URL
    birth_year: z.number().nullable(), // Có thể là số hoặc null
    facebook_link: z.string().url().optional(), // Giả sử là một URL
    school: z.string(),
    city: z.string(),
    role: z.string(),
    banned: z.boolean(),
    email_verified_at: z.string(), // Nếu là ISO string, có thể dùng z.string().datetime()
    created_at: z.string(),
    updated_at: z.string(),
});
export type UserType = z.infer<typeof userSchema>;
