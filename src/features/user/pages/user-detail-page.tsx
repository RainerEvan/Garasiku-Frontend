import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // atau next/router jika pakai Next.js
import { supabase } from "@/lib/supabaseClient";
import { useLoading } from "@/lib/loading-context";

import { User } from "@/models/user";
import { Param } from "@/models/param";

import StatusBar from "@/components/shared/status-bar";
import SectionItem from "@/components/shared/section-item";
import { Separator } from "@/components/shadcn/separator";
import { EditUserDialog } from "../components/edit-user-dialog";
import { ChangePasswordDialog } from "../components/change-password-dialog";

export default function UserDetailPage() {
  const { setLoading } = useLoading();
  const { id: userId } = useParams(); // ambil dari URL

  const [user, setUser] = useState<User | null>(null);

  const roleParam: Param[] = [
    { id: "1", group: "007", name: "owner", description: "Owner" },
    { id: "2", group: "007", name: "divisi", description: "Divisi" },
    { id: "3", group: "007", name: "wshead", description: "WS-Head" },
    { id: "4", group: "007", name: "driver", description: "Driver" },
    { id: "5", group: "007", name: "admin", description: "Admin" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .rpc("get_all_users") // atau from("user_lookup")
          .select("*");

        if (error) {
          console.error("Failed to fetch users:", error.message);
          return;
        }

        const found = (data || []).find((u: any) => u.id === userId);

        if (found) {
          const mapped: User = {
            id: found.id,
            username: found.username ?? found.email,
            fullname: found.fullname ?? "-",
            email: found.email,
            phoneNo: found.phone_no ?? "-",
            role: found.role ?? "-",
            isActive: found.status === "active",
          };

          setUser(mapped);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, setLoading]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const initial = user.fullname.charAt(0).toUpperCase();
  const isActive = user.isActive ? "active" : "inactive";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">User Detail</h1>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 rounded-lg border bg-background p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-lg">{initial}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{user.fullname}</p>
                  <p className="text-xs text-medium">{user.username}</p>
                </div>
              </div>
              <div className="flex items-center justify-center px-2">
                <StatusBar status={isActive} />
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-start gap-2">
                {user.role.split("|").map((role, index) => (
                  <div key={index} className="flex gap-2 items-center justify-center border rounded-lg px-3 py-2 ">
                    <span className="text-xs font-medium">
                      {roleParam.find((param) => param.name === role)?.description || role}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SectionItem label="Email" value={user.email} />
                <SectionItem label="No Telepon" value={user.phoneNo} />
              </div>

              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2">
                <EditUserDialog user={user} />
                <ChangePasswordDialog user={user} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
