// import { ListCardSchemaType } from './../schemaValidate/invoice.schema';
/* eslint-disable @typescript-eslint/no-explicit-any */
import privateApi from "~/libs/apis/privateApi";
import { CardListResponse, CreateInvoicePartnerResponse, InvoiceDetailResponse } from "~/schemaValidate/invoice.schema";
export const INVOICE_PER_PAGE = 10;
const invoiceApi = {
    getInvoiceDetail: (code: string, headers: { [key: string]: string }) =>
        privateApi.get<InvoiceDetailResponse>(`/invoices/${code}`, { headers }),

    // VNPAY, ZALOPAY, MOMO
    createInvoice: async (method: string, transaction_code: string, type: "invoice" | "payment" = "invoice") => {
        return privateApi.get<CreateInvoicePartnerResponse>(`/payment/${method}/create/${transaction_code}/${type}`);
    },

    cancelInvoice: async (code: string) => privateApi.post<InvoiceDetailResponse>(`/invoices/${code}/cancel`),
    sendCardToPartner: async (code: string, data: any) => {
        return privateApi.post(`/invoices/${code}/pay-with-card`, data);
    },

    getCardTopUpHistory: async (code: string) => {
        return privateApi.get<CardListResponse>(`/invoices/${code}/cards?limit=200`);
    },
};
export default invoiceApi;
