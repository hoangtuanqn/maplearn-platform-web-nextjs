import z from "zod";
import { userSchema } from "./user.schema";
import { departmentSchema } from "./course.schema";
const pivotSchema = z.object({
    course_id: z.number().int().positive(),
    teacher_id: z.number().int().positive(),
});
export const teacherSchema = z.object({
    id: z.number().int().positive().optional(),
    user_id: z.number().int().positive(),
    bio: z.string(),
    degree: z.string(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    user: userSchema,
    departments: departmentSchema.extend({ pivot: pivotSchema }),
});
export const teacherListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(teacherSchema),
});
export type TeacherListType = z.infer<typeof teacherListResponseSchema>;
