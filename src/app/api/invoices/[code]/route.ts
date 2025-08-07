import { NextRequest, NextResponse } from "next/server";
import invoiceApi from "~/apiRequest/invoices";

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
    const cookie = request.headers.get("cookie");
    // console.log("cookie >>>>", request.headers.get("cookie"));

    // console.log("cookie >>> ", cookie);

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
    // return NextResponse.json(
    //     {
    //         success: true,
    //         message: "Lấy thông tin hóa đơn thành công!",
    //         data: {
    //             id: 102,
    //             user_id: 8,
    //             transaction_code: "P7AC7ZD2FY",
    //             payment_method: "transfer",
    //             total_price: 828700,
    //             status: "pending",
    //             created_at: "2025-08-07T00:58:18.000000Z",
    //             updated_at: "2025-08-07T00:58:18.000000Z",
    //             course_count: 0,
    //             items: [],
    //         },
    //     },
    //     { status: 200 },
    // );
}
