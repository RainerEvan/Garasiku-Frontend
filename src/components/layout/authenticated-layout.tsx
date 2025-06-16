import { SidebarInset, SidebarProvider } from "../shadcn/sidebar";
import { AppNavbar } from "./app-navbar";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./app-header";

export function AuthenticatedLayout() {
    return (
        <SidebarProvider>
            <AppNavbar />
            <SidebarInset>
                <AppHeader></AppHeader>
                <main>
                    {<Outlet />}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}