"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import Image from "next/image";
import { Label } from "~/components/ui/label";
import { BadgeRussianRuble } from "lucide-react";
const MethodPayment = ({
    paymentMethod,
    setPaymentMethod,
}: {
    paymentMethod: string;
    setPaymentMethod: (value: string) => void;
}) => {
    return (
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div
                className="flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50"
                style={{
                    borderColor: paymentMethod === "transfer" ? "#2563eb" : "#e5e7eb",
                    background: paymentMethod === "transfer" ? "#eff6ff" : "#fff",
                }}
                onClick={() => setPaymentMethod("transfer")}
            >
                <RadioGroupItem
                    value="transfer"
                    id="transfer"
                    className="border-2 border-blue-500 focus:ring-blue-500"
                />
                <div className="flex items-center gap-3">
                    <Image
                        src="/assets/icons/bank-transfer.png"
                        alt="Chuyển khoản"
                        width={40}
                        height={40}
                        className="rounded"
                    />
                    <div>
                        <Label htmlFor="transfer" className="text-[15.125px] font-semibold text-blue-700">
                            Chuyển khoản ngân hàng
                        </Label>
                        <div className="text-xs text-gray-500">Thanh toán qua chuyển khoản ngân hàng</div>
                    </div>
                </div>
            </div>
            <div
                className="flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors hover:border-pink-500 hover:bg-pink-50"
                style={{
                    borderColor: paymentMethod === "momo" ? "#ec4899" : "#e5e7eb",
                    background: paymentMethod === "momo" ? "#fdf2f8" : "#fff",
                }}
                onClick={() => setPaymentMethod("momo")}
            >
                <RadioGroupItem value="momo" id="momo" className="border-2 border-pink-500 focus:ring-pink-500" />
                <div className="flex items-center gap-3">
                    <Image src="/assets/icons/momo.webp" alt="MOMO" width={40} height={40} className="rounded" />
                    <div>
                        <Label htmlFor="momo" className="text-[15.125px] font-semibold text-pink-700">
                            Ví MOMO
                        </Label>
                        <div className="text-xs text-gray-500">Thanh toán bằng ví điện tử MOMO</div>
                    </div>
                </div>
            </div>
            <div
                className="flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors hover:border-cyan-500 hover:bg-cyan-50"
                style={{
                    borderColor: paymentMethod === "vnpay" ? "#06b6d4" : "#e5e7eb",
                    background: paymentMethod === "vnpay" ? "#ecfeff" : "#fff",
                }}
                onClick={() => setPaymentMethod("vnpay")}
            >
                <RadioGroupItem value="vnpay" id="vnpay" className="border-2 border-cyan-500 focus:ring-cyan-500" />
                <div className="flex items-center gap-3">
                    <Image src="/assets/icons/vnpay.webp" alt="VNPAY" width={40} height={40} className="rounded" />
                    <div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="vnpay" className="text-[15.125px] font-semibold text-cyan-700">
                                Ví VNPAY
                            </Label>
                            {/* Discount badge */}
                            <span className="flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                <BadgeRussianRuble />
                                Giảm 10k
                            </span>
                        </div>
                        <div className="mt-1.5 text-xs text-gray-500">Thanh toán bằng ví điện tử VNPAY</div>
                    </div>
                </div>
            </div>
            <div
                className="flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors hover:border-[#008fe5] hover:bg-[#e6f6ff]"
                style={{
                    borderColor: paymentMethod === "zalopay" ? "#008fe5" : "#e5e7eb",
                    background: paymentMethod === "zalopay" ? "#e6f6ff" : "#fff",
                }}
                onClick={() => setPaymentMethod("zalopay")}
            >
                <RadioGroupItem
                    value="zalopay"
                    id="zalopay"
                    className="border-2 border-[#008fe5] focus:ring-[#008fe5]"
                />
                <div className="flex items-center gap-3">
                    <Image src="/assets/icons/zalopay.webp" alt="ZaloPay" width={40} height={40} className="rounded" />
                    <div>
                        <div className="flex items-center gap-2">
                            <Label
                                htmlFor="zalopay"
                                className="text-[15.125px] font-semibold"
                                style={{ color: "#008fe5" }}
                            >
                                Ví ZaloPay
                            </Label>
                            {/* Discount badge */}
                            <span
                                className="flex items-center gap-1 rounded bg-[#e6f6ff] px-2 py-0.5 text-xs font-semibold"
                                style={{ color: "#008fe5" }}
                            >
                                <BadgeRussianRuble />
                                Giảm 10k
                            </span>
                        </div>
                        <div className="mt-1.5 text-xs text-gray-500">Thanh toán bằng ví điện tử ZaloPay</div>
                    </div>
                </div>
            </div>
        </RadioGroup>
    );
};

export default MethodPayment;
