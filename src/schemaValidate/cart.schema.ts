import z from "zod";
import { courseSchema } from "./course.schema";
import { invoiceSchema } from "./invoice.schema";

export const cartSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    course_id: z.number(),
    price_snapshot: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    is_active: z.boolean().default(true),
    course: courseSchema,
});

const summaryCartSchema = z.object({
    total_items: z.number().default(0),
    total_amount: z.number().default(0),
});
const _cartsResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        items: z.array(cartSchema).default([]),
        summary: summaryCartSchema,
    }),
});
export type CartsResponse = z.infer<typeof _cartsResponseSchema>;

// {
//     "success": true,
//     "message": "Lấy thông tin tóm tắt giỏ hàng thành công!",
//     "data": {
//         "total_lessons": 80,
//         "total_duration": 49709,
//         "average_rating": 4.6,
//         "total_price": 9958000
//     }
// }
const summaryCart = z.object({
    total_lessons: z.number().default(0),
    total_duration: z.number().default(0),
    average_rating: z.number().default(0),
    total_price: z.number().default(0),
});
const _summaryResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: summaryCart,
});
export type SummaryResponse = z.infer<typeof _summaryResponseSchema>;

const _checkoutSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: invoiceSchema.extend({
        url_payment: z.string().optional(),
    }),
});

export type CheckoutResponse = z.infer<typeof _checkoutSchema>;
