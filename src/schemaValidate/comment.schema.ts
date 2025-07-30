import z from "zod";
const CreatorSchema = z.object({
    id: z.number(),
    full_name: z.string(),
});

const ReplySchema = z.object({
    id: z.number(),
    description: z.string(),
    reply_id: z.number().nullable(),
    created_at: z.string(),
    user_id: z.number(),
    creator: CreatorSchema,
});

export const CommentSchema = z.object({
    id: z.number(),
    description: z.string(),
    reply_id: z.number().nullable(),
    created_at: z.string(),
    user_id: z.number().optional(),
    creator: CreatorSchema.nullable(),
    replies: z.array(ReplySchema).optional().default([]),
});
export type CommentType = z.infer<typeof CommentSchema>;

// Pagination Metadata Schema
const PaginationMetaSchema = z.object({
    current_page: z.number(),
    data: z.array(CommentSchema),
    first_page_url: z.string(),
    from: z.number().nullable(),
    last_page: z.number(),
    last_page_url: z.string(),
    links: z.array(
        z.object({
            url: z.string().nullable(),
            label: z.string(),
            active: z.boolean(),
        }),
    ),
    next_page_url: z.string().nullable(),
    path: z.string(),
    per_page: z.number(),
    prev_page_url: z.string().nullable(),
    to: z.number().nullable(),
    total: z.number(),
});
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export const CommnetListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: PaginationMetaSchema,
});
export type CommentListResponse = z.infer<typeof CommnetListResponseSchema>;
