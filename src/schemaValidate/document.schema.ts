import z from "zod";
import { CreatorSchema, paginationMetaSchemaFn, TagSchema } from "./common.schema";

// Document schema
export const DocumentSchema = z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    download_count: z.number(),
    source: z.string().default(""),
    category_id: z.number(),
    created_at: z.string(),
    tags: z.array(TagSchema),
    creator: z.array(CreatorSchema),
    subject: z.string(),
    grade_level: z.string(),
});
const _DocumentResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: DocumentSchema,
});
export type DocumentResponse = z.infer<typeof _DocumentResponseSchema>;

// ** Document same category schema
const _DocumentSameCategoryResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(DocumentSchema),
});
export type DocumentSameCategoryResponse = z.infer<typeof _DocumentSameCategoryResponseSchema>;

// Final API Response Schema
export const DocumentListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(DocumentSchema),
});

export type DocumentListResponse = z.infer<typeof DocumentListResponseSchema>;
