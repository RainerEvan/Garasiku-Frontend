import { VehicleCard } from "../components/vehicle-card"
import { CarFront, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { Input } from "@/components/shadcn/input"
import { useEffect, useMemo, useState } from "react"
import { AddVehicleDialog } from "../components/add-vehicle-dialog"
import { Vehicle } from "@/models/vehicle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { Param } from "@/models/param"
import { useLoading } from "@/lib/loading-context"
import { supabase } from "@/lib/supabaseClient"
import { VEHICLE_CATEGORY_PARAM } from "@/lib/constants"

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
          vehicleCategoryParamsRes,
          vehiclesRes
        ] = await Promise.all([
          // simulate fetching params (you might replace this with supabase or API call)
          Promise.resolve(VEHICLE_CATEGORY_PARAM),
          supabase.from("vehicles_with_latest_location").select("*"),
        ]);

        // === PARAMS ===
        const vehicleCategoryParamsData: Param[] = vehicleCategoryParamsRes;
        const optionsFromParams: SelectOption[] = vehicleCategoryParamsData.map((param) => ({
          label: param.description || param.name,
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
              name: v.location_name ?? "Belum ada lokasi",
              address: v.location_address ?? "Belum ada alamat",
            },
            soldDate: v.sold_date ?? undefined,
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

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Daftar Kendaraan</h1>
          <AddVehicleDialog />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:max-w-sm">
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="sold">Terjual</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <div className="flex flex-col gap-3">
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

              <div className="flex items-center">
                <p className="text-sm text-muted-foreground">
                  Total Data: <span className="font-medium">{filteredAndSortedVehicle.length}</span>
                </p>
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
                <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
                  <CarFront className="h-5 w-5 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Data kendaraan tidak ditemukan.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div >
  )
}