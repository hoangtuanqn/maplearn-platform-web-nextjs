import privateApi from "~/libs/apis/privateApi";
import { FormChangePasswordType, UserType } from "~/schemaValidate/user.schema";

const profileApi = {
    update: (data: UserType) => privateApi.post("/profile/update", data),
    changePassword: (data: FormChangePasswordType) => privateApi.post("/profile/change-password", data),
};
export default profileApi;
