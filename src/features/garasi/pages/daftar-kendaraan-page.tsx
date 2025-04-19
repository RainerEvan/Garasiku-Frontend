import { VehicleCard } from "../components/vehicle-card"
import { Plus, PlusCircle, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"

export default function DaftarKendaraan() {
  // Sample data
  const activeVehicles = [
    {
      id: '1',
      jenis: "Mobil",
      tahun: "2022",
      merk: "Honda",
      warna: "Hitam",
      tipe: "Civic Turbo",
      platNo: "D 1234 ABC",
      location: {
        name: "Rumah Bandung",
        address: "Jl. Sukajadi No. 57, Bandung",
      },
      image: "/assets/car.jpg"
    },
    {
      id: '2',
      jenis: "Mobil",
      tahun: "2023",
      merk: "Toyota",
      warna: "Putih",
      tipe: "Innova",
      platNo: "D 7890 DFE",
      location: {
        name: "Rumah Jakarta",
        address: "Jl. Sriwijaya No. 5, Jakarta",
      },
      image: "/assets/car.jpg"
    },
    {
      id: '3',
      jenis: "Mobil",
      tahun: "2022",
      merk: "Honda",
      warna: "Hitam",
      tipe: "Civic Turbo",
      platNo: "D 1234 ABC",
      location: {
        name: "Rumah Bandung",
        address: "Jl. Sukajadi No. 57, Bandung",
      },
      image: "/assets/car.jpg"
    },
  ]

  const soldVehicles = [
    {
      id: '4',
      jenis: "Mobil",
      tahun: "2022",
      merk: "Honda",
      warna: "Hitam",
      tipe: "Civic Turbo",
      platNo: "D 1234 ABC",
      soldDate: "10 Mar 2025",
      image: "/assets/car.jpg"
    },
    {
      id: '5',
      jenis: "Mobil",
      tahun: "2022",
      merk: "Honda",
      warna: "Hitam",
      tipe: "Civic Turbo",
      platNo: "D 1234 ABC",
      soldDate: "15 Feb 2025",
      image: "/assets/car.jpg"
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Daftar Kendaraan</h1>
          <Button className="hidden sm:flex">
            <PlusCircle /> Tambah Kendaraan
          </Button>
        </div>

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
                  key={vehicle.id}
                  id={vehicle.id}
                  variant="active"
                  name={`${vehicle.merk} ${vehicle.tipe} ${vehicle.warna} ${vehicle.tahun}`}
                  licensePlate={vehicle.platNo}
                  type={vehicle.jenis}
                  location={vehicle.location}
                  image={vehicle.image}
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
                  key={vehicle.id}
                  id={vehicle.id}
                  variant="sold"
                  name={`${vehicle.merk} ${vehicle.tipe} ${vehicle.warna} ${vehicle.tahun}`}
                  licensePlate={vehicle.platNo}
                  type={vehicle.jenis}
                  soldDate={vehicle.soldDate}
                  image={vehicle.image}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Button variant="default" size="icon2" className="fixed bottom-4 right-4 sm:hidden">
        <Plus className="size-8" />
      </Button>
    </div>
  )
}