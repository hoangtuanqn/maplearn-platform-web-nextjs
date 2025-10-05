"use client";
import { Clock, PenTool, Trash2, Edit3, Check, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { DangerConfirm } from "~/components/DangerConfirm";
import { Button } from "~/components/ui/button";

interface Note {
    id: number;
    content: string;
    timestamp: string;
    timeInVideo: string;
    createdAt: Date;
    courseSlug: string;
    lectureSlug: string;
}

// Utility functions for localStorage
const getStorageKey = (courseSlug: string, lectureSlug: string) => `notes_${courseSlug}_${lectureSlug}`;

const loadNotesFromStorage = (courseSlug: string, lectureSlug: string): Note[] => {
    if (typeof window === "undefined") return [];

    const key = getStorageKey(courseSlug, lectureSlug);
    const stored = localStorage.getItem(key);
    if (stored) {
        const notes = JSON.parse(stored);
        // Convert createdAt string back to Date object
        const parsedNotes = notes.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
        }));
        return parsedNotes;
    }

    return [];
};

// Get all notes for a course (across all lectures)
const getAllCourseNotes = (courseSlug: string): Note[] => {
    if (typeof window === "undefined") return [];

    const allNotes: Note[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`notes_${courseSlug}_`)) {
            const stored = localStorage.getItem(key);
            if (stored) {
                const notes = JSON.parse(stored);
                allNotes.push(
                    ...notes.map((note: any) => ({
                        ...note,
                        createdAt: new Date(note.createdAt),
                    })),
                );
            }
        }
    }
    return allNotes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Clear all notes for current lecture
const clearLectureNotes = (courseSlug: string, lectureSlug: string) => {
    if (typeof window === "undefined") return;

    const key = getStorageKey(courseSlug, lectureSlug);
    localStorage.removeItem(key);
};

const saveNotesToStorage = (notes: Note[], courseSlug: string, lectureSlug: string) => {
    if (typeof window === "undefined") return;

    const key = getStorageKey(courseSlug, lectureSlug);
    const dataToSave = JSON.stringify(notes);
    localStorage.setItem(key, dataToSave);
};

