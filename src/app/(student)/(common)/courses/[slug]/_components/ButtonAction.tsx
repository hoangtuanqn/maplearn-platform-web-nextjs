"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import courseApi from "~/apiRequest/course";
import { CourseDetail } from "~/schemaValidate/course.schema";
import { PaymentMethodsDialog } from "./PaymentMethodsDialog";

const ButtonAction = () => {
    const { slug } = useParams<{ slug: string }>();
    const [course, setCourse] = useState<CourseDetail | null>(null);
    const { data, isLoading } = useQuery({
        queryKey: ["user", "course", slug],
        queryFn: async () => {
            const res = await courseApi.getDetailCourse(slug);
            return res.data.data;
        },
    });

    useEffect(() => {
        setCourse(data || null);
    }, [isLoading, data]);

    return (
        <>
            {isLoading ? (
                <div className="flex items-start gap-3">
                    <div className="flex h-full flex-1 flex-col space-y-3">
                        <Skeleton className="h-10 w-[80%] !rounded-xl" />
                        <Skeleton className="h-10 w-[80%] !rounded-xl" />
                    </div>
                </div>
            ) : (
                <>
                    {course?.is_enrolled ? (
                        <>
                            <Link href="/courses">
                                <Button variant={"outline"} className="w-full">
                                    Vào học ngay
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <PaymentMethodsDialog />
                    )}
                </>
            )}
        </>
    );
};

export default ButtonAction;
