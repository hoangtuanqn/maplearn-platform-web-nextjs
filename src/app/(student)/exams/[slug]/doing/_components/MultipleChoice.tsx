import React from "react";

import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
const MultipleChoice = () => {
    return (
        <>
            {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                    <Checkbox
                        id={`option-${index}`}
                        className="peer data-[state=checked]:bg-primary data-[state=checked]:text-primary round size-5.5 border-0 bg-slate-300"
                    />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">
                        Option {index + 1}
                    </Label>
                </div>
            ))}
        </>
    );
};

export default MultipleChoice;
