import DashboardNav from "@/components/Dashboard/DashboardNav";
import Sidebar from "@/components/Dashboard/Sidebar";

export default function RootLayout({ children }) {
    return (
        <div className="h-full flex">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-[#f9fafd]">
                <DashboardNav />
                {children}
            </div>
        </div>
    );
}
