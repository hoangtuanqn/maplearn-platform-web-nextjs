import z from "zod";
import { DocumentListResponseSchema } from "~/schemaValidate/document.schema";
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
});
export const CategoryDocumentResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: CategoryDocumentSchema,
});
export type CategoryDocumentResponse = z.infer<typeof CategoryDocumentResponseSchema>;

/**
 * * Danh sách schema get documents bên trong Category
 */

// Category Document schema
const DocumentInCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    status: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    total_downloads: z.number(),
    documents: z.array(DocumentListResponseSchema),
});

export const DocumentInCategoryListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: DocumentInCategorySchema,
});
export type DocumentInCategoryListResponse = z.infer<typeof DocumentInCategoryListResponseSchema>;
