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

const Sidebar = () => {
    return (
        <nav className="scrollbar fixed top-2 bottom-2 left-2 w-60 overflow-y-auto rounded-md bg-white p-4 shadow-md">
            <div className="from-primary/8 sticky top-2 z-10 flex flex-col items-center rounded-lg bg-gradient-to-r to-white pt-2 pb-4">
                <h2 className="text-center text-2xl font-extrabold tracking-wide text-slate-800">
                    <span className="text-primary text-3xl drop-shadow-lg">M</span>
                    <span className="text-slate-700">
                        apLearn <span className="text-primary font-bold">Edu</span>
                    </span>
                </h2>
                <span className="bg-primary/10 text-primary mt-1 rounded-full px-3 py-1 text-xs font-semibold shadow">
                    Hệ thống giáo dục
                </span>
            </div>
            <ul className="flex h-full max-h-full flex-col space-y-1 overflow-hidden py-5">
                {/* Trang chính */}
                <li className="mt-3 mb-1 flex items-center gap-2 rounded-md">
                    <span className="text-xs font-bold">Trang chính</span>
                </li>
                <li className="flex items-center gap-2 rounded-md bg-black px-3 py-2 text-white">
                    <LayoutDashboard className="text-slate-400" strokeWidth={3} />
                    <span className="text-xs font-medium">Tổng quan</span>
                </li>

                {/* Người dùng */}
                <li className="mt-3 mb-1 flex items-center gap-2 rounded-md">
                    <span className="text-xs font-bold">Người dùng</span>
                </li>
                <li>
                    <Link
                        href="/admin/students"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-slate-800 transition-colors hover:bg-slate-100"
                    >
                        <UserRound className="text-gray-600" strokeWidth={3} />
                        <span className="text-xs font-medium">Học sinh</span>
                    </Link>
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                    <UserCog className="text-gray-600" strokeWidth={3} />
                    <span className="text-xs font-medium">Giáo viên</span>
                </li>

                {/* Môn học */}
                <li className="mt-3 mb-1 flex items-center gap-2 rounded-md">
                    <span className="text-xs font-bold">Môn học</span>
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                    <BookOpen className="text-gray-600" strokeWidth={3} />
                    <span className="text-xs font-medium">Môn học</span>
                </li>

                {/* Khóa học (submenu) */}
                <li className="mt-3 mb-1 flex items-center gap-2 rounded-md">
                    <span className="text-xs font-bold">Khóa học</span>
                </li>
                <li className="has-submenu">
                    <button className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="text-gray-600" strokeWidth={3} />
                            <span className="text-xs font-medium">Khóa học</span>
                        </div>
                        <ChevronUp className="chevron text-gray-300" />
                    </button>
                    <ul className="submenu hidden space-y-1 pl-1 text-sm">
                        <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                            <FolderTree className="text-gray-600" />
                            <span className="text-xs font-medium">Danh mục</span>
                        </li>
                        <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                            <GraduationCap className="text-gray-600" />
                            <span className="text-xs font-medium">Khóa học</span>
                        </li>
                        <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                            <ListOrdered className="text-gray-600" />
                            <span className="text-xs font-medium">Chương</span>
                        </li>
                        <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                            <FileText className="text-gray-600" />
                            <span className="text-xs font-medium">Bài học</span>
                        </li>
                        <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                            <MessageCircle className="text-gray-600" />
                            <span className="text-xs font-medium">Hỏi đáp</span>
                        </li>
                    </ul>
                </li>

                {/* Đề thi */}
                <li className="mt-3 mb-1 flex items-center gap-2 rounded-md">
                    <span className="text-xs font-bold">Đề thi</span>
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                    <ClipboardList className="text-gray-600" strokeWidth={3} />
                    <span className="text-xs font-medium">Đề thi</span>
                </li>

                {/* Thanh toán */}
                <li className="mt-3 mb-1 flex items-center gap-2 rounded-md">
                    <span className="text-xs font-bold">Thanh toán</span>
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                    <Receipt className="text-gray-600" strokeWidth={3} />
                    <span className="text-xs font-medium">Hóa đơn</span>
                </li>

                {/* Lịch sử */}
                <li className="mt-3 mb-1 flex items-center gap-2 rounded-md">
                    <span className="text-xs font-bold">Lịch sử</span>
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                    <ShoppingCart className="text-gray-600" />
                    <span className="text-xs font-medium">Mua khóa học</span>
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                    <History className="text-gray-600" />
                    <span className="text-xs font-medium">Làm bài thi</span>
                </li>

                {/* Bài viết (submenu) */}
                <li className="mt-3 mb-1 flex items-center gap-2 rounded-md">
                    <span className="text-xs font-bold">Bài viết</span>
                </li>
                <li className="has-submenu">
                    <button className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                        <div className="flex items-center gap-2">
                            <FileEdit className="text-gray-600" strokeWidth={3} />
                            <span className="text-xs font-medium">Bài viết</span>
                        </div>
                        <ChevronUp className="chevron text-gray-300" />
                    </button>
                    <ul className="submenu hidden space-y-1 pl-1 text-sm">
                        <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                            <Folder className="text-gray-600" strokeWidth={3} />
                            <span className="text-xs font-medium">Danh mục</span>
                        </li>
                        <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                            <FileEdit className="text-gray-600" strokeWidth={3} />
                            <span className="text-xs font-medium">Bài viết</span>
                        </li>
                    </ul>
                </li>

                {/* Tài liệu (submenu) */}
                <li className="mt-3 mb-1 flex items-center gap-2 rounded-md">
                    <span className="text-xs font-bold">Tài liệu</span>
                </li>
                <li className="has-submenu">
                    <button className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                        <div className="flex items-center gap-2">
                            <FileArchive className="text-gray-600" strokeWidth={3} />
                            <span className="text-xs font-medium">Tài liệu</span>
                        </div>
                        <ChevronUp className="chevron text-gray-300" />
                    </button>
                    <ul className="submenu hidden space-y-1 pl-1 text-sm">
                        <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                            <FolderDot className="text-gray-600" />
                            <span className="text-xs font-medium">Danh mục</span>
                        </li>
                        <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                            <FileArchive className="text-gray-600" />
                            <span className="text-xs font-medium">Tài liệu</span>
                        </li>
                    </ul>
                </li>

                {/* Hệ thống */}
                <li className="mt-3 mb-1 flex items-center gap-2 rounded-md">
                    <span className="text-xs font-bold">Hệ thống</span>
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                    <BarChart3 className="text-gray-600" strokeWidth={3} />
                    <span className="text-xs font-medium">Báo cáo</span>
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                    <Settings className="text-gray-600" strokeWidth={3} />
                    <span className="text-xs font-medium">Cài đặt</span>
                </li>
                <li className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-slate-800 hover:bg-slate-100">
                    <LifeBuoy className="text-gray-600" strokeWidth={3} />
                    <span className="text-xs font-medium">Hỗ trợ</span>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
