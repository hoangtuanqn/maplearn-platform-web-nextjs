import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import publicApi from "~/libs/apis/publicApi";
// http://localhost/vnpay_php/vnpay_return.php?vnp_Amount=1000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP15121871&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+GD%3A7011&vnp_PayDate=20250808052521&vnp_ResponseCode=00&vnp_TmnCode=VM0D23TI&vnp_TransactionNo=15121871&vnp_TransactionStatus=00&vnp_TxnRef=7011&vnp_SecureHash=162c2b396bbf4c10ad858ed0d689a388430e4dc2ce2f3221d3efd59d01f9adbd383874cb8636966f1feb152b166223582448325c25a75558387514f71d8e6f93
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const transactionCode = searchParams.get("vnp_TxnRef") ?? "";
    if (transactionCode) {
        try {
            publicApi.get(`/payment/vnpay/return?${searchParams.toString()}`);
        } catch {}
        redirect(`/invoices/${transactionCode}`);
    }
    redirect("/profile/invoices");
    // Debug searchParams
    // return NextResponse.json({ key: searchParams.toString() }, { status: 200 });
}
