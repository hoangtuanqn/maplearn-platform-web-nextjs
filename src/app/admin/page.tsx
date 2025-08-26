import Sidebar from "./_components/Sidebar";

const AdminPage = () => {
    return (
        <section className="bg-[#F5F5F5] p-2">
            <Sidebar />
            <main>
                <h1>Trang admin</h1>
            </main>
            <script src="/assets/js/sidebar.js" async></script>
        </section>
    );
};

export default AdminPage;
