import privateApi from "~/libs/apis/privateApi";
import {
    CreateInvoiceVNPayResponse,
    InvoiceDetailResponse,
    InvoiceListResponse,
} from "~/schemaValidate/invoice.schema";
export const INVOICE_PER_PAGE = 10;
const invoiceApi = {
    getInvoices: async (
        page: number = 1,
        limit: number = INVOICE_PER_PAGE,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/invoices?page=${page}&limit=${limit}`;
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

    getInvoiceDetail: (code: string, headers: { [key: string]: string }) =>
        privateApi.get<InvoiceDetailResponse>(`/invoices/${code}`, { headers }),
    createInvoiceVNPay: async (transaction_code: string) => {
        return privateApi.get<CreateInvoiceVNPayResponse>(`/payment/vnpay/create/${transaction_code}`);
    },
    cancelInvoice: async (code: string) => privateApi.post<InvoiceDetailResponse>(`/invoices/${code}/cancel`),
};
export default invoiceApi;
