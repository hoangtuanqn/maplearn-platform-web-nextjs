"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import invoiceApi from "~/apiRequest/invoices";
import { formatter } from "~/libs/format";
import { InvoiceDetailResponse } from "~/schemaValidate/invoice.schema";

const InvoiceSummary = ({ invoice }: { invoice: InvoiceDetailResponse["data"] }) => {
    const { data: cardTopUpHistory } = useQuery({
        queryKey: ["user", "cardTopUpHistory", invoice.transaction_code],
        queryFn: async () => {
            const res = await invoiceApi.getCardTopUpHistory(invoice.transaction_code);

            return res.data.data.data;
        },
    });
    // Đã thanh toán
    const totalPaid =
        cardTopUpHistory?.filter((item) => item.status === "success").reduce((acc, item) => acc + item.amount, 0) || 0;
    return (
        <div className="mt-6 flex justify-end max-md:mt-3 max-md:justify-center">
            <div className="w-72 rounded-xl border border-blue-100 bg-blue-50 p-5 shadow max-md:w-full max-md:rounded-lg max-md:p-3">
                <div className="flex justify-between py-2 text-slate-700 max-md:py-1 max-md:text-xs">
                    <span>Tổng phụ</span>
                    <span className="font-semibold">{formatter.number(invoice.total_price + totalPaid)} đ</span>
                </div>

                <div className="flex justify-between py-2 max-md:py-1 max-md:text-xs">
                    <span>VAT: </span>
                    <span className="font-semibold">0 đ</span>
                </div>
                <div className="flex justify-between py-2 text-green-700 max-md:py-1 max-md:text-xs">
                    <span>Đã thanh toán</span>
                    <span className="font-semibold text-green-700">{formatter.number(totalPaid)} đ</span>
                </div>
                <div className="mt-2 flex justify-between border-t pt-3 text-base font-bold text-blue-800 max-md:pt-2 max-md:text-sm">
                    <span>Tổng cộng</span>
                    <span>{formatter.number(invoice.total_price)} đ</span>
                </div>
            </div>
        </div>
    );
};

export default InvoiceSummary;
