import { DialogDescription } from "@radix-ui/react-dialog";
import DragDrop from "~/app/(student)/exams/[slug]/doing/_components/DragDrop";
import MultipleChoice from "~/app/(student)/exams/[slug]/doing/_components/MultipleChoice";
import NumericInput from "~/app/(student)/exams/[slug]/doing/_components/NumericInput";
import SingleChoice from "~/app/(student)/exams/[slug]/doing/_components/SingleChoice";
import TrueFalseAnswer from "~/app/(student)/exams/[slug]/doing/_components/TrueFalseAnswer";
import RenderLatex from "~/components/RenderLatex";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { QuestionDifficulty, QuestionDifficultyLabel } from "~/contants/question/questionDifficulty";
import { QuestionType, QuestionTypeLabel } from "~/contants/question/questionTypes";
import { formatter } from "~/libs/format";
import { QuestionWrongProfileResponse } from "~/schemaValidate/exam.schema";

const ShowDetailQuestion = ({ question }: { question: QuestionWrongProfileResponse["data"]["data"][number] }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Xem chi tiết</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[90vw] rounded-lg bg-white p-2 sm:min-w-[90%] sm:p-6 2xl:min-w-[30%]">
                <DialogHeader>
                    <DialogTitle className="mb-2 text-base font-bold sm:text-xl">
                        Đề thi: {question.question.exam_paper.title}
                    </DialogTitle>
                    <DialogDescription className="mb-4 text-xs sm:text-sm">
                        Sau khi ôn tập và đúng <span className="text-primary">3 lần liên tiếp</span>, câu hỏi sẽ được ẩn
                        khỏi danh sách này!
                    </DialogDescription>

                    <div className="max-h-[70vh] overflow-y-auto">
                        <div className="mt-2 grid grid-cols-1 gap-3.5 sm:grid-cols-4">
                            <div className="text-xs sm:text-sm">
                                <span className="text-primary font-bold">Môn học:</span>{" "}
                                {question.question.exam_paper.subject.name}
                            </div>
                            <div className="text-xs sm:text-sm">
                                <span className="text-primary font-bold">Độ khó:</span>{" "}
                                {QuestionDifficultyLabel[question.question.exam_paper.difficulty as QuestionDifficulty]}
                            </div>
                            <div className="text-xs sm:text-sm">
                                <span className="text-primary font-bold">Loại câu hỏi:</span>{" "}
                                {QuestionTypeLabel[question.question.type as QuestionType]}
                            </div>
                            <div className="text-xs sm:text-sm">
                                <span className="text-primary font-bold">Số lần sai:</span> {question.wrong_count}
                            </div>
                            <div className="text-xs sm:text-sm">
                                <span className="text-primary font-bold">Chuỗi đúng liên tiếp:</span>{" "}
                                {question.correct_streak}
                            </div>
                            <div className="text-xs sm:text-sm">
                                <span className="text-primary font-bold">Sai lần đầu:</span>{" "}
                                {formatter.date(question.first_wrong_at, true)}
                            </div>
                            <div className="text-xs sm:text-sm">
                                <span className="text-primary font-bold">Sai gần nhất:</span>{" "}
                                {formatter.date(question.last_wrong_at, true)}
                            </div>
                            <div className="text-xs sm:text-sm">
                                <span className="text-primary font-bold">Lần cuối làm đúng:</span>{" "}
                                {question.last_correct_at ? formatter.date(question.last_correct_at, true) : "...."}
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col items-start gap-2 text-[15px] sm:flex-row sm:items-center sm:text-[16.125px]">
                            <span className="text-primary font-bold">Câu hỏi:</span>
                            {question.question.type !== QuestionType.DRAG_DROP && (
                                <RenderLatex content={question.question.content} />
                            )}
                        </div>
                        <div className="mt-2">
                            {question.question.type === QuestionType.DRAG_DROP ? (
                                <DragDrop
                                    question={question.question.content}
                                    items={question.question.answers || []}
                                    activeAnswers={
                                        Array.isArray(question.question.your_choice)
                                            ? question.question.your_choice
                                            : [question.question.your_choice]
                                    }
                                    idQuestion={question.id}
                                    handleChoiceAnswer={() => {}}
                                    disabled={true}
                                />
                            ) : (
                                <>
                                    {question.question.type === QuestionType.SINGLE_CHOICE && (
                                        <SingleChoice
                                            activeAnswer={
                                                Array.isArray(question.question.your_choice)
                                                    ? question.question.your_choice
                                                    : [question.question.your_choice]
                                            }
                                            handleChoiceAnswer={() => {}}
                                            idQuestion={question.id}
                                            answers={question.question.answers}
                                        />
                                    )}
                                    {question.question.type === QuestionType.MULTIPLE_CHOICE && (
                                        <MultipleChoice
                                            activeAnswers={
                                                Array.isArray(question.question.your_choice)
                                                    ? question.question.your_choice
                                                    : [question.question.your_choice]
                                            }
                                            handleChoiceAnswer={() => {}}
                                            idQuestion={question.id}
                                            answers={question.question.answers}
                                        />
                                    )}
                                    {question.question.type === QuestionType.NUMERIC_INPUT && (
                                        <NumericInput
                                            handleChoiceAnswer={() => {}}
                                            idQuestion={question.id}
                                            activeAnswer={
                                                Array.isArray(question.question.your_choice)
                                                    ? question.question.your_choice
                                                    : [question.question.your_choice]
                                            }
                                        />
                                    )}
                                    {question.question.type === QuestionType.TRUE_FALSE && (
                                        <TrueFalseAnswer
                                            idQuestion={question.id}
                                            answers={question.question.answers || []}
                                            activeAnswer={
                                                Array.isArray(question.question.your_choice)
                                                    ? question.question.your_choice
                                                    : [question.question.your_choice]
                                            }
                                            handleChoiceAnswer={() => {}}
                                        />
                                    )}{" "}
                                </>
                            )}
                        </div>
                        <div className="mt-2 text-xs sm:text-sm">
                            <span className="text-stalte-600 font-bold">Giải thích từ giáo viên: </span>
                            <span>
                                {" "}
                                <RenderLatex content={question.question.explanation ?? ""} />
                            </span>
                        </div>
                        <div className="mt-2 flex flex-col gap-2 text-xs sm:flex-row sm:text-sm">
                            Đáp án đúng là:{" "}
                            <span className="flex flex-col gap-1 font-bold text-green-600 sm:flex-row">
                                {question.question.answers_correct?.map((item) => (
                                    <RenderLatex key={item.id} content={item.content} />
                                ))}
                            </span>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ShowDetailQuestion;
