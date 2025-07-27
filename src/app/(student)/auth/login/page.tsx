import { Metadata } from "next";
import FormLogin from "./_components/FormLogin";
export const metadata: Metadata = {
    title: "Đăng nhập tài khoản",
};
const Login = () => {
    return <FormLogin />;
};

export default Login;
