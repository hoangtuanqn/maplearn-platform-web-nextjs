import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
const ChatBubble = ({ role, text, name }: { role: "user" | "model"; name?: string; text: string }) => {
    const isUser = role === "user";
    name = isUser ? name || "Bạn" : "ChatBot AI";
    const bubbleClass = isUser
        ? "ml-auto bg-gradient-to-r from-blue-500 to-blue-400 text-white"
        : "mr-auto bg-[#F0F2F5] text-black";

    return (
        <div className={`${isUser ? `ml-auto` : `mr-auto`} max-w-[90%]`}>
            <div className={`w-fit rounded-lg px-4 py-2 break-words ${bubbleClass}`}>
                {isUser ? (
                    <span className="break-words">{text}</span>
                ) : (
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {text}
                    </ReactMarkdown>
                )}
            </div>
            <div className={`flex ${isUser ? `justify-end pr-0.5` : `justify-start pl-0.5`}`}>
                <span className={`text-[10px] text-gray-600`}>{name}</span>
            </div>
        </div>
    );
};

export default ChatBubble;
