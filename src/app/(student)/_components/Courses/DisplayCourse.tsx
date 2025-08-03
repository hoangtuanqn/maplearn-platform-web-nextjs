import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Rating } from "@smastrom/react-rating";
interface DisplayCourseType {
    thumbnail: string;
    title: string;
    teacher: string;
    slug: string;
}
const DisplayCourse = ({ thumbnail, title, teacher, slug }: DisplayCourseType) => {
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
                <span className="font-bold text-[#FFB23F]">4.6</span>
                <Rating style={{ maxWidth: 60 }} value={4.5} readOnly />
                <span>(500)</span>
            </div>
            <span className="block font-bold text-black">600.000đ</span>
        </Link>
    );
};

export default DisplayCourse;
