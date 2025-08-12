"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
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
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import reportApi from "~/apiRequest/report";
import { toast } from "sonner";
import axios from "axios";
import Loading from "~/app/(student)/_components/Loading";

const reportSchema = z.object({
    reason: z.string().nonempty("Vui lòng chọn lý do báo cáo"),
    message: z.string().max(500, "Không vượt quá 500 ký tự").optional(),
});

type ReportFormData = z.infer<typeof reportSchema>;

export function Report({ id }: { id: number }) {
    "use no memo";
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<ReportFormData>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            reason: "",
            message: "",
        },
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const reportMutation = useMutation({
        mutationFn: (data: ReportFormData) => {
            return reportApi.report({
                reportable_type: "document", // hoặc "post" nếu cần
                reportable_id: id, // ID của tài liệu hoặc bài viết cần báo cáo
                reason: data.reason,
                message: data.message,
            });
        },
        onSuccess: () => {
            toast.success("Báo cáo thành công! Chúng tôi sẽ xem xét nội dung này sớm nhất có thể.");
            setDialogOpen(false);
            reset();
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Báo cáo không thành công. Vui lòng thử lại sau.");
            }

            console.error("Report failed:", error);
            // Có thể hiển thị thông báo lỗi ở đây
        },
    });

    const onSubmit = (data: ReportFormData) => {
        // Gọi API báo cáo
        reportMutation.mutate(data);
    };
    const message = watch("message") || "";

    return (
        <>
            {reportMutation.isPending && <Loading />}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        data-tooltip-content={"Báo cáo nội dung"}
                        variant={"destructive"}
                        className="view_tooltip border-1 border-slate-200 font-bold text-red-500"
                    >
                        <CircleAlert />
                    </Button>
                </DialogTrigger>

                <DialogContent className="bg-white sm:max-w-[600px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Báo cáo tài liệu</DialogTitle>
                            <DialogDescription>Vui lòng cung cấp lý do báo cáo tài liệu này.</DialogDescription>
                        </DialogHeader>

                        <div className="mt-6 grid gap-3.5">
                            <div className="grid gap-3">
                                <Label>Chọn lý do báo cáo (*)</Label>
                                <Select onValueChange={(value) => setValue("reason", value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn lý do" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="incorrect_info">Tài liệu sai thông tin</SelectItem>
                                            <SelectItem value="outdated">Tài liệu đã lỗi thời</SelectItem>
                                            <SelectItem value="incomplete">Tài liệu không đầy đủ</SelectItem>
                                            <SelectItem value="plagiarized">Tài liệu vi phạm bản quyền</SelectItem>
                                            <SelectItem value="broken_link">Liên kết tải về bị lỗi</SelectItem>
                                            <SelectItem value="inappropriate">Nội dung không phù hợp</SelectItem>
                                            <SelectItem value="improvement">Góp ý cải thiện</SelectItem>
                                            <SelectItem value="other">Khác</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.reason && <span className="text-sm text-red-500">{errors.reason.message}</span>}
                            </div>

                            <div className="grid gap-3">
                                <Label>Lý do cụ thể (nếu có)</Label>
                                <Textarea
                                    placeholder="Nhập chi tiết nội dung cần báo cáo ..."
                                    {...register("message")}
                                    maxLength={500}
                                />
                                <span className={`${message.length === 500 ? "text-red-500" : "text-slate-500"}`}>
                                    {message.length || 0}/500 ký tự
                                </span>
                                {errors.message && (
                                    <span className="text-sm text-red-500">{errors.message.message}</span>
                                )}
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Đóng</Button>
                            </DialogClose>
                            <Button type="submit" variant="destructive" className="bg-red-500 text-white">
                                Báo cáo
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
