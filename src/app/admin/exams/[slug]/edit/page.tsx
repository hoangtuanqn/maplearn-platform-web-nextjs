import React from "react";

const EditExamPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    return <div></div>;
};

export default EditExamPage;
