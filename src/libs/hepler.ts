import { match } from "path-to-regexp";
import zxcvbn from "zxcvbn";
import { PasswordStrengthType } from "~/app/(student)/auth/auth.schema";

export const getGender = (gender: "male" | "female" | "other") => {
    switch (gender) {
        case "male":
            return "Nam";
        case "female":
            return "Nữ";
        case "other":
            return "Chưa xác định";
    }
};
export const getCharacterName = (name: string | null | undefined) => {
    if (!name) return null;
    const arrName = name.split(" ");
    return arrName[arrName.length - 1].substring(0, 1);
};
export const isActiveRoute = (pathname: string, listRoutePath: string[]) => {
    const cleanPath = pathname.split("?")[0]; // Loại bỏ query string

    return listRoutePath.some((route) => {
        const matcher = match(route, { decode: decodeURIComponent });
        return matcher(cleanPath) !== false;
    });
};

// Check độ mạnh mật khẩu
export function getPasswordStrength(password: string): PasswordStrengthType {
    const result = zxcvbn(password);
    const labels = ["Rất yếu", "Yếu", "Trung bình", "Khá", "Mạnh"];

    return {
        score: result.score,
        strengthPercent: result.score * 25,
        label: labels[result.score],
        suggestions: result.feedback.suggestions,
    };
}
// Decode base64 url safe
export function base64UrlDecode(data: string): string {
    // Bổ sung dấu '=' nếu thiếu
    const padLength = data.length % 4;
    if (padLength) {
        data += "=".repeat(4 - padLength);
    }
    // Chuyển ký tự URL-safe về chuẩn base64
    data = data.replace(/-/g, "+").replace(/_/g, "/");
    // Giải mã base64 về chuỗi
    const decoded = atob(data);

    return decoded;
}
export function getFormattedVietnameseDate(): string {
    const now: Date = new Date();

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };

    // Lấy chuỗi ngày theo định dạng tiếng Việt
    let formatted: string = now.toLocaleDateString("vi-VN", options);

    // Viết hoa chữ cái đầu (đề phòng trình duyệt trả về chữ thường)
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

    // Thay dấu phẩy bằng dấu gạch ngang
    formatted = formatted.replace(",", " -");

    return formatted;
}
