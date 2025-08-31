import z from "zod";
import { invoiceSchema } from "./invoice.schema";
import { courseSchema } from "./course.schema";

const paymentSchema = z.object({
    id: z.number(),
    user_id: z.number().min(1),
    transaction_code: z.string(),
    payment_method: z.enum(["transfer", "vnpay", "momo", "zalopay"]),
    status: z.enum(["pending", "paid", "failed", "expired"]),
    url_payment: z.string().optional(),
});
const _paymentResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paymentSchema,
});
export type PaymentResponse = z.infer<typeof _paymentResponseSchema>;

const paymentDetailDataSchema = paymentSchema.extend({
    invoices: z.array(
        invoiceSchema.extend({
            items: z.array(
                invoiceSchema.extend({
                    course: courseSchema,
                }),
            ),
        }),
    ),
});
export type PaymentDetail = z.infer<typeof paymentDetailDataSchema>;
const _paymentDetailSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paymentDetailDataSchema,
});
export type PaymentDetailResponse = z.infer<typeof _paymentDetailSchema>;
