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


        default:
            return <Badge variant="secondary">Không xác định</Badge>;
    }
}
