import Image from "next/image";
import React from "react";
import { Button } from "~/components/ui/button";
import Tag from "./Tag";
import { Clock, Download, DownloadCloud } from "lucide-react";
import { formatter } from "~/libs/format";

const DocumentItem = ({
    id,
    title,
    tags,
    download_count,
    created_at,
    source,
    callback = () => {},
}: {
    id: number;
    title: string;
    tags: { id: number; name: string }[];
    download_count: number;
    created_at: string;
    source: string;
    callback?: (id: string) => void;
}) => {
    return (
        <div className="flex gap-3.5 rounded-xl bg-[#EFF0F1] p-4">
            <div className="hidden shrink-0 flex-col items-center lg:flex">
                <Image
                    src="/assets/icons/pdf.svg"
                    width={72}
                    height={92}
                    alt="Icon SVG PDF"
                    className="h-auto max-sm:w-[80%]"
                />
                <Button
                    className="border-primary text-primary mt-3 w-full bg-white text-xs"
                    asChild
                    onClick={() => callback(id.toString())}
                    variant={"outline"}
                >
                    <a href={source} target="_blank" rel="noopener noreferrer">
                        <Download /> Tải xuống
                    </a>
                </Button>
            </div>

            <div className="flex flex-1 shrink-0 flex-col justify-between">
                <div>
                    <h2 className="line-clamp-3 text-sm leading-5 font-bold text-slate-600 uppercase">{title}</h2>
                    <div className="mt-3 flex flex-wrap gap-x-1 gap-y-1.5">
                        {tags.map((tag) => (
                            <Tag key={tag.id}>{tag.name}</Tag>
                        ))}
                    </div>
                    <Button
                        className="border-primary text-primary mt-3 w-full bg-white text-xs lg:hidden"
                        asChild
                        onClick={() => callback(id.toString())}
                        variant={"outline"}
                    >
                        <a href={source} target="_blank" rel="noopener noreferrer">
                            <Download /> Tải xuống
                        </a>
                    </Button>
                </div>
                <div>
                    <div className="mt-3 h-[1px] bg-gray-300"></div>
                    <div className="mt-3 flex flex-row justify-between text-gray-500 max-lg:items-start">
                        <div className="t1-flex-center gap-1">
                            <DownloadCloud /> {formatter.number(download_count)} lượt tải
                        </div>
                        <div className="t1-flex-center gap-1">
                            <Clock />
                            {formatter.date(new Date(created_at))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentItem;
