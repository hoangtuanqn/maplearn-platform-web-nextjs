import publicApi from "~/libs/apis/publicApi";
import { GradeLevelListResponse } from "~/schemaValidate/gradesLevel.schema";

export const gradesLevelApi = {
    getGradesLevels: async () => publicApi.get<GradeLevelListResponse>(`/grade-levels`),
};
