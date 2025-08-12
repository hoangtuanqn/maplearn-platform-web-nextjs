import React from "react";

import { formatter } from "~/libs/format";
import { PaymentMethodsDialog } from "./PaymentMethodsDialog";
import { useAuth } from "~/hooks/useAuth";

const OrderSummary = ({
    payload: { discoutMoney, totalMoney },
}: {
    payload: { discoutMoney: number; totalMoney: number };
}) => {
    const { user } = useAuth();
    const total = Math.max(0, totalMoney - discoutMoney - (user?.money ?? 0));
    return (
        <div className="sticky top-[70px] h-fit flex-3/12 max-lg:static max-lg:mt-0 max-lg:w-full max-lg:p-3">
            <div className="rounded-lg border border-slate-200 bg-white px-6 py-8 shadow-sm">
                <h2 className="text-primary mb-4 text-lg font-bold max-lg:text-base">Tóm tắt đơn hàng</h2>
                <ul className="space-y-2 max-lg:space-y-1">
                    <li className="flex items-center justify-between border-b border-slate-200 py-2">
                        <span>Tạm tính</span>
                        <span className="font-bold">{formatter.number(totalMoney)}đ</span>
                    </li>

                    <li className="flex items-center justify-between border-b border-slate-200 py-2">
                        <span>Giảm giá</span>
                        <div className="flex flex-col items-end">
                            <span className="font-bold text-green-600">- {formatter.number(discoutMoney)}đ</span>
                            <span className="block text-right text-xs text-slate-500">
                                Còn lại: {formatter.number(Math.max(0, totalMoney - discoutMoney))}đ
                            </span>
                        </div>
                    </li>

                    <li className="flex items-center justify-between border-b border-slate-200 py-2">
                        <span>Trừ từ số dư</span>
                        <span className="font-bold text-green-600">
                            - {formatter.number(Math.min(user?.money ?? 0, totalMoney - discoutMoney))}đ
                        </span>
                    </li>

                    <li className="flex items-end justify-between py-2">
                        <span className="font-bold">Tổng cộng</span>
                        <div className="flex flex-col items-end">
                            <span className="text-primary text-2xl font-bold">{formatter.number(total)}đ</span>
                        </div>
                    </li>
                </ul>
                {total > 0 && <PaymentMethodsDialog />}
                {/* <ConfirmDialog
                    message="Bạn có chắc chắn muốn thanh toán đơn hàng này không?"
                    action={() => alert("Thanh toán")}
                >
                </ConfirmDialog> */}
            </div>
        </div>
    );
};

export default OrderSummary;
