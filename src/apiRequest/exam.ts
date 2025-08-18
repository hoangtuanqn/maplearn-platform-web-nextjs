import publicApi from "~/libs/apis/publicApi";
import { ExamCategoriesResponse, ExamListResponse, QuestionsExamResponse } from "~/schemaValidate/exam.schema";
export const EXAM_PER_PAGE = 20;

const examApi = {
    getExamCategories: () => publicApi.get<ExamCategoriesResponse>("/exam-categories"),
    getExams: () => {
        return publicApi.get<ExamListResponse>("/exams");
    },
    getExamDifficulties: () => publicApi.get("/exam-difficulties"),

    getQuestions: (slug: string) => publicApi.get<QuestionsExamResponse>(`exams/questions/${slug}`),

    // Nộp bài

    submitAnswer: (slug: string, data: any) =>
        publicApi.post(`/exams/${slug}/submit`, {
            data,
        }),
};
export default examApi;
