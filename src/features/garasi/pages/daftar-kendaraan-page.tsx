import { VehicleCard } from "../components/vehicle-card"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { Input } from "@/components/shadcn/input"
import { useEffect, useState } from "react"
import { AddVehicleDialog } from "../components/add-vehicle-dialog"
import { Vehicle } from "@/models/vehicle"
import { supabase } from "@/lib/supabaseClient"

type Vehicles = {
  id: string;
  name: string;
  type: string;
  year: string;
  brand: string;
  color: string;
  category: string;
  licensePlate: string;
  image: string;
  isSold: boolean;
  location: {
    id: string;
    vehicleId: string;
    name: string;
    address: string;
  };
}

export default function DaftarKendaraanPage() {
  const [searchActive, setSearchActive] = useState("");
  const [searchSold, setSearchSold] = useState("");
  const [activeVehicles, setActiveVehicles] = useState<Vehicle[]>([]);
  const [soldVehicles, setSoldVehicles] = useState<Vehicle[]>([]);


  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase
        .from("vehicles_with_latest_location")
        .select("*");

      if (error) {
        console.error("Failed to fetch kendaraan:", error.message);
        return;
      }

      if (data) {
        const mappedVehicles = data.map((v) => ({
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

        const active = mappedVehicles.filter((v) => v.isSold === false);
        const sold = mappedVehicles.filter((v) => v.isSold === true);
        setActiveVehicles(active);
        setSoldVehicles(sold);
 
      }
    };

    fetchVehicles();
  }, []);

  const filteredActiveVehicles = activeVehicles.filter((vehicle) =>
    vehicle.licensePlate?.toLowerCase().includes(searchActive.toLowerCase())
  );

  const filteredSoldVehicles = soldVehicles.filter((vehicle) =>
    vehicle.licensePlate?.toLowerCase().includes(searchSold.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
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
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sold">
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
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}