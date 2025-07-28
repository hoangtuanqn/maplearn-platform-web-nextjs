import { z } from "zod";

export const provinceSchema = z.object({
    total: z.number(),
    data: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            type: z.number(),
            typeText: z.enum(["Tỉnh", "Trung ương"]), // ✅ không còn là z.literal("Tỉnh") nữa
            slug: z.string(),
        }),
    ),
    code: z.string(),
    message: z.string().nullable(),
});

export type ProvinceType = z.infer<typeof provinceSchema>;
