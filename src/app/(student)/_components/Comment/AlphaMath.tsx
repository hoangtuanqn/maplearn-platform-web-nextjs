import React from "react";

const AlphaMath = ({ setComment }: { setComment: React.Dispatch<React.SetStateAction<string>> }) => {
    const symbols = [
        "i:",
        "ɪ",
        "ʊ",
        "u:",
        "ɪə",
        "eɪ",
        "e",
        "ə",
        "ɜː",
        "ɔ:",
        "ʊə",
        "ɔɪ",
        "əʊ",
        "æ",
        "ʌ",
        "ɑ:",
        "ɒ",
        "eə",
        "aɪ",
        "aʊ",
        "p",
        "b",
        "t",
        "d",
        "tʃ",
        "dʒ",
        "k",
        "g",
        "f",
        "v",
        "θ",
        "ð",
        "s",
        "z",
        "ʃ",
        "ʒ",
        "m",
        "n",
        "ŋ",
        "h",
        "l",
        "r",
        "w",
        "j",
    ];

    return (
        <div className="mb-5 h-fit min-h-20 rounded-xl py-2">
            <div className="mt-4 grid grid-cols-4 gap-4 md:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-12 [&>button]:cursor-pointer">
                {symbols.map((symbol, index) => (
                    <button
                        key={index}
                        className="text-cp flex cursor-pointer items-center justify-center rounded-lg bg-white py-2.5 duration-200 hover:scale-110"
                        onClick={() => setComment((prev) => prev + symbol)}
                    >
                        {symbol}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AlphaMath;
