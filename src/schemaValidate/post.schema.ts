import { z } from "zod";

// Tag Schema
const TagSchema = z.object({
    id: z.number(),
    name: z.string(),
    created_at: z.string(),
});

// Creator Schema
const CreatorSchema = z.object({
    id: z.number(),
    full_name: z.string(),
});

// Post Schema
const PostSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.string(),
    thumbnail: z.string().url(),
    content: z.string().optional(),
    views: z.number(),
    status: z.boolean().optional(),
    created_at: z.string(),
    tags: z.array(TagSchema),
    creator: CreatorSchema,
});
export type PostType = z.infer<typeof PostSchema>;

// Pagination Metadata Schema
const PaginationMetaSchema = z.object({
    current_page: z.number(),
    data: z.array(PostSchema),
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



// Final API Response Schema
export const PostListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: PaginationMetaSchema,
});
export type PostListResponse = z.infer<typeof PostListResponseSchema>;
