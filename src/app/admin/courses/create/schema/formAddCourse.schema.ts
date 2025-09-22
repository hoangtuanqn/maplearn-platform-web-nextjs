import z from "zod";

export const formSchema = z
    .object({
        name: z
            .string()
            .min(15, { message: "Tên khóa học phải có ít nhất 15 ký tự." })
            .max(255, { message: "Tên khóa học không được vượt quá 255 ký tự." }),
        subject: z.string().min(1, { message: "Vui lòng chọn môn học." }),
        category: z.string().min(1, { message: "Vui lòng chọn danh mục." }),
        gradeLevel: z.string().min(1, { message: "Vui lòng chọn cấp bậc." }),
        instructor: z.string().min(1, { message: "Vui lòng chọn giáo viên giảng dạy." }),
        price: z
            .number()
            .min(0, { message: "Giá khóa học phải lớn hơn hoặc bằng 0." })
            .max(5000000, { message: "Giá khóa học phải nhỏ hơn hoặc bằng 5.000.000." }),
        startDate: z.string().min(1, { message: "Vui lòng chọn ngày bắt đầu." }),
        endDate: z.string().optional(),
        prerequisiteCourse: z.string().optional(),
        coverImage: z.string().url("Vui lòng nhập URL hợp lệ."),
        introVideo: z.string().url("Vui lòng nhập URL hợp lệ."),
        description: z
            .string()
            .min(10, { message: "Mô tả khóa học phải có ít nhất 10 ký tự." })
            .max(5000, { message: "Mô tả khóa học không được vượt quá 5000 ký tự." }),
    })
    .refine(
        (data) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startDate = new Date(data.startDate);
            return startDate >= today;
        },
        {
            message: "Ngày bắt đầu không được nhỏ hơn ngày hiện tại.",
            path: ["startDate"],
        },
    )
    .refine(
        (data) => {
            const startDate = new Date(data.startDate);
            return startDate.getFullYear() <= 2027;
        },
        {
            message: "Ngày bắt đầu không được lớn hơn năm 2027.",
            path: ["startDate"],
        },
    )
    .refine(
        (data) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startDate = new Date(data.startDate);
            return startDate >= today;
        },
        {
            message: "Ngày bắt đầu không được nhỏ hơn ngày hiện tại.",
            path: ["startDate"],
        },
    )
    .refine(
        (data) => {
            if (!data.endDate) return true;
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            const oneDayAfterStart = new Date(startDate);
            oneDayAfterStart.setDate(startDate.getDate() + 1);
            return endDate >= oneDayAfterStart;
        },
        {
            message: "Ngày kết thúc phải sau ngày bắt đầu ít nhất 1 ngày.",
            path: ["endDate"],
        },
    );
