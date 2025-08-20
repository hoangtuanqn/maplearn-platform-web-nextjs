// libs/apis/invoiceApiServer.ts
import { cookies } from "next/headers";
import serverApi from "~/libs/apis/serverApi";
import { QuestionsExamResponse, ResultExamResponse } from "~/schemaValidate/exam.schema";

const examApiServer = {
    getExamDetail: async (slug: string) => {
        const cookie = await cookies();

        return serverApi.get<QuestionsExamResponse>(`/api/exam/${slug}`, {
            headers: {
                cookie: cookie.toString(), // 👈 gắn thủ công cookie
            },
        });
    },

    getQuestions: async (slug: string) => {
        const cookie = await cookies();

        return serverApi.get<QuestionsExamResponse>(`/api/exam/${slug}/questions`, {
            headers: {
                cookie: cookie.toString(), // 👈 gắn thủ công cookie
            },
        });
    },

    getExamResults: async (id: string | null, slug: string) => {
        const cookie = await cookies();
        let query = `/api/exam/${slug}/results`;
        if (id) {
            query += `/${id}`;
        }

        return serverApi.get<ResultExamResponse>(query, {
            headers: {
                cookie: cookie.toString(), // 👈 gắn thủ công cookie
            },
        });
    },
};

export default examApiServer;
