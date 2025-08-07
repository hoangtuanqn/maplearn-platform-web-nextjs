"use client";
import { Printer } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

const SummaryInvoice = ({ code }: { code: string }) => {
    return (
        <div className="h-fit flex-3/12 shrink-0">
            <div className="h-fit flex-3/12 shrink-0 rounded-xl border border-slate-100 bg-white p-8 shadow-lg">
                <div>
                    <h2 className="mb-2 text-lg font-semibold text-slate-700">Số tiền phải thanh toán</h2>
                    <p className="text-primary mt-2 text-4xl font-extrabold tracking-wide drop-shadow-sm">100.000đ</p>

                    <Select>
                        <SelectTrigger className="focus:ring-primary/30 my-5 w-full rounded-lg border-slate-200 shadow-sm focus:ring-2">
                            <SelectValue placeholder="Hình thức thanh toán" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="transfer">Chuyển khoản ngân hàng</SelectItem>
                                <SelectItem value="vnpay">VNPay</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="mt-4 flex flex-col items-center gap-4">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                            <Image
                                src="https://qr.sepay.vn/img?bank=Vietcombank&acc=259876543210&template=qronly&amount=100000&des=naptien4"
                                width={220}
                                height={220}
                                alt="QR Code"
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex w-full flex-col gap-1 rounded-lg border border-slate-100 bg-slate-50 p-4 text-base">
                            <span className="font-medium text-slate-600">
                                Ngân hàng: <span className="font-semibold text-slate-800">MBBank</span>
                            </span>
                            <span className="font-medium text-slate-600">
                                Số tài khoản: <span className="font-semibold text-slate-800">259876543210</span>
                            </span>
                            <span className="font-medium text-slate-600">
                                Chủ tài khoản: <span className="font-semibold text-slate-800">Phạm Hoàng Tuấn</span>
                            </span>
                            <span className="font-medium text-slate-600">
                                Chi nhánh: <span className="font-semibold text-slate-800">Quảng Ngãi</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 px-2">
                <p className="mb-2 text-base font-bold text-slate-700">Thao tác</p>
                <Button className="text-primary mt-2 gap-2" onClick={() => window?.print()} variant={"outline"}>
                    <Printer className="h-5 w-5" /> <span>In hóa đơn</span>
                </Button>
            </div>
        </div>
    );
};

export default SummaryInvoice;
