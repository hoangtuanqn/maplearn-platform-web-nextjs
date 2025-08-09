"use client";
import { useQuery } from "@tanstack/react-query";
import React, { memo, useEffect, useState } from "react";
import { INVOICE_PER_PAGE } from "~/apiRequest/invoices";
import { PaginationNav } from "../../../_components/Pagination";
import { useRouter } from "next/navigation";
import TableSkeleton from "../../_components/TableSkeleton";
import DisplayNoData from "../../../_components/Courses/DisplayNoData";
import { getStatusBadge } from "~/libs/statusBadge";
import { formatter } from "~/libs/format";
import { Checkbox } from "~/components/ui/checkbox";
import ActionPayment from "../_components/ActionPayment";
import { FilterInvoice } from "./FilterInvoice";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { buildLaravelFilterQuery } from "~/libs/hepler";
import profileApi from "~/apiRequest/profile";
import ExportInvoices from "./ExportInvoices";

const InvoiceList = () => {
    const { page, sort, status, date } = useGetSearchQuery(["page", "sort", "status", "date"] as const);
    const { data, isLoading } = useQuery({
        queryKey: ["user", "invoices", { page, sort, status, date }],
        queryFn: async () => {
            const res = await profileApi.getInvoices(
                Number(page ?? 1),
                INVOICE_PER_PAGE,
                "",
                sort,
                buildLaravelFilterQuery({ status, date }),
            );
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const totalPages = Math.ceil((data?.invoices?.total ?? 0) / INVOICE_PER_PAGE);
    const router = useRouter();
    const [invoices, setInvoices] = useState(data?.invoices?.data || []);

    useEffect(() => {
        if (data?.invoices?.data) {
            setInvoices(data.invoices.data);
        }
    }, [data]);
    const [selected, setSelected] = useState<number[]>([]);
    return (
        <div className="flex flex-col gap-4 font-medium">
            <div className="flex flex-col">
                <div className="mb-5 flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col justify-center gap-1">
                        <p className="text-base font-semibold text-neutral-900">Đã tìm thấy</p>
                        <ul className="ml-4 list-inside list-disc text-sm text-neutral-700">
                            <li>
                                <span className="text-primary-600 font-bold">{data?.invoices?.total ?? 0}</span> kết quả
                            </li>
                            <li>
                                <span className="font-bold text-yellow-600">{data?.summary.total_pending ?? 0}</span>{" "}
                                hóa đơn chưa thanh toán
                            </li>
                            <li>
                                <span className="font-bold text-yellow-600">
                                    Tổng {formatter.number(data?.summary.total_price_pending ?? 0)}đ {"  "}
                                </span>
                                cần phải thanh toán
                            </li>
                        </ul>
                    </div>
                    <div className="mt-3 flex items-center gap-3 md:mt-0">
                        <ActionPayment invoices={invoices} selected={selected} />
                        <FilterInvoice />
                        <ExportInvoices payload={{ sort, status, date, totalPages }} />
                    </div>
                </div>
                <div className="-m-1.5 overflow-x-auto">
                    <div className="inline-block min-w-full p-1.5 align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-4 py-3 pe-0">
                                            <div className="flex h-5 items-center">
                                                <Checkbox disabled />
                                            </div>
                                        </th>
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
                                            Ngày tạo
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Hạn thanh toán
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
                                    {!isLoading && (invoices?.length ?? 0) == 0 && (
                                        <tr className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-gray-100">
                                            <td
                                                className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800"
                                                colSpan={8}
                                            >
                                                <DisplayNoData title="Bạn hiện không có hóa đơn nào" />
                                            </td>
                                        </tr>
                                    )}

                                    {isLoading ? (
                                        [...Array(INVOICE_PER_PAGE)].map((_, index) => (
                                            <TableSkeleton key={index} col={6} />
                                        ))
                                    ) : (
                                        <>
                                            {invoices.map((invoice) => (
                                                <tr
                                                    onClick={() => router.push(`/invoices/${invoice.transaction_code}`)}
                                                    key={invoice.id}
                                                    className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-gray-100"
                                                >
                                                    <td className="py-3 ps-4" onClick={(e) => e.stopPropagation()}>
                                                        {/* Pending mới hiển thị */}
                                                        {invoice.status === "pending" && (
                                                            <div className="flex h-5 items-center">
                                                                <Checkbox
                                                                    onCheckedChange={(checked) => {
                                                                        if (checked)
                                                                            setSelected((prev) => [
                                                                                ...prev,
                                                                                invoice.id,
                                                                            ]);
                                                                        else
                                                                            setSelected((prev) =>
                                                                                prev.filter((id) => id !== invoice.id),
                                                                            );
                                                                    }}
                                                                    // checked={selected.includes(invoice.id)}
                                                                />
                                                                <label
                                                                    htmlFor="hs-table-search-checkbox-1"
                                                                    className="sr-only"
                                                                >
                                                                    Checkbox
                                                                </label>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800">
                                                        #{invoice.transaction_code}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">
                                                        {formatter.date(invoice.created_at, true)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">
                                                        {formatter.date(invoice.due_date, true)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-800">
                                                        {formatter.number(invoice.total_price)} VNĐ
                                                    </td>
                                                    <td className="px-6 py-4 text-end text-sm font-medium whitespace-nowrap">
                                                        {getStatusBadge("invoice", invoice.status)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-end justify-between lg:flex-col">
                <div className="ml-auto">
                    {!isLoading && totalPages > 1 && (invoices?.length ?? 0) > 0 && (
                        <PaginationNav totalPages={totalPages} basePath="/profile/invoices" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(InvoiceList);
