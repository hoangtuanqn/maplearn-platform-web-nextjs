import publicApi from "~/libs/apis/publicApi";
import { ReportResponse } from "~/schemaValidate/report.schema";

const reportApi = {
    report: (data: { reportable_type: string; reportable_id: number; reason: string; message?: string }) =>
        publicApi.post<ReportResponse>("/reports", data),
};
export default reportApi;
