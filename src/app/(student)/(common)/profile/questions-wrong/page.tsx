import React, { Suspense } from "react";
import ListQuestionsWrong from "./_components/ListQuestionsWrong";

const QuestionsWrong = () => {
    return (
        <>
            <h3 className="block-heading mb-6">Các câu hỏi đã làm sai</h3>
            <Suspense>
                <ListQuestionsWrong />
            </Suspense>
        </>
    );
};

export default QuestionsWrong;
