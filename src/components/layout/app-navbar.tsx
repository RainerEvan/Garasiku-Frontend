import { ChevronDown, X } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarHeader, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarMenuSub,
  SidebarMenuSubItem, SidebarSeparator, SidebarTrigger, useSidebar
} from "../shadcn/sidebar";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger
} from "../shadcn/collapsible";
import { Button } from "../shadcn/button";
import {
  Link, useLocation, useNavigate
} from "react-router-dom";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "../shadcn/alert-dialog";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const items = [
  { title: "Dashboard", url: "dashboard" },
  {
    title: "Garasi", url: "garasi", child: [
      { title: "Daftar Kendaraan", url: "daftar-kendaraan" },
      { title: "Cari Kendaraan", url: "cari-kendaraan" },
    ]
  },
  { title: "Servis", url: "servis" },
  {
    title: "Administrasi", url: "administrasi", child: [
      { title: "STNK 1 Tahun", url: "stnk-1" },
      { title: "STNK 5 Tahun", url: "stnk-5" },
      { title: "Asuransi", url: "asuransi" },
    ]
  },
  { title: "User", url: "user" },
  { title: "Parameter", url: "parameter" },
];

export function AppNavbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setOpenMobile, toggleSidebar } = useSidebar();

  const [userMeta, setUserMeta] = useState<{ name?: string, username?: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        const meta = data.user.user_metadata;
        setUserMeta({
          name: meta?.name || meta?.full_name || "User",
          username: meta?.username || data.user.email?.split("@")[0],
        });
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleMenuClick = () => {
    setOpenMobile(false);
  };

  const avatarLetter = (userMeta?.name || userMeta?.username || "U")[0]?.toUpperCase();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex items-start justify-between group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:py-3">
            <SidebarMenuItem className="group-data-[state=collapsed]:hidden">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-lg">
                    {avatarLetter}
                  </span>
                </div>
                <div>
                  <h2 className="font-medium text-sm">
                    {userMeta?.name || "Nama Pengguna"}
                  </h2>
                  <p className="text-xs text-medium">
                    {userMeta?.username || "username"}
                  </p>
                </div>
              </div>
            </SidebarMenuItem>
            <Button onClick={toggleSidebar} size="icon" variant="ghost" asChild className="lg:hidden">
              <X className="w-5 h-5" />
            </Button>
            <SidebarTrigger className="hidden lg:flex" />
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
                              <SidebarMenuButton
                                asChild
                                isActive={pathname === `/${item.url}/${subItem.url}`}
                                onClick={handleMenuClick}
                              >
                                <Link to={`/${item.url}/${subItem.url}`}>
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
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === `/${item.url}`}
                      onClick={handleMenuClick}
                    >
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="default">Keluar</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Keluar Aplikasi?</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin keluar dari aplikasi?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Tidak</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Ya</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
}
