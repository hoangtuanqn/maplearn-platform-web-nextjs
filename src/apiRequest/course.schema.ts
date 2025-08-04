import publicApi from "~/libs/apis/publicApi";
import { ChapterLessonList } from "~/schemaValidate/chapterLessonCourse.schema";
import { CategoriesCoursesResponse, CourseGetDetailResponse, CourseListResponse } from "~/schemaValidate/course.schema";
export const CATEGORY_COURSE_PER_PAGE = 20;
export const COURSE_PER_PAGE = 20;
const courseApi = {
    getCourses: (
        page: number = 1,
        limit: number = COURSE_PER_PAGE,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/courses?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[name]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return publicApi.get<CourseListResponse>(query);
    },
    getDetailCourse: (slug: string) => {
        return publicApi.get<CourseGetDetailResponse>(`/courses/${slug}`);
    },

    getCategories: (page: number = 1, limit: number = CATEGORY_COURSE_PER_PAGE) =>
        publicApi.get<CategoriesCoursesResponse>(`/course-categories?page=${page}&limit=${limit}`),

    addCourseToCart: (courseId: number) => {
        return publicApi.post(`/carts`, {
            course_id: courseId,
        });
    },
    removeCourseToCart: (courseId: number) => {
        return publicApi.delete(`/carts/${courseId}`);
    },

    actionCourseToFavorite: (courseId: number, action: "add" | "check" | "remove") => {
        console.log("chạy 2 lần nè");

        if (action === "check") {
            return publicApi.get(`/courses/${courseId}/favorite`);
        }
        if (action === "remove") {
            return publicApi.delete(`/courses/${courseId}/favorite`);
        }
        return publicApi.post(`/courses/${courseId}/favorite`, { action });
    },

    getCourseFavorite: (page: number = 1, limit: number = COURSE_PER_PAGE) => {
        return publicApi.get<CourseListResponse>(`/courses/favorites?page=${page}&limit=${limit}`);
    },

    getChapterLessonList: (slugCourse: string) => {
        return publicApi.get<ChapterLessonList>(`/chapters/${slugCourse}`);
    },
};
export default courseApi;
