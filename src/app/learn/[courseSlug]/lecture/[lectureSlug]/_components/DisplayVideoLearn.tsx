"use client";
import React from "react";
import lessonApi from "~/apiRequest/lesson";
import VideoPlayer from "~/app/(student)/_components/VideoPlayer";
import { LessonDetailResponse } from "~/schemaValidate/courseDetail.schema";

const DisplayVideoLearn = ({ lesson }: { lesson: LessonDetailResponse["data"] }) => {
    if (!lesson) return;
    return (
        <VideoPlayer
            src={lesson.video_url}
            ratio="16:6"
            onTimeUpdate={(timeCurrent: number) => {
                lessonApi.updateTimeVideo(lesson.id, timeCurrent);
                console.log('Đã gửi request update time video');
                
            }}
        />
    );
};

export default DisplayVideoLearn;
