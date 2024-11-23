import DashboardNav from "@/components/Dashboard/DashboardNav";
import Sidebar from "@/components/Dashboard/Sidebar";
import { isAuthenticated } from "../auth/isLoggedIn";
import { redirect } from "next/navigation";

export default function RootLayout({ children }) {
    // Call isAuthenticated to check if the user is authenticated
    if (!isAuthenticated()) {
        redirect("/"); // Redirect to the home page
    }

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
