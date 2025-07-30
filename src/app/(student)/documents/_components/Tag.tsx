import React from "react";

const Tag = ({ children }: { children: React.ReactNode }) => {
    return <span className="bg-primary rounded-xl px-4 py-1.5 text-xs text-white">{children}</span>;
};

export default Tag;
