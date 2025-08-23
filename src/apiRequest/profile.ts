import privateApi from "~/libs/apis/privateApi";
import { CourseListResponse } from "~/schemaValidate/course.schema";
import { InvoiceListResponse } from "~/schemaValidate/invoice.schema";
import { FormChangePasswordType, ProfileType } from "~/schemaValidate/user.schema";
import { INVOICE_PER_PAGE } from "./invoices";
import { Active2FAResponse, Generate2FAType } from "~/schemaValidate/twoFactor";
import { QuestionWrongProfileResponse } from "~/schemaValidate/exam.schema";

const profileApi = {
    update: (data: ProfileType) => privateApi.post("/profile/update", data),
    changePassword: (data: FormChangePasswordType) => privateApi.post("/profile/change-password", data),
    getCourseMe: () => privateApi.get<CourseListResponse>("/profile/courses"),
    getInvoices: async (
        page: number = 1,
        limit: number = INVOICE_PER_PAGE,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/profile/invoices?page=${page}&limit=${limit}`;

        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return privateApi.get<InvoiceListResponse>(query);
    },
    generate2FA: () => privateApi.get<Generate2FAType>("/profile/2fa/generate"),
    toggle2FA: (otp: string, type: string) => privateApi.post<Active2FAResponse>("/profile/2fa/toggle", { otp, type }),

    // Get các câu hỏi đã làm sai
    getQuestionWrong: (page: number = 1) =>
        privateApi.get<QuestionWrongProfileResponse>(`/profile/wrong-questions?page=${page}`),
};
export default profileApi;
