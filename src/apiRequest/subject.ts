import publicApi from "~/libs/apis/publicApi";
import { SubjectListResponse } from "~/schemaValidate/subject.schema";

const subjectApi = {
    getSubjects: async () => publicApi.get<SubjectListResponse>(`/subjects`),
};
export default subjectApi;