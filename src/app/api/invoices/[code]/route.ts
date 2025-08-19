import { NextRequest, NextResponse } from "next/server";
import invoiceApi from "~/apiRequest/invoices";

export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
    const cookie = request.headers.get("cookie");


    const { code } = await params;

    // Gọi backend API với cookie
    try {
        const res = await invoiceApi.getInvoiceDetail(code, {
            Cookie: cookie || "",
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch {
        return NextResponse.json({ error: "Failed to fetch invoice detail" }, { status: 500 });
    }
}
