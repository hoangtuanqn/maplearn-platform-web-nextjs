# CommentSystem - Hệ thống bình luận tái sử dụng

## Tổng quan

CommentSystem là một hệ thống bình luận tổng quát được thiết kế để có thể tái sử dụng trên nhiều loại nội dung khác nhau như posts, courses, lessons, videos, exams, v.v.

## Tính năng chính

✅ **Tái sử dụng cao**: Có thể dùng cho bất kỳ loại content nào  
✅ **Custom permissions**: Tùy chỉnh quyền edit, delete, reply  
✅ **Custom API endpoints**: Tùy chỉnh API calls  
✅ **Custom rendering**: Tùy chỉnh cách hiển thị comment  
✅ **Custom form**: Tùy chỉnh form nhập comment  
✅ **Nested replies**: Hỗ trợ reply lồng nhau với depth limit  
✅ **Loading states**: Skeleton loading và loading indicators  
✅ **Actions callbacks**: Hooks để xử lý các actions  
✅ **TypeScript support**: Full type safety  
✅ **Responsive**: Tương thích mobile và desktop

## Cấu trúc file

```
src/
├── hooks/
│   └── useComments.ts              # Hook quản lý logic comment
├── components/
│   └── CommentSystem/
│       ├── index.tsx               # Component chính
│       ├── EnhancedFormComment.tsx # Form comment tối ưu
│       ├── examples.tsx            # Các ví dụ sử dụng cũ
│       ├── updatedExamples.tsx     # Ví dụ sử dụng với API mới
│       ├── exports.ts              # Export types & components
│       └── README.md               # Tài liệu này
├── apiRequest/
│   ├── post.ts                     # API cho post comments
│   └── comment.ts                  # API tổng quát cho tất cả types
└── schemaValidate/
    └── comment.schema.ts           # Schema validation
```

## Cách sử dụng cơ bản

### 1. Import component

```tsx
import CommentSystem from "~/components/CommentSystem";
```

### 2. Sử dụng trong component

```tsx
export const MyComponent = ({ contentId }: { contentId: string }) => {
    return (
        <CommentSystem
            type="post" // Loại content
            identifier={contentId} // ID duy nhất
            showSkeleton={true} // Hiển thị skeleton loading
            skeletonCount={6} // Số skeleton items
            showReplies={true} // Hiển thị replies
            maxReplyDepth={1} // Độ sâu tối đa của replies
            className="mt-8" // CSS class
        />
    );
};
```

## API Reference

### CommentSystemProps

| Prop             | Type        | Mặc định      | Mô tả                                     |
| ---------------- | ----------- | ------------- | ----------------------------------------- |
| `type`           | `string`    | **Required**  | Loại content (post, course, lesson, v.v.) |
| `identifier`     | `string`    | **Required**  | ID duy nhất của content                   |
| `apiEndpoints`   | `object`    | `undefined`   | Custom API endpoints                      |
| `showSkeleton`   | `boolean`   | `true`        | Hiển thị skeleton loading                 |
| `skeletonCount`  | `number`    | `6`           | Số skeleton items                         |
| `commentActions` | `object`    | `undefined`   | Custom comment actions                    |
| `canEdit`        | `function`  | Mặc định      | Kiểm tra quyền edit                       |
| `canDelete`      | `function`  | Mặc định      | Kiểm tra quyền delete                     |
| `canReply`       | `function`  | Mặc định      | Kiểm tra quyền reply                      |
| `renderComment`  | `function`  | `undefined`   | Custom comment renderer                   |
| `FormComponent`  | `Component` | `FormComment` | Custom form component                     |
| `className`      | `string`    | `""`          | CSS class                                 |
| `showReplies`    | `boolean`   | `true`        | Hiển thị replies                          |
| `maxReplyDepth`  | `number`    | `1`           | Độ sâu tối đa replies                     |

### useComments Hook

```tsx
const {
    // Data
    comments,
    isLoading,
    error,

    // Form state
    comment,
    setComment,
    editCommentId,
    replyToCommentId,

    // Loading states
    isSubmitting,

    // Handlers
    handleSubmitComment,
    handleDeleteComment,
    handleEditComment,
    handleReplyComment,
    handleCancelEdit,
    handleCancelReply,

    // Utils
    resetForm,
} = useComments({ type, identifier, apiEndpoints });
```

## Ví dụ nâng cao

### 1. Custom permissions

