import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const folder = (formData.get("folder") as string) ?? "uploads";

        if (!file) {
            return Response.json({ error: "Không có file để upload" }, { status: 400 });
        }

        // Chuyển file thành buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Tạo thư mục nếu chưa có
        const uploadDir = path.join(process.cwd(), "public", folder);
        await fs.mkdir(uploadDir, { recursive: true });

        // Tạo tên file duy nhất để tránh ghi đè
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        // Ghi file vào thư mục public/uploads
        await fs.writeFile(filePath, buffer);

        // Trả về URL public
        const url = `/${folder}/${fileName}`;

        return Response.json({
            url,
            fileName,
        });
    } catch (err) {
        if (err instanceof Error) {
            return Response.json({ error: err.message }, { status: 500 });
        }
        return Response.json({ error: "Lỗi không xác định" }, { status: 500 });
    }
}
