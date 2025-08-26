import Sidebar from "./_components/Sidebar";

const LayoutAdminRoot = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="bg-[#F5F5F5] p-2">
            <Sidebar />
            <main className="ml-65 min-h-screen">{children}</main>
            <script src="/assets/js/sidebar.js" async></script>
        </section>
    );
};

export default LayoutAdminRoot;
