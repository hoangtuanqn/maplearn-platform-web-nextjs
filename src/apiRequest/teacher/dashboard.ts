import privateApi from "~/libs/apis/privateApi";
import { DashboardResponse } from "~/schemaValidate/teacher/dashboard.schema";

const dashboardTeacherApi = {
    getDashboard: async (start_date?: string, end_date?: string) => {
        return privateApi.get<DashboardResponse>("/teacher/dashboard", {
            params: {
                start_date,
                end_date,
            },
        });
    },
};
export default dashboardTeacherApi;
