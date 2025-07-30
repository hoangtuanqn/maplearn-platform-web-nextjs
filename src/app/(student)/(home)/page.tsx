import SidebarLeft from "../_components/SidebarLeft";
import ExamCountdown from "../_components/SidebarRight/ExamCountdown";
import Banner from "./_components/Banner";
import HomeTab from "./_components/HomeTab";
import Courses from "./_components/Courses";
import SidebarRight from "../_components/SidebarRight";
import Teachers from "./_components/Teachers";
import DashboardStats from "./_components/DashboardStats";

const StudentHomePage = () => {
    return (
        <>
            <section className="flex gap-2">
                <SidebarLeft />
                <div className="mx-auto w-[100%] sm:m-0 sm:mr-auto md:w-[80%] lg:mx-auto lg:w-[85%] xl:w-[70%] 2xl:w-[52%]">
                    {/* Home Tab */}
                    <HomeTab />
                    <div className="max-md:bg-white max-md:p-4">
                        {/* Banner */}
                        <Banner />
                        {/* <CourseActive className="xl:hidden" /> */}
                        <ExamCountdown className="max-2xl:mt-4 2xl:hidden" />
                    </div>
                    {/* Dashboard Stats */}

                    <DashboardStats />
                    {/* Giáo viên */}
                    <Teachers />

                    {/* Danh sách các khóa học */}
                    <Courses />
                </div>

                <SidebarRight />
            </section>
        </>
    );
};

export default StudentHomePage;
