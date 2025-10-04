"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import courseApi from "~/apiRequest/course";
import { Button } from "~/components/ui/button";
import { notificationErrorApi } from "~/libs/apis/http";

const DemoCompletedCourse = ({ slug }: { slug: string }) => {
    const mutationCompletedCourse = useMutation({
        mutationFn: async (slug: string) => {
            const res = await courseApi.demoCompletedCourse(slug);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Khóa học đã được đánh dấu là hoàn thành!");
        },
        onError: notificationErrorApi,
    });

    return (
        <Button variant={"outline"} className="mb-5" onClick={() => mutationCompletedCourse.mutate(slug)}>
            Hoàn thành khóa học
        </Button>
    );
};

export default DemoCompletedCourse;
