"use client";
import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { configSymbolComment } from "~/app/(student)/_components/Comment/config";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        MathJax?: any;
    }
}

interface DraggableItemProps {
    id: string;
    children: React.ReactNode;
}

const DraggableItem = ({ id, children }: DraggableItemProps) => {
    const onDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("text/plain", id);
    };

    return (
        <div
            draggable
            onDragStart={onDragStart}
            className="bg-primary flex cursor-grab items-center justify-center rounded px-4 py-1 text-white select-none"
        >
            {children}
        </div>
    );
};

interface DropZoneProps {
    id: string;
    onDropItem: (id: string, item: string) => void;
    onRemoveItem: (id: string, item: string) => void;
    droppedItem: string | null;
}

const DropZone = ({ id, onDropItem, onRemoveItem, droppedItem }: DropZoneProps) => {
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("text/plain");
        onDropItem(id, itemId);
    };

    const onDragStart = (e: React.DragEvent) => {
        if (droppedItem) {
            e.dataTransfer.setData("text/plain", droppedItem);
            onRemoveItem(id, droppedItem);
        }
    };

    return (
        <span
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragStart={onDragStart}
            draggable={!!droppedItem}
            className={`text-primary mx-2 line-clamp-1 inline-block min-h-8 w-fit min-w-[120px] rounded-lg border border-dashed border-gray-400 px-3 py-1 text-center align-middle ${
                droppedItem ? "bg-primary cursor-grab text-white" : "bg-white"
            }`}
        >
            {droppedItem || "?"}
        </span>
    );
};

interface DragDropProps {
    question: string;
    items: string[];
}

const DragDrop = ({ question, items: initialItems }: DragDropProps) => {
    const [items, setItems] = useState<string[]>(initialItems);
    const [droppedItems, setDroppedItems] = useState<Record<string, string | null>>({});

    // Hàm phân tích câu hỏi và thay thế placeholder
    const parseQuestion = (text: string) => {
        const placeholderRegex = /<-Drag->/g;
        const parts: (string | { id: string })[] = [];
        let lastIndex = 0;
        let match;
        let dropCount = 1; // Bắt đầu đánh số từ 1

        while ((match = placeholderRegex.exec(text)) !== null) {
            const placeholder = match[0]; // <-Drag->
            const id = `drop${dropCount++}`; // drop1, drop2, ...
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }
            parts.push({ id });
            lastIndex = match.index + placeholder.length;
        }
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts;
    };

    const handleDropItem = (dropId: string, itemId: string) => {
        setDroppedItems((prev) => {
            const prevItem = prev[dropId]; // Lấy item hiện tại trong DropZone
            const newDroppedItems = { ...prev, [dropId]: itemId };
            return newDroppedItems;
        });
        setItems((prev) => {
            const newItems = prev.filter((item) => item !== itemId); // Xóa item mới khỏi danh sách
            if (droppedItems[dropId]) {
                // Trả item cũ về danh sách nếu có
                return [...newItems, droppedItems[dropId]!].sort();
            }
            return newItems;
        });
    };

    const handleRemoveItem = (dropId: string, itemId: string) => {
        setDroppedItems((prev) => ({ ...prev, [dropId]: null }));
        setItems((prev) => [...prev, itemId].sort()); // Thêm item trở lại và sắp xếp
    };

    // Render MathJax khi nội dung thay đổi
    useEffect(() => {
        if (typeof window !== "undefined" && window.MathJax) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.MathJax.typesetPromise?.().catch((err: any) => console.error(err));
        }
    }, [droppedItems]);

    const questionParts = parseQuestion(question);

    return (
        <MathJaxContext config={configSymbolComment}>
            <div>
                <div className="border-primary/30 mb-4 flex gap-3 rounded border-2 p-2">
                    {items.map((item) => (
                        <DraggableItem key={item} id={item}>
                            {item}
                        </DraggableItem>
                    ))}
                </div>

                <div className="mb-4">
                    <MathJax dynamic>
                        {questionParts.map((part, index) =>
                            typeof part === "string" ? (
                                <span key={index} className="inline">
                                    {part}
                                </span>
                            ) : (
                                <DropZone
                                    key={part.id}
                                    id={part.id}
                                    droppedItem={droppedItems[part.id] || null}
                                    onDropItem={handleDropItem}
                                    onRemoveItem={handleRemoveItem}
                                />
                            ),
                        )}
                    </MathJax>
                </div>
            </div>
        </MathJaxContext>
    );
};

export default DragDrop;
