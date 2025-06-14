import { VehicleCard } from "../components/vehicle-card"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { Search } from "lucide-react"
import { useState } from "react"
import { Vehicle } from "@/models/vehicle"
import { Skeleton } from "@/components/shadcn/skeleton"

export default function CariKendaraanPage() {
  const [search, setSearch] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);

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
      image: "/assets/car.jpg"
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
      image: "/assets/car.jpg"
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
      image: "/assets/car.jpg"
    },
  ]

  const fetchVehicle = () => {
    setLoading(true);

    setTimeout(() => {
      try {
        const data = activeVehicles.find((vehicle) => vehicle.licensePlate && vehicle.licensePlate.toLowerCase() === search.toLowerCase());
        setVehicle(data || null);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Cari Kendaraan</h1>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row w-full items-center gap-3">
          <div className="relative flex w-full items-center space-x-2">
            <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
            <Input
              type="text"
              placeholder="Cari Plat No kendaraan"
              className="w-full pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button className="w-full sm:w-28" onClick={fetchVehicle}>
            <Search /> Cari
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1">
            <Skeleton className="w-full h-72" />
          </div>
        ) : (vehicle) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <p>Tidak ada kendaraan.</p>
          </div>
        )}
      </main>
    </div>
  )
}