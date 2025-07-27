import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "~/styles/global.css";
import QueryProvider from "~/wrapper/QueryProvider";
import { ReduxProvider } from "~/wrapper/ReduxProvider";
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
                <ReduxProvider>
                    <QueryProvider>{children}</QueryProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
