import axios from "axios";
import { API_URL } from "../../ai/config";
const trainingAI = {
    systemInstruction: {
        role: "system",
        parts: [
            {
                text: `Bạn là một AI tìm kiếm thông minh.  
Nhiệm vụ của bạn là tìm ra các bài viết **phù hợp nhất với nhu cầu học tập của người dùng**, dựa trên dữ liệu đã có.  
❗ Bạn **KHÔNG được chào hỏi**, **KHÔNG được giải thích**, **KHÔNG được thêm chữ nào ngoài kết quả JSON**.

---

📚 Đây là dữ liệu bài viết dạng JSON:
[
    {
        "id": 200,
        "title": "Gợi ý đáp án môn Tiếng Anh tốt nghiệp THPT 2025",
        "slug": "goi-y-dap-an-mon-tieng-anh-tot-nghiep-thpt-2025-hpl1qcqk9cfa"
    },
    {
        "id": 199,
        "title": "Gợi ý đáp án môn Tiếng Anh tốt nghiệp THPT 2025",
        "slug": "goi-y-dap-an-mon-tieng-anh-tot-nghiep-thpt-2025-tflkh7cyejlp"
    },
    {
        "id": 198,
        "title": "Gợi ý đáp án môn Toán tốt nghiệp THPT 2025",
        "slug": "goi-y-dap-an-mon-toan-tot-nghiep-thpt-2025-uaxgcmmrynla"
    },
    {
        "id": 197,
        "title": "Gợi ý đáp án môn Vật Lý tốt nghiệp THPT 2025",
        "slug": "goi-y-dap-an-mon-vat-ly-tot-nghiep-thpt-2025-1y3e1x2txhur"
    },
    {
        "id": 196,
        "title": "Gợi ý đáp án môn Toán tốt nghiệp THPT 2024",
        "slug": "goi-y-dap-an-mon-toan-tot-nghiep-thpt-2024-cquusxbqshzs"
    },
    {
        "id": 195,
        "title": "Gợi ý đáp án môn Tiếng Anh tốt nghiệp THPT 2025",
        "slug": "goi-y-dap-an-mon-tieng-anh-tot-nghiep-thpt-2025-ninrljfo4sfh"
    },
    {
        "id": 194,
        "title": "Gợi ý đáp án môn Toán tốt nghiệp THPT 2025",
        "slug": "goi-y-dap-an-mon-toan-tot-nghiep-thpt-2025-g6c42uhuglwv"
    },
    {
        "id": 193,
        "title": "Gợi ý đáp án môn Toán tốt nghiệp THPT 2024",
        "slug": "goi-y-dap-an-mon-toan-tot-nghiep-thpt-2024-an3bfnmfxx6y"
    },
    {
        "id": 192,
        "title": "Gợi ý đáp án môn Vật Lý tốt nghiệp THPT 2025",
        "slug": "goi-y-dap-an-mon-vat-ly-tot-nghiep-thpt-2025-temdfgt3j4v3"
    },
    {
        "id": 191,
        "title": "Gợi ý đáp án môn Tiếng Anh tốt nghiệp THPT 2025",
        "slug": "goi-y-dap-an-mon-tieng-anh-tot-nghiep-thpt-2025-haxebkexmjuq"
    }
]

---

🔎 Nhu cầu của người dùng sẽ được đính kèm ở dưới ở role user

---

❗ Yêu cầu bắt buộc:
- Chỉ trả về **một mảng JSON hợp lệ chứa các ID phù hợp**, ví dụ:  [200, 195, 191]
- Không được chào hỏi, giải thích, thêm mô tả, hay định dạng khác.
- Phải đúng cú pháp JSON mảng số.`,
            },
        ],
    },
};
//
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body?.search) {
            return new Response(JSON.stringify({ error: "Missing 'search' in request body" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const res = await axios.post(API_URL, {
            ...trainingAI,
            contents: {
                role: "user",
                parts: [
                    {
                        text: body.search,
                    },
                ],
            },
        });
        const dataJson = res.data?.candidates[0]?.content?.parts?.[0]?.text;
        return new Response(JSON.stringify(dataJson), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("POST /chat/ai error:", error);

        if (axios.isAxiosError(error)) {
            return new Response(
                JSON.stringify({
                    error: "Đã xảy ra lỗi khi gửi dữ liệu đến AI",
                    details: error?.response?.data || error.message || error,
                }),
                {
                    status: error?.response?.status || 500,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }
    }
}
