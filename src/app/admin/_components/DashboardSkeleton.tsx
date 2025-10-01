import React from "react";

const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen bg-white p-6">
            <div className="animate-pulse">
                <div className="mb-8">
                    <div className="mb-2 h-8 w-64 rounded bg-gray-200"></div>
                    <div className="h-4 w-96 rounded bg-gray-200"></div>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 rounded-lg bg-gray-200"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
