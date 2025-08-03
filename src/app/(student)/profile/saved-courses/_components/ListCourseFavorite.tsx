"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import courseApi, { COURSE_PER_PAGE } from "~/apiRequest/course.schema";
import DisplayCourse from "~/app/(student)/_components/Courses/DisplayCourse";
import CourseSkeleton from "~/app/(student)/courses/_components/CourseSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import { useSearchParams } from "next/navigation";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
const ListCourseFavorite = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const { data: coursesFavorite, isLoading } = useQuery({
        queryKey: ["savedCourses", page],
        queryFn: async () => {
            // Giả sử bạn có một API để lấy danh sách khóa học đã lưu
            const res = await courseApi.getCourseFavorite(page);
            return res.data.data;
        },
    });
    const total = coursesFavorite?.total || 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);
    return (
        <>
            {!isLoading && (coursesFavorite?.data?.length ?? 0) == 0 && (
                <DisplayNoData title="Không có khóa học nào được lưu" />
            )}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {isLoading && [...Array(COURSE_PER_PAGE)].map((_, index) => <CourseSkeleton key={index} />)}
                {coursesFavorite?.data?.map((course) => (
                    // Ch có data thật
                    <DisplayCourse
                        price={course.price}
                        slug={course.slug}
                        key={course.id}
                        thumbnail={course.thumbnail}
                        title={course.name}
                        teacher={course.department[0].name}
                        rating={course.rating.average_rating}
                        totalReviews={course.rating.total_reviews}
                    />
                ))}
            </div>
            {!isLoading && (coursesFavorite?.data?.length ?? 0) > 0 && (
                <PaginationNav totalPages={totalPages} basePath="/profile/saved-courses" />
            )}
        </>
    );
};

export default ListCourseFavorite;
