import Script from "next/script";
import React from "react";
import Footer from "~/app/(student)/_components/Footer";
import Header from "~/app/(student)/_components/Header";
import LayoutGetInfoMe from "~/components/layout/LayoutGetInfoMe";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <LayoutGetInfoMe>
                <Script
                    id="mathjax"
                    strategy="beforeInteractive"
                    src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
                />
                <Header />
                <section className="bg-[#ffffff90] pb-6">
                    <div className="max-w-8xl mx-auto mt-5 pb-12 md:mt-[56px] md:py-5 lg:px-4">{children}</div>
                </section>
                <Footer />
            </LayoutGetInfoMe>
        </>
    );
};

export default RootLayout;
