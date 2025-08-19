import publicApi from "~/libs/apis/publicApi";
import {
    AttemptExamResponse,
    ExamCategoriesResponse,
    ExamDetailResponse,
    ExamListResponse,
    QuestionsExamResponse,
} from "~/schemaValidate/exam.schema";
// "easy", "normal", "hard", "very_hard"
export const difficulties = [
    {
        id: 1,
        name: "Dễ",
        slug: "easy",
    },
    {
        id: 2,
        name: "Trung bình",
        slug: "normal",
    },
    {
        id: 3,
        name: "Khó",
        slug: "hard",
    },
    {
        id: 4,
        name: "Rất khó",
        slug: "very_hard",
    },
];
export const EXAM_PER_PAGE = 20;

const examApi = {
    getExamCategories: () => publicApi.get<ExamCategoriesResponse>("/exam-categories"),
    getExams: () => {
        return publicApi.get<ExamListResponse>("/exams");
    },
    getDetailExam: (slug: string, headers?: { [key: string]: string }) => {
        return publicApi.get<ExamDetailResponse>(`exams/${slug}`, headers ? { headers } : undefined);
    },
    getExamDifficulties: () => publicApi.get("/exam-difficulties"),

    getQuestions: (slug: string, headers?: { [key: string]: string }) =>
        publicApi.get<QuestionsExamResponse>(`exams/questions/${slug}`, headers ? { headers } : undefined),
    // Bắt đầu làm bài
    startExam: (slug: string) => publicApi.post(`/exams/${slug}/start`),
    // Nộp bài
    submitAnswer: (slug: string, data: any) =>
        publicApi.post(`/exams/${slug}/submit`, {
            data,
        }),

    // Deteced Cheat
    detectCheating: (slug: string) => publicApi.post<AttemptExamResponse>(`/exams/${slug}/detect-cheat`),
};
export default examApi;
