/**
 * Ví dụ sử dụng CommentSystem - Hệ thống comment có thể tái sử dụng
 *
 * CommentSystem là một component tổng quát có thể được sử dụng cho bất kỳ loại nội dung nào
 * như posts, courses, lessons, videos, etc.
 */

import React from "react";
import CommentSystem from "~/components/CommentSystem";
import EnhancedFormComment from "~/components/CommentSystem/EnhancedFormComment";

// Ví dụ 1: Sử dụng cơ bản cho post
export const PostCommentExample = ({ postSlug }: { postSlug: string }) => {
    return (
        <CommentSystem
            type="post"
            identifier={postSlug}
            showSkeleton={true}
            skeletonCount={6}
            showReplies={true}
            maxReplyDepth={1}
            className="mt-8"
        />
    );
};

// Ví dụ 2: Sử dụng cho course với custom permissions
export const CourseCommentExample = ({ courseId }: { courseId: string }) => {
    return (
        <CommentSystem
            type="course"
            identifier={courseId}
            showSkeleton={true}
            skeletonCount={3}
            showReplies={true}
            maxReplyDepth={2}
            // Custom permission checkers
            canEdit={(comment, user) => {
                // Chỉ cho phép edit trong 30 phút đầu
                const commentTime = new Date(comment.created_at).getTime();
                const now = new Date().getTime();
                const thirtyMinutes = 30 * 60 * 1000;
                return Boolean(user && user.id === comment.user_id && now - commentTime < thirtyMinutes);
            }}
            canDelete={(comment, user) => {
                // Admin hoặc người tạo comment có thể xóa
                const userRole = (user as { role?: string })?.role;
                return Boolean(user && (userRole === "admin" || user.id === comment.user_id));
            }}
            canReply={(comment, _user) => {
                // Chỉ học viên đã đăng ký khóa học mới có thể reply
                const userCourses = (_user as { enrolled_courses?: string[] })?.enrolled_courses;
                return Boolean(_user && userCourses?.includes(courseId));
            }}
            className="mt-6"
        />
    );
};

// Ví dụ 3: Sử dụng với custom API endpoints
export const LessonCommentExample = ({ lessonId }: { lessonId: string }) => {
    return (
        <CommentSystem
            type="lesson"
            identifier={lessonId}
            apiEndpoints={{
                list: `/api/lessons/${lessonId}/comments`,
                create: async (data) => {
                    const response = await fetch(`/api/lessons/${lessonId}/comments`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    });
                    return response.json();
                },
                update: async (commentId, data) => {
                    const response = await fetch(`/api/comments/${commentId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    });
                    return response.json();
                },
                delete: async (commentId) => {
                    const response = await fetch(`/api/comments/${commentId}`, {
                        method: "DELETE",
                    });
                    return response.json();
                },
            }}
            showReplies={false} // Không hiển thị replies cho lesson
            className="rounded-lg bg-gray-50 p-4"
        />
    );
};

// Ví dụ 4: Sử dụng với custom form component
export const VideoCommentExample = ({ videoId }: { videoId: string }) => {
    return (
        <CommentSystem
            type="video"
            identifier={videoId}
            FormComponent={EnhancedFormComment}
            showSkeleton={false}
            commentActions={{
                onReply: (commentId, content) => {
                    console.log(`Replied to comment ${commentId} with: ${content}`);
                },
                onEdit: (commentId, content) => {
                    console.log(`Edited comment ${commentId} with: ${content}`);
                },
                onDelete: (commentId) => {
                    console.log(`Deleted comment ${commentId}`);
                },
            }}
            className="mx-auto max-w-4xl"
        />
    );
};

// Ví dụ 5: Comment cho exam/quiz
export const ExamCommentExample = ({ examId }: { examId: string }) => {
    return (
        <CommentSystem
            type="exam"
            identifier={examId}
            showReplies={true}
            maxReplyDepth={1}
            // Chỉ cho phép comment sau khi hoàn thành exam
            canReply={(comment, user) => {
                const userExams = (user as { completed_exams?: string[] })?.completed_exams;
                return Boolean(user && userExams?.includes(examId));
            }}
            canEdit={(_comment, _user) => {
                // Không cho phép edit comment trong exam
                return false;
            }}
            canDelete={(comment, user) => {
                // Chỉ admin có thể xóa
                const userRole = (user as { role?: string })?.role;
                return Boolean(user && userRole === "admin");
            }}
            className="mt-6 border-t pt-6"
        />
    );
};

// Ví dụ 6: Comment với custom rendering
export const CustomCommentExample = ({ contentId }: { contentId: string }) => {
    return (
        <CommentSystem
            type="custom"
            identifier={contentId}
            renderComment={(comment, actions) => (
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-semibold">{comment.creator?.full_name}</h4>
                            <p className="text-sm text-gray-600">{comment.created_at}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={actions.onReply} className="text-sm text-blue-600 hover:underline">
                                Reply
                            </button>
                            <button onClick={actions.onEdit} className="text-sm text-green-600 hover:underline">
                                Edit
                            </button>
                            <button onClick={actions.onDelete} className="text-sm text-red-600 hover:underline">
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div dangerouslySetInnerHTML={{ __html: comment.description }} />
                    </div>
                </div>
            )}
            className="space-y-4"
        />
    );
};

/**
 * Tóm tắt tính năng của CommentSystem:
 *
 * 1. **Tái sử dụng cao**: Có thể dùng cho bất kỳ loại content nào
 * 2. **Custom permissions**: Tùy chỉnh quyền edit, delete, reply
 * 3. **Custom API endpoints**: Tùy chỉnh API calls
 * 4. **Custom rendering**: Tùy chỉnh cách hiển thị comment
 * 5. **Custom form**: Tùy chỉnh form nhập comment
 * 6. **Nested replies**: Hỗ trợ reply lồng nhau với depth limit
 * 7. **Loading states**: Skeleton loading và loading indicators
 * 8. **Actions callbacks**: Hooks để xử lý các actions
 * 9. **TypeScript support**: Full type safety
 * 10. **Responsive**: Tương thích mobile và desktop
 */
