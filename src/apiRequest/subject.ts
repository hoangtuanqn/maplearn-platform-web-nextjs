import publicApi from "~/libs/apis/publicApi";
import { SubjectListResponse } from "~/schemaValidate/subject.schema";

export const subjectApi = {
    getSubjects: async () => publicApi.get<SubjectListResponse>(`/subjects`),
};
