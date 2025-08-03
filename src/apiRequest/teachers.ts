import publicApi from "~/libs/apis/publicApi";
import { TeacherListType } from "~/schemaValidate/teachher.schema";

const teacherApi = {
    getTeachers: async () => {
        const res = await publicApi.get<TeacherListType>("/teachers");
        return res.data.data;
    },
};
export default teacherApi;
