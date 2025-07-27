import { User } from "lucide-react";
import React from "react";
interface DisplayCourseType {
    thumbnail: string;
    title: string;
    teacher: string;
}
const DisplayCourse = ({ thumbnail, title, teacher }: DisplayCourseType) => {
    return (
        <a href="#" className="text-secondary-typo block h-full w-full rounded-xl">
            <img src={thumbnail} alt={teacher} className="aspect-square w-full rounded-xl object-cover" />
            <span className="mt-4 line-clamp-2 w-full font-medium">{title}</span>
            <div className="mt-1 flex items-center gap-1 text-xs font-medium">
                <User style={{ fill: "currentColor" }} />
                <span className="line-clamp-2">{teacher}</span>
            </div>
        </a>
    );
};

export default DisplayCourse;
