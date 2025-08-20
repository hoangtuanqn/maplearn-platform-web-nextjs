import { Badge } from "~/components/ui/badge";

export function getStatusBadge(type: string, status: string) {
    switch (type) {
        case "invoice":
            switch (status) {
                case "paid":
                    return <Badge variant="success">Đã thanh toán</Badge>;
                case "failed":
                    return <Badge variant="danger">Đã hủy hóa đơn</Badge>;
                case "expired":
                    return <Badge variant="danger">Đã hết hạn</Badge>;
                default:
                    return <Badge variant="warning">Chưa thanh toán</Badge>;
            }
        case "card":
            // pending', 'success', 'failed'
            switch (status) {
                case "pending":
                    return <Badge variant="warning">Chờ kiểm tra</Badge>;
                case "success":
                    return <Badge variant="success">Chấp nhận</Badge>;
                case "failed":
                    return <Badge variant="danger">Từ chối</Badge>;
            }
        case "exam":
            // 'in_progress', 'submitted', 'detected', 'canceled'
            switch (status) {
                case "in_progress":
                    return <Badge variant="warning">Đang làm bài</Badge>;
                case "submitted":
                    return <Badge variant="success">Đã nộp bài</Badge>;
                case "detected":
                    return <Badge variant="danger">Vi phạm quy chế</Badge>;
                case "canceled":
                    return <Badge variant="secondary">Đã hủy</Badge>;
                default:
                    return <Badge variant="secondary">Không xác định</Badge>;
            }
        case "exam_result":
            // 'in_progress', 'submitted', 'detected', 'canceled'
            switch (status) {
                case "pass":
                    return <Badge variant="success">Đạt</Badge>;
                case "not_pass":
                    return <Badge variant="danger">Không đạt</Badge>;
                default:
                    return <Badge variant="secondary">Không xác định</Badge>;
            }
        default:
            return <Badge variant="secondary">Không xác định</Badge>;
    }
}
