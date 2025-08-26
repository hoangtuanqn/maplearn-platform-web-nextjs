"use client";
import {
    LayoutDashboard,
    UserRound,
    UserCog,
    BookOpen,
    FolderTree,
    GraduationCap,
    ListOrdered,
    FileText,
    MessageCircle,
    ClipboardList,
    Receipt,
    ShoppingCart,
    History,
    Folder,
    FileEdit,
    FolderDot,
    FileArchive,
    BarChart3,
    Settings,
    LifeBuoy,
    ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveRoute } from "~/libs/routeMatcher";
export const menuItems = [
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
        label: "Môn học",
        children: [
            {
                type: "link",
                label: "Môn học",
                icon: BookOpen,
                href: "/admin/subjects",
                matcher: ["/admin/subjects"],
            },
        ],
    },

    {
        type: "title",
        label: "Khóa học",
        children: [
            {
                type: "submenu",
                label: "Khóa học",
                icon: GraduationCap,
                matcher: ["/admin/courses", "/admin/categories", "/admin/lessons"],
                children: [
                    {
                        type: "link",
                        label: "Danh mục",
                        icon: FolderTree,
                        href: "/admin/categories",
                        matcher: ["/admin/categories"],
                    },
                    {
                        type: "link",
                        label: "Khóa học",
                        icon: GraduationCap,
                        href: "/admin/courses",
                        matcher: ["/admin/courses"],
                    },
                    {
                        type: "link",
                        label: "Chương",
                        icon: ListOrdered,
                        href: "/admin/chapters",
                        matcher: ["/admin/chapters"],
                    },
                    {
                        type: "link",
                        label: "Bài học",
                        icon: FileText,
                        href: "/admin/lessons",
                        matcher: ["/admin/lessons"],
                    },
                    {
                        type: "link",
                        label: "Hỏi đáp",
                        icon: MessageCircle,
                        href: "/admin/qna",
                        matcher: ["/admin/qna"],
                    },
                ],
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
                matcher: ["/admin/exams"],
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
                href: "/admin/invoices",
                matcher: ["/admin/invoices"],
            },
        ],
    },

    {
        type: "title",
        label: "Lịch sử",
        children: [
            {
                type: "link",
                label: "Mua khóa học",
                icon: ShoppingCart,
                href: "/admin/purchases",
                matcher: ["/admin/purchases"],
            },
            {
                type: "link",
                label: "Làm bài thi",
                icon: History,
                href: "/admin/attempts",
                matcher: ["/admin/attempts"],
            },
        ],
    },

    {
        type: "title",
        label: "Bài viết",
        children: [
            {
                type: "submenu",
                label: "Bài viết",
                icon: FileEdit,
                matcher: ["/admin/posts", "/admin/post-categories"],
                children: [
                    {
                        type: "link",
                        label: "Danh mục",
                        icon: Folder,
                        href: "/admin/post-categories",
                        matcher: ["/admin/post-categories"],
                    },
                    {
                        type: "link",
                        label: "Bài viết",
                        icon: FileEdit,
                        href: "/admin/posts",
                        matcher: ["/admin/posts"],
                    },
                ],
            },
        ],
    },

    {
        type: "title",
        label: "Tài liệu",
        children: [
            {
                type: "submenu",
                label: "Tài liệu",
                icon: FileArchive,
                matcher: ["/admin/documents", "/admin/document-categories"],
                children: [
                    {
                        type: "link",
                        label: "Danh mục",
                        icon: FolderDot,
                        href: "/admin/document-categories",
                        matcher: ["/admin/document-categories"],
                    },
                    {
                        type: "link",
                        label: "Tài liệu",
                        icon: FileArchive,
                        href: "/admin/documents",
                        matcher: ["/admin/documents"],
                    },
                ],
            },
        ],
    },

    {
        type: "title",
        label: "Profile",
        children: [
            {
                type: "link",
                label: "Hồ sơ cá nhân",
                icon: UserRound,
                href: "/profile",
                matcher: ["/profile", "/profile/edit", "/profile/change-password"],
            },
        ],
    },

    {
        type: "title",
        label: "Hệ thống",
        children: [
            {
                type: "link",
                label: "Báo cáo",
                icon: BarChart3,
                href: "/admin/reports",
                matcher: ["/admin/reports"],
            },
            {
                type: "link",
                label: "Cài đặt",
                icon: Settings,
                href: "/admin/settings",
                matcher: ["/admin/settings"],
            },
            {
                type: "link",
                label: "Hỗ trợ",
                icon: LifeBuoy,
                href: "/admin/support",
                matcher: ["/admin/support"],
            },
        ],
    },
];
const hasActiveChild = (children: any[], pathname: string): boolean => {
    return children?.some((child) => {
        if (child.type === "link") {
            return child.matcher && child.matcher.some((m: string) => isActiveRoute(pathname, [m]));
        }
        if (child.type === "submenu") {
            return (
                (child.matcher && child.matcher.some((m: string) => isActiveRoute(pathname, [m]))) ||
                hasActiveChild(child.children ?? [], pathname)
            );
        }
        if (child.type === "title") {
            return hasActiveChild(child.children ?? [], pathname);
        }
        return false;
    });
};

