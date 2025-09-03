import React from "react";
import Footer from "~/app/(student)/_components/Footer";
import LayoutGetInfoMe from "~/components/Layout/LayoutGetInfoMe";
import HeaderVideo from "../(student)/_components/Header/HeaderVideo";

const VideoLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <LayoutGetInfoMe>
                <HeaderVideo />
                <section className="bg-[#ffffff90] pb-6">
                    <div className="mx-auto pb-12">{children}</div>
                </section>
                <Footer />
            </LayoutGetInfoMe>
        </>
    );
};

export default VideoLayout;
