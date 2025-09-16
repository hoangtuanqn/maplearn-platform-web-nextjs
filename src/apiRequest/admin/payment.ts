import privateApi from "~/libs/apis/privateApi";
import { PaymentWithCourse } from "~/schemaValidate/admin/payment.schema";

export const PAYMENT_PER_PAGE = 20;
const paymentApi = {
    getPayments: (
        page: number = 1,
        limit: number = PAYMENT_PER_PAGE,
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/payments-admin?page=${page}&limit=${limit}`;
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return privateApi.get<PaymentWithCourse>(query);
    },
};
export default paymentApi;
