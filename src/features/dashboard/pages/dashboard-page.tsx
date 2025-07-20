import { useEffect, useMemo, useState } from "react";
import { Notebook, Tag, Truck, Wrench } from "lucide-react";
import { DashboardCard } from "../components/dashboard-card";
import { supabase } from "@/lib/supabaseClient";
import { getCachedReminderDateRange } from "@/lib/reminder-date";
import { useAuth } from "@/lib/auth-context";
import { LoadingOverlay } from "@/components/shared/loading-overlay";

export default function DashboardPage() {
  const { user, isOwner, isDivisi, isWSHead } = useAuth();
  const [loading, setLoading] = useState(false);

  const [activeVehicleCount, setActiveVehicleCount] = useState(0);
  const [soldVehicleCount, setSoldVehicleCount] = useState(0);
  const [todoServiceCount, setTodoServiceCount] = useState(0);
  const [todoAdminCount, setTodoAdminCount] = useState(0);

  const userMeta = useMemo(() => {
    if (!user) return null;
    const meta = user.user_metadata || {};
    return {
      fullname: meta.fullname || "Nama Pengguna"
    };
  }, [user]);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);

      try {
        const { futureDate } = await getCachedReminderDateRange();

        const [active, sold, service, admin] = await Promise.all([
          supabase.from("vehicles").select("*", { count: "exact", head: true }).eq("is_sold", false),
          supabase.from("vehicles").select("*", { count: "exact", head: true }).eq("is_sold", true),
          supabase.from("service").select("*", { count: "exact", head: true }).eq("status", "pending").lte("schedule_date", futureDate.toISOString()),
          supabase.from("administration").select("*", { count: "exact", head: true }).eq("status", "pending").lte("due_date", futureDate.toISOString()),
        ]);

        if (active.error) console.error("Error fetching active vehicles:", active.error);
        if (sold.error) console.error("Error fetching sold vehicles:", sold.error);
        if (service.error) console.error("Error fetching todo services:", service.error);
        if (admin.error) console.error("Error fetching todo admin:", admin.error);

        if (!active.error) setActiveVehicleCount(active.count || 0);
        if (!sold.error) setSoldVehicleCount(sold.count || 0);
        if (!service.error) setTodoServiceCount(service.count || 0);
        if (!admin.error) setTodoAdminCount(admin.count || 0);
      } catch (err) {
        console.error("Unexpected error fetching dashboard counts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isOwner || isDivisi || isWSHead) {
      fetchCounts();
    }
  }, []);

  return (
    <>
      <LoadingOverlay loading={loading} />

      <div className="min-h-screen flex flex-col">
        <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Selamat datang, {userMeta?.fullname}!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(isOwner || isDivisi) && (
              <DashboardCard
                title="Kendaraan Aktif"
                count={activeVehicleCount}
                urlLink="garasi/daftar-kendaraan"
                icon={Truck}
                className="col-span-1"
                background="bg-secondary"
                text="text-secondary-foreground"
              />
            )}

            {(isOwner || isDivisi) && (
              <DashboardCard
                title="Kendaraan Terjual"
                count={soldVehicleCount}
                urlLink="garasi/daftar-kendaraan"
                icon={Tag}
                className="col-span-1"
                background="border bg-background"
                text=""
              />
            )}

            {(isOwner || isDivisi || isWSHead) && (
              <DashboardCard
                title="To-do Servis"
                count={todoServiceCount}
                urlLink="servis"
                icon={Wrench}
                className="col-span-1"
                background="bg-tertiary"
                text="text-tertiary-foreground"
              />
            )}

            {(isOwner || isDivisi) && (
              <DashboardCard
                title="To-do Administrasi"
                count={todoAdminCount}
                urlLink="administrasi"
                icon={Notebook}
                className="col-span-1"
                background="bg-quarternary"
                text="text-quarternary-foreground"
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
