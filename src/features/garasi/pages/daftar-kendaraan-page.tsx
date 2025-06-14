import { VehicleCard } from "../components/vehicle-card"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { Input } from "@/components/shadcn/input"
import { useState } from "react"
import { AddVehicleDialog } from "../components/add-vehicle-dialog"
import { Vehicle } from "@/models/vehicle"

export default function DaftarKendaraanPage() {
  const [searchActive, setSearchActive] = useState("");
  const [searchSold, setSearchSold] = useState("");

  // Sample data
  const activeVehicles: Vehicle[] = [
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
  ]

  const soldVehicles: Vehicle[] = [
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
      soldDate: "10 Mar 2025",
      image: "/assets/car.jpg",
      isSold: true
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
      soldDate: "10 Mar 2025",
      image: "/assets/car.jpg",
      isSold: true
    },
  ]

  const filteredActiveVehicles = activeVehicles.filter((vehicle) =>
    (vehicle.licensePlate && vehicle.licensePlate.toLowerCase().includes(searchActive.toLowerCase())) ||
    (vehicle.name && vehicle.name.toLowerCase().includes(searchActive.toLowerCase()))
  );

  const filteredSoldVehicles = soldVehicles.filter((vehicle) =>
    (vehicle.licensePlate && vehicle.licensePlate.toLowerCase().includes(searchSold.toLowerCase())) ||
    (vehicle.name && vehicle.name.toLowerCase().includes(searchSold.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Daftar Kendaraan</h1>
          <AddVehicleDialog />
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full md:max-w-sm">
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="sold">Terjual</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {/* Search Bar */}
            <div className="relative mb-5 flex w-full items-center space-x-2">
              <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
              <Input
                type="text"
                placeholder="Filter kendaraan"
                className="w-full pl-10"
                value={searchActive}
                onChange={(e) => setSearchActive(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredActiveVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sold">
            {/* Search Bar */}
            <div className="relative mb-5">
              <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
              <Input
                type="text"
                placeholder="Filter kendaraan"
                className="w-full pl-10"
                value={searchSold}
                onChange={(e) => setSearchSold(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredSoldVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}