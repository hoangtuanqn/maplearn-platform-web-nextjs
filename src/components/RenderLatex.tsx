"use client";

import { InlineMath } from "react-katex";

type Props = {
    content: string;
};

const RenderLatex = ({ content }: Props) => {
    // Hàm nhỏ để parse chuỗi: tách text thường và công thức
    const renderContent = (text: string) => {
        const regex = /(\\\(.*?\\\))/g; // bắt các đoạn \( ... \)
        const parts = text.split(regex);

        return parts.map((part, i) => {
            if (part.startsWith("\\(") && part.endsWith("\\)")) {
                const math = part.slice(2, -2); // bỏ \(...\)
                return <InlineMath key={i}>{math}</InlineMath>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return <span>{renderContent(content)}</span>;
};

export default RenderLatex;
