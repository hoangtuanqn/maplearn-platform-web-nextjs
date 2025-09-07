import privateApi from "~/libs/apis/privateApi";
import { ChapterLesson } from "~/schemaValidate/chapterLessonCourse.schema";

const courseAdminApi = {
    addChapter: (courseSlug: string, data: { title: string; position: number }) => {
        return privateApi.post<ChapterLesson>(`/chapters/${courseSlug}`, data);
    },
};
export default courseAdminApi;
