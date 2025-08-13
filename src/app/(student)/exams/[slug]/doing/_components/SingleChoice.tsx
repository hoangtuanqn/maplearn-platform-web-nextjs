import { BadgeCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { configSymbolComment } from "~/app/(student)/_components/Comment/config";
import { Label } from "~/components/ui/label";

const SingleChoice = () => {
    return (
        <RadioGroup defaultValue="comfortable" className="flex flex-col">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="relative flex items-center gap-2">
                    <RadioGroupItem
                        value={`option${index + 1}`}
                        id={`r${index + 1}`}
                        className="peer data-[state=checked]:bg-primary data-[state=checked]:text-primary size-7 rounded-full border-0 bg-slate-300"
                    />
                    <Label htmlFor={`r${index + 1}`} className="cursor-pointer leading-8">
                        <MathJaxContext config={configSymbolComment}>
                            <MathJax dynamic>
                                Cho $A$ và $B$ là hai biến cố xung khắc. Khẳng định nào sau đây là sai:
                            </MathJax>
                        </MathJaxContext>
                    </Label>
                    {/* <BadgeCheck /> */}
                    <BadgeCheck className="pointer-events-none absolute inset-0 flex size-7 items-center justify-center text-sm text-white opacity-0 peer-data-[state=checked]:font-bold peer-data-[state=checked]:opacity-100" />
                </div>
            ))}
        </RadioGroup>
    );
};

export default SingleChoice;
