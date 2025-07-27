export const formatter = {
    date: (date: Date) => date.toLocaleDateString("vi-VN"),
    number: (amount: number) => amount.toLocaleString("vi-VN"),
};

export const formatPhoneNumber = (phone: string | number): string => {
    // Chuyển thành chuỗi và loại bỏ các ký tự không phải số
    const digits = phone.toString().replace(/\D/g, "");

    // Kiểm tra nếu không đủ 10 chữ số thì trả về nguyên bản
    if (digits.length !== 10) return phone.toString();

    // Tách các phần và format
    return `${digits.slice(0, 4)}.${digits.slice(4, 7)}.${digits.slice(7)}`;
};
