import { TrendingUp } from "lucide-react";
import Link from "next/link";
interface HeaderSectionType {
    title: string;
    url?: string;
}
const HeaderSection = ({ title, url = "#" }: HeaderSectionType) => {
    return (
        <div className="t1-flex-center justify-between">
            <div className="t1-flex-center gap-2">
                <div className="bg-primary h-4 w-1"></div>
                <h3 className="block-heading">{title}</h3>
            </div>
            <Link href={url} className="t1-flex-center justify-between gap-1 text-gray-500 italic">
                <span>Xem tất cả</span>
                <TrendingUp />
            </Link>
        </div>
    );
};

export default HeaderSection;
