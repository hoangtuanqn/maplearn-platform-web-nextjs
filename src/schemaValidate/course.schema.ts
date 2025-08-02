import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";
import { subjectSchema } from "./subject.schema";
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
const DepartmentSchema = z.object({
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
    price: z.string(),
    subject_id: z.number(),
    category_id: z.number(),
    department_id: z.number(),
    department: z.array(DepartmentSchema),
    subject: z.array(subjectShortSchema),
    category: z.array(CategoryShortSchema),
});
export const CoursesResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(courseSchema),
});
export type CoursesResponse = z.infer<typeof CoursesResponseSchema>;