```tsx
<CommentSystem
    type="course"
    identifier={courseId}
    canEdit={(comment, user) => {
        // Chỉ cho phép edit trong 30 phút
        const commentTime = new Date(comment.created_at).getTime();
        const now = new Date().getTime();
        return user?.id === comment.user_id && now - commentTime < 1800000;
    }}
    canDelete={(comment, user) => {
        // Admin hoặc chủ comment
        return user?.role === "admin" || user?.id === comment.user_id;
    }}
    canReply={(comment, user) => {
        // Chỉ học viên đã đăng ký
        return user?.enrolledCourses?.includes(courseId);
    }}
/>
```

### 2. Custom API endpoints

```tsx
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
/>
```

### 3. Custom rendering

```tsx
<CommentSystem
    type="video"
    identifier={videoId}
    renderComment={(comment, actions) => (
        <div className="custom-comment-style">
            <div className="comment-header">
                <img src={comment.creator?.avatar} />
                <span>{comment.creator?.full_name}</span>
                <span>{comment.created_at}</span>
            </div>
            <div className="comment-body">{comment.description}</div>
            <div className="comment-actions">
                <button onClick={actions.onReply}>Reply</button>
                <button onClick={actions.onEdit}>Edit</button>
                <button onClick={actions.onDelete}>Delete</button>
            </div>
        </div>
    )}
/>
```

### 4. Custom form component

```tsx
import EnhancedFormComment from "~/components/CommentSystem/EnhancedFormComment";

<CommentSystem
    type="post"
    identifier={postId}
    FormComponent={EnhancedFormComment}
    commentActions={{
        onReply: (commentId, content) => {
            analytics.track("comment_replied", { commentId, content });
        },
        onEdit: (commentId, content) => {
            analytics.track("comment_edited", { commentId, content });
        },
        onDelete: (commentId) => {
            analytics.track("comment_deleted", { commentId });
        },
    }}
/>;
```

## Migration từ code cũ

### Trước (PostContent.tsx cũ)

```tsx
// Code cũ - logic comment được viết trực tiếp trong component
const [comment, setComment] = useState("");
const [editCommentId, setEditCommentId] = useState<number>(0);
const queryClient = useQueryClient();

const { data: comments = [], isLoading } = useQuery({...});
const commentMutation = useMutation({...});
const deleteCommentMutation = useMutation({...});

const handleSubmitComment = () => {...};
const handleDeleteComment = () => {...};

// JSX phức tạp với logic business
```

### Sau (PostContent.tsx mới)

```tsx
// Code mới - chỉ cần 1 dòng
<CommentSystem
    type="post"
    identifier={post.posts.slug}
    showSkeleton={true}
    skeletonCount={6}
    showReplies={true}
    maxReplyDepth={1}
    className="mt-8"
/>
```

## Best Practices

### 1. Naming convention cho type

- Sử dụng snake_case: `post`, `course`, `lesson`, `video_lecture`
- Tên ngắn gọn, mô tả rõ ràng

### 2. Identifier

- Sử dụng slug cho SEO-friendly URLs
- Sử dụng ID cho internal references
- Đảm bảo unique trong cùng type

### 3. Performance

- Sử dụng `maxReplyDepth` hợp lý (1-2 levels)
- Cache API responses với React Query
- Lazy load comments nếu có nhiều

### 4. Security

- Validate permissions ở cả client và server
- Sanitize input trước khi hiển thị
- Rate limiting cho API endpoints

### 5. UX

- Hiển thị loading states
- Confirm trước khi delete
- Auto-save drafts cho long comments
- Keyboard shortcuts

## Troubleshooting

### 1. Comments không load

- Kiểm tra API endpoint có đúng không
- Kiểm tra network requests trong DevTools
- Verify authentication headers

### 2. Permission không hoạt động

- Kiểm tra user object có đúng structure không
- Verify role/permission fields
- Test với different user types

### 3. TypeScript errors

- Ensure proper types for user object
- Check comment schema matches API response
- Update interfaces if API changes

## Changelog

### v1.0.0 (Current)

- ✅ Initial release
- ✅ Basic comment CRUD operations
- ✅ Nested replies support
- ✅ Custom permissions
- ✅ TypeScript support
- ✅ Responsive design

### Planned Features

- 🔄 Real-time updates with WebSocket
- 🔄 Emoji reactions
- 🔄 Mention users with @
- 🔄 File attachments
- 🔄 Comment drafts
- 🔄 Moderation tools
- 🔄 Analytics integration