// Format timestamp helper
const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Vừa xong";
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Hôm qua";
    if (diffInDays < 7) return `${diffInDays} ngày trước`;

    // For older dates, show actual date
    return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const Notes = ({ courseSlug, lectureSlug }: { courseSlug: string; lectureSlug: string }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");
    const [totalCourseNotes, setTotalCourseNotes] = useState(0);

    // Load notes from localStorage on component mount
    useEffect(() => {
        const loadedNotes = loadNotesFromStorage(courseSlug, lectureSlug);
        setNotes(loadedNotes);

        // Count total notes for this course
        const allCourseNotes = getAllCourseNotes(courseSlug);
        setTotalCourseNotes(allCourseNotes.length);
    }, [courseSlug, lectureSlug]);

    // Save notes to localStorage whenever notes change (but not on initial load)
    useEffect(() => {
        // Skip saving on first render/mount to avoid overwriting loaded data
        const isInitialLoad = notes.length === 0 && loadNotesFromStorage(courseSlug, lectureSlug).length > 0;

        if (!isInitialLoad) {
            saveNotesToStorage(notes, courseSlug, lectureSlug);

            // Update total course notes count
            const allCourseNotes = getAllCourseNotes(courseSlug);
            setTotalCourseNotes(allCourseNotes.length);
        }
    }, [notes, courseSlug, lectureSlug]);

    // Get current video time (this would ideally come from video player)
    const getCurrentVideoTime = (): string => {
        // This is a placeholder - in real implementation, you'd get this from video player
        // For now, return a random time for demo
        const minutes = Math.floor(Math.random() * 60);
        const seconds = Math.floor(Math.random() * 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    // Thêm ghi chú mới
    const handleAddNote = () => {
        if (newNote.trim()) {
            const now = new Date();
            const note: Note = {
                id: Date.now(), // Using timestamp as ID for uniqueness
                content: newNote.trim(),
                timestamp: formatTimestamp(now),
                timeInVideo: getCurrentVideoTime(),
                createdAt: now,
                courseSlug,
                lectureSlug,
            };

            // Add new note to the beginning of the array (newest first)
            const updatedNotes = [note, ...notes];
            setNotes(updatedNotes);
            setNewNote("");
        }
    };

    // Xóa ghi chú
    const handleDeleteNote = (id: number) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
    };

    // Bắt đầu chỉnh sửa
    const handleStartEdit = (note: Note) => {
        setEditingId(note.id);
        setEditContent(note.content);
    };

    // Lưu chỉnh sửa
    const handleSaveEdit = () => {
        if (editContent.trim()) {
            const updatedNotes = notes.map((note) =>
                note.id === editingId ? { ...note, content: editContent.trim() } : note,
            );
            setNotes(updatedNotes);
        }
        setEditingId(null);
        setEditContent("");
    };

    // Xóa tất cả ghi chú của bài học hiện tại
    const handleClearAllNotes = () => {
        setNotes([]);
        clearLectureNotes(courseSlug, lectureSlug);
    };

    // Hủy chỉnh sửa
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditContent("");
    };

    // Handle Enter key in textarea
    const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            action();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Ghi chú cá nhân</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {notes.length} ghi chú bài học này • {totalCourseNotes} ghi chú toàn khóa học
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {notes.length > 0 && (
                        <DangerConfirm
                            message="Bạn có chắc chắn muốn xóa tất cả ghi chú của bài học này? Hành động này không thể hoàn tác."
                            action={handleClearAllNotes}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Xóa tất cả
                            </Button>
                        </DangerConfirm>
                    )}
                </div>
            </div>

            {/* Add New Note */}
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-blue-100 p-3">
                        <PenTool className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="mb-3 font-semibold text-gray-900">Thêm ghi chú mới</h4>
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, handleAddNote)}
                            placeholder="Viết ghi chú của bạn về bài học này... (Ctrl+Enter để lưu)"
                            className="focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border border-gray-300 p-4 transition-colors outline-none focus:ring-2"
                            rows={3}
                        />
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>Ghi chú sẽ được lưu trong trình duyệt • {notes.length} ghi chú</span>
                            </div>
                            <Button
                                size="sm"
                                onClick={handleAddNote}
                                disabled={!newNote.trim()}
                                className="bg-primary hover:bg-primary/90 text-white"
                            >
                                <PenTool className="mr-2 h-4 w-4" />
                                Lưu ghi chú
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Saved Notes */}
            {notes.length > 0 ? (
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Ghi chú đã lưu ({notes.length})</h4>

                    {notes.map((note, index) => (
                        <div
                            key={note.id}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex-shrink-0 rounded-lg p-2 ${
                                        index % 3 === 0
                                            ? "bg-yellow-100"
                                            : index % 3 === 1
                                              ? "bg-green-100"
                                              : "bg-purple-100"
                                    }`}
                                >
                                    <PenTool
                                        className={`h-5 w-5 ${
                                            index % 3 === 0
                                                ? "text-yellow-600"
                                                : index % 3 === 1
                                                  ? "text-green-600"
                                                  : "text-purple-600"
                                        }`}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-900">
                                                Phút {note.timeInVideo}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatTimestamp(note.createdAt)}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {note.createdAt.toLocaleString("vi-VN")}
                                        </span>
                                    </div>

                                    {editingId === note.id ? (
                                        <div className="space-y-3">
                                            <textarea
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                                        e.preventDefault();
                                                        handleSaveEdit();
                                                    }
                                                    if (e.key === "Escape") {
                                                        e.preventDefault();
                                                        handleCancelEdit();
                                                    }
                                                }}
                                                className="focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2"
                                                rows={3}
                                                autoFocus
                                            />
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>Ctrl+Enter để lưu • Esc để hủy</span>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={handleSaveEdit}
                                                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                                                    >
                                                        <Check className="mr-1 h-3 w-3" />
                                                        Lưu
                                                    </Button>
                                                    <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                                        <X className="mr-1 h-3 w-3" />
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-700">{note.content}</p>
                                    )}
                                </div>

                                {editingId !== note.id && (
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleStartEdit(note)}
                                            className="cursor-pointer rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                            title="Chỉnh sửa"
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteNote(note.id)}
                                            className="cursor-pointer rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                                            title="Xóa"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
                    <PenTool className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                    <p className="mb-2 text-gray-600">Chưa có ghi chú nào cho bài học này</p>
                    <p className="text-sm text-gray-500">Hãy thêm ghi chú đầu tiên để ghi nhớ những điểm quan trọng!</p>
                </div>
            )}
        </div>
    );
};

export default Notes;
