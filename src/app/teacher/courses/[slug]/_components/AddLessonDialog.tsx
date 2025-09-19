"use client";
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
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { notificationErrorApi } from "~/libs/apis/http";
import Loading from "~/app/(student)/_components/Loading";
import { Plus } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { Switch } from "~/components/ui/switch";
import courseAdminApi from "~/apiRequest/admin/course";
// Schema validation
const addLessonSchema = z.object({
    title: z
        .string()
        .min(2, { message: "Tiêu đề bài học phải có ít nhất 2 ký tự." })
        .max(255, { message: "Tiêu đề không được vượt quá 255 ký tự." }),
    content: z.string().min(10, { message: "Nội dung bài học phải có ít nhất 10 ký tự." }).optional(),
    video_url: z.string().url({ message: "Vui lòng nhập URL hợp lệ." }),
    position: z.number().min(1, { message: "Vị trí phải lớn hơn 0." }),
    duration: z
        .number()
        .min(15, { message: "Thời lượng phải lớn hơn hoặc bằng 15 giây." })
        .max(86400, { message: "Thời lượng không được vượt quá 86400 giây." }),
    is_free: z.boolean(),
});

type AddLessonFormData = z.infer<typeof addLessonSchema>;
export function AddLessonDialog({
    slugCourse,
    chapterId,
    nameChapterCourse,
    maxPosition,
    style,
}: {
    slugCourse: string;
    chapterId: number;
    nameChapterCourse: string;
    maxPosition: number;
    style: number;
}) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const form = useForm<AddLessonFormData>({
        resolver: zodResolver(addLessonSchema),
        defaultValues: {
            title: "",
            content: "",
            video_url: "",
            position: maxPosition + 1,
            duration: 15,
            is_free: false,
        },
    });
    // Mutation for adding lesson
    const addLessonMutation = useMutation({
        mutationFn: async (data: AddLessonFormData) => {
            const res = await courseAdminApi.createLesson(chapterId, data);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course", "chapters", slugCourse] });
            toast.success("Thêm bài học mới thành công!");
            form.reset();
            setOpen(false);
        },
        onError: notificationErrorApi,
    });

    const onSubmit = (values: AddLessonFormData) => {
        addLessonMutation.mutate(values);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            form.reset({
                title: "",
                content: "",
                video_url: "",
                position: maxPosition + 1,
                duration: 0,
                is_free: false,
            });
        }
    };
    return (
        <>
            {addLessonMutation.isPending && <Loading />}
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    {style === 1 ? (
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Plus className="h-3 w-3" />
                            Thêm bài học
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex w-full items-center justify-center gap-2 border-dashed text-gray-600"
                        >
                            <Plus className="h-4 w-4" />
                            Thêm bài học vào chương này
                        </Button>
                    )}
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Thêm bài học mới</DialogTitle>
                        <DialogDescription>
                            Thêm bài học mới vào chương{" "}
                            <span className="text-primary font-bold uppercase">{nameChapterCourse}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form className="space-y-4">
                            <div className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tiêu đề bài học *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nhập tiêu đề bài học..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nội dung</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Nhập nội dung bài học..." rows={4} {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Mô tả chi tiết về nội dung bài học (tùy chọn)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="video_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>URL Video</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/video.mp4"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>Link video bài học (tùy chọn)</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 items-start gap-4">
                                    <FormField
                                        control={form.control}
                                        name="position"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vị trí trong chương*</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Vị trí bài học..."
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormDescription>Vị trí bài học trong chương</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="duration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Thời lượng (giây)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormDescription>Thời lượng bài học tính bằng giây</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="is_free"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                    <FormDescription>Cho phép học thử miễn phí</FormDescription>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline" disabled={addLessonMutation.isPending}>
                                        Hủy
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    disabled={addLessonMutation.isPending}
                                    className="text-white"
                                    onClick={form.handleSubmit(onSubmit)}
                                >
                                    Thêm bài học
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
