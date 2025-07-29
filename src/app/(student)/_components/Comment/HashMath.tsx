import React from "react";

const MathSymbols = ({ setComment }: { setComment: React.Dispatch<React.SetStateAction<string>> }) => {
    const symbols = [
        "²",
        "³",
        "√",
        "∛",
        "·",
        "×",
        "÷",
        "±",
        "≈",
        "≤",
        "≥",
        "≡",
        "⇒",
        "⇔",
        "∈",
        "∉",
        "∧",
        "∨",
        "∞",
        "Δ",
        "π",
        "Ф",
        "ω",
        "↑",
        "↓",
        "∵",
        "∴",
        "↔",
        "→",
        "←",
        "⇵",
        "⇅",
        "⇄",
        "⇆",
        "∫",
        "∑",
        "⊂",
        "⊃",
        "⊆",
        "⊇",
        "⊄",
        "⊅",
        "∀",
        "∠",
        "∡",
        "⊥",
        "∪",
        "∩",
        "∅",
        "¬",
        "⊕",
        "║",
        "∦",
        "∝",
        "log",
        "ln",
    ];

    return (
        <div className="mb-5 h-fit min-h-20 rounded-xl py-2">
            <div className="mt-4 grid grid-cols-4 gap-4 md:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-12 [&>button]:cursor-pointer [&>button]:text-base">
                {symbols.map((symbol, index) => (
                    <button
                        key={index}
                        className="flex cursor-pointer items-center justify-center rounded-lg bg-white py-2.5 duration-200 hover:scale-110"
                        onClick={() => setComment((prev) => prev + String.raw`${symbol}`)}
                    >
                        {symbol}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MathSymbols;
