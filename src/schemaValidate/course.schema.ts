import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";
import { subjectSchema } from "./subject.schema";
import { teacherSchema } from "./teachher.schema";
// * Category Course
const CategoryCourseSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    status: z.boolean(),
    created_at: z.string(),
    count_courses: z.number(),
    // creator: z.array(CreatorSchema),
});

// Schema Category
export const CategoriesCoursesResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(CategoryCourseSchema),
});
export type CategoriesCoursesResponse = z.infer<typeof CategoriesCoursesResponseSchema>;

// * Course
export const departmentSchema = z.object({
    id: z.number(),
    name: z.string(),
});
const subjectShortSchema = subjectSchema.pick({
    id: true,
    name: true,
});
const CategoryShortSchema = CategoryCourseSchema.pick({
    id: true,
    name: true,
    count_courses: true,
});
export const courseSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    thumbnail: z.string().url(),
    price: z.number().default(0),
    final_price: z.number().default(0), // Giá cuối cùng sau khi áp dụng giảm giá (auto discount)
    rating: z.object({
        average_rating: z.number(),
        total_reviews: z.number(),
    }),
    grade_level_id: z.number(),
    subject_id: z.number(),
    category_id: z.number(),
    department_id: z.number(),
    start_date: z.string(),
    end_date: z.string(),
    status: z.boolean(),
    is_best_seller: z.boolean().default(false), // sản phẩm bán chạy
    department: z.array(departmentSchema),
    subject: z.array(subjectShortSchema),
    category: z.array(CategoryShortSchema),
    is_favorite: z.boolean().default(true),
    is_enrolled: z.boolean().default(false),
    duration: z.number().default(0),
    lesson_count: z.number().default(0),
    is_cart: z.boolean().default(false),
});
export const CourseListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(courseSchema),
});
export type CourseListResponse = z.infer<typeof CourseListResponseSchema>;

export const CourseListRecommendedResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(courseSchema),
});
export type CourseListRecommendedResponse = z.infer<typeof CourseListRecommendedResponseSchema>;
// * Course Detail

export const CourseDetailSchema = courseSchema.extend({
    description: z.string(),
    intro_video: z.string().url(),
    enrollments_count: z.number().default(0),

    teachers: z.array(
        teacherSchema.omit({ user: true, departments: true }).extend({
            user: z.object({
                id: z.number(),
                full_name: z.string(),
                avatar: z.string().url(),
            }),
        }),
    ),
});

export type CourseDetail = z.infer<typeof CourseDetailSchema>;
export const CourseDetailResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: CourseDetailSchema,
});
export type CourseGetDetailResponse = z.infer<typeof CourseDetailResponseSchema>;
