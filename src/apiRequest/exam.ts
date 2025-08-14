import publicApi from "~/libs/apis/publicApi";
import { ExamCategoriesResponse, ExamListResponse } from "~/schemaValidate/exam.schema";
export const EXAM_PER_PAGE = 20;
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
const examApi = {
    getExamCategories: () => publicApi.get<ExamCategoriesResponse>("/exam-categories"),
    getExams: () => {
        return publicApi.get<ExamListResponse>("/exams");
    },
    getExamDifficulties: () => publicApi.get("/exam-difficulties"),
};
export default examApi;
