import z from "zod";
import { userSchema } from "./user.schema";

// export const teacherSchema = z.object({
//     id: z.number().int().positive().optional(),
//     bio: z.string(),
//     degree: z.string(),
//     created_at: z.string().optional(),
//     updated_at: z.string().optional(),
//     user: userSchema,
// });
export const teacherListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(userSchema),
});
export type TeacherListType = z.infer<typeof teacherListResponseSchema>;

export const teacherDetailResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: userSchema,
});
export type TeacherDetailType = z.infer<typeof teacherDetailResponseSchema>;
