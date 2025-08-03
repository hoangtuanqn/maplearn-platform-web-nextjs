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
}
const DisplayCourse = ({
    thumbnail,
    title,
    price = 0,
    rating = 0,
    totalReviews = 0,
    teacher,
    slug,
}: DisplayCourseType) => {
    return (
        <Link href={`/courses/${slug}`} className="text-secondary-typo block h-full w-full rounded-xl">
            <Image
                width={184}
                height={184}
                src={thumbnail}
                alt={teacher}
                className="aspect-square w-full rounded-xl object-cover"
            />
            <span className="mt-4 line-clamp-2 w-full font-medium">{title}</span>
            <div className="my-1 flex items-center gap-1 text-xs font-medium">
                <User style={{ fill: "currentColor" }} />
                <span className="line-clamp-2">{teacher}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
                <span className="font-bold text-[#FFB23F]">{rating}</span>
                <Rating style={{ maxWidth: 60 }} value={rating} readOnly />
                <span>({totalReviews})</span>
            </div>
            <span className="block font-bold text-black">
                {price == 0 ? "Miễn phí" : formatter.number(price ?? 0) + "đ"}
            </span>
        </Link>
    );
};

export default DisplayCourse;
