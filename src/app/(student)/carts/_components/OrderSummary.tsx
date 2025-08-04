import React from "react";
import { ConfirmDialog } from "~/components/ConfirmDialog";
import { Button } from "~/components/ui/button";

const OrderSummary = () => {
    return (
        <div className="sticky top-[70px] h-fit flex-3/12 max-lg:static max-lg:mt-0 max-lg:w-full max-lg:p-3">
            <div className="rounded-lg border border-slate-200 bg-white px-6 py-8 shadow-sm">
                <h2 className="text-primary mb-4 text-lg font-bold max-lg:text-base">Tóm tắt đơn hàng</h2>
                <ul className="space-y-2 max-lg:space-y-1">
                    <li className="flex items-center justify-between border-b border-slate-200 py-2 max-lg:py-1">
                        <span className="max-lg:text-xs">Tạm tính</span>
                        <span className="font-bold max-lg:text-sm">1.800.000đ</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-slate-200 py-2 max-lg:py-1">
                        <span className="max-lg:text-xs">Tiết kiệm</span>
                        <span className="font-bold text-green-600 max-lg:text-sm">900.000đ</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-slate-200 py-2 max-lg:py-1">
                        <span className="max-lg:text-xs">Điểm thưởng MapLearn</span>
                        <span className="text-primary font-bold max-lg:text-sm">1.200 điểm</span>
                    </li>
                    <li className="mt-2 flex items-end justify-between py-2 max-lg:mt-1 max-lg:py-1">
                        <span className="font-bold max-lg:text-sm">Thành tiền</span>
                        <div className="flex flex-col items-end">
                            <span className="text-sm text-slate-500 line-through max-lg:text-xs">1.800.000đ</span>
                            <span className="text-2xl font-bold max-lg:text-lg">900.000đ</span>
                        </div>
                    </li>
                </ul>
                <ConfirmDialog
                    message="Bạn có chắc chắn muốn thanh toán đơn hàng này không?"
                    action={() => alert("Thanh toán")}
                >
                    <Button className="mt-5 w-full text-white max-lg:mt-3">Thanh toán ngay</Button>
                </ConfirmDialog>
            </div>
        </div>
    );
};

export default OrderSummary;
