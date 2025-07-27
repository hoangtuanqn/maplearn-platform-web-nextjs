import { ItemLinkType } from "../../Header/Laptop/HeaderLink";

const FooterMobileLink = ({
    label,
    icon: Icon,
    href,
    iconColor = "var(--primary-light)",
    isActive = false,
}: ItemLinkType) => {
    return (
        <li className="flex-1">
            <a className="t1-flex-center relative flex h-full w-full flex-col gap-0.5" href={href}>
                <div className="t1-flex-center h-7 w-7">
                    <Icon color={iconColor} isActive={isActive} />
                </div>
                <span
                    className={`text-center text-xs text-gray-600 md:text-sm ${isActive && `text-primary font-bold`}`}
                >
                    {label}
                </span>
            </a>
        </li>
    );
};

export default FooterMobileLink;
