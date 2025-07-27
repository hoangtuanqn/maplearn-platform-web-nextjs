export const SkeletonTeacherCard = () => {
    return (
        <div className="relative block h-45 w-32 shrink-0 animate-pulse overflow-hidden rounded-xl bg-gray-200">
            <div className="aspect-[11/16] h-full w-full bg-gray-300"></div>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-[rgba(0,0,0,0.3)] from-0% via-[rgba(0,0,0,0.1)] via-30% to-transparent to-40%"></div>
            <span className="absolute bottom-3 w-full px-2 text-center text-xs font-medium text-gray-400">&nbsp;</span>
        </div>
    );
};
