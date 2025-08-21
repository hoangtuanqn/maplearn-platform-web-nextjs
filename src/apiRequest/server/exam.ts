// libs/apis/examApiServer.ts
import { cookies } from "next/headers";
import serverApi from "~/libs/apis/serverApi";
import { QuestionsExamResponse, ResultExamResponse } from "~/schemaValidate/exam.schema";

async function withAuthHeaders<T>(url: string) {
    const cookie = await cookies();
    return serverApi.get<T>(url, {
        headers: { cookie: cookie.toString() },
    });
}

const examApiServer = {
    getExamDetail: (slug: string) => withAuthHeaders<QuestionsExamResponse>(`/api/exam/${slug}`),

    getQuestions: (slug: string) => withAuthHeaders<QuestionsExamResponse>(`/api/exam/${slug}/questions`),

    getExamResults: (id: string | null, slug: string) => {
        const query = id ? `/api/exam/${slug}/results/${id}` : `/api/exam/${slug}/results`;
        return withAuthHeaders<ResultExamResponse>(query);
    },

    getResultDetail: (slug: string, idAttempt: string) =>
        withAuthHeaders(`/api/exam/${slug}/results/${idAttempt}/detail`),
};

export default examApiServer;
