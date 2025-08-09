import privateApi from "~/libs/apis/privateApi";
import { CourseListResponse } from "~/schemaValidate/course.schema";
import { FormChangePasswordType, ProfileType } from "~/schemaValidate/user.schema";

const profileApi = {
    update: (data: ProfileType) => privateApi.post("/profile/update", data),
    changePassword: (data: FormChangePasswordType) => privateApi.post("/profile/change-password", data),
    getCourseMe: () => privateApi.get<CourseListResponse>("/profile/courses"),
};
export default profileApi;
