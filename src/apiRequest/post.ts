import publicApi from "~/libs/apis/publicApi";
import { PostListResponse } from "~/schemaValidate/post.schema";
export const POSTS_PER_PAGE = 16;
const postApi = {
    getPosts: (
        page: number = 1,
        limit: number = POSTS_PER_PAGE,
        search: string = "",
        sort: string = "",
        queryOther: string,
    ) => {
        let query = `/posts?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (sort) {
            query += `&sort=${sort}`;
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }

        return publicApi.get<PostListResponse>(query);
    },
    getDetail: (slug: string) => publicApi.get(`/posts/${slug}`),
    comment: (data: { slug: string; comment: string; reply_id: string | null }) =>
        publicApi.post("/comments", {
            slug: data.slug,
            description: data.comment, // alias tại đây
            reply_id: data.reply_id,
            type: "post",
        }),
    deleteComment: (commentId: string) => publicApi.delete(`/comments/${commentId}`),
    updateComment: (commentId: string, data: { comment: string }) =>
        publicApi.patch(`/comments/${commentId}`, {
            description: data.comment, // alias tại đây
        }),
    incrementView: (slug: string) => publicApi.post(`/posts/${slug}/view`),
};
export default postApi;
