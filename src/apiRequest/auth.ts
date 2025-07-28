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
    resetPassword: (data: FormResetPasswordType & { token: string }) => publicApi.post("/auth/reset-password", data),
    checkTokenResetPassword: (data: { token: string }) => publicApi.post("/auth/check-token-reset-password", data),
};
export default authApi;
