import { useEffect, useState } from "react";
import { Notebook, Tag, Truck, Wrench } from "lucide-react";
import { DashboardCard } from "../components/dashboard-card";
import { supabase } from "@/lib/supabaseClient";
import { useLoading } from "@/lib/loading-context";

export default function DashboardPage() {
  const { setLoading } = useLoading();

  const [activeVehicleCount, setActiveVehicleCount] = useState(0);
  const [soldVehicleCount, setSoldVehicleCount] = useState(0);
  const [todoServiceCount, setTodoServiceCount] = useState(0);
  const [todoAdminCount, setTodoAdminCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);

      try {
        const [active, sold, service, admin] = await Promise.all([
          supabase.from("vehicles").select("*", { count: "exact", head: true }).eq("is_sold", false),
          supabase.from("vehicles").select("*", { count: "exact", head: true }).eq("is_sold", true),
          supabase.from("services").select("*", { count: "exact", head: true }).eq("status", "todo"),
          supabase.from("administration").select("*", { count: "exact", head: true }).eq("status", "todo"),
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

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <DashboardCard
            title="Kendaraan Aktif"
            count={activeVehicleCount}
            urlLink="daftar-kendaraan"
            icon={Truck}
            className="col-span-1"
            background="bg-secondary"
            text="text-secondary-foreground"
          />

          <DashboardCard
            title="Kendaraan Terjual"
            count={soldVehicleCount}
            urlLink="daftar-kendaraan"
            icon={Tag}
            className="col-span-1"
            background="border bg-background"
            text=""
          />

          <DashboardCard
            title="To-do Servis"
            count={todoServiceCount}
            urlLink="servis"
            icon={Wrench}
            className="col-span-1"
            background="bg-tertiary"
            text="text-tertiary-foreground"
          />

          <DashboardCard
            title="To-do Administrasi"
            count={todoAdminCount}
            urlLink="administrasi"
            icon={Notebook}
            className="col-span-1"
            background="bg-quarternary"
            text="text-quarternary-foreground"
          />
        </div>
      </main>
    </div>
  );
}
