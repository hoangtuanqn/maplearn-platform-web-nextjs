import React, { cache } from "react";
import "react-circular-progressbar/dist/styles.css";
import IntroCourse from "./IntroCourse";
import ListLessonCourse from "./_components/ListLessonCourse";
import { Button } from "~/components/ui/button";
import ContentLesson from "./_components/ContentLesson";
import { Heart, ShoppingCart } from "lucide-react";
import courseApi from "~/apiRequest/course.schema";
import { CourseDetail } from "~/schemaValidate/course.schema";
import { redirect } from "next/navigation";
import { Metadata } from "next";
const getCourse = cache(async (slug: string) => {
    const {
        data: { data: post },
    } = await courseApi.getDetailCourse(slug);
    return post;
});
// ✅ Tạo metadata động từ dữ liệu bài viết
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getCourse(slug);
    return {
        title: post.name,
        description: post.description || "Chi tiết khóa học",
        openGraph: {
            title: post.name,
            images: [post.thumbnail],
        },
    };
}

const CourseDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let res;
    try {
        res = await getCourse(slug);
    } catch (error) {
        console.log("Error fetching course details:", error);
        redirect("/404");
    }
    const course: CourseDetail | null = res || null;
    if (!course) {
        redirect("/404");
    }

    return (
        <div className="min-h-screen">
            <div className="flex max-lg:flex-col lg:gap-3.5">
                <div className="w-full flex-9/12 max-lg:order-2">
                    <ContentLesson course={course as CourseDetail} />
                    <ListLessonCourse />
                </div>
                <div className="h-fit w-full flex-3/12 rounded-xl bg-white p-8 shadow-sm max-lg:order-1 lg:sticky lg:top-[70px]">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-center">
                            <IntroCourse thumbnail={course.thumbnail} video={course.intro_video} />
                        </div>
                        <div className="gap-2 text-center">
                            <h2 className="t1-gradient-text text-base font-bold">Giáo viên: Tổ toán học MapLearn</h2>
                        </div>

                        <div className="t1-flex-center gap-2">
                            <Button className="flex-7/8 text-white">
                                <ShoppingCart /> Thêm vào giỏ hàng
                            </Button>
                            <Button
                                variant={"outline"}
                                className="view_tooltip flex-1/8"
                                data-tooltip-content={"Thêm vào danh sách yêu thích"}
                            >
                                <Heart />
                            </Button>
                        </div>
                        <Button variant={"outline"}>Mua ngay</Button>
                        <p className="text-center text-xs">Đảm bảo hoàn tiền trong 30 ngày</p>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <span className="mb-2 block text-sm font-semibold text-gray-700">Khóa này bao gồm</span>
                            <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                                <li>61,5 giờ video theo yêu cầu</li>
                                <li>25 bài giảng</li>
                                <li>34 tài nguyên có thể tải xuống</li>
                                <li>Truy cập trên thiết bị di động</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
