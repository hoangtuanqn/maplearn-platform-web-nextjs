import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { CheckCircle, BookOpen, Clock, BarChart3 } from "lucide-react";

// Demo data học viên
const studentA = {
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/100?u=a",
    rank: 2,
    lessons: 18,
    hours: 13.2,
    score: 16,
    badges: ["Chăm chỉ", "Hoàn thành bài giảng"],
};
const studentB = {
    name: "Trần Thị B",
    avatar: "https://i.pravatar.cc/100?u=b",
    rank: 5,
    lessons: 15,
    hours: 10.8,
    score: 14,
    badges: ["Nỗ lực", "Tiến bộ vượt bậc"],
};

const compareData = [
    { label: "Bài giảng đã học", A: studentA.lessons, B: studentB.lessons },
    { label: "Thời lượng học (giờ)", A: studentA.hours, B: studentB.hours },
    { label: "Điểm kiểm tra", A: studentA.score, B: studentB.score },
];

const badgeColor = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
];

const CompareStudent = () => {
    return (
        <div className="min-h-screen bg-white p-6">
            <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">So sánh học viên</h1>
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Học viên A */}
                <div className="flex flex-col items-center rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <img src={studentA.avatar} alt={studentA.name} className="mb-3 h-20 w-20 rounded-full border" />
                    <div className="mb-1 text-lg font-bold text-gray-900">{studentA.name}</div>
                    <div className="mb-2 text-sm text-gray-500">
                        Xếp hạng: <span className="font-bold text-blue-600">#{studentA.rank}</span>
                    </div>
                    <div className="mb-2 flex gap-4">
                        <div className="flex items-center gap-1 text-blue-700">
                            <BookOpen className="h-4 w-4" /> {studentA.lessons}
                        </div>
                        <div className="flex items-center gap-1 text-purple-700">
                            <Clock className="h-4 w-4" /> {studentA.hours}h
                        </div>
                        <div className="flex items-center gap-1 text-green-700">
                            <BarChart3 className="h-4 w-4" /> {studentA.score}
                        </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {studentA.badges.map((b, idx) => (
                            <span
                                key={b}
                                className={`rounded-full px-2 py-1 text-xs font-medium ${badgeColor[idx % badgeColor.length]}`}
                            >
                                <CheckCircle className="mr-1 inline h-3 w-3" />
                                {b}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Học viên B */}
                <div className="flex flex-col items-center rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <img src={studentB.avatar} alt={studentB.name} className="mb-3 h-20 w-20 rounded-full border" />
                    <div className="mb-1 text-lg font-bold text-gray-900">{studentB.name}</div>
                    <div className="mb-2 text-sm text-gray-500">
                        Xếp hạng: <span className="font-bold text-blue-600">#{studentB.rank}</span>
                    </div>
                    <div className="mb-2 flex gap-4">
                        <div className="flex items-center gap-1 text-blue-700">
                            <BookOpen className="h-4 w-4" /> {studentB.lessons}
                        </div>
                        <div className="flex items-center gap-1 text-purple-700">
                            <Clock className="h-4 w-4" /> {studentB.hours}h
                        </div>
                        <div className="flex items-center gap-1 text-green-700">
                            <BarChart3 className="h-4 w-4" /> {studentB.score}
                        </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {studentB.badges.map((b, idx) => (
                            <span
                                key={b}
                                className={`rounded-full px-2 py-1 text-xs font-medium ${badgeColor[idx % badgeColor.length]}`}
                            >
                                <CheckCircle className="mr-1 inline h-3 w-3" />
                                {b}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            {/* Biểu đồ Bar so sánh */}
            <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-center text-base font-semibold text-gray-900">
                    Biểu đồ so sánh chỉ số học tập
                </h2>
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={compareData} layout="vertical" margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="label" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="A" fill="#3b82f6" name={studentA.name} />
                        <Bar dataKey="B" fill="#6366f1" name={studentB.name} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {/* Bảng chi tiết */}
            <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-center text-base font-semibold text-gray-900">Bảng so sánh chi tiết</h2>
                <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Chỉ số
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-blue-700 uppercase">
                                {studentA.name}
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-indigo-700 uppercase">
                                {studentB.name}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-4 py-4 text-sm text-gray-500">Bài giảng đã học</td>
                            <td className="px-4 py-4 text-center font-bold text-blue-700">{studentA.lessons}</td>
                            <td className="px-4 py-4 text-center font-bold text-indigo-700">{studentB.lessons}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-4 text-sm text-gray-500">Thời lượng học (giờ)</td>
                            <td className="px-4 py-4 text-center font-bold text-blue-700">{studentA.hours}</td>
                            <td className="px-4 py-4 text-center font-bold text-indigo-700">{studentB.hours}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-4 text-sm text-gray-500">Điểm kiểm tra</td>
                            <td className="px-4 py-4 text-center font-bold text-blue-700">{studentA.score}</td>
                            <td className="px-4 py-4 text-center font-bold text-indigo-700">{studentB.score}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-4 text-sm text-gray-500">Xếp hạng</td>
                            <td className="px-4 py-4 text-center font-bold text-blue-700">#{studentA.rank}</td>
                            <td className="px-4 py-4 text-center font-bold text-indigo-700">#{studentB.rank}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompareStudent;
