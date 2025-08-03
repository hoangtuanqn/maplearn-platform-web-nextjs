import { Star } from "lucide-react";
import React, { useState } from "react";

const RatingFilter = ({
    data: { sortBy, setSortBy, filterRating, setFilterRating },
}: {
    data: {
        sortBy: string;
        setSortBy: (value: string) => void;
        filterRating: number | null;
        setFilterRating: (value: number | null) => void;
    };
}) => {
    return (
        <>
            {/* Filters Section với style mới */}
            <div className="border-b bg-white px-3 py-4 sm:px-6 sm:py-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    {/* Rating Filter */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <span className="text-secondary-typo text-xs font-semibold sm:text-sm">Lọc theo đánh giá:</span>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                            <button
                                onClick={() => setFilterRating(null)}
                                className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                                    filterRating === null
                                        ? "bg-primary text-white shadow-md"
                                        : "text-secondary-typo bg-slate-100 hover:bg-slate-200"
                                }`}
                            >
                                Tất cả
                            </button>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => setFilterRating(rating)}
                                    className={`t1-flex-center cursor-pointer gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                                        filterRating === rating
                                            ? "bg-primary text-white shadow-md"
                                            : "text-secondary-typo bg-slate-100 hover:bg-slate-200"
                                    }`}
                                >
                                    <span>{rating}</span>
                                    <Star className="h-2.5 w-2.5 fill-current sm:h-3 sm:w-3" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="mt-2 flex items-center gap-2 sm:mt-0 sm:gap-3">
                        <span className="text-secondary-typo text-xs font-semibold sm:text-sm">Sắp xếp:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="text-secondary-typo focus:border-primary rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none sm:px-4 sm:py-2 sm:text-sm"
                        >
                            <option value="-id">Mới nhất</option>
                            <option value="id">Cũ nhất</option>
                            <option value="-rating">Rating cao nhất</option>
                            <option value="rating">Rating thấp nhất</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RatingFilter;
