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

type SelectOption = {
  label: string
  value: string
}

export default function DaftarKendaraanPage() {
  const { setLoading } = useLoading();

  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectCategory, setSelectCategory] = useState("all");

  const [selectCategoryOptions, setSelectCategoryOptions] = useState<SelectOption[]>([
    { label: "Semua", value: "all" }
  ])

  const [vehicleCategoryParams, setVehicleCategoryParams] = useState<Param[]>([])

  // Sample data
  const listVehicles: Vehicle[] = [
    {
      id: "1",
      name: "Honda Civic Turbo Hitam 2022",
      category: "Mobil",
      year: "2022",
      brand: "Honda",
      color: "Hitam",
      type: "Civic Turbo",
      licensePlate: "D 1234 ABC",
      location: {
        id: "1",
        vehicleId: "1",
        name: "Rumah Bandung",
        address: "Jl. Sukajadi No. 57, Bandung",
      },
      image: "/assets/car.jpg",
      isSold: false
    },
    {
      id: "2",
      name: "Toyota Innova Putih 2023",
      category: "Mobil",
      year: "2023",
      brand: "Toyota",
      color: "Putih",
      type: "Innova",
      licensePlate: "D 7890 DFE",
      location: {
        id: "1",
        vehicleId: "1",
        name: "Rumah Jakarta",
        address: "Jl. Sriwijaya No. 5, Jakarta",
      },
      image: "/assets/car.jpg",
      isSold: false
    },
    {
      id: "3",
      name: "Honda CBR Hitam 2023",
      category: "Motor",
      year: "2022",
      brand: "Honda",
      color: "Hitam",
      type: "Civic Turbo",
      licensePlate: "D 1234 ABC",
      location: {
        id: "1",
        vehicleId: "1",
        name: "Rumah Bandung",
        address: "Jl. Sukajadi No. 57, Bandung",
      },
      image: "/assets/car.jpg",
      isSold: false
    },
    {
      id: "4",
      name: "Honda Civic Turbo Hitam 2022",
      category: "Mobil",
      year: "2022",
      brand: "Honda",
      color: "Hitam",
      type: "Civic Turbo",
      licensePlate: "D 1234 ABC",
      location: {
        id: "1",
        vehicleId: "1",
        name: "Rumah Bandung",
        address: "Jl. Sukajadi No. 57, Bandung",
      },
      soldDate: "10 Mar 2025",
      image: "/assets/car.jpg",
      isSold: true
    },
    {
      id: "5",
      name: "Toyota Innova Putih 2023",
      category: "Mobil",
      year: "2023",
      brand: "Toyota",
      color: "Putih",
      type: "Innova",
      licensePlate: "D 7890 DFE",
      location: {
        id: "1",
        vehicleId: "1",
        name: "Rumah Jakarta",
        address: "Jl. Sriwijaya No. 5, Jakarta",
      },
      soldDate: "10 Mar 2025",
      image: "/assets/car.jpg",
      isSold: true
    },
  ]


  useEffect(() => {
    fetchParams()
  }, []);

  async function fetchParams() {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 3000))
      
      const res = [
        {
          id: "1",
          group: "001",
          name: "Mobil"
        },
        {
          id: "2",
          group: "001",
          name: "Motor"
        }
      ]
      const data: Param[] = await res
      setVehicleCategoryParams(data)

      const optionsFromParams: SelectOption[] = data.map((param) => ({
        label: param.name,
        value: param.name
      }))

      setSelectCategoryOptions([
        { label: "Semua", value: "all" },
        ...optionsFromParams
      ])
    } catch (error) {
      console.error("Failed to fetch vehicle categories", error)
    } finally {
      setLoading(false);
    }
  }

  const filteredAndSortedVehicle = useMemo(() => {
    const filtered = listVehicles.filter((vehicle) => {
      const matchesStatus =
        (activeTab === "active" && !vehicle.isSold) ||
        (activeTab === "sold" && vehicle.isSold)
      const matchesSearch =
        (vehicle.licensePlate && vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (vehicle.name && vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesType = selectCategory === "all" || vehicle.category === selectCategory

      return matchesStatus && matchesSearch && matchesType
    })

    return filtered
  }, [activeTab, searchQuery, selectCategory])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Daftar Kendaraan</h1>
          <AddVehicleDialog />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:max-w-sm">
            <TabsTrigger value="active">Aktif ({listVehicles.filter(v => !v.isSold).length})</TabsTrigger>
            <TabsTrigger value="sold">Terjual ({listVehicles.filter(v => v.isSold).length})</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-3">
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
                <Select onValueChange={setSelectCategory} defaultValue="all">
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

              {listVehicles.length > 0 && filteredAndSortedVehicle.length > 0 ? (
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
                  <p>Tidak ada kendaraan.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}