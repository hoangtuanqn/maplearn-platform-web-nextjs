"use client";
import React, { memo, useState, useMemo, useCallback } from "react";
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

    const handleSubmit = useCallback(
        (message: string) => {
            const newHistories: ChatHistoriesType[] = [...chatHistories, { role: "user", parts: [{ text: message }] }];
            setChatHistories(newHistories);
        },
        [chatHistories],
    );

    // 🔒 giữ nguyên instance DetailResult, không bị tạo lại
    const detailResultEl = useMemo(() => {
        return <DetailResult exam={exam} resultRes={resultRes} payload={{ handleSubmit, setTab }} />;
    }, [exam, resultRes, handleSubmit]);

    return (
        <div>
            <HeaderTab activeTab={tab} onChange={setTab} />
            <div hidden={tab !== "detail"}>{detailResultEl}</div>
            <div hidden={tab !== "explain"}>
                <VirtualAssistant payload={{ chatHistories, setChatHistories, handleSubmit }} />
            </div>
        </div>
    );
};

export default memo(DetailResultPage);
