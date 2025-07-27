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