const renderMenu = (items: any[], pathname: string) => {
    return (
        <ul className="mt-2 flex flex-col space-y-1">
            {items.map((item, i) => {
                if (item.type === "title") {
                    return (
                        <li key={i} className="mt-3 mb-1">
                            <span className="text-xs font-bold">{item.label}</span>
                            {item.children && renderMenu(item.children, pathname)}
                        </li>
                    );
                }

                if (item.type === "link") {
                    const Icon = item.icon as React.ElementType;
                    const active = item.matcher && item.matcher.some((m: string) => isActiveRoute(pathname, [m]));

                    return (
                        <li key={i}>
                            <Link
                                href={item.href ?? "#"}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                                    active ? "bg-black text-white" : "text-slate-800 hover:bg-slate-100"
                                }`}
                            >
                                <Icon className={active ? "text-white" : "text-gray-600"} strokeWidth={3} />
                                {item.label}
                            </Link>
                        </li>
                    );
                }

                if (item.type === "submenu") {
                    const Icon = item.icon as React.ElementType;

                    const activeSelf = item.matcher && item.matcher.some((m: string) => isActiveRoute(pathname, [m]));

                    const activeChild = hasActiveChild(item.children ?? [], pathname);

                    const open = activeSelf || activeChild;

                    return (
                        <li key={i} className={`has-submenu ${open ? "open" : ""}`}>
                            <button
                                className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 ${
                                    open ? "bg-slate-100 text-slate-800" : "text-slate-800 hover:bg-slate-100"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon className={open ? "text-gray-600" : "text-gray-600"} strokeWidth={3} />
                                    <span className="text-xs font-medium">{item.label}</span>
                                </div>
                                <ChevronUp
                                    className={`chevron transition-transform ${
                                        open ? "rotate-180 text-gray-600" : "text-gray-300"
                                    }`}
                                />
                            </button>
                            <div className={`submenu pl-1 ${open ? "block" : "hidden"}`}>
                                {item.children && renderMenu(item.children, pathname)}
                            </div>
                        </li>
                    );
                }

                return null;
            })}
        </ul>
    );
};
const Sidebar = () => {
    const pathname = usePathname();
    return (
        <nav className="scrollbar fixed top-2 bottom-2 left-2 w-60 overflow-y-auto rounded-md bg-white p-4 shadow-md">
            <div className="from-primary/8 sticky top-2 z-10 flex flex-col items-center rounded-lg bg-gradient-to-r to-white pt-2 pb-4">
                <Link href="/admin">
                    <h2 className="text-center text-2xl font-extrabold tracking-wide text-slate-800">
                        <span className="text-primary text-3xl drop-shadow-lg">M</span>
                        <span className="text-slate-700">
                            apLearn <span className="text-primary font-bold">Edu</span>
                        </span>
                    </h2>
                </Link>
                <span className="bg-primary/10 text-primary mt-1 rounded-full px-3 py-1 text-xs font-semibold shadow">
                    Hệ thống giáo dục
                </span>
            </div>

            <div className="py-5">{renderMenu(menuItems, pathname)}</div>

            <script src="/assets/js/sidebar.js" defer></script>
        </nav>
    );
};

export default Sidebar;
