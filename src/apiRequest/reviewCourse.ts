import { RatingDistributionList, ReviewCourseListResponse } from "./../schemaValidate/reviewCourse.schema";
import publicApi from "~/libs/apis/publicApi";
const COURSE_REVIEWS_PER_PAGE = 5;
const reviewCourseApi = {
    getCourseReviews: async (
        page: number = 1,
        limit: number = COURSE_REVIEWS_PER_PAGE,
        slug: string = "",
        rating: number | null = null,
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/course-reviews/${slug}?page=${page}&limit=${limit}`;
        if (rating) {
            // Filter rating
            query += `&filter[rating]=${rating}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, rating, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return publicApi.get<ReviewCourseListResponse>(query);
    },
    // get rating distribution
    getRatingDistribution: async (slug: string) => {
        const response = await publicApi.get<RatingDistributionList>(`/course-reviews/${slug}/ratings/distribution`);
        return response.data;
    },
};
export default reviewCourseApi;
