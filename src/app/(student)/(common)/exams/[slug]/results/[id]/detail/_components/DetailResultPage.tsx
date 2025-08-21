"use client";
import React, { memo, useState } from "react";
import HeaderTab from "./HeaderTab";
import DetailResult from "./DetailResult";
import { QuestionsExamResponse, ResultDetailExamResponse } from "~/schemaValidate/exam.schema";
import VirtualAssistant from "./VirtualAssistant";
import { ChatHistoriesType } from "~/app/api/chat/ai/types/ChatBotType.type";

const DetailResultPage = ({
    exam,
    resultRes,
}: {
    exam: QuestionsExamResponse["data"];
    resultRes: ResultDetailExamResponse["data"];
}) => {
    const [tab, setTab] = useState<"detail" | "explain">("detail");
    const [chatHistories, setChatHistories] = useState<ChatHistoriesType[]>([]);
    const handleSubmit = (message: string) => {
        const newHistories: ChatHistoriesType[] = [...chatHistories, { role: "user", parts: [{ text: message }] }];
        setChatHistories(newHistories);
    };
    return (
        <div>
            <HeaderTab activeTab={tab} onChange={setTab} />
            {tab == "detail" ? (
                <DetailResult exam={exam} resultRes={resultRes} payload={{ handleSubmit }} />
            ) : (
                <VirtualAssistant payload={{ chatHistories, setChatHistories, handleSubmit }} />
            )}
        </div>
    );
};

export default memo(DetailResultPage);
