import { MessageCircle, ThumbsUp } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";

const Discussion = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Thảo luận bài học</h3>
                <Button variant={"primary"}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Đặt câu hỏi
                </Button>
            </div>

            {/* Mock Comments */}
            <div className="space-y-4">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-white">
                            H
                        </div>
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                                <h4 className="font-semibold text-gray-900">Hoàng Minh</h4>
                                <span className="text-xs text-gray-500">2 giờ trước</span>
                            </div>
                            <p className="mb-3 text-gray-700">
                                Thầy ơi, em có thể hỏi về điều kiện để con lắc dao động điều hòa không ạ? Em vẫn chưa
                                hiểu rõ lắm về góc nhỏ hơn 5 độ.
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <button className="hover:text-primary flex items-center gap-1">
                                    <ThumbsUp className="h-4 w-4" />5 thích
                                </button>
                                <button className="hover:text-primary">Trả lời</button>
                            </div>
                        </div>
                    </div>

                    {/* Reply */}
                    <div className="mt-4 ml-14 rounded-lg border border-gray-100 bg-gray-50 p-4">
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold text-white">
                                GV
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 flex items-center gap-3">
                                    <h4 className="text-sm font-semibold text-gray-900">Giảng viên</h4>
                                    <span className="text-xs text-gray-500">1 giờ trước</span>
                                </div>
                                <p className="text-sm text-gray-700">
                                    Chào em! Điều kiện góc nhỏ hơn 5 độ (0.087 rad) đảm bảo sin(θ) ≈ θ, giúp dao động
                                    trở thành điều hòa đơn giản. Em có thể xem lại phần giải thích trong video từ phút
                                    12:30 nhé!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500 font-semibold text-white">
                            L
                        </div>
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                                <h4 className="font-semibold text-gray-900">Linh Nguyen</h4>
                                <span className="text-xs text-gray-500">5 giờ trước</span>
                            </div>
                            <p className="mb-3 text-gray-700">
                                Bài học rất hay và dễ hiểu! Em đã nắm được công thức tính chu kỳ T = 2π√(l/g). Cảm ơn
                                thầy nhiều ạ!
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <button className="hover:text-primary flex items-center gap-1">
                                    <ThumbsUp className="h-4 w-4" />
                                    12 thích
                                </button>
                                <button className="hover:text-primary">Trả lời</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discussion;
