import z, { success } from "zod";
import { profileSchema } from "../user.schema";
import { paginationMetaSchemaFn } from "../common.schema";
export const updateProfileSchema = profileSchema.extend({
    banned: z.boolean(),
    email: z.string().email().min(5).max(100).optional(),
});
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

// Lịch sử hoạt động

// {
//     "success": true,
//     "message": "Lấy lịch sử hoạt động thành công!",
//     "data": {
//         "current_page": 1,
//         "data": [
//             {
//                 "id": 1,
//                 "user_id": 8,
//                 "action": "login",
//                 "description": "Đăng nhập thành công",
//                 "ip_address": "127.0.0.1",
//                 "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
//                 "created_at": "2025-08-26T16:01:00.000000Z",
//                 "updated_at": "2025-08-26T16:01:00.000000Z"
//             },
//             {
//                 "id": 2,
//                 "user_id": 8,
//                 "action": "start_exam",
//                 "description": "Đã bắt đầu làm bài thi \"Đề minh họa thi tốt nghiệp THPT 2025 môn Toán\".",
//                 "ip_address": "127.0.0.1",
//                 "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
//                 "created_at": "2025-08-26T16:01:10.000000Z",
//                 "updated_at": "2025-08-26T16:01:10.000000Z"
//             },
//             {
//                 "id": 3,
//                 "user_id": 8,
//                 "action": "submit_exam",
//                 "description": "Đã nộp bài thi \"Đề minh họa thi tốt nghiệp THPT 2025 môn Toán\".",
//                 "ip_address": "127.0.0.1",
//                 "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
//                 "created_at": "2025-08-26T16:02:41.000000Z",
//                 "updated_at": "2025-08-26T16:02:41.000000Z"
//             },
//             {
//                 "id": 4,
//                 "user_id": 8,
//                 "action": "create_invoice",
//                 "description": "Đã tạo hóa đơn \"68ADDB28205FA\".",
//                 "ip_address": "127.0.0.1",
//                 "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
//                 "created_at": "2025-08-26T16:04:58.000000Z",
//                 "updated_at": "2025-08-26T16:04:58.000000Z"
//             }
//         ],
//         "first_page_url": "http://localhost:8000/api/v1/students/8/activity-history?page=1",
//         "from": 1,
//         "last_page": 1,
//         "last_page_url": "http://localhost:8000/api/v1/students/8/activity-history?page=1",
//         "links": [
//             {
//                 "url": null,
//                 "label": "&laquo; Trang trước",
//                 "active": false
//             },
//             {
//                 "url": "http://localhost:8000/api/v1/students/8/activity-history?page=1",
//                 "label": "1",
//                 "active": true
//             },
//             {
//                 "url": null,
//                 "label": "Trang sau &raquo;",
//                 "active": false
//             }
//         ],
//         "next_page_url": null,
//         "path": "http://localhost:8000/api/v1/students/8/activity-history",
//         "per_page": 10,
//         "prev_page_url": null,
//         "to": 4,
//         "total": 4
//     }
// }

const activitySchema = z.object({
    id: z.number(),
    user_id: z.number(),
    action: z.string(),
    description: z.string(),
    ip_address: z.string(),
    user_agent: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});
const _activityHistorySchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(activitySchema),
});
export type ActivityHistorySchema = z.infer<typeof _activityHistorySchema>;