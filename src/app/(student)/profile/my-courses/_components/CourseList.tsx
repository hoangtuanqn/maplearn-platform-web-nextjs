"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import profileApi from "~/apiRequest/profile";
import DisplayCourse from "~/app/(student)/_components/Courses/DisplayCourse";

const CourseList = () => {
    const { data: courses, isLoading } = useQuery({
        queryKey: ["user", "my-courses"],
        queryFn: async () => {
            const res = await profileApi.getCourseMe();
            return res.data.data.data;
        },
    });
    return (
        <>
            {courses?.map((course) => (
                <DisplayCourse key={course.id} course={course} />
            ))}
        </>
    );
};

export default CourseList;
