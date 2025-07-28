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
    return listRoutePath.includes(pathname);
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
