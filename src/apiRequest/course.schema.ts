import publicApi from "~/libs/apis/publicApi";
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
};
export default courseApi;
