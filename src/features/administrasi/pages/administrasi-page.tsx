import { Input } from "@/components/shadcn/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { Administration } from "@/models/administration";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, IdCard, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdministrationCard } from "../components/administrasi-card";
import { useLoading } from "@/lib/loading-context";
import { Button } from "@/components/shadcn/button";
import { Navigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { PARAM_GROUP_WAKTU_REMINDER, PARAM_WAKTU_REMINDER } from "@/lib/constants";

const validTypes = ["stnk-1", "stnk-5", "asuransi"];

export default function AdministrasiPage() {
  const { type } = useParams();

  if (!type || !validTypes.includes(type)) {
    return <Navigate to="/administrasi/stnk-1" replace />;
  }

  const { setLoading } = useLoading();

  const [activeTab, setActiveTab] = useState("todo");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [listAdministrations, setListAdministrations] = useState<Administration[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      try {
        const intervalParamRes = await supabase
          .from("parameter")
          .select("*")
          .eq("group", PARAM_GROUP_WAKTU_REMINDER)
          .eq("name", PARAM_WAKTU_REMINDER)
          .single()

        const intervalDays = Number(intervalParamRes.data?.description || "30"); // Use `description` as value, default 30
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + intervalDays);

        let administrationQuery = supabase
          .from("administration")
          .select(
            `
            *,
            vehicles (
              id,
              name,
              category,
              license_plate
            )
          `
          )
          .eq("type", `administrasi-${type}`);

        console.log(type);

        if (activeTab === "todo") {
          administrationQuery = administrationQuery
            .eq("status", "pending")
            .lte("schedule_date", futureDate.toISOString());
        } else if (activeTab === "pending") {
          administrationQuery = administrationQuery.eq("status", "pending");
        } else {
          administrationQuery = administrationQuery.in("status", ["completed", "cancelled"])
        }

        const { data: administrationsData, error: administrationsError } = await administrationQuery;

        // === ADMINISTRATIONS ===
        if (administrationsError) {
          console.error("Failed to fetch administrations:", administrationsError);
        } else if (administrationsData) {
          const mappedAdministrations = administrationsData.map((a: any) => ({
            id: a.id,
            ticketNum: a.ticketNum,
            vehicleId: a.vehicle_id,
            vehicle: {
              id: a.vehicles?.id,
              name: a.vehicles?.name,
              category: a.vehicles?.category,
              licensePlate: a.vehicles?.license_plate,
            },
            type: a.type,
            dueDate: a.dueDate,
            endDate: a.endDate,
            status: a.status,
          }));
          setListAdministrations(mappedAdministrations);
        }
      } catch (err) {
        console.error("Unexpected error fetching administration data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [activeTab, type]);

  useEffect(() => {
    setSearchQuery("");
  }, [activeTab, type]);

  useEffect(() => {
    setActiveTab("todo");
  }, [type]);

  const filteredAndSortedAdministration = useMemo(() => {
    const filtered = listAdministrations.filter((administration) => {
      const matchesSearch =
        (administration.ticketNum?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (administration.vehicle?.licensePlate?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (administration.vehicle?.name?.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSearch;
    });

    filtered.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : null;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : null;

      if (dateA === null && dateB === null) return 0;
      if (dateA === null) return sortOrder === "asc" ? 1 : -1;
      if (dateB === null) return sortOrder === "asc" ? -1 : 1;

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [activeTab, searchQuery, listAdministrations, sortOrder]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Administrasi</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:max-w-sm">
            <TabsTrigger value="todo">To-do</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="histori">Histori</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row flex-wrap md:flex-nowrap gap-3">
                {/* Search Bar */}
                <div className="relative w-full flex items-center space-x-2">
                  <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                  <Input
                    type="text"
                    placeholder="Filter kendaraan dan administrasi"
                    className="w-full pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Sort Order */}
                <Button
                  variant="outline"
                  onClick={() =>
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                  }
                  className="flex items-center gap-2 w-fit"
                >
                  {sortOrder === "asc" ? (
                    <ArrowUpNarrowWide className="h-4 w-4" />
                  ) : (
                    <ArrowDownNarrowWide className="h-4 w-4" />
                  )}
                  Sort Tanggal
                </Button>
              </div>

              <div className="flex items-center">
                <p className="text-sm text-muted-foreground">
                  Total Data: <span className="font-medium">{filteredAndSortedAdministration.length}</span>
                </p>
              </div>

              {filteredAndSortedAdministration.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {filteredAndSortedAdministration.map((administration) => (
                    <AdministrationCard
                      key={administration.id}
                      administration={administration}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
                  <IdCard className="h-5 w-5 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Data administrasi tidak ditemukan.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
