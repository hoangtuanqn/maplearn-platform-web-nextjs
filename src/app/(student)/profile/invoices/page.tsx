"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import invoiceApi, { INVOICE_PER_PAGE } from "~/apiRequest/invoices";
import { Badge } from "~/components/ui/badge";
import { PaginationNav } from "../../_components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import TableSkeleton from "../_components/TableSkeleton";
const InvoiceProfile = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const { data: invoices, isLoading } = useQuery({
        queryKey: ["user", "invoices", page],
        queryFn: async () => {
            const res = await invoiceApi.getInvoices(page, INVOICE_PER_PAGE);
            return res.data.data;
        },
    });
    const totalPages = Math.ceil((invoices?.total ?? 0) / INVOICE_PER_PAGE);
    const router = useRouter();
    return (
        <>
            <h3 className="block-heading mb-6">Hóa đơn của bạn</h3>
            <div className="flex flex-col gap-4 font-medium">
                <div className="flex flex-col shadow-sm">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="inline-block min-w-full p-1.5 align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                            >
                                                # Hóa đơn
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                            >
                                                Ngày tạo hóa đơn
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                            >
                                                Ngày hết hạn
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                            >
                                                Tổng cộng
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                                            >
                                                Trạng thái
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading &&
                                            [...Array(INVOICE_PER_PAGE)].map((_, index) => (
                                                <TableSkeleton key={index} />
                                            ))}
                                        {invoices?.data.map((invoice) => (
                                            <tr
                                                onClick={() => router.push(`/invoices/${invoice.transaction_code}`)}
                                                key={invoice.id}
                                                className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-gray-100"
                                            >
                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800">
                                                    #{invoice.transaction_code}
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">
                                                    {invoice.created_at}
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">
                                                    Chưa có
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">
                                                    200.000 VNĐ
                                                </td>
                                                <td className="px-6 py-4 text-end text-sm font-medium whitespace-nowrap">
                                                    <Badge variant={"warning"}>Chưa thanh toán </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-auto">
                    {!isLoading && (invoices?.data?.length ?? 0) > 0 && (
                        <PaginationNav totalPages={totalPages} basePath="/profile/invoices" />
                    )}
                </div>
            </div>
        </>
    );
};

export default InvoiceProfile;
