"use client";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, User, Calendar } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import paymentApi, { PAYMENT_PER_PAGE } from "~/apiRequest/admin/payment";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { formatter } from "~/libs/format";
import DisplayTotalResult from "../../_components/DisplayTotalResult";
import { buildLaravelFilterQuery } from "~/libs/helper";

const allowedFields = [
    "search",
    "page",
    "payment_method",
    "status",
    "sort",
    "amount_min",
    "amount_max",
    "date_from",
    "date_to",
] as const;

const PaymentList = () => {
    const { page, search, payment_method, sort, amount_min, amount_max } = useGetSearchQuery(allowedFields);
    let { date_from, date_to } = useGetSearchQuery(allowedFields);
    // Nếu 1 trong 2 không tồn tại, mặc định là từ 7 ngày trước đến thời điểm hiện tại (giờ Việt Nam)
    const nowVN = new Date(Date.now() + 7 * 60 * 60 * 1000); // UTC+7
    if (!date_from || !date_to) {
        const sevenDaysAgoVN = new Date(nowVN);
        sevenDaysAgoVN.setDate(nowVN.getDate() - 7);

        date_from = sevenDaysAgoVN.toISOString().slice(0, 10);
        date_to = nowVN.toISOString().slice(0, 10);
    } else {
        // Đảm bảo date_from, date_to là ngày theo giờ VN
        const fromVN = new Date(new Date(date_from).getTime() + 7 * 60 * 60 * 1000);
        const toVN = new Date(new Date(date_to).getTime() + 7 * 60 * 60 * 1000);
        date_from = fromVN.toISOString().slice(0, 10);
        date_to = toVN.toISOString().slice(0, 10);
    }

    const { data: payments, isLoading } = useQuery({
        queryKey: [
            "payment",
            "list",
            { page, search, payment_method, sort, amount_min, amount_max, date_from, date_to },
        ],
        queryFn: async () => {
            const res = await paymentApi.getPayments(
                +page,
                PAYMENT_PER_PAGE,
                sort,
                buildLaravelFilterQuery({
                    page,
                    search,
                    payment_method,
                    amount_min,
                    amount_max,
                    date_from,
                    date_to,
                }),
            );
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    const total = payments?.total ?? 0;
    const totalPages = Math.ceil(total / PAYMENT_PER_PAGE);

    const getPaymentMethodBadge = (method: string) => {
        const configs = {
            transfer: { label: "Chuyển khoản", className: "bg-blue-100 text-blue-800" },
            vnpay: { label: "VNPay", className: "bg-red-100 text-red-800" },
            momo: { label: "MoMo", className: "bg-pink-100 text-pink-800" },
            zalopay: { label: "ZaloPay", className: "bg-purple-100 text-purple-800" },
        };
        const config = configs[method as keyof typeof configs] || {
            label: method,
            className: "bg-gray-100 text-gray-800",
        };
        return (
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${config.className}`}>
                {config.label}
            </span>
        );
    };

    const getPaymentStatusBadge = (status: string) => {
        const configs = {
            pending: { label: "Đang chờ", className: "bg-yellow-100 text-yellow-800" },
            paid: { label: "Đã thanh toán", className: "bg-green-100 text-green-800" },
            canceled: { label: "Đã hủy", className: "bg-red-100 text-red-800" },
        };
        const config = configs[status as keyof typeof configs] || {
            label: status,
            className: "bg-gray-100 text-gray-800",
        };
        return (
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${config.className}`}>
                {config.label}
            </span>
        );
    };

    return (
        <>
            <div className="mt-6 md:mt-8">
                <DisplayTotalResult total={total} />

                {/* Desktop Table View */}
                <div className="hidden overflow-x-auto lg:block">
                    <table className="min-w-full rounded-xl bg-white shadow-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Thông tin thanh toán
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Phương thức</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Số tiền</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                    Ngày thanh toán
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {isLoading
                                ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={7} />)
                                : payments?.data.map((payment, idx) => (
                                      <tr
                                          key={payment.id}
                                          className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                      >
                                          <td className="px-4 py-3 text-zinc-500">
                                              {Math.max(0, +page - 1) * PAYMENT_PER_PAGE + idx + 1}
                                          </td>

                                          <td className="px-4 py-3 align-top text-zinc-500">
                                              <div className="space-y-1">
                                                  <div className="flex items-center gap-1">
                                                      <CreditCard className="h-3 w-3 text-blue-500" />
                                                      <p className="font-semibold text-gray-900">
                                                          {payment.transaction_code}
                                                      </p>
                                                  </div>
                                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                                      <User className="h-3 w-3 text-gray-400" />
                                                      <span className="font-medium">Người dùng:</span>
                                                      <span>
                                                          <Link
                                                              href={`/admin/students/${payment.user.id}`}
                                                              className="text-blue-600 hover:text-blue-800"
                                                          >
                                                              {payment.user.full_name}
                                                          </Link>
                                                      </span>
                                                  </div>
                                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                                      <span className="font-medium">Khóa học:</span>
                                                      <span>
                                                          <Link
                                                              href={`/courses/${payment.course.slug}`}
                                                              className="text-blue-600 hover:text-blue-800"
                                                          >
                                                              {payment.course.name}
                                                          </Link>
                                                      </span>
                                                  </div>
                                              </div>
                                          </td>

                                          <td className="px-4 py-3 text-zinc-500">
                                              {getPaymentMethodBadge(payment.payment_method)}
                                          </td>

                                          <td className="px-4 py-3 text-zinc-500">
                                              <div className="space-y-1">
                                                  <p className="font-semibold text-gray-900">
                                                      {payment.amount === 0
                                                          ? "Miễn phí"
                                                          : formatter.number(payment.amount)}
                                                  </p>
                                              </div>
                                          </td>

                                          <td className="px-4 py-3 text-zinc-500">
                                              <div className="space-y-1">
                                                  <div className="flex items-center gap-1">
                                                      <Calendar className="h-3 w-3 text-gray-400" />
                                                      <span className="text-xs">
                                                          {formatter.date(payment.paid_at, true)}
                                                      </span>
                                                  </div>
                                              </div>
                                          </td>

                                          <td className="px-4 py-3 text-right">
                                              {getPaymentStatusBadge(payment.status)}
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="space-y-3 lg:hidden">
                    {isLoading
                        ? [...Array(10)].map((_, index) => (
                              <div key={index} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                                  <div className="animate-pulse space-y-3">
                                      <div className="flex items-start justify-between">
                                          <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                                          <div className="h-6 w-16 rounded bg-gray-200"></div>
                                      </div>
                                      <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                                      <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                                  </div>
                              </div>
                          ))
                        : payments?.data.map((payment, idx) => (
                              <div
                                  key={payment.id}
                                  className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                              >
                                  {/* Header với STT và Status */}
                                  <div className="mb-3 flex items-start justify-between">
                                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">
                                          {Math.max(0, +page - 1) * PAYMENT_PER_PAGE + idx + 1}
                                      </span>
                                      <div className="flex items-center gap-2">
                                          {getPaymentMethodBadge(payment.payment_method)}
                                          {getPaymentStatusBadge(payment.status)}
                                      </div>
                                  </div>

                                  {/* Transaction Code */}
                                  <div className="mb-3 flex items-center gap-2">
                                      <CreditCard className="h-4 w-4 text-blue-500" />
                                      <p className="text-sm font-semibold text-gray-900">{payment.transaction_code}</p>
                                  </div>

                                  {/* Payment Amount */}
                                  <div className="mb-3">
                                      <p className="text-lg font-bold text-green-600">
                                          {payment.amount === 0 ? "Miễn phí" : formatter.number(payment.amount)}
                                      </p>
                                      <p className="text-xs text-gray-500">Số tiền thanh toán</p>
                                  </div>

                                  {/* User and Course Info */}
                                  <div className="mb-3 space-y-2">
                                      <div className="flex items-start gap-2">
                                          <User className="mt-0.5 h-3 w-3 text-gray-400" />
                                          <div className="min-w-0 flex-1">
                                              <span className="text-xs text-gray-500">Người dùng:</span>
                                              <Link
                                                  href={`/admin/students/${payment.user.id}`}
                                                  className="block truncate text-sm font-medium text-blue-600 hover:text-blue-800"
                                              >
                                                  {payment.user.full_name}
                                              </Link>
                                          </div>
                                      </div>
                                      <div className="flex items-start gap-2">
                                          <div className="mt-0.5 h-3 w-3"></div>
                                          <div className="min-w-0 flex-1">
                                              <span className="text-xs text-gray-500">Khóa học:</span>
                                              <Link
                                                  href={`/courses/${payment.course.slug}`}
                                                  className="line-clamp-2 block text-sm font-medium text-blue-600 hover:text-blue-800"
                                              >
                                                  {payment.course.name}
                                              </Link>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Payment Date */}
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Calendar className="h-3 w-3" />
                                      <span>Thanh toán: {new Date(payment.paid_at).toLocaleDateString("vi-VN")}</span>
                                      <span className="text-gray-400">•</span>
                                      <span>{new Date(payment.paid_at).toLocaleTimeString("vi-VN")}</span>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>

            <div className="mt-4 ml-auto w-fit md:mt-6">
                <Suspense>
                    <PaginationNav totalPages={totalPages} basePath="/admin/payments" />
                </Suspense>
            </div>
        </>
    );
};

export default PaymentList;
