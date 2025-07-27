import { Metadata } from "next";
import FormRegister from "./_components/FormRegister";
export const metadata: Metadata = {
    title: "Tạo tài khoản",
};
const RegisterPage = () => {
    return <FormRegister />;
};

export default RegisterPage;
