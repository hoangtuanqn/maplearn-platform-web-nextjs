import Link from "next/link";
import { SidebarType } from "~/app/(student)/auth/types/menu.type";

export const MenuItemLink = ({ title, image, url, className }: SidebarType) => {
    return (
        <Link
            className="flex cursor-pointer items-center justify-start rounded-lg px-4 py-2 hover:bg-[rgba(26,79,140,0.06)]"
            href={url}
        >
            <div className="t1-flex-center">
                <img src={image} alt={title} className={className} />
            </div>
            <p className="text-primary ml-4 font-medium">{title}</p>
        </Link>
    );
};
