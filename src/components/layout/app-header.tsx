import { Menu } from "lucide-react";
import { useSidebar } from "../shadcn/sidebar";

export function AppHeader() {
    const { toggleSidebar } = useSidebar()

    return (
        <header className="border-b w-full bg-background/70 backdrop-blur-md shadow-sm p-4 flex justify-end items-center sticky top-0 z-50 lg:hidden">
            <button onClick={toggleSidebar} className="text-foreground cursor-pointer" aria-label="Open menu">
                <Menu className="w-6 h-6" />
            </button>
        </header>
    )
}