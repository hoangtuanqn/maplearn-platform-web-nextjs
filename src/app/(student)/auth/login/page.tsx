import { Metadata } from "next";
import FormLogin from "./_components/FormLogin";
import LoginGoogle from "../../_components/Button/LoginGoogle";
import LoginFacebook from "../../_components/Button/LoginFacebook";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Đăng nhập tài khoản",
};
const Login = () => {
    return (
        <>
            <div className="w-full">
                <h3 className="mb-10 text-center text-xl font-semibold uppercase">Đăng nhập</h3>
                <FormLogin />
                <div className="mt-12 flex flex-col gap-2">
                    <div className="t1-flex-center gap-2 text-gray-500">
                        <span className="block h-[1.5px] w-20 bg-black/40"></span> <span>hoặc tiếp tục với</span>
                        <span className="block h-[1.5px] w-20 bg-black/40"></span>
                    </div>
                    <div className="mt-4 flex justify-center gap-4 text-[12px] sm:flex-row sm:text-sm">
                        <LoginGoogle />
                        <LoginFacebook />
                    </div>
                </div>
                <div className="mt-10 text-center text-sm">
                    <span>Chưa có tài khoản? </span>
                    <Link className="underline hover:text-gray-900" href="/auth/register">
                        Đăng ký
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
