

import ExamList from "./_components/ExamList";
import FilterExam from "./_components/FilterExam";

const ExamPage = () => {
    return (
        <section className="mt-10 flex min-h-screen gap-4 px-4 pb-10">
            <FilterExam />
            <ExamList />
        </section>
    );
};

export default ExamPage;
