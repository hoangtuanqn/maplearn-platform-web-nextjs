import { useMutation } from "@tanstack/react-query";
import { FileDown } from "lucide-react";
import React from "react";
import profileApi from "~/apiRequest/profile";
import Loading from "~/app/(student)/_components/Loading";
import { Button } from "~/components/ui/button";
import { notificationErrorApi } from "~/libs/apis/http";
import { exportExcel } from "~/libs/exportExcel";
import { formatter } from "~/libs/format";
import { buildLaravelFilterQuery } from "~/libs/hepler";

const ExportInvoices = ({
    payload: { sort, status, date, totalPages },
}: {
    payload: { sort: string; status: string; date: string; totalPages: number };
}) => {
    const headerMap = {
        transaction_code: "Mã giao dịch",
        payment_method: "Phương thức thanh toán",
        total_price: "Tổng giá",
        status: "Trạng thái",
        course_count: "Số lượng khóa học",
        created_at: "Ngày tạo",
        updated_at: "Ngày cập nhật",
        due_date: "Ngày đến hạn",
    };

    const exportMuation = useMutation({
        mutationFn: async () => {
            const res = await profileApi.getInvoices(0, 10000, "", sort, buildLaravelFilterQuery({ status, date }));
            return res.data;
        },
        onSuccess: (data) => {
            const value = data.data.invoices.data.map((item) => {
                const statusMap: Record<string, string> = {
                    pending: "Chưa thanh toán",
                    paid: "Đã thanh toán",
                    failed: "Thanh toán thất bại",
                    expired: "Hóa đơn hết hạn",
                };
                return {
                    transaction_code: item.transaction_code,
                    payment_method: item.payment_method,
                    total_price: formatter.number(item.total_price),
                    status: statusMap[item.status] || "Không xác định",
                    course_count: formatter.number(item.course_count),
                    created_at: formatter.date(item.created_at, true),
                    updated_at: formatter.date(item.updated_at, true),
                    due_date: formatter.date(item.due_date, true),
                };
            });
            exportExcel(value, "Danh sách hóa đơn.xlsx", headerMap);
        },
    });
    return (
        <>
            {exportMuation.isPending && <Loading />}
            <Button
                disabled={exportMuation.isPending || totalPages < 1}
                className="text-xs"
                variant={"outline"}
                onClick={() => {
                    exportMuation.mutate();
                }}
            >
                <FileDown />
                <span>Xuất dữ liệu</span>
            </Button>
        </>
    );
};

export default ExportInvoices;
