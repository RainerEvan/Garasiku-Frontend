import { VehicleCard } from "../components/vehicle-card"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { Input } from "@/components/shadcn/input"
import { useEffect, useMemo, useState } from "react"
import { AddVehicleDialog } from "../components/add-vehicle-dialog"
import { Vehicle } from "@/models/vehicle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { Param } from "@/models/param"
import { useLoading } from "@/lib/loading-context"
import { supabase } from "@/lib/supabaseClient"

type SelectOption = {
  label: string
  value: string
}

export default function DaftarKendaraanPage() {
  const { setLoading } = useLoading();

  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectCategory, setSelectCategory] = useState("all");

  const [selectCategoryOptions, setSelectCategoryOptions] = useState<SelectOption[]>([])

  const [listVehicles, setListVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      try {
        const [
          paramsRes,
          vehiclesRes
        ] = await Promise.all([
          // simulate fetching params (you might replace this with supabase or API call)
          Promise.resolve([
            { id: "1", group: "001", name: "Mobil" },
            { id: "2", group: "001", name: "Motor" },
          ]),
          supabase.from("vehicles_with_latest_location").select("*"),
        ]);

        // === PARAMS ===
        const paramData: Param[] = paramsRes;
        const optionsFromParams: SelectOption[] = paramData.map((param) => ({
          label: param.name,
          value: param.name,
        }));
        setSelectCategoryOptions([{ label: "Semua", value: "all" }, ...optionsFromParams]);

        // === VEHICLES ===
        const { data: vehiclesData, error: vehiclesError } = vehiclesRes;
        if (vehiclesError) {
          console.error("Failed to fetch vehicles:", vehiclesError.message);
        } else if (vehiclesData) {
          const mappedVehicles = vehiclesData.map((v: any) => ({
            id: v.id,
            name: v.name,
            type: v.type,
            year: v.year,
            brand: v.brand,
            color: v.color,
            category: v.category,
            licensePlate: v.license_plate,
            image: v.image_url,
            isSold: v.is_sold,
            location: {
              id: v.location_id ?? "",
              vehicleId: v.id ?? "",
              name: v.location_name ?? "-",
              address: v.location_address ?? "-",
            },
            soldDate: v.soldDate ?? undefined,
          }));
          setListVehicles(mappedVehicles);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const filteredAndSortedVehicle = useMemo(() => {
    const filtered = listVehicles.filter((vehicle) => {
      const matchesStatus =
        (activeTab === "active" && !vehicle.isSold) ||
        (activeTab === "sold" && vehicle.isSold)
      const matchesSearch =
        (vehicle.licensePlate && vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (vehicle.name && vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesType = selectCategory === "all" || vehicle.category?.toLowerCase() === selectCategory.toLowerCase()

      return matchesStatus && matchesSearch && matchesType
    })

    return filtered
  }, [activeTab, searchQuery, selectCategory, listVehicles])

  const vehicleCounts = useMemo(() => {
    const active = listVehicles.filter(v => !v.isSold).length
    const sold = listVehicles.filter(v => v.isSold).length
    return { active, sold }
  }, [listVehicles])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Daftar Kendaraan</h1>
          <AddVehicleDialog />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:max-w-sm">
            <TabsTrigger value="active">Aktif ({vehicleCounts.active})</TabsTrigger>
            <TabsTrigger value="sold">Terjual ({vehicleCounts.sold})</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row flex-wrap md:flex-nowrap gap-3">
                {/* Search Bar */}
                <div className="relative w-full flex items-center space-x-2">
                  <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                  <Input
                    type="text"
                    placeholder="Filter kendaraan"
                    className="w-full pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Select Category */}
                <Select onValueChange={setSelectCategory} value={selectCategory}>
                  <SelectTrigger>
                    <span className="flex items-center gap-2">
                      <span className="text-muted-foreground">Kategori:</span>
                      <SelectValue placeholder="Pilih kategori kendaraan" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {selectCategoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {filteredAndSortedVehicle.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredAndSortedVehicle.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center w-full py-6">
                  <p>Tidak ada data kendaraan.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div >
  )
}