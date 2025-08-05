"use client";
import { SlidersHorizontal } from "lucide-react";
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
import { Checkbox } from "~/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import { usePathname } from "next/navigation";
import { useSearchQueryFormSort } from "~/hooks/useSearchQueryForm";

const fields = ["created_at", "download_count", "rating", "purchase_count", "price", "free_only", "duration"];

export function FilterCourses() {
    const pathName = usePathname();
    const { formValues, setFieldValue, handleSubmit } = useSearchQueryFormSort(fields);

    const handleRemoveQuery = () => {
        window.history.replaceState({}, "", pathName);
    };

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-white">
                        <SlidersHorizontal />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto bg-white sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Tìm kiếm và lọc khóa học</DialogTitle>
                        <DialogDescription>
                            Lọc và tìm kiếm nhanh chóng bằng cách nhập thông tin bên dưới.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6">
                        {/* Sắp xếp theo thời gian */}
                        <div className="grid gap-3">
                            <Label>Thời gian tạo</Label>
                            <Select
                                value={formValues.created_at || ""}
                                onValueChange={(value) => setFieldValue("created_at", value as "asc" | "desc")}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sắp xếp theo thời gian" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sắp xếp theo</SelectLabel>
                                        <SelectItem value="desc">Khóa học mới nhất</SelectItem>
                                        <SelectItem value="asc">Khóa học cũ nhất</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Đánh giá */}
                        <div className="grid gap-3">
                            <Label>Đánh giá</Label>
                            <Select
                                value={formValues.rating || ""}
                                onValueChange={(value) => setFieldValue("rating", value as "asc" | "desc")}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sắp xếp theo đánh giá" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sắp xếp theo</SelectLabel>
                                        <SelectItem value="desc">Đánh giá cao nhất</SelectItem>
                                        <SelectItem value="asc">Đánh giá thấp nhất</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Grid 2 cột cho các select */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Số lượng mua */}
                            <div className="grid gap-3">
                                <Label>Số lượng mua</Label>
                                <Select
                                    value={formValues.purchase_count || ""}
                                    onValueChange={(value) => setFieldValue("purchase_count", value as "asc" | "desc")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Số lượng mua" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sắp xếp theo</SelectLabel>
                                            <SelectItem value="desc">Nhiều nhất</SelectItem>
                                            <SelectItem value="asc">Ít nhất</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Lượt tải */}
                            <div className="grid gap-3">
                                <Label>Lượt tải</Label>
                                <Select
                                    value={formValues.download_count || ""}
                                    onValueChange={(value) => setFieldValue("download_count", value as "asc" | "desc")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Lượt tải" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sắp xếp theo</SelectLabel>
                                            <SelectItem value="desc">Nhiều nhất</SelectItem>
                                            <SelectItem value="asc">Ít nhất</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Giá tiền - Radio Group */}
                        <div className="grid gap-3">
                            <Label>Giá tiền</Label>
                            <RadioGroup
                                value={formValues.price || ""}
                                // onValueChange={(value) => setFieldValue("price", value)}
                                className="flex flex-row gap-6"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="asc" id="price-asc" />
                                    <Label htmlFor="price-asc">Giá tăng dần</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="desc" id="price-desc" />
                                    <Label htmlFor="price-desc">Giá giảm dần</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Thời lượng khóa học */}
                        <div className="grid gap-3">
                            <Label>Thời lượng</Label>
                            <Select
                                value={formValues.duration || ""}
                                // onValueChange={(value) => setFieldValue("duration", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn thời lượng" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Thời lượng</SelectLabel>
                                        <SelectItem value="short">Dưới 2 giờ</SelectItem>
                                        <SelectItem value="medium">2-6 giờ</SelectItem>
                                        <SelectItem value="long">6-17 giờ</SelectItem>
                                        <SelectItem value="extra-long">Trên 17 giờ</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Checkbox cho khóa học miễn phí */}
                        <div className="flex items-center space-x-2 rounded-lg border bg-gray-50 p-4">
                            <Checkbox
                                id="free-only"
                                // checked={formValues.free_only === "true"}
                                // onCheckedChange={(checked) => setFieldValue("free_only", checked ? "true" : "")}
                            />
                            <Label htmlFor="free-only" className="text-sm font-medium">
                                Chỉ hiển thị khóa học miễn phí
                            </Label>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Đóng</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleRemoveQuery}>
                                Xóa bộ lọc
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" variant={"primary"} onClick={handleSubmit}>
                                Áp dụng bộ lọc
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
