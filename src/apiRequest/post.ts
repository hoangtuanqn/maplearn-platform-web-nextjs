import publicApi from "~/libs/apis/publicApi";
import { PostListResponse } from "~/schemaValidate/post.schema";
export const POSTS_PER_PAGE = 16;
export const postApi = {
    getPosts: (page: number = 1, limit: number = 16, search: string = "") =>
        publicApi.get<PostListResponse>(
            search
                ? `/posts?page=${page}&limit=${limit}&filter[title]=${search}`
                : `/posts?page=${page}&limit=${limit}`,
        ),
    getDetail: (slug: string) => publicApi.get(`/posts/${slug}`),
    comment: (data: { slug: string; comment: string; reply_id: string | null }) =>
        publicApi.post("/comments", {
            slug: data.slug,
            description: data.comment, // alias tại đây
            reply_id: data.reply_id,
            type: "post",
        }),
    deleteComment: (commentId: string) => publicApi.delete(`/comments/${commentId}`),
};
