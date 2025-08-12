import React from "react";

import { configSymbolComment } from "../config";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import DisplayAvatar from "../../DisplayAvatar";

const ItemComment = ({
    role,
    avatar,
    name,
    content,
    time,
}: {
    role: string;
    avatar: string;
    name: string;
    content: string;
    time: string;
}) => {
    const htmlContent = content.replace(/\n/g, "<br />"); // Thay \n thành <br />

    return (
        <div className="flex gap-2">
            {/* <div className="t1-flex-center hidden h-10 w-10 shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] text-xl leading-12 font-medium text-white xl:flex">
                {getCharacterName(name)}
            </div> */}
            <DisplayAvatar avatar={avatar} fullName={name} ratio="10" />
            <div className="bg-primary/5 w-full rounded-xl p-5 text-gray-800">
                <div className="text-primary">
                    <span className={`mr-2 font-bold ${role !== "student" ? "text-red-500" : "text-primary"}`}>
                        {name}
                    </span>
                    <span className="text-xs">{time}</span>
                </div>
                <div className="mt-1 text-sm">
                    <MathJaxContext config={configSymbolComment}>
                        <MathJax dynamic>
                            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        </MathJax>
                    </MathJaxContext>
                </div>
            </div>
        </div>
    );
};

export default ItemComment;
