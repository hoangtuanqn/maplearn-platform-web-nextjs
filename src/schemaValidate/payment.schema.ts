import z from "zod";
// "user_id": 8,
//         "payment_method": "transfer",
//         "status": "pending",
//         "updated_at": "2025-08-08T03:45:50.000000Z",
//         "created_at": "2025-08-08T03:45:50.000000Z",
//         "id": 4
const paymentSchema = z.object({
    id: z.number(),
    user_id: z.number().min(1),
    payment_method: z.enum(["transfer", "vnpay"]),
    status: z.enum(["pending", "paid", "failed", "expired"]),
    updated_at: z.string(),
    created_at: z.string(),
});
const _paymentResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paymentSchema,
});
export type PaymentResponse = z.infer<typeof _paymentResponseSchema>;
