import { cartSchema } from "./cart.schema";
import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";

export const invoiceSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    transaction_code: z.string(),
    payment_method: z.string(),
    total_price: z.number(),
    status: z.string(),
    course_count: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const InvoiceListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(invoiceSchema),
});
export type InvoiceListResponse = z.infer<typeof InvoiceListResponseSchema>;

const _invoiceDetailSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: invoiceSchema.extend({
        items: z.array(cartSchema),
    }),
});
export type InvoiceDetailResponse = z.infer<typeof _invoiceDetailSchema>;
