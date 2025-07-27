import { ChangeEvent, useState } from "react";

export function useInput(initialValue = "") {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const reset = () => {
        setValue(initialValue);
    };

    return {
        value,
        onChange,
        reset,
        setValue,
        bind: {
            value,
            onChange,
        },
    };
}
