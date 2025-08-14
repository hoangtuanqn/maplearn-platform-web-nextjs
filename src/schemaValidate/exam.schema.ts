import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";

const examCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});
const _examCategoriesResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(examCategorySchema),
});
export type ExamCategoriesResponse = z.infer<typeof _examCategoriesResponseSchema>;


const examSchema = z.object({
    id: z.number(),
    exam_category_id: z.number(),
    subject_id: z.number(),
    grade_level: z.number(),
    title: z.string(),
    slug: z.string(),
    province: z.string(),
    difficulty: z.enum(["easy", "normal", "hard", "very_hard"]),
    exam_type: z.enum(["HSA", "V-ACT", "TSA", "OTHER"]),
    max_score: z.number(),
    duration_minutes: z.number(),
    anti_cheat_enabled: z.boolean(),
    max_violation_attempts: z.number(),
    status: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
});
const _examListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(examSchema),
});
export type ExamListResponse = z.infer<typeof _examListResponseSchema>;
