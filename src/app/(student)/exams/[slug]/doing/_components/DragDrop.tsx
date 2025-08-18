"use client";
import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { configSymbolComment } from "~/app/(student)/_components/Comment/config";

declare global {
    interface Window {
        MathJax?: any;
    }
}

interface ValueType {
    id: number;
    content: string;
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
    onDropItem: (dropId: string, itemId: string) => void;
    onRemoveItem: (dropId: string, itemId: string) => void;
    droppedItem: ValueType | null;
}

const DropZone = ({ id, onDropItem, onRemoveItem, droppedItem }: DropZoneProps) => {
    const onDragOver = (e: React.DragEvent) => e.preventDefault();

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("text/plain");
        onDropItem(id, itemId);
    };

    const onDragStart = (e: React.DragEvent) => {
        if (droppedItem) {
            e.dataTransfer.setData("text/plain", `${droppedItem.id}`);
            onRemoveItem(id, `${droppedItem.id}`);
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
            {droppedItem ? droppedItem.content : "?"}
        </span>
    );
};

interface DragDropProps {
    question: string;
    items: ValueType[];
    // Câu hỏi đã chọn
    idQuestion: number;
    activeAnswers: string[];
    handleChoiceAnswer: (questionId: number, answer: string, idx: number) => void;
}

const DragDrop = ({ idQuestion, question, items: initialItems, activeAnswers, handleChoiceAnswer }: DragDropProps) => {
    const [items, setItems] = useState<ValueType[]>(
        initialItems.filter((item) => !activeAnswers.includes(item.content)),
    );

    const [droppedItems, setDroppedItems] = useState<Record<string, ValueType | null>>(() => {
        const initial: Record<string, ValueType | null> = {};
        activeAnswers.forEach((val, index) => {
            if (val) {
                const dropId = `drop${index + 1}`; // drop1, drop2, ...
                initial[dropId] = { id: index + 1, content: val };
            }
        });
        return initial;
    });

    // Phân tích câu hỏi, thay placeholder bằng DropZone
    const parseQuestion = (text: string) => {
        const placeholderRegex = /<-Drag->/g;
        const parts: (string | { id: string })[] = [];
        let lastIndex = 0;
        let match;
        let dropCount = 1;

        while ((match = placeholderRegex.exec(text)) !== null) {
            const id = `drop${dropCount++}`;
            if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
            parts.push({ id });
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < text.length) parts.push(text.slice(lastIndex));

        return parts;
    };

    const handleDropItem = (dropId: string, itemId: string) => {
        // console.log("droppedItems ?? ", droppedItems);

        const droppedItemObj = initialItems.find((i) => `${i.id}` === itemId);
        if (!droppedItemObj) return;

        setDroppedItems((prevDropped) => {
            const prevItem = prevDropped[dropId]; // item cũ trong DropZone

            // trả item cũ về danh sách
            if (prevItem) setItems((prevItems) => [...prevItems.filter((i) => i.id !== prevItem.id), prevItem]);

            return { ...prevDropped, [dropId]: droppedItemObj };
        });

        setItems((prevItems) => prevItems.filter((i) => `${i.id}` !== itemId));
    };

    const handleRemoveItem = (dropId: string, itemId: string) => {
        setDroppedItems((prev) => ({ ...prev, [dropId]: null }));
        const removedItem = initialItems.find((i) => `${i.id}` === itemId);
        if (removedItem) setItems((prev) => [...prev, removedItem]);
    };

    // Rerender MathJax khi droppedItems thay đổi
    useEffect(() => {
        if (typeof window !== "undefined" && window.MathJax) {
            window.MathJax.typesetPromise?.().catch((err: any) => console.error(err));
        }
    }, [droppedItems]);

    useEffect(() => {
        // console.log("droppedItems >> ", JSON.stringify(Object.entries(droppedItems)));
        Object.entries(droppedItems).forEach(([a, b]) => {
            console.log("b>>", b?.content);

            if (b?.content && b.content.length > 0) {
                handleChoiceAnswer(idQuestion, b.content, Number(a.split("drop")[1]));
            }
        });

        // handleChoiceAnswer(idQuestion, )
    }, [droppedItems, handleChoiceAnswer, idQuestion]);

    const questionParts = parseQuestion(question);

    return (
        <MathJaxContext config={configSymbolComment}>
            <div>
                <div className="border-primary/30 mb-4 flex flex-wrap gap-3 rounded border-2 p-2">
                    {items.map((item) => (
                        <DraggableItem key={item.id} id={`${item.id}`}>
                            {item.content}
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
