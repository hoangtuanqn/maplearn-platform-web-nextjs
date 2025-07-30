export const configSymbolComment = {
    loader: { load: ["[tex]/require", "[tex]/ams"] },
    tex: {
        packages: ["base", "require", "ams"],
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
        ],
        displayMath: [["$$", "$$"]],
    },
};
