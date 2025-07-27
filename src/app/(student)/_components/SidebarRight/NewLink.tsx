import { CalendarRange } from "lucide-react";
import { NewType } from "../SidebarLeft/entities.type";
import Image from "next/image";
type NewLinkProps = NewType & {
    variant?: "home" | "posts";
};

const NewLink = ({ title, url, image, createdAt, variant = "home" }: NewLinkProps) => {
    if (variant === "posts") {
        return (
            <div className="bg-white shadow-sm sm:rounded-lg">
                <a href={url}>
                    <div className="flex gap-4 p-3">
                        <div className="aspect-square w-16 shrink-0 overflow-hidden rounded-md">
                            <Image width={56} height={56} alt={title} className="w-full" src={image} />
                        </div>
                        <div className="flex flex-col justify-around">
                            <div className="text-primary mb-2 line-clamp-3 text-[14.75px] font-semibold">{title}</div>
                            <div className="flex items-center gap-1.5 text-[#979797]">
                                <CalendarRange className="h-4.5 w-4.5 text-[#979797]" />
                                <span className="-mb-[3px] text-xs">{createdAt}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
    return (
        <a className="flex cursor-pointer items-start rounded-md py-3" href={url}>
            <Image
                width={76}
                height={76}
                className="h-[4.75rem] w-[4.75rem] overflow-hidden rounded-lg"
                alt={title}
                src={image}
            />
            <div className="ml-4 flex h-full min-h-[4.75rem] flex-1 flex-col justify-between gap-2">
                <p className="text-primary line-clamp-3 font-medium">{title}</p>
                <div className="flex items-center gap-2 text-gray-500">
                    <CalendarRange />
                    <p className="text-xs">{createdAt}</p>
                </div>
            </div>
        </a>
    );
};

export default NewLink;
