import { Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { configSymbolComment } from "~/app/(student)/_components/Comment/config";
import { Label } from "~/components/ui/label";
import { Answers } from "~/schemaValidate/exam.schema";
import { useEffect } from "react";

const SingleChoice = ({
    idQuestion,
    answers,
    activeAnswer,
    handleChoiceAnswer,
}: {
    idQuestion: number;
    answers: Answers[];
    activeAnswer: string[] | [];
    handleChoiceAnswer: (questionId: number, answer: string) => void;
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault(); // chặn scroll
                e.stopPropagation(); // ngăn sự kiện lan rộng
            }
            if (e.key === "ArrowUp") {
                handleChoiceAnswer(
                    idQuestion,
                    Number(activeAnswer) - 1 == 0 ? `${answers.length}` : `${Number(activeAnswer) - 1}`,
                );
            }
            if (e.key === "ArrowDown") {
                // Đáp án A chuyển sang B (ABCD):
                handleChoiceAnswer(
                    idQuestion,
                    Number(activeAnswer) + 1 <= answers.length ? `${Number(activeAnswer) + 1}` : "1",
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeAnswer, answers.length, idQuestion, handleChoiceAnswer]);

    return (
        <RadioGroup
            value={activeAnswer[0] || ""} // controlled component
            onValueChange={(value) => handleChoiceAnswer(idQuestion, value)}
            className="flex flex-col"
        >
            {answers?.map((answer) => {
                return (
                    <div key={answer.content} className="relative flex items-center gap-2">
                        <RadioGroupItem
                            value={answer.content}
                            id={answer.content}
                            className="peer data-[state=checked]:bg-primary size-7 rounded-full border-0 bg-slate-300"
                        />
                        <Label htmlFor={answer.content} className="cursor-pointer leading-8">
                            <MathJaxContext config={configSymbolComment}>
                                <MathJax dynamic>{answer.content}</MathJax>
                            </MathJaxContext>
                        </Label>
                        <Check className="pointer-events-none absolute top-1.5 left-1 size-5 text-white opacity-0 peer-data-[state=checked]:opacity-100" />
                    </div>
                );
            })}
        </RadioGroup>
    );
};

export default SingleChoice;
