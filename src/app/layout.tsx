import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "~/styles/global.css";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/pagination";
import QueryProvider from "~/wrapper/QueryProvider";
import { ReduxProvider } from "~/wrapper/ReduxProvider";
import TopProgressBar from "~/components/TopProgressBar";
const inter = Inter({
    subsets: ["latin"],
    display: "swap", // giúp tránh bị trắng chữ khi font chưa load
});

export const metadata: Metadata = {
    title: {
        template: "%s | MapLearn - Định vị tri thức - Dẫn lối tư du",
        default: "MapLearn - Định vị tri thức - Dẫn lối tư duy", // a default is required when creating a template
    },

    description: "MapLearn - Nền tảng học tập trực tuyến dành cho học sinh trung học phổ thông!",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TopProgressBar />
                <ReduxProvider>
                    <QueryProvider>{children}</QueryProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
