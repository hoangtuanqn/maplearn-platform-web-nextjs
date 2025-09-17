import { LayoutDashboard, UserRound, UserCog, GraduationCap, ClipboardList, Receipt, History } from "lucide-react";
const menuItems = [
    {
        type: "title",
        label: "Trang chính",
        children: [
            {
                type: "link",
                label: "Tổng quan",
                icon: LayoutDashboard,
                href: "/admin",
                matcher: ["/admin"],
            },
        ],
    },

    {
        type: "title",
        label: "Người dùng",
        children: [
            {
                type: "link",
                label: "Học sinh",
                icon: UserRound,
                href: "/admin/students",
                matcher: ["/admin/students", "/admin/students/:id"],
            },
            {
                type: "link",
                label: "Giáo viên",
                icon: UserCog,
                href: "/admin/teachers",
                matcher: ["/admin/teachers"],
            },
        ],
    },

    {
        type: "title",
        label: "Khóa học",
        children: [
            {
                type: "link",
                label: "Khóa học",
                icon: GraduationCap,
                href: "/admin/courses",
                matcher: ["/admin/courses", "/admin/courses/:slug"],
            },
        ],
    },
    {
        type: "title",
        label: "Đề thi",
        children: [
            {
                type: "link",
                label: "Đề thi",
                icon: ClipboardList,
                href: "/admin/exams",
                matcher: ["/admin/exams", "/admin/exams/:slug"],
            },
        ],
    },

    {
        type: "title",
        label: "Thanh toán",
        children: [
            {
                type: "link",
                label: "Hóa đơn",
                icon: Receipt,
                href: "/admin/payments",
                matcher: ["/admin/payments"],
            },
        ],
    },

    {
        type: "title",
        label: "Lịch sử",
        children: [
            {
                type: "link",
                label: "Làm bài thi",
                icon: History,
                href: "/admin/history/exams",
                matcher: ["/admin/history/exams"],
            },
        ],
    },
];
export default menuItems;
