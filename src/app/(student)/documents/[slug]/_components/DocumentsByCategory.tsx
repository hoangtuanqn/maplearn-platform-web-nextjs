import { TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";

const DocumentsByCategory = () => {
    return (
        <div className="sticky top-[70px] h-fit flex-1/4 rounded-xl bg-white p-4 shadow-sm">
            <div className="text-primary flex items-center justify-between">
                <h2 className="text-base font-semibold uppercase">Tài liệu cùng thể loại</h2>
                <Link href={"/documents/categories"} className="flex gap-2">
                    Xem tất cả <TrendingUp />
                </Link>
            </div>
            {/* {isLoading && Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)}

            {!isLoading &&
                data?.map(({ id, title, slug, thumbnail, created_at }: PostType) => {
                    if (slug != slugCurrent)
                        return (
                            <NewLink
                                key={id}
                                title={title}
                                url={`/posts/${slug}`}
                                image={thumbnail}
                                createdAt={created_at}
                            />
                        );
                })} */}
        </div>
    );
};

export default DocumentsByCategory;
