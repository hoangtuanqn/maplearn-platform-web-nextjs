import Link from "next/link";
import { ElementType } from "react";
export type ItemLinkType = {
    icon: ElementType;
    label: string;
    href: string;
    iconColor?: string;
    isActive?: boolean;
};
const HeaderLink = ({ label, icon: Icon, href, isActive = false }: ItemLinkType) => {
    return (
        <Link className="cursor-pointer" href={href}>
            <div className="h-max w-max">
                <div
                    className="view_tooltip flex items-center duration-200 hover:scale-110 md:px-4 lg:px-6"
                    data-tooltip-content={label}
                    style={{ height: "56px" }}
                >
                    <Icon isActive={isActive} />
                </div>
            </div>
        </Link>
    );
};

export default HeaderLink;
