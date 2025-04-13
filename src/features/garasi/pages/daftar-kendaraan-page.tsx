import { VehicleCard } from "../components/vehicle-card"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { Input } from "@/components/shadcn/input"

export default function DaftarKendaraan() {
  // Sample data
  const activeVehicles = [
    {
      id: '1',
      name: "Honda Civic",
      licensePlate: "D 1234 ABC",
      type: "Mobil",
      location: {
        name: "Rumah Bandung",
        address: "Jl. Sukajadi No. 57, Bandung",
      },
    },
    {
      id: '2',
      name: "Honda Civic",
      licensePlate: "D 1234 ABC",
      type: "Mobil",
      location: {
        name: "Rumah Bandung",
        address: "Jl. Sukajadi No. 57, Bandung",
      },
    },
    {
      id: '3',
      name: "Honda Civic",
      licensePlate: "D 1234 ABC",
      type: "Mobil",
      location: {
        name: "Rumah Bandung",
        address: "Jl. Sukajadi No. 57, Bandung",
      },
    },
  ]

  const soldVehicles = [
    {
      id: '4',
      name: "Honda Civic",
      licensePlate: "D 1234 ABC",
      type: "Mobil",
      soldDate: "10 Mar 2025",
    },
    {
      id: '5',
      name: "Honda Civic",
      licensePlate: "D 1234 ABC",
      type: "Mobil",
      soldDate: "15 Feb 2025",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <h1 className="text-3xl font-bold">Daftar Kendaraan</h1>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="sold">Terjual</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {/* Search Bar */}
            <div className="relative mb-5 flex w-full items-center space-x-2">
              <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
              <Input
                type="text"
                placeholder="Filter Plat No kendaraan"
                className="w-full pl-10"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {activeVehicles.map((vehicle) => (
                <VehicleCard
                  id={vehicle.id}
                  variant="active"
                  name={vehicle.name}
                  licensePlate={vehicle.licensePlate}
                  type={vehicle.type}
                  location={vehicle.location}
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
                placeholder="Filter Plat No kendaraan"
                className="w-full pl-10"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {soldVehicles.map((vehicle) => (
                <VehicleCard
                  id={vehicle.id}
                  variant="sold"
                  name={vehicle.name}
                  licensePlate={vehicle.licensePlate}
                  type={vehicle.type}
                  soldDate={vehicle.soldDate}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}