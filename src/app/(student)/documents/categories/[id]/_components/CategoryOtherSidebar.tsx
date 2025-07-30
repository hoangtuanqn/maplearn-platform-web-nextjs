"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { documentApi } from "~/apiRequest/documents";
import CategoryItem from "../../../_components/CategoryItem";
import CategorySkeleton from "../../../_components/CategorySkeleton";

const CategoryOtherSidebar = ({ id }: { id: number }) => {
    const { data: categories, isPending } = useQuery({
        queryKey: ["user/categories"],
        queryFn: async () => {
            const res = await documentApi.getCategories(1, 10);
            return res.data.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    return (
        <div className="sticky top-[70px] h-fit rounded-xl bg-white p-4 lg:flex-1/4">
            <h2 className="text-primary text-base font-bold uppercase">Kho tài liệu khác</h2>
            {isPending && [...Array(10)].map((_, index) => <CategorySkeleton key={index} />)}
            {categories?.map((category) => {
                if (category.id !== id) return <CategoryItem key={category.id} category={category} />;
            })}
        </div>
    );
};

export default CategoryOtherSidebar;
