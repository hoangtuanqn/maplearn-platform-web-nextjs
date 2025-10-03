import z from "zod";

const formSchema = z
    .object({
        title: z
            .string()
            .min(15, { message: "Tên đề thi phải có ít nhất 15 ký tự." })
            .max(255, { message: "Tên đề thi không được vượt quá 255 ký tự." }),
        exam_category: z.string().min(1, { message: "Vui lòng chọn loại đề thi." }),
        subject: z.string().min(1, { message: "Vui lòng chọn môn học." }),
        grade_level: z.string().min(1, { message: "Vui lòng chọn cấp bậc." }),
        province: z.string().min(1, { message: "Vui lòng chọn tỉnh thành." }),
        difficulty: z.enum(["easy", "normal", "hard", "very_hard"], {
            message: "Vui lòng chọn độ khó.",
        }),
        max_score: z
            .number()
            .min(10, { message: "Điểm thiểu phải từ 10 trở lên." })
            .max(100, { message: "Điểm tối đa không được vượt quá 100." }),
        pass_score: z.number().min(0, { message: "Điểm qua môn phải lớn hơn hoặc bằng 0." }),
        duration_minutes: z
            .number()
            .min(15, { message: "Thời gian làm bài phải lớn hơn 15 phút." })
            .max(300, { message: "Thời gian làm bài không được vượt quá 300 phút." }),
        start_time: z.string().min(1, { message: "Vui lòng chọn thời gian bắt đầu." }),
        end_time: z.string(),
        status: z.boolean("Vui lòng chọn trạng thái đề."),
        max_attempts: z.number().min(0, { message: "Số lần làm bài tối đa phải lớn hơn 0." }).optional(),
        is_password_protected: z.boolean().optional(),
        anti_cheat_enabled: z.boolean().optional(),
    })
    .refine(
        (data) => {
            // pass_score không được vượt quá 70% max_score
            return data.pass_score <= data.max_score * 0.7;
        },
        {
            message: "Điểm qua môn không được vượt quá 70% điểm tối đa.",
            path: ["pass_score"],
        },
    )
    .refine(
        (data) => {
            // pass_score phải nhỏ hơn max_score
            return data.pass_score < data.max_score;
        },
        {
            message: "Điểm qua môn phải nhỏ hơn điểm tối đa.",
            path: ["pass_score"],
        },
    )
    .refine(
        (data) => {
            // Nếu end_time không có giá trị, bỏ qua kiểm tra
            if (!data.end_time) return true;
            const startTime = new Date(data.start_time);
            const endTime = new Date(data.end_time);
            // end_time phải sau start_time ít nhất 1 phút
            return endTime > startTime && endTime.getTime() - startTime.getTime() >= 60000;
        },
        {
            message: "Thời gian kết thúc phải sau thời gian bắt đầu ít nhất 1 phút.",
            path: ["end_time"],
        },
    )
    .refine(
        (data) => {
            // Nếu end_time không có giá trị, bỏ qua kiểm tra
            if (!data.end_time) return true;
            const startTime = new Date(data.start_time);
            const endTime = new Date(data.end_time);
            const diffMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / 60000);
            return data.duration_minutes <= diffMinutes;
        },
        {
            message: "Thời lượng làm bài không được vượt quá tổng thời gian giữa bắt đầu và kết thúc.",
            path: ["duration_minutes"],
        },
    )
    .refine(
        (data) => {
            const startTime = new Date(data.start_time);
            const now = new Date();
            // Cho phép chọn trong quá khứ nhưng không quá 1 tiếng (60 phút)
            const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
            return startTime >= oneHourAgo;
        },
        {
            message: "Thời gian bắt đầu không được nhỏ hơn thời gian hiện tại quá 1 tiếng.",
            path: ["start_time"],
        },
    )
    .refine(
        (data) => {
            const startTime = new Date(data.start_time);
            const now = new Date();
            // 1 tháng = 30 ngày
            const oneMonthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            return startTime <= oneMonthLater;
        },
        {
            message: "Thời gian bắt đầu không được lớn hơn hiện tại quá 1 tháng.",
            path: ["start_time"],
        },
    );
export default formSchema;
