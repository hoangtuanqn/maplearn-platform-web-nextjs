import z from "zod";
import { userSchema } from "./user.schema";
import { paginationMetaSchemaFn } from "./common.schema";

const reviewCourseSchema = z.object({
    id: z.number(),
    course_id: z.number(),
    user_id: z.number(),
    rating: z.number().min(1).max(5),
    comment: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    user: userSchema.pick({
        id: true,
        avatar: true,
        full_name: true,
    }),
});
export type ReviewCourse = z.infer<typeof reviewCourseSchema>;
const _reviewCourseListSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(reviewCourseSchema),
});
export type ReviewCourseListResponse = z.infer<typeof _reviewCourseListSchema>;
