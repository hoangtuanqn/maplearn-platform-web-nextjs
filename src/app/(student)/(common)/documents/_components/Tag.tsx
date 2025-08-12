import React from "react";

const Tag = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <span className={`bg-primary rounded-xl px-4 py-1.5 text-xs text-white ${className}`}>{children}</span>;
};

export default Tag;
