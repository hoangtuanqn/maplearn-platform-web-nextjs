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
    exam_type: z.enum(["HSA", "V-ACT", "TSA", "THPT", "OTHER"]),
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

// "questions": [
// {
// "id": 1,
// "exam_paper_id": 39,
// "type": "single_choice",
// "content": "An và Bình không quen biết nhau và học ở hai nơi khác nhau. Xác suất để An và Bình đạt điểm giỏi về môn Toán trong kì thi cuối năm tương ứng là 0,92 và 0,88. Tính xác suất để cả An và Bình đều đạt điểm giỏi.",
// "explanation": null,
// "images": null,
// "marks": 1,
// "answers": [
// {
// "id": 1,
// "content": "0,3597"
// },
// {
// "id": 2,
// "content": "0,8096"
// },
// {
// "id": 3,
// "content": "0,0096"
// },
// {
// "id": 4,
// "content": "0,3649"
// }
// ]
// },
const answersSchema = z.object({
    id: z.number(),
    content: z.string(),
});
export type Answers = z.infer<typeof answersSchema>;
const questionSchema = z.object({
    id: z.number(),
    exam_paper_id: z.number(),
    type: z.enum(["single_choice", "multiple_choice", "drag_drop", "true_false", "numeric_input"]),
    content: z.string(),
    explanation: z.string().nullable(),
    images: z.array(z.string()).nullable(),
    marks: z.number(),
    answers: z.array(answersSchema),
});
export type Question = z.infer<typeof questionSchema>;

const _questionsExamSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: examSchema.extend({
        questions: z.array(questionSchema),
    }),
});

export type QuestionsExamResponse = z.infer<typeof _questionsExamSchema>;
