"use client";
import { Send } from "lucide-react";
import React from "react";
import ChatBubble from "~/app/(student)/_components/ChatBotAI/components/ChatBubble";
import { ChatHistoriesType } from "~/app/api/chat/ai/types/ChatBotType.type";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useInput } from "~/hooks/useInput";
type PayloadType = {
    payload: {
        chatHistories: ChatHistoriesType[];
        setChatHistories: React.Dispatch<React.SetStateAction<ChatHistoriesType[]>>;
        handleSubmit: (message: string) => void;
    };
};
const VirtualAssistant = ({ payload: { handleSubmit, chatHistories, setChatHistories } }: PayloadType) => {
    const { value, onChange, reset } = useInput("");
    return (
        <div className="flex h-full flex-col justify-between rounded-xl bg-white p-4 py-8 shadow-sm dark:bg-gray-800">
            <div className="mb-auto h-[560px] overflow-y-scroll p-2">
                {chatHistories.map((history, index) => {
                    // nếu ids.includes(index + 1) = true thì truyền dataParse?.course_id ngược thì lại truyền về []
                    return (
                        <ChatBubble
                            key={index}
                            role={history.role}
                            text={history.parts[0].text}
                            name={"Phạm Hoàng Tuấn"}
                        />
                    );
                })}
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
                <div className="w-full">
                    <Input className="" value={value} onChange={onChange} />
                </div>
                <Button
                    className="text-white"
                    onClick={() => {
                        reset();
                        handleSubmit(value);
                    }}
                >
                    <Send />
                    Gửi
                </Button>
            </div>
        </div>
    );
};

export default VirtualAssistant;
