"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import documentApi from "~/apiRequest/documents";
import CategorySkeleton from "./CategorySkeleton";
import { TrendingUp } from "lucide-react";
import CategoryItem from "./CategoryItem";

const CategorySidebar = () => {
    const { data: categories, isPending } = useQuery({
        queryKey: ["user", "categories"],
        queryFn: async () => {
            const res = await documentApi.getCategories(1, 10);
            return res.data.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return (
        <div className="sticky top-[56px] h-fit lg:flex-1/4">
            <div className="text-primary mt-6 flex items-center justify-between">
                <h2 className="text-base font-bold uppercase">Kho tài liệu</h2>
                <Link href={"/documents/categories"} className="flex gap-2">
                    Xem tất cả <TrendingUp />
                </Link>
            </div>
            {isPending && [...Array(10)].map((_, index) => <CategorySkeleton key={index} />)}
            {/* Chuyển sang dạng boolean: Có tài liệu thì mới hiển thị danh mục ra */}
            {categories?.map(
                (category) => !!category.total_documents && <CategoryItem key={category.id} category={category} />,
            )}
        </div>
    );
};

export default CategorySidebar;
