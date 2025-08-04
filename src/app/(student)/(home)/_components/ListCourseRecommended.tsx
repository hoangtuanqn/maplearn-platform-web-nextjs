"use client";
import DisplayCourse from "../../_components/Courses/DisplayCourse";
import HeaderSection from "./HeaderSection";
import { useQuery } from "@tanstack/react-query";
import CourseSkeleton from "../../courses/_components/CourseSkeleton";
import courseApi from "~/apiRequest/course.schema";
import { useAuth } from "~/hooks/useAuth";

const ListCourseRecommended = () => {
    const { data: courses, isLoading } = useQuery({
        queryKey: ["user", "course", "recommended"],
        queryFn: async () => {
            const response = await courseApi.getCourseRecommended();
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    const { user } = useAuth();
    if (!user) return null; // Chỉ hiển thị nếu đã đăng nhập
    return (
        <>
            <div className="mt-3.5 bg-white px-4 py-6 shadow-sm md:rounded-xl xl:mt-6">
                <HeaderSection title={"Gợi ý khóa học phù hợp"} />
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4">
                    {isLoading && [...Array(8).keys()].map((index) => <CourseSkeleton key={index} />)}
                    {courses?.map((course) => {
                        if (course.is_enrolled) return null; // Bỏ qua nếu mua rồi
                        return (
                            <DisplayCourse
                                is_enrolled={course.is_enrolled}
                                slug={course.slug}
                                price={course.price}
                                key={course.id}
                                thumbnail={course.thumbnail}
                                title={course.name}
                                teacher={course.department[0]?.name}
                                rating={course.rating.average_rating}
                                totalReviews={course.rating.total_reviews}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ListCourseRecommended;
