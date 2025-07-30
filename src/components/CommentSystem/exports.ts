// Main exports for CommentSystem
export { default as CommentSystem } from "./index";
export { default as EnhancedFormComment } from "./EnhancedFormComment";
export { useComments } from "~/hooks/useComments";

// Types
export type {
    UseCommentsProps,
    CommentCreateData,
    CommentUpdateData,
    CommentActions,
    ApiResponse,
} from "~/hooks/useComments";

export type { CommentSystemProps } from "./index";

export type { EnhancedFormCommentProps } from "./EnhancedFormComment";

// Re-export comment types from schema
export type { CommentType, CommentListResponse, PaginationMeta } from "~/schemaValidate/comment.schema";
