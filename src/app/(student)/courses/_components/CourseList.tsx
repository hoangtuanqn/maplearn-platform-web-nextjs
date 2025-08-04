"use client";
import React from "react";
import DisplayCourse from "../../_components/Courses/DisplayCourse";
import CourseSkeleton from "./CourseSkeleton";
import courseApi, { COURSE_PER_PAGE } from "~/apiRequest/course.schema";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { buildLaravelFilterQuery } from "~/libs/hepler";
import { PaginationNav } from "../../_components/Pagination";

const CourseList = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const subject = searchParams.get("subject") || "";
    const grade_level = searchParams.get("grade_level") || "";
    const sort = searchParams.get("sort") || "";
    const { data: courses, isLoading } = useQuery({
        queryKey: ["user", "courses", page, search, sort, subject, grade_level, category],
        queryFn: async () => {
            const res = await courseApi.getCourses(
                page,
                COURSE_PER_PAGE,
                search,
                sort,
                buildLaravelFilterQuery({ subject, grade_level, category }),
            );
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    const total = courses?.total || 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);
    return (
        <>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-5">
                {isLoading && [...Array(COURSE_PER_PAGE)].map((_, index) => <CourseSkeleton key={index} />)}
                {courses?.data?.map((course) => (
                    <DisplayCourse
                        is_enrolled={course.is_enrolled}
                        slug={course.slug}
                        price={course.price}
                        key={course.id}
                        thumbnail={course.thumbnail}
                        title={course.name}
                        teacher={course.department[0].name}
                        rating={course.rating.average_rating}
                        totalReviews={course.rating.total_reviews}
                    />
                ))}
            </div>
            {!isLoading && <PaginationNav totalPages={totalPages} basePath="/courses" />}
        </>
    );
};

export default CourseList;
