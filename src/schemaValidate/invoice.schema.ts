import { cartSchema } from "./cart.schema";
import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";

export const invoiceSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    payment_id: z.number().nullable(),
    transaction_code: z.string(),
    payment_method: z.string(),
    total_price: z.number(),
    status: z.string(),
    course_count: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    due_date: z.string(),
    note: z.string().nullable(),
});
export type Invoice = z.infer<typeof invoiceSchema>;

const summaryInvoiceSchma = z.object({
    total_pending: z.number(),
    total_price_pending: z.number(),
});
export const InvoiceListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        invoices: paginationMetaSchemaFn(invoiceSchema),
        summary: summaryInvoiceSchma
    }),
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

const _createInvoicePartnerSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        url_payment: z.string(),
    }),
});
export type CreateInvoicePartnerResponse = z.infer<typeof _createInvoicePartnerSchema>;
