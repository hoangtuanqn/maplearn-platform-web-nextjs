import {
    FormForgotPasswordType,
    FormLoginType,
    FormRegisterType,
    FormResetPasswordType,
} from "~/app/(student)/auth/auth.schema";
import publicApi from "~/libs/apis/publicApi";

const authApi = {
    create: (data: FormRegisterType) => publicApi.post("/auth/register", data),
    login: (data: FormLoginType) => publicApi.post("/auth/login", data),
    forgotPassword: (data: FormForgotPasswordType) => publicApi.post("/auth/forgot-password", data),
    resetPassword: (data: FormResetPasswordType) => publicApi.post("/auth/reset-password", data),
};
export default authApi;
