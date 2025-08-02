import publicApi from "~/libs/apis/publicApi";
import postApi from "./post";

// Course Comments API
export const courseCommentApi = {
    comment: (data: { courseId: string; comment: string; reply_id: string | null }) =>
        publicApi.post("/comments", {
            course_id: data.courseId,
            description: data.comment,
            reply_id: data.reply_id,
            type: "course",
        }),
    deleteComment: (commentId: string) => publicApi.delete(`/comments/${commentId}`),
    updateComment: (commentId: string, data: { comment: string }) =>
        publicApi.patch(`/comments/${commentId}`, {
            description: data.comment,
        }),
    getComments: (courseId: string) => publicApi.get(`/comments?type=course&course_id=${courseId}`),
};

// Lesson Comments API
export const lessonApi = {
    comment: (data: { lessonId: string; comment: string; reply_id: string | null }) =>
        publicApi.post("/comments", {
            lesson_id: data.lessonId,
            description: data.comment,
            reply_id: data.reply_id,
            type: "lesson",
        }),
    deleteComment: (commentId: string) => publicApi.delete(`/comments/${commentId}`),
    updateComment: (commentId: string, data: { comment: string }) =>
        publicApi.patch(`/comments/${commentId}`, {
            description: data.comment,
        }),
    getComments: (lessonId: string) => publicApi.get(`/comments?type=lesson&lesson_id=${lessonId}`),
};

// Video Comments API
export const videoApi = {
    comment: (data: { videoId: string; comment: string; reply_id: string | null }) =>
        publicApi.post("/comments", {
            video_id: data.videoId,
            description: data.comment,
            reply_id: data.reply_id,
            type: "video",
        }),
    deleteComment: (commentId: string) => publicApi.delete(`/comments/${commentId}`),
    updateComment: (commentId: string, data: { comment: string }) =>
        publicApi.patch(`/comments/${commentId}`, {
            description: data.comment,
        }),
    getComments: (videoId: string) => publicApi.get(`/comments?type=video&video_id=${videoId}`),
};

// Exam Comments API
export const examApi = {
    comment: (data: { examId: string; comment: string; reply_id: string | null }) =>
        publicApi.post("/comments", {
            exam_id: data.examId,
            description: data.comment,
            reply_id: data.reply_id,
            type: "exam",
        }),
    deleteComment: (commentId: string) => publicApi.delete(`/comments/${commentId}`),
    updateComment: (commentId: string, data: { comment: string }) =>
        publicApi.patch(`/comments/${commentId}`, {
            description: data.comment,
        }),
    getComments: (examId: string) => publicApi.get(`/comments?type=exam&exam_id=${examId}`),
};

// Generic Comment API helper
export const commentApiHelper = {
    getApiForType: (type: string) => {
        switch (type) {
            case "post":
                return {
                    comment: (data: { identifier: string; comment: string; reply_id: string | null }) =>
                        postApi.comment({
                            slug: data.identifier,
                            comment: data.comment,
                            reply_id: data.reply_id,
                        }),
                    deleteComment: postApi.deleteComment,
                    updateComment: postApi.updateComment,
                    getComments: (identifier: string) => publicApi.get(`/comments?type=post&slug=${identifier}`),
                };
            case "course":
                return {
                    comment: (data: { identifier: string; comment: string; reply_id: string | null }) =>
                        courseCommentApi.comment({
                            courseId: data.identifier,
                            comment: data.comment,
                            reply_id: data.reply_id,
                        }),
                    deleteComment: courseCommentApi.deleteComment,
                    updateComment: courseCommentApi.updateComment,
                    getComments: courseCommentApi.getComments,
                };
            case "lesson":
                return {
                    comment: (data: { identifier: string; comment: string; reply_id: string | null }) =>
                        lessonApi.comment({
                            lessonId: data.identifier,
                            comment: data.comment,
                            reply_id: data.reply_id,
                        }),
                    deleteComment: lessonApi.deleteComment,
                    updateComment: lessonApi.updateComment,
                    getComments: lessonApi.getComments,
                };
            case "video":
                return {
                    comment: (data: { identifier: string; comment: string; reply_id: string | null }) =>
                        videoApi.comment({
                            videoId: data.identifier,
                            comment: data.comment,
                            reply_id: data.reply_id,
                        }),
                    deleteComment: videoApi.deleteComment,
                    updateComment: videoApi.updateComment,
                    getComments: videoApi.getComments,
                };
            case "exam":
                return {
                    comment: (data: { identifier: string; comment: string; reply_id: string | null }) =>
                        examApi.comment({
                            examId: data.identifier,
                            comment: data.comment,
                            reply_id: data.reply_id,
                        }),
                    deleteComment: examApi.deleteComment,
                    updateComment: examApi.updateComment,
                    getComments: examApi.getComments,
                };
            default:
                throw new Error(`Unsupported comment type: ${type}`);
        }
    },
};
