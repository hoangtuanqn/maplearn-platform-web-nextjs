import LayoutGetInfoMe from "~/components/Layout/LayoutGetInfoMe";
import Sidebar from "./_components/Sidebar";
import { Toaster } from "sonner";

const LayoutAdminRoot = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <LayoutGetInfoMe>
                <section className="bg-[#F5F5F5] p-2">
                    <Sidebar />
                    <main className="ml-65 min-h-screen">{children}</main>
                    <script src="/assets/js/sidebar.js" async></script>
                </section>
            </LayoutGetInfoMe>
            <Toaster position="top-center" expand={true} richColors duration={5000} />
        </>
    );
};

export default LayoutAdminRoot;
