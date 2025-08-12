"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import invoiceApi from "~/apiRequest/invoices";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { formatter } from "~/libs/format";
import { getStatusBadge } from "~/libs/statusBadge";

const CardTopUpHistory = ({ code }: { code: string }) => {
    const { data: cardTopUpHistory, isLoading } = useQuery({
        queryKey: ["user", "cardTopUpHistory", code],
        queryFn: async () => {
            const res = await invoiceApi.getCardTopUpHistory(code);
            // console.log(res);

            return res.data.data.data;
        },
    });
    // console.log("cardTopUpHistory >> ", cardTopUpHistory);
    if (cardTopUpHistory?.length == 0) return null;
    return (
        <section className="no-print mt-5 p-2">
            <h2 className="text-primary mb-4 text-base font-semibold">Thẻ cào đã nạp</h2>
            <div className="-m-1.5 overflow-x-auto rounded-xl bg-white shadow-sm">
                <div className="inline-block min-w-full p-1.5 align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase sm:px-6"
                                    >
                                        # Mã Seri
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase sm:table-cell"
                                    >
                                        Ngày nạp
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase sm:table-cell"
                                    >
                                        Mệnh giá
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase sm:table-cell"
                                    >
                                        Ghi chú
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-3 text-end text-xs font-medium text-gray-500 uppercase sm:px-6"
                                    >
                                        Kết quả
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading
                                    ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={5} />)
                                    : cardTopUpHistory?.map((item) => (
                                          <tr key={item.id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
                                              <td className="max-w-[120px] px-2 py-4 text-xs font-medium text-gray-800 sm:px-6 sm:text-sm">
                                                  <div title={item.serial}>{item.serial}</div>
                                              </td>
                                              <td className="px-2 py-4 text-xs font-medium text-gray-800 sm:px-6 sm:text-sm">
                                                  <div className="">{formatter.date(item.created_at)}</div>
                                              </td>
                                              <td className="px-2 py-4 text-xs font-medium text-gray-800 sm:px-6 sm:text-sm">
                                                  <div className="">{formatter.number(item.amount)}đ</div>
                                              </td>
                                              <td className="px-2 py-4 text-xs font-medium text-gray-800 sm:px-6 sm:text-sm">
                                                  <div className="line-clamp-1">{item.response_message}</div>
                                              </td>
                                              <td className="px-2 py-4 text-end text-xs font-medium sm:px-6 sm:text-sm">
                                                  {getStatusBadge("card", item.status)}
                                              </td>
                                          </tr>
                                      ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CardTopUpHistory;
