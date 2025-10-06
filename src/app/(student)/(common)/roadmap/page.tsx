"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Target, GraduationCap, BookOpen, Star, Brain, Trophy, Lightbulb, ArrowRight, Rocket } from "lucide-react";

// Schema validation cho form
const roadmapSchema = z.object({
    current_grade: z.string().min(1, "Vui lòng chọn lớp đang học"),
    learning_goals: z.array(z.string()).min(1, "Vui lòng chọn ít nhất một mục tiêu"),
    preferred_subjects: z.array(z.string()).min(1, "Vui lòng chọn ít nhất một môn học"),
    study_time_per_day: z.string().min(1, "Vui lòng chọn thời gian học"),
    learning_style: z.string().min(1, "Vui lòng chọn phong cách học"),
    difficulty_level: z.string().min(1, "Vui lòng chọn mức độ khó"),
    timeline: z.string().min(1, "Vui lòng chọn thời gian hoàn thành"),
    notes: z.string().optional(),
});

type RoadmapFormType = z.infer<typeof roadmapSchema>;

const RoadMapPage = () => {
    const [isGenerating, setIsGenerating] = useState(false);

    // Form configuration
    const form = useForm<RoadmapFormType>({
        resolver: zodResolver(roadmapSchema),
        defaultValues: {
            current_grade: "",
            learning_goals: [],
            preferred_subjects: [],
            study_time_per_day: "",
            learning_style: "",
            difficulty_level: "",
            timeline: "",
            notes: "",
        },
    });

    // Data options
    const gradeOptions = [
        { value: "6", label: "Lớp 6" },
        { value: "7", label: "Lớp 7" },
        { value: "8", label: "Lớp 8" },
        { value: "9", label: "Lớp 9" },
        { value: "10", label: "Lớp 10" },
        { value: "11", label: "Lớp 11" },
        { value: "12", label: "Lớp 12" },
    ];

    const learningGoals = [
        { id: "graduation_exam", label: "Ôn thi tốt nghiệp THPT", icon: GraduationCap, color: "text-blue-600" },
        { id: "high_score", label: "Đạt điểm cao trong kỳ thi", icon: Trophy, color: "text-yellow-600" },
        { id: "university_entrance", label: "Chuẩn bị thi đại học", icon: BookOpen, color: "text-green-600" },
        { id: "knowledge_improvement", label: "Nâng cao kiến thức", icon: Brain, color: "text-purple-600" },
        { id: "skill_development", label: "Phát triển kỹ năng tư duy", icon: Lightbulb, color: "text-orange-600" },
        { id: "competition_prep", label: "Chuẩn bị thi học sinh giỏi", icon: Star, color: "text-red-600" },
    ];

    const subjects = [
        {
            id: "math",
            label: "Toán học",
            color: "bg-[linear-gradient(278.32deg,_#BAE2FF_1.57%,_#E7F5FF_107.77%)] text-[#0581D7] border-[#A8DBFF]",
        },
        {
            id: "literature",
            label: "Ngữ văn",
            color: "bg-[linear-gradient(278.91deg,_#FFDCB3_0.46%,_#FFF4F4_119.68%)] text-[#EE5F06] border-[#FFD6A6]",
        },
        {
            id: "english",
            label: "Tiếng Anh",
            color: "bg-[linear-gradient(278.19deg,_#CBCCFF_-18.91%,_#F5E6FF_100%)] text-[#8555E7] border-[#DFC7FD]",
        },
        { id: "physics", label: "Vật lý", color: "bg-red-50 text-red-700 border-red-200" },
        { id: "chemistry", label: "Hóa học", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
        { id: "biology", label: "Sinh học", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
        { id: "history", label: "Lịch sử", color: "bg-orange-50 text-orange-700 border-orange-200" },
        { id: "geography", label: "Địa lý", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
    ];

    const studyTimeOptions = [
        { value: "1-2", label: "1-2 giờ/ngày", icon: "⏰" },
        { value: "2-3", label: "2-3 giờ/ngày", icon: "⏱️" },
        { value: "3-4", label: "3-4 giờ/ngày", icon: "⏲️" },
        { value: "4+", label: "Hơn 4 giờ/ngày", icon: "📚" },
    ];

    const difficultyLevels = [
        {
            value: "easy",
            label: "Cơ bản",
            description: "Phù hợp cho người mới bắt đầu",
            color: "bg-green-50 border-green-200",
        },
        {
            value: "medium",
            label: "Trung bình",
            description: "Cần có kiến thức nền tảng",
            color: "bg-yellow-50 border-yellow-200",
        },
        {
            value: "hard",
            label: "Nâng cao",
            description: "Dành cho học sinh xuất sắc",
            color: "bg-red-50 border-red-200",
        },
    ];

    const timelineOptions = [
        { value: "1_month", label: "1 tháng", description: "Lộ trình ngắn hạn" },
        { value: "3_months", label: "3 tháng", description: "Lộ trình trung hạn" },
        { value: "6_months", label: "6 tháng", description: "Lộ trình dài hạn" },
        { value: "1_year", label: "1 năm", description: "Lộ trình toàn diện" },
    ];

    const onSubmit = async (_: RoadmapFormType) => {
        setIsGenerating(true);
    };

    return (
        <>
            <div className="flex flex-col gap-4 font-medium">
                {/* Form Section */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Basic Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Thông tin học tập</h3>
                                </div>
                                <p className="text-gray-600">Điền thông tin cơ bản về trình độ học vấn hiện tại</p>
                            </div>

                            <FormField
                                control={form.control}
                                name="current_grade"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-gray-900">
                                            Lớp đang học
                                        </FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="h-12 w-full border-gray-200">
                                                    <SelectValue placeholder="Chọn lớp đang học của bạn" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {gradeOptions.map((grade) => (
                                                        <SelectItem key={grade.value} value={grade.value}>
                                                            {grade.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Learning Goals */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <Target className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Mục tiêu học tập</h3>
                                </div>
                                <p className="text-gray-600">Chọn các mục tiêu bạn muốn đạt được trong quá trình học</p>
                            </div>

                            <FormField
                                control={form.control}
                                name="learning_goals"
                                render={() => (
                                    <FormItem>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {learningGoals.map((goal) => (
                                                <FormField
                                                    key={goal.id}
                                                    control={form.control}
                                                    name="learning_goals"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <div
                                                                    className={`flex cursor-pointer items-center space-x-3 rounded-xl border p-4 transition-colors hover:bg-gray-50 ${
                                                                        field.value?.includes(goal.id)
                                                                            ? "border-blue-500 bg-blue-50"
                                                                            : "border-gray-200"
                                                                    }`}
                                                                >
                                                                    <Checkbox
                                                                        checked={field.value?.includes(goal.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            const updatedValue = checked
                                                                                ? [...(field.value || []), goal.id]
                                                                                : field.value?.filter(
                                                                                      (value) => value !== goal.id,
                                                                                  ) || [];
                                                                            field.onChange(updatedValue);
                                                                        }}
                                                                    />
                                                                    <goal.icon className={`h-5 w-5 ${goal.color}`} />
                                                                    <Label className="flex-1 cursor-pointer font-medium text-gray-900">
                                                                        {goal.label}
                                                                    </Label>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Subjects */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Môn học tập trung</h3>
                                </div>
                                <p className="text-gray-600">
                                    Chọn các môn học bạn muốn đầu tư thời gian học nhiều nhất
                                </p>
                            </div>

                            <FormField
                                control={form.control}
                                name="preferred_subjects"
                                render={() => (
                                    <FormItem>
                                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                            {subjects.map((subject) => (
                                                <FormField
                                                    key={subject.id}
                                                    control={form.control}
                                                    name="preferred_subjects"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <div className="flex items-center space-x-2">
                                                                    <Checkbox
                                                                        id={subject.id}
                                                                        checked={field.value?.includes(subject.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            const updatedValue = checked
                                                                                ? [...(field.value || []), subject.id]
                                                                                : field.value?.filter(
                                                                                      (value) => value !== subject.id,
                                                                                  ) || [];
                                                                            field.onChange(updatedValue);
                                                                        }}
                                                                    />
                                                                    <Label
                                                                        htmlFor={subject.id}
                                                                        className="cursor-pointer"
                                                                    >
                                                                        <Badge
                                                                            variant="outline"
                                                                            className={`${subject.color} border px-3 py-1 font-medium`}
                                                                        >
                                                                            {subject.label}
                                                                        </Badge>
                                                                    </Label>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Study Options */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Tùy chọn học tập</h3>
                                </div>
                                <p className="text-gray-600">
                                    Cài đặt các thông số để tạo lộ trình phù hợp với lịch trình của bạn
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="study_time_per_day"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium text-gray-900">
                                                Thời gian học mỗi ngày
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="h-12 w-full border-gray-200">
                                                        <SelectValue placeholder="Chọn thời gian học" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {studyTimeOptions.map((time) => (
                                                            <SelectItem key={time.value} value={time.value}>
                                                                <div className="flex items-center gap-2">
                                                                    <span>{time.icon}</span>
                                                                    {time.label}
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="difficulty_level"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium text-gray-900">
                                                Mức độ khó
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="h-12 w-full border-gray-200">
                                                        <SelectValue placeholder="Chọn mức độ phù hợp" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {difficultyLevels.map((level) => (
                                                            <SelectItem key={level.value} value={level.value}>
                                                                {`${level.label} - ${level.description}`}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="timeline"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium text-gray-900">
                                                Thời gian hoàn thành
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="h-12 w-full border-gray-200">
                                                        <SelectValue placeholder="Chọn thời gian mục tiêu" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timelineOptions.map((timeline) => (
                                                            <SelectItem key={timeline.value} value={timeline.value}>
                                                                {`${timeline.label} - ${timeline.description}`}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-gray-900">
                                            Ghi chú thêm (tùy chọn)
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Chia sẻ thêm về mục tiêu cụ thể, điểm mạnh/yếu, hoặc yêu cầu đặc biệt..."
                                                className="min-h-[100px] border-gray-200"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Submit Button */}

                        <Button
                            type="submit"
                            disabled={isGenerating}
                            className="h-12 w-full bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700"
                        >
                            {isGenerating ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    AI đang phân tích và tạo lộ trình...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Rocket className="h-5 w-5" />
                                    Tạo Lộ Trình Học Tập Với AI
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default RoadMapPage;
