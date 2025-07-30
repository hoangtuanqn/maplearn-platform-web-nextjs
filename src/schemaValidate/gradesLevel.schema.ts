import z from "zod";

const gradeLevelSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});
export const SubjectListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(gradeLevelSchema),
});
export type GradeLevelListResponse = z.infer<typeof SubjectListResponseSchema>;
