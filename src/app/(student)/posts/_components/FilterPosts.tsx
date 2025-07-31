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

import { usePathname } from "next/navigation";
import { useSearchQueryFormSort } from "~/hooks/useSearchQueryForm";
const fields = ["created_at", "views"];
export function FilterPosts() {
    const pathName = usePathname();
    const { formValues, setFieldValue, handleSubmit } = useSearchQueryFormSort(fields);
    const handleRemoveQuery = () => {
        window.history.replaceState({}, "", pathName);
    };
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="view_tooltip bg-white" data-tooltip-content={"Tìm kiếm thêm"}>
                        <SlidersHorizontal />
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Tìm kiếm bài viết</DialogTitle>
                        <DialogDescription>
                            Lọc và tìm kiếm bài viết nhanh chóng bằng cách nhập thông tin bên dưới.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Ngày đăng</Label>
                            <Select
                                value={formValues.created_at || ""}
                                onValueChange={(value) => setFieldValue("created_at", value as "asc" | "desc")}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sắp xếp theo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sắp xếp theo</SelectLabel>
                                        <SelectItem value="desc">Mới nhất</SelectItem>
                                        <SelectItem value="asc">Cũ nhất</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Lượt xem</Label>
                            <Select
                                value={formValues.views || ""}
                                onValueChange={(value) => setFieldValue("views", value as "asc" | "desc")}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sắp xếp theo" />
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
