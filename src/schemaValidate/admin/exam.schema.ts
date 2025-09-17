import z from "zod";
import { paginationMetaSchemaFn } from "../common.schema";

const examSchema = z.object({
    id: z.number(),
    exam_category: z.string(),
    subject: z.string(),
    grade_level: z.string(),
    user_id: z.number(),
    title: z.string(),
    slug: z.string(),
    province: z.string(),
    difficulty: z.string(),
    exam_type: z.enum(["HSA", "V-ACT", "TSA", "THPT", "OTHER"]),
    max_score: z.number(),
    pass_score: z.number(),
    duration_minutes: z.number(),
    anti_cheat_enabled: z.boolean(),
    max_violation_attempts: z.number(),
    max_attempts: z.number().nullable(),
    status: z.boolean(),
    start_time: z.string(),
    end_time: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    registered_count: z.number(),
});

const _examSchemaResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(examSchema),
});
export type ExamListResponse = z.infer<typeof _examSchemaResponse>;

const examAttemptSchema = z.object({
    id: z.number(),
    exam_paper_id: z.number(),
    user_id: z.number(),
    score: z.number(),
    violation_count: z.number(),
    time_spent: z.number(),
    started_at: z.string(),
    submitted_at: z.string(),
    note: z.string().nullable(),
    status: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    paper: z.object({
        id: z.number(),
        title: z.string(),
        slug: z.string(),
        max_violation_attempts: z.number(),
        pass_score: z.number(),
        subject: z.string(),
        grade_level: z.string(),
        exam_category: z.string(),
        province: z.string(),
        difficulty: z.string(),
        exam_type: z.enum(["HSA", "V-ACT", "TSA", "THPT", "OTHER"]),
        max_score: z.number(),
        duration_minutes: z.number(),
        status: z.boolean(),
    }),
    user: z.object({
        id: z.number(),
        full_name: z.string(),
        username: z.string(),
    }),
});
const _examAttemptResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(examAttemptSchema),
});
export type ExamAttemptResponse = z.infer<typeof _examAttemptResponse>;
