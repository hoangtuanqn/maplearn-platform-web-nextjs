import privateApi from "~/libs/apis/privateApi";
import { FormChangePasswordType, ProfileType } from "~/schemaValidate/user.schema";

const profileApi = {
    update: (data: ProfileType) => privateApi.post("/profile/update", data),
    changePassword: (data: FormChangePasswordType) => privateApi.post("/profile/change-password", data),
};
export default profileApi;
