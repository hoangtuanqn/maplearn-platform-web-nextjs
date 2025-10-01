import { Clock, MoreVertical, PenTool } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";

const Notes = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Ghi chú cá nhân</h3>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <textarea
                    placeholder="Viết ghi chú của bạn về bài học này..."
                    className="focus:border-primary focus:ring-primary/20 h-40 w-full resize-none rounded-lg border border-gray-300 p-4 transition-colors outline-none focus:ring-2"
                />
                <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        Ghi chú sẽ được lưu tự động
                    </span>
                    <Button size="sm" variant={"primary"}>
                        Lưu ghi chú
                    </Button>
                </div>
            </div>

            {/* Saved Notes */}
            <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Ghi chú đã lưu</h4>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 rounded-lg bg-yellow-100 p-2">
                            <PenTool className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-900">Phút 08:30</span>
                                <span className="text-xs text-gray-500">Hôm qua</span>
                            </div>
                            <p className="text-gray-700">
                                Công thức chu kỳ: T = 2π√(l/g) - chỉ áp dụng khi góc dao động nhỏ (&lt; 5°)
                            </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 rounded-lg bg-green-100 p-2">
                            <PenTool className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-900">Phút 15:20</span>
                                <span className="text-xs text-gray-500">Hôm qua</span>
                            </div>
                            <p className="text-gray-700">
                                Cần nhớ: Chu kỳ không phụ thuộc vào khối lượng và biên độ dao động
                            </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notes;
