import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Rating } from "@smastrom/react-rating";
import { formatter } from "~/libs/format";
interface DisplayCourseType {
    thumbnail: string;
    title: string;
    teacher: string;
    slug: string;
    rating: number;
    totalReviews: number;
    price: number;
    is_enrolled?: boolean;
}
const DisplayCourse = ({
    thumbnail,
    title,
    price = 0,
    rating = 0,
    totalReviews = 0,
    teacher,
    slug,
    is_enrolled = false,
}: DisplayCourseType) => {
    return (
        <Link href={`/courses/${slug}`} className="text-secondary-typo relative block h-full w-full rounded-xl">
            <div className="relative">
                <Image
                    width={184}
                    height={184}
                    src={thumbnail}
                    alt={teacher}
                    className="aspect-square w-full rounded-xl object-cover"
                />
                {/* Làm badge giảm giá */}
                {/* {price > 0 && (
                    <span className="absolute top-2 right-2 rounded-md bg-[#FFB23F] px-2 py-1 text-xs font-bold text-white">
                        -20%
                    </span>
                )} */}

                <span className="absolute top-2 left-2 rounded bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-[10.125px] font-bold text-white shadow-md">
                    -20%
                </span>
                <div className="absolute top-2 right-2 rounded bg-gradient-to-r from-yellow-500 to-orange-500 px-2 py-1 text-[10.125px] font-bold text-white shadow-md">
                    Bán chạy
                </div>
            </div>
            <h3 className="mt-4 w-full font-medium hover:line-clamp-none lg:line-clamp-2">{title}</h3>

            <div className="my-1 flex items-center gap-1 text-xs font-medium">
                <User style={{ fill: "currentColor" }} />
                <span className="line-clamp-2">{teacher}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
                <span className="font-bold text-[#FFB23F]">{rating}</span>
                <Rating style={{ maxWidth: 60 }} value={rating} readOnly />
                <span>({totalReviews})</span>
            </div>
            {is_enrolled ? (
                <span className="mt-1 inline-block rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Bạn đã mua khóa học này
                </span>
            ) : (
                <>
                    <span className="block font-bold text-black">
                        {price == 0 ? "Miễn phí" : formatter.number(price ?? 0) + "đ"}
                    </span>
                    {price > 0 && (
                        <span className="mt-1 block text-xs font-semibold text-green-600">Đã giảm 400.000đ</span>
                    )}
                </>
            )}
        </Link>
    );
};

export default DisplayCourse;
