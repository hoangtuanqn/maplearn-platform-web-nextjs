import publicApi from "~/libs/apis/publicApi";
import { ReportResponse } from "~/schemaValidate/report.schema";
// Báo cáo bài viết, tài liệu bị sai
const reportApi = {
    report: (data: { reportable_type: string; reportable_id: number; reason: string; message?: string }) =>
        publicApi.post<ReportResponse>("/reports", data),
};
export default reportApi;
