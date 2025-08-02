import publicApi from "~/libs/apis/publicApi";
import { UserType } from "~/schemaValidate/user.schema";

const teacherApi = {
    getTeachers: async () => {
        const res = await publicApi.get<UserType[]>("/user?filter[role]=teacher");
        return res.data;
    },
};
export default teacherApi;
