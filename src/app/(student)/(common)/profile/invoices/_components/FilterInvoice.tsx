"use client";
import { Funnel } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";

import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useFilterQuery } from "~/hooks/useFilterQuery";
import CalendarForm from "~/app/(student)/_components/CalendarForm";
import { type DateRange } from "react-day-picker";
import { formatter } from "~/libs/format";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
const fields = ["created_at", "status", "date"] as const;

export function FilterInvoice() {
    const pathName = usePathname();
    const { formValues, setFieldValue, handleSubmit } = useFilterQuery(fields);
    const { date } = useGetSearchQuery(["date"] as const);
    const handleRemoveQuery = () => {
        window.history.replaceState({}, "", pathName);
        setDateRange({
            from: undefined,
            to: undefined,
        });
    };
    const [dateRange, setDateRange] = useState<DateRange>(() => {
        // Giá trị của date sẽ có dạng 27/7/2025,30/7/2025 - Cần tách ra form, to
        if (date) {
            const [from, to] = (date || "").split(",").map((item) => new Date(formatter.parseDateDMY(item.trim())));
            return {
                from: from || undefined,
                to: to || undefined,
            };
        }
        return {
            from: undefined,
            to: undefined,
        };
    });
    useEffect(() => {
        if (dateRange.from && dateRange.to) {
            setFieldValue(
                "date",
                [String(formatter.date(dateRange.from)), String(formatter.date(dateRange.to))],
                "filterMultiple",
            );
        }
    }, [dateRange, setFieldValue, date]);
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-white">
                        <Funnel />
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Tìm kiếm</DialogTitle>
                        <DialogDescription>
                            Lọc và tìm kiếm nhanh chóng bằng cách nhập thông tin bên dưới.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-2 lg:grid-cols-2">
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Thời gian tạo</Label>
                                <Select
                                    value={formValues.sort.created_at || ""}
                                    onValueChange={(value) => setFieldValue("created_at", value, "sort")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sắp xếp theo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sắp xếp theo</SelectLabel>
                                            <SelectItem value="-created_at">Giảm dần</SelectItem>
                                            <SelectItem value="created_at">Tăng dần</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Tình trạng</Label>
                                <Select
                                    value={formValues.filter.status || ""}
                                    onValueChange={(value) => setFieldValue("status", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Tình trạng hóa đơn" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Tình trạng</SelectLabel>
                                            <SelectItem value="expiring">Gần hết hạn</SelectItem>
                                            <SelectItem value="pending">Chờ thanh toán</SelectItem>
                                            <SelectItem value="paid">Đã thanh toán</SelectItem>
                                            <SelectItem value="cancelled">Đã hủy / Hết hạn</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Khoảng thời gian</Label>
                            <CalendarForm dateRange={dateRange} setDateRange={setDateRange} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Đóng</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleRemoveQuery}>
                                Xóa tìm kiếm
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" variant={"primary"} onClick={handleSubmit}>
                                Lọc
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
