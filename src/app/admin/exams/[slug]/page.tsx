import React from "react";
import EditFormExam from "./_components/EditFormExam";

const ExamPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    return <EditFormExam slug={slug} />;
};

export default ExamPage;
