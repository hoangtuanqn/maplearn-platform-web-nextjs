import z from "zod";

const subjectSchema = z.object({
    id: z.number(),
    name: z.string(),
    status: z.boolean(),
    slug: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});
export const SubjectListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(subjectSchema),
});
export type SubjectListResponse = z.infer<typeof SubjectListResponseSchema>;
