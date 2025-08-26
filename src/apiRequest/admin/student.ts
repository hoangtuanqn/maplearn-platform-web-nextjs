import privateApi from "~/libs/apis/privateApi";
import { StudentListResponseType } from "~/schemaValidate/user.schema";
export const USERS_PER_PAGE = 10;
const studentApi = {
    getStudents: () => privateApi.get<StudentListResponseType>("/students"),
};
export default studentApi;
