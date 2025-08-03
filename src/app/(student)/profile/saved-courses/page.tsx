import React from "react";
import { Metadata } from "next";
import DisplayCourse from "../../_components/Courses/DisplayCourse";
export const metadata: Metadata = {
    title: "Khóa học đã lưu",
};
const myCourses = [
    {
        title: "CÀY LÍ THUYẾT 360 ĐỘ HÓA HỌC 12",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/4kw4b1z028im/cay-li-thuyet-360-do-hoa-hoc-lop-12-1744535529719.png",
        url: "/khoa-hoc/cay-li-thuyet-360-do---hoa-hoc-12",
    },
    {
        title: "CÀY LÍ THUYẾT 360 ĐỘ VẬT LÍ 12",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/2o7q0yd00ifw/cay-li-thuyet-360-vat-li-lop-12-1740382852693.png",
        url: "/khoa-hoc/cay-li-thuyet-360-do---vat-li-12",
    },
    {
        title: "2K9 XUẤT PHÁT SỚM MÔN VẬT LÝ - LỚP 11",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/3od8kft00rtd/2k9-xuat-phat-som-mon-vat-ly---lop-11-1751535797754.png",
        url: "/khoa-hoc/2k9-xuat-phat-som-mon-vat-ly---lop-11",
    },
    {
        title: "TỔNG ÔN TOÀN DIỆN 360 ĐỘ - TOÁN 12",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/5g5keb800q23/tong-on-toan-dien-360-do-mon-toan---lop-12-1746425848436.png",
        url: "/khoa-hoc/tong-on-toan-dien-360-do---toan-12",
    },
    {
        title: "ÔN TẬP VẬT LÍ CHUYÊN SÂU 12",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/2o7q0yd00ifw/cay-li-thuyet-360-vat-li-lop-12-1740382852693.png",
        url: "/khoa-hoc/on-tap-vat-li-chuyen-sau-12",
    },
    {
        title: "TOÁN 12 - NỀN TẢNG VỮNG CHẮC",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/5g5keb800q23/tong-on-toan-dien-360-do-mon-toan---lop-12-1746425848436.png",
        url: "/khoa-hoc/toan-12-nen-tang-vung-chac",
    },
    {
        title: "HÓA HỌC 12 - CHINH PHỤC ĐỈNH CAO",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/4kw4b1z028im/cay-li-thuyet-360-do-hoa-hoc-lop-12-1744535529719.png",
        url: "/khoa-hoc/hoa-hoc-12-chinh-phuc-dinh-cao",
    },
    {
        title: "LÍ 11 - CƠ BẢN ĐẾN NÂNG CAO",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/3od8kft00rtd/2k9-xuat-phat-som-mon-vat-ly---lop-11-1751535797754.png",
        url: "/khoa-hoc/li-11-co-ban-nang-cao",
    },
    {
        title: "VẬT LÍ 10 - NỀN TẢNG 2K10",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/3od8kft00rtd/2k9-xuat-phat-som-mon-vat-ly---lop-11-1751535797754.png",
        url: "/khoa-hoc/vat-li-10-nen-tang-2k10",
    },
    {
        title: "HÓA 11 - TỔNG HỢP TOÀN TẬP",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/4kw4b1z028im/cay-li-thuyet-360-do-hoa-hoc-lop-12-1744535529719.png",
        url: "/khoa-hoc/hoa-11-tong-hop-toan-tap",
    },
    {
        title: "LUYỆN THI THPTQG TOÁN 12",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/5g5keb800q23/tong-on-toan-dien-360-do-mon-toan---lop-12-1746425848436.png",
        url: "/khoa-hoc/luyen-thi-thptqg-toan-12",
    },
    {
        title: "VẬT LÍ 12 - GIẢI NHANH TRẮC NGHIỆM",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/2o7q0yd00ifw/cay-li-thuyet-360-vat-li-lop-12-1740382852693.png",
        url: "/khoa-hoc/vat-li-12-giai-nhanh-trac-nghiem",
    },
    {
        title: "TOÁN 11 - NẮM CHẮC CƠ BẢN",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/5g5keb800q23/tong-on-toan-dien-360-do-mon-toan---lop-12-1746425848436.png",
        url: "/khoa-hoc/toan-11-nam-chac-co-ban",
    },
    {
        title: "ÔN TẬP GIẢI TÍCH 12",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/5g5keb800q23/tong-on-toan-dien-360-do-mon-toan---lop-12-1746425848436.png",
        url: "/khoa-hoc/on-tap-giai-tich-12",
    },
    {
        title: "CÀY CỰC MẠNH - TOÁN 12",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/5g5keb800q23/tong-on-toan-dien-360-do-mon-toan---lop-12-1746425848436.png",
        url: "/khoa-hoc/cay-cuc-manh-toan-12",
    },
    {
        title: "HÓA HỌC 10 - CĂN BẢN CHO NEWBIE",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/4kw4b1z028im/cay-li-thuyet-360-do-hoa-hoc-lop-12-1744535529719.png",
        url: "/khoa-hoc/hoa-10-can-ban",
    },
    {
        title: "VẬT LÍ 11 - SIÊU TỐC LUYỆN ĐỀ",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/3od8kft00rtd/2k9-xuat-phat-som-mon-vat-ly---lop-11-1751535797754.png",
        url: "/khoa-hoc/vat-li-11-luyen-de",
    },
    {
        title: "TOÁN 10 - LẬP PHƯƠNG CƠ BẢN",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/5g5keb800q23/tong-on-toan-dien-360-do-mon-toan---lop-12-1746425848436.png",
        url: "/khoa-hoc/toan-10-lap-phuong",
    },
    {
        title: "LÍ 12 - 30 ĐỀ THI HAY NHẤT",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/2o7q0yd00ifw/cay-li-thuyet-360-vat-li-lop-12-1740382852693.png",
        url: "/khoa-hoc/li-12-30-de-thi-hay",
    },
    {
        title: "TOÁN 12 - ÔN NÂNG CAO CHUYÊN ĐỀ",
        teacher: "Thầy Vũ Ngọc Anh",
        thumbnail:
            "https://mapstudy.sgp1.digitaloceanspaces.com/course/5g5keb800q23/tong-on-toan-dien-360-do-mon-toan---lop-12-1746425848436.png",
        url: "/khoa-hoc/toan-12-on-nang-cao",
    },
];

const MyCoursesPage = () => {
    return (
        <>
            <h3 className="block-heading mb-6">Khóa học đã lưu</h3>
            <div className="flex flex-col gap-4 font-medium">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                    {myCourses.map((course) => (
                        <DisplayCourse
                            slug={course.url}
                            key={course.title + course.teacher + course.thumbnail}
                            thumbnail={course.thumbnail}
                            title={course.title}
                            teacher={course.teacher}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MyCoursesPage;
