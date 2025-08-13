/**
 * Updated Examples - Sử dụng CommentSystem với API được tổ chức tốt
 *
 * Sau khi tái cấu trúc, bây giờ chỉ cần chỉ định `type` và `identifier`,
 * hệ thống sẽ tự động sử dụng API phù hợp từ file comment.ts
 */

import React from "react";
import CommentSystem from "~/components/CommentSystem";
import EnhancedFormComment from "~/components/CommentSystem/EnhancedFormComment";

// ✅ Ví dụ 1: Post Comments (sử dụng postApi)
export const PostCommentExample = ({ postSlug }: { postSlug: string }) => {
    return (
        <CommentSystem
            type="post" // Tự động sử dụng postApi
            identifier={postSlug} // slug của post
            showSkeleton={true}
            skeletonCount={6}
            showReplies={true}
            maxReplyDepth={1}
            className="mt-8"
        />
    );
};

// ✅ Ví dụ 2: Course Comments (sử dụng courseCommentApi)
export const CourseCommentExample = ({ courseId }: { courseId: string }) => {
    return (
        <CommentSystem
            type="course" // Tự động sử dụng courseCommentApi
            identifier={courseId} // ID của course
            showSkeleton={true}
            skeletonCount={3}
            showReplies={true}
            maxReplyDepth={2}
            // Custom permissions
            canEdit={(comment, user) => {
                const commentTime = new Date(comment.created_at).getTime();
                const now = new Date().getTime();
                const thirtyMinutes = 30 * 60 * 1000;
                return Boolean(user && user.id === comment.user_id && now - commentTime < thirtyMinutes);
            }}
            canDelete={(comment, user) => {
                const userRole = (user as { role?: string })?.role;
                return Boolean(user && (userRole === "admin" || user.id === comment.user_id));
            }}
            className="mt-6"
        />
    );
};

// ✅ Ví dụ 3: Lesson Comments (sử dụng lessonApi)
export const LessonCommentExample = ({ lessonId }: { lessonId: string }) => {
    return (
        <CommentSystem
            type="lesson" // Tự động sử dụng lessonApi
            identifier={lessonId} // ID của lesson
            showReplies={false} // Lesson không cần replies
            showSkeleton={true}
            skeletonCount={3}
            className="rounded-lg bg-gray-50 p-4"
        />
    );
};

// ✅ Ví dụ 4: Video Comments (sử dụng videoApi)
export const VideoCommentExample = ({ videoId }: { videoId: string }) => {
    return (
        <CommentSystem
            type="video" // Tự động sử dụng videoApi
            identifier={videoId} // ID của video
            FormComponent={EnhancedFormComment}
            showSkeleton={false}
            showReplies={true}
            maxReplyDepth={1}
            // commentActions={{
            //     onReply: (commentId, content) => {
            //         console.log(`Replied to video comment ${commentId}: ${content}`);
            //     },
            //     onEdit: (commentId, content) => {
            //         console.log(`Edited video comment ${commentId}: ${content}`);
            //     },
            //     onDelete: (commentId) => {
            //         console.log(`Deleted video comment ${commentId}`);
            //     },
            // }}
            className="mx-auto max-w-4xl"
        />
    );
};

// ✅ Ví dụ 5: Exam Comments (sử dụng examApi)
export const ExamCommentExample = ({ examId }: { examId: string }) => {
    return (
        <CommentSystem
            type="exam" // Tự động sử dụng examApi
            identifier={examId} // ID của exam
            showReplies={true}
            maxReplyDepth={1}
            // Custom permissions cho exam
            canReply={(comment, user) => {
                const userExams = (user as { completed_exams?: string[] })?.completed_exams;
                return Boolean(user && userExams?.includes(examId));
            }}
            canEdit={(_comment, _user) => {
                // Không cho phép edit comment trong exam
                return false;
            }}
            canDelete={(comment, user) => {
                const userRole = (user as { role?: string })?.role;
                return Boolean(user && userRole === "admin");
            }}
            className="mt-6 border-t pt-6"
        />
    );
};

// ✅ Ví dụ 6: Vẫn có thể override API nếu cần custom
export const CustomAPIExample = ({ contentId }: { contentId: string }) => {
    return (
        <CommentSystem
            type="custom"
            identifier={contentId}
            apiEndpoints={{
                // Override API functions nếu cần logic đặc biệt
                create: async (data) => {
                    const response = await fetch(`/api/custom/${contentId}/comments`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            content: data.comment,
                            parent_id: data.reply_id,
                            // Custom fields
                            timestamp: new Date().toISOString(),
                            user_agent: navigator.userAgent,
                        }),
                    });
                    return response.json();
                },
                update: async (commentId, data) => {
                    const response = await fetch(`/api/custom/comments/${commentId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            content: data.comment,
                            updated_at: new Date().toISOString(),
                        }),
                    });
                    return response.json();
                },
                delete: async (commentId) => {
                    const response = await fetch(`/api/custom/comments/${commentId}`, {
                        method: "DELETE",
                        headers: { "X-Soft-Delete": "true" }, // Soft delete
                    });
                    return response.json();
                },
            }}
            className="space-y-4"
        />
    );
};

/**
 * 🚀 Lợi ích của cách tổ chức mới:
 *
 * 1. **Đơn giản hơn**: Chỉ cần chỉ định type, API được chọn tự động
 * 2. **Maintainable**: Tất cả API endpoint được quản lý tập trung
 * 3. **Extensible**: Dễ dàng thêm type mới vào commentApiHelper
 * 4. **Consistent**: Tất cả comment APIs có cùng interface
 * 5. **Type Safe**: Full TypeScript support
 *
 * 🔧 Cách thêm type mới:
 *
 * 1. Thêm API functions vào `comment.ts`:
 *    ```ts
 *    export const newTypeApi = {
 *        comment: (data) => ...,
 *        deleteComment: (id) => ...,
 *        updateComment: (id, data) => ...,
 *        getComments: (id) => ...,
 *    };
 *    ```
 *
 * 2. Thêm case vào `commentApiHelper.getApiForType()`:
 *    ```ts
 *    case "newType":
 *        return {
 *            comment: (data) => newTypeApi.comment({ ... }),
 *            deleteComment: newTypeApi.deleteComment,
 *            updateComment: newTypeApi.updateComment,
 *            getComments: newTypeApi.getComments,
 *        };
 *    ```
 *
 * 3. Sử dụng ngay lập tức:
 *    ```tsx
 *    <CommentSystem type="newType" identifier={id} />
 *    ```
 */
