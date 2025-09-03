import privateApi from "~/libs/apis/privateApi";
import { LessonHistoryResponse } from "~/schemaValidate/lesson.schema";

const lessonApi = {
    updateTimeVideo: (lesson_id: number, progress: number) =>
        privateApi.post<LessonHistoryResponse>(`/lessons/`, { lesson_id, progress }),
};
export default lessonApi;
