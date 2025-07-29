"use client";
import { isActiveRoute } from "~/libs/hepler";
import { ItemLinkType } from "../../Header/Laptop/HeaderLink";

const FooterMobileLink = ({ label, icon: Icon, href, iconColor = "var(--primary-light)", macher }: ItemLinkType) => {
    const isActive = isActiveRoute(href, macher);

    return (
        <li className="flex-1">
            <a className="t1-flex-center relative flex h-full w-full flex-col gap-0.5" href={href}>
                <div className="t1-flex-center h-7 w-7">
                    <Icon color={iconColor} isActive={isActive} />
                </div>
                <span
                    className={`text-center text-xs md:text-sm ${
                        isActive ? "text-primary font-bold" : "text-gray-600"
                    }`}
                >
                    {label}
                </span>
            </a>
        </li>
    );
};

export default FooterMobileLink;
