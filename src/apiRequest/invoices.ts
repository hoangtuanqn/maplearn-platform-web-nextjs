import privateApi from "~/libs/apis/privateApi";
import { CreateInvoicePartnerResponse, InvoiceDetailResponse } from "~/schemaValidate/invoice.schema";
export const INVOICE_PER_PAGE = 10;
const invoiceApi = {
    getInvoiceDetail: (code: string, headers: { [key: string]: string }) =>
        privateApi.get<InvoiceDetailResponse>(`/invoices/${code}`, { headers }),

    // VNPAY, ZALOPAY, MOMO
    createInvoice: async (method: string, transaction_code: string, type: "invoice" | "payment" = "invoice") => {
        return privateApi.get<CreateInvoicePartnerResponse>(`/payment/${method}/create/${transaction_code}/${type}`);
    },

    cancelInvoice: async (code: string) => privateApi.post<InvoiceDetailResponse>(`/invoices/${code}/cancel`),
};
export default invoiceApi;
