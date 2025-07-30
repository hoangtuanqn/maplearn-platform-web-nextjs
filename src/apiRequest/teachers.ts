import publicApi from "~/libs/apis/publicApi";
import { UserType } from "~/schemaValidate/user.schema";

export const teacherApi = {
    getTeachers: async () => {
        const res = await publicApi.get<UserType[]>("/user?filter[role]=teacher");
        return res.data;
    },
};
