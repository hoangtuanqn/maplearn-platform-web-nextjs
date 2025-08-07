// libs/apis/invoiceApiServer.ts
import { cookies } from "next/headers";
import serverApi from "~/libs/apis/serverApi";
import { InvoiceDetailResponse } from "~/schemaValidate/invoice.schema";

const invoiceApiServer = {
    getInvoiceDetail: async (code: string) => {
        const cookie = await cookies(); // 👈 KHÔNG cần await

        return serverApi.get<InvoiceDetailResponse>(`/api/invoices/${code}`, {
            headers: {
                cookie: cookie.toString(), // 👈 gắn thủ công cookie
            },
        });
    },
};

export default invoiceApiServer;
