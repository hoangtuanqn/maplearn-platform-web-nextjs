import privateApi from "~/libs/apis/privateApi";
import { CourseListResponse } from "~/schemaValidate/course.schema";
import { InvoiceListResponse } from "~/schemaValidate/invoice.schema";
import { FormChangePasswordType, ProfileType } from "~/schemaValidate/user.schema";
import { INVOICE_PER_PAGE } from "./invoices";

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
};
export default profileApi;
