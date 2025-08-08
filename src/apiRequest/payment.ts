import privateApi from "~/libs/apis/privateApi";

const paymentApi = {
    // Payment cho phép thanh toán nhiều Invoice 1 lúc
    createPayment: async (data: number[], payment_method: "transfer" | "vnpay") => {
        return privateApi.post<PaymentResponse>(`/payment`, {
            invoice_ids: data,
            payment_method,
        });
    },
};
export default paymentApi;
