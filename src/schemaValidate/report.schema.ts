import { z } from "zod";
import { DocumentSchema } from "./document.schema";

// Schema cho response khi thất bại
export const reportFailSchema = z.object({
    success: z.literal(false),
    message: z.string(),
});

const reportableSchema = z.union([DocumentSchema]); // còn post schema ....

// Schema cho data của report thành công
const reportSuccessSchema = z.object({
    success: z.literal(true),
    message: z.string(),
    data: z.object({
        reason: z.string(),
        message: z.string().nullable(), // nếu message có thể null
        reported_by: z.number(),
        handled_by: z.number(),
        reportable_id: z.number(),
        reportable_type: z.string(),
        updated_at: z.string(),
        created_at: z.string(),
        id: z.number(),
        reportable: reportableSchema,
    }),
});

// ✅ Tổng hợp schema (union)
const _reportResponseSchema = z.union([reportSuccessSchema, reportFailSchema]);
export type ReportResponse = z.infer<typeof _reportResponseSchema>;
