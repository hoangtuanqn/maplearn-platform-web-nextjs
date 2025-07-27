export const SkeletonLessonCard = () => {
    return (
        <div className="block h-full w-full animate-pulse rounded-xl">
            <div className="aspect-square w-full rounded-xl bg-gray-300"></div>

            <div className="mt-4 w-full space-y-1">
                <div className="h-4 w-5/6 rounded bg-gray-300"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
            </div>

            <div className="mt-2 flex items-center gap-1 text-xs font-medium">
                <div className="h-4 w-4 rounded-full bg-gray-300"></div>
                <div className="h-4 w-3/5 rounded bg-gray-300"></div>
            </div>
        </div>
    );
};
