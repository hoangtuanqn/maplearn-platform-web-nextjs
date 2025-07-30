import z from "zod";
import { CreatorSchema, paginationMetaSchemaFn, TagSchema } from "./common.schema";

// Document schema
const DocumentSchema = z.object({
    id: z.number(),
    title: z.string(),
    download_count: z.number(),
    source: z.string().default(""),
    created_at: z.string(),
    tags: z.array(TagSchema),
    creator: z.array(CreatorSchema),
});

// Final API Response Schema
export const DocumentListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(DocumentSchema),
});

export type DocumentListResponse = z.infer<typeof DocumentListResponseSchema>;
