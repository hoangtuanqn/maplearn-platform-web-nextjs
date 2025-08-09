import privateApi from "~/libs/apis/privateApi";
import { PaymentDetailResponse, PaymentResponse } from "~/schemaValidate/payment.schema";

const paymentApi = {
    // Payment cho phép thanh toán nhiều Invoice 1 lúc
    createPayment: async (data: number[], payment_method: string) => {
        return privateApi.post<PaymentResponse>(`/payments`, {
            invoice_ids: data, // danh sách id invoices sẽ dc gộp chung
            payment_method,
        });
    },
    getDetailPayment: async (transaction_code: string, headers: { [key: string]: string }) => {
        return privateApi.get<PaymentDetailResponse>(`/payments/${transaction_code}`, {
            headers,
        });
    },
};
export default paymentApi;
