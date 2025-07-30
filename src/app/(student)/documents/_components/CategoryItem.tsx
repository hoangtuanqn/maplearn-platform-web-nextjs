import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatter } from "~/libs/format";
import { CategoryDocument } from "~/schemaValidate/categoryDocument";

const CategoryItem = ({ category }: { category: CategoryDocument }) => {
    return (
        <Link
            key={category.id}
            className="mt-3 flex gap-3 rounded-xl bg-[#EFF0F1] p-4"
            href={`/documents/categories/${category.id}`}
        >
            <div className="shrink-0">
                <Image
                    src="/assets/icons/file.svg"
                    width={72}
                    height={92}
                    alt="Icon SVG PDF"
                    className="h-auto max-sm:w-[80%]"
                />
                <span className="bg-primary mt-2 inline-block rounded-xl px-5 py-1 text-xs text-white">Lớp 12</span>
            </div>
            <div>
                <h2 className="line-clamp-3 text-xs leading-5 font-bold text-slate-600 uppercase lg:text-sm">
                    {category.name}
                </h2>
                <span className="mt-2 inline-block text-gray-400">
                    Hiện đang có {formatter.number(category.total_documents)} tài liệu
                </span>
            </div>
        </Link>
    );
};

export default CategoryItem;
