import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";

/**
 * * Danh sách schema get Category
 */
const CategoryDocumentSchema = z.object({
    id: z.number(),
    name: z.string(),
    status: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    total_downloads: z.number(),
    total_documents: z.number(),
});
export type CategoryDocument = z.infer<typeof CategoryDocumentSchema>;
export const CategoryDocumentResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: CategoryDocumentSchema,
});
export type CategoryDocumentResponse = z.infer<typeof CategoryDocumentResponseSchema>;

export const CategoryDocumentListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(CategoryDocumentSchema),
});
export type CategoryDocumentListResponse = z.infer<typeof CategoryDocumentListResponseSchema>;
