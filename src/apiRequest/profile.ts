import privateApi from "~/libs/apis/privateApi";
import { UserType } from "~/schemaValidate/user.schema";

const profileApi = {
    update: (data: UserType) => privateApi.post("/profile/update", data),
};
export default profileApi;
