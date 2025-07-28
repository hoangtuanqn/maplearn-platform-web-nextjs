import { Metadata } from "next";
import FormResetPassword from "./_components/FormResetPassword";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Đặt lại mật khẩu",
};
const ResetPasswordPage = () => {
    return (
        <>
            <div className="w-full">
                <h3 className="mb-10 text-center text-xl font-semibold uppercase">Đặt lại mật khẩu của bạn</h3>
                <FormResetPassword />

                <div className="mt-10 text-center text-sm">
                    <span>Đã lấy lại được mật khẩu? </span>
                    <Link className="underline hover:text-gray-900" href="/auth/login">
                        Đăng nhập ngay
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ResetPasswordPage;
