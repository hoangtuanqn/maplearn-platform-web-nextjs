import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";
import { userSchema } from "./user.schema";

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
    max_attempts: z.number().nullable(),
    pass_score: z.number(),
    attempt_count: z.number(), // số lượt thi của người dùng đang gửi request
    total_attempt_count: z.number(), // tổng số lượt thi của đề thi
    question_count: z.number(),
    is_in_progress: z.boolean(),
    status: z.boolean(),
    start_time: z.string(),
    end_time: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

const _examListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(examSchema),
});
export type ExamListResponse = z.infer<typeof _examListResponseSchema>;

// Get detail
const _examDetailResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: examSchema,
});
export type ExamDetailResponse = z.infer<typeof _examDetailResponseSchema>;

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

const attemptExamSchema = z.object({
    id: z.number(),
    exam_paper_id: z.number(),
    user_id: z.number(),
    score: z.number(),
    violation_count: z.number(),
    time_spent: z.number(),
    details: z.string(),
    started_at: z.string(),
    submitted_at: z.string().nullable(),

    note: z.string().nullable(),
    status: z.enum(["in_progress", "submitted", "detected", "canceled"]),
    created_at: z.string(),
    updated_at: z.string(),
});
export type AttemptExam = z.infer<typeof attemptExamSchema>;

const _attemptExamResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: attemptExamSchema,
});
export type AttemptExamResponse = z.infer<typeof _attemptExamResponseSchema>;

// Lịch sử làm bài thi
const _attemptExamHistoryResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(attemptExamSchema),
});
export type AttemptExamHistoryResponse = z.infer<typeof _attemptExamHistoryResponseSchema>;

const detailAnswerSchema = z.object({
    start: z.number(),
    answers: z.record(
        z.string(),
        z.object({
            value: z.string(),
            is_correct: z.boolean(),
        }),
    ),
});
const resultExamSchema = z.object({
    id: z.number(),
    exam_paper_id: z.number(),
    user_id: z.number(),
    score: z.number(),
    violation_count: z.number(),
    time_spent: z.number(),
    details: detailAnswerSchema,
    started_at: z.string(),
    submitted_at: z.string().nullable(),
    note: z.string().nullable(),
    status: z.enum(["in_progress", "submitted", "detected", "canceled"]),
    created_at: z.string(),
    updated_at: z.string(),
});
export type ResultExam = z.infer<typeof resultExamSchema>;
const _resultExamResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: examSchema.extend({
        results: resultExamSchema,
    }),
});
export type ResultExamResponse = z.infer<typeof _resultExamResponseSchema>;

// Get ranking đề thi

// {
//     "success": true,
//     "message": "Lấy bảng xếp hạng thành công!",
//     "data": [
//         {
//             "id": 1,
//             "exam_paper_id": 39,
//             "user_id": 9,
//             "score": 10,
//             "violation_count": 0,
//             "time_spent": 80,
//             "started_at": "2025-08-20T23:10:04.000000Z",
//             "submitted_at": "2025-08-20T23:11:24.000000Z",
//             "note": null,
//             "status": "submitted",
//             "created_at": "2025-08-20T23:10:04.000000Z",
//             "updated_at": "2025-08-20T23:11:24.000000Z",
//             "user": {
//                 "id": 9,
//                 "avatar": "https://mapstudy.sgp1.digitaloceanspaces.com/teacher/64b22b96d0a652b97e5ab246/thay-nguyen-trong-dat-1719904677740.png",
//                 "full_name": "Vũ Trọng Đạt",
//                 "cart_item_count": 3
//             }
//         },
//         {
//             "id": 2,
//             "exam_paper_id": 39,
//             "user_id": 8,
//             "score": 10,
//             "violation_count": 0,
//             "time_spent": 81,
//             "started_at": "2025-08-20T23:12:24.000000Z",
//             "submitted_at": null,
//             "note": null,
//             "status": "submitted",
//             "created_at": "2025-08-20T23:12:24.000000Z",
//             "updated_at": "2025-08-20T23:12:24.000000Z",
//             "user": {
//                 "id": 8,
//                 "avatar": "https://res.cloudinary.com/dbu1zfbhv/image/upload/v1755729796/avatars/ccrlg1hkjtc6dyeervsv.jpg",
//                 "full_name": "Nguyễn Thị Thanh Thủy",
//                 "cart_item_count": 3
//             }
//         }
//     ]
// }
const _rankingPaperSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(
        attemptExamSchema.extend({
            user: z.object(userSchema.pick({ id: true, avatar: true, full_name: true, cart_item_count: true })),
        }),
    ),
});
export type RankingPaper = z.infer<typeof _rankingPaperSchema>;
