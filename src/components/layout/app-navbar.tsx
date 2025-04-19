import { ChevronDown } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarSeparator, SidebarTrigger } from "../shadcn/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../shadcn/collapsible";
import { Button } from "../shadcn/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const items = [
    {
        title: "Dashboard",
        url: "dashboard",
    },
    {
        title: "Garasi",
        url: "garasi",
        child: [
            {
                title: "Daftar Kendaraan",
                url: "daftar-kendaraan",
            },
            {
                title: "Cari Kendaraan",
                url: "cari-kendaraan",
            },
        ]
    },
    {
        title: "Servis",
        url: "servis",
    },
    {
        title: "Administrasi",
        url: "administrasi",
    },
    {
        title: "User",
        url: "user",
    },
    {
        title: "Maintenance",
        url: "maintenance",
    },
]

export function AppNavbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    function handleLogout() {
        // Perform logout logic here
        console.log("Logout clicked");

        navigate("/login");
    }

    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
            <SidebarMenu>
                <div className="flex items-start justify-between group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:py-3">
                    <SidebarMenuItem className="group-data-[state=collapsed]:hidden">
                        <div className="flex items-center space-x-2">
                            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-primary-foreground text-lg">R</span>
                            </div>
                            <div>
                                <h2 className="font-medium text-sm">Rainer Evan</h2>
                                <p className="text-xs text-medium">rainerevan</p>
                            </div>
                        </div>
                    </SidebarMenuItem>
                    <SidebarTrigger/>
                </div>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarSeparator className="my-2 group-data-[state=collapsed]:hidden" />

        <SidebarContent className="group-data-[state=collapsed]:hidden">
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {items.map((item) => (
                        item.child ? (
                            <SidebarMenuItem key={item.title}>
                                <Collapsible>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="flex items-center justify-between group">
                                            <span>{item.title}</span>
                                            <ChevronDown className="w-4 h-4 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.child.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuButton asChild isActive={pathname === `/${subItem.url}`}>
                                                        <Link to={`/${subItem.url}`}>
                                                            {subItem.title}
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </Collapsible>
                            </SidebarMenuItem>
                        ) : (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={pathname === `/${item.url}`}>
                                    <Link to={`/${item.url}`}>
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator className="my-2 group-data-[state=collapsed]:hidden" />

        <SidebarFooter className="group-data-[state=collapsed]:hidden">
            <Button onClick={handleLogout}>Keluar</Button>
        </SidebarFooter>
      </Sidebar>
    )
  }