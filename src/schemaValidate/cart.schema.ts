// items": [
//             {
//                 "id": 1,
//                 "user_id": 8,
//                 "course_id": 4,
//                 "price_snapshot": "5042000.00",
//                 "created_at": "2025-08-03T19:07:12.000000Z",
//                 "updated_at": "2025-08-03T19:07:12.000000Z",
//                 "course": {
//                     "id": 4,
//                     "name": "KHOÁ LUYỆN THI ĐÁNH GIÁ NĂNG LỰC ĐHQG HÀ NỘI (HSA) - 2026",
//                     "slug": "khoa-luyen-thi-danh-gia-nang-luc-dhqg-ha-noi-hsa-2026-BHwNp6CAEXO7",
//                     "thumbnail": "https://mapstudy.sgp1.digitaloceanspaces.com/course/ymgck3e0150c/khoa-luyen-thi-danh-gia-nang-luc-dhqg-ha-noi-hsa---2026-1751535748754.png",
//                     "price": "5042000.00",
//                     "grade_level_id": 2,
//                     "subject_id": 1,
//                     "category_id": 1,
//                     "department_id": 1,
//                     "start_date": "2025-08-07 02:41:06",
//                     "end_date": "2025-10-06 07:04:35",
//                     "status": true,
//                     "department": [
//                         {
//                             "id": 1,
//                             "name": "Tổ Toán"
//                         }
//                     ],
//                     "subject": [
//                         {
//                             "id": 1,
//                             "name": "Toán"
//                         }
//                     ],
//                     "category": [
//                         {
//                             "id": 1,
//                             "name": "2K8 - Xuất phát sớm lớp 12",
//                             "count_courses": 42
//                         }
//                     ],
//                     "grade_level": "dg-nl",
//                     "rating": {
//                         "average_rating": 4,
//                         "total_reviews": 1
//                     }
//                 }
//             },

import z from "zod";
import { courseSchema } from "./course.schema";

const cartSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    course_id: z.number(),
    price_snapshot: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
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
