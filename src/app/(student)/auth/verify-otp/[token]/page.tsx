
import { Metadata } from "next";
import { redirect } from "next/navigation";
import FormVerifyOtp from "../_components/FormVerifyOtp";

export const metadata: Metadata = {
    title: "Xác minh tài khoản",
};

const VerifyOtp = async ({ params }: { params: Promise<{ token: string }> }) => {
    const { token } = await params;
    if (!token) {
        redirect("/auth/login");
    }
    return <FormVerifyOtp />;
};

export default VerifyOtp;
