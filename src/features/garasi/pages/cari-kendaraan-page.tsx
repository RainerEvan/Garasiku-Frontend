import { VehicleCard } from "../components/vehicle-card";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { CarFront, Search } from "lucide-react";
import { useState } from "react";
import { Vehicle } from "@/models/vehicle";
import { useLoading } from "@/lib/loading-context";
import { supabase } from "@/lib/supabaseClient";

export default function CariKendaraanPage() {
  const { setLoading } = useLoading();
  const [search, setSearch] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const fetchVehicle = async () => {
    setLoading(true);

    try {
      const cleanedSearch = search.replace(/\s+/g, "").toUpperCase();

      const { data, error } = await supabase
      .rpc("search_vehicles_by_plates", { cleaned_plate: cleanedSearch });

      if (error) {
        console.error("Gagal mencari kendaraan:", error.message);
      } else {
        console.log("Kendaraan ditemukan:", data);
      }


      if (error) {
        console.error("Supabase fetch error:", error.message);
        setVehicle(null);
        return;
      }

      if (!data) {
        setVehicle(null);
        return;
      }

      const mapped: Vehicle = {
        id: data[0].vehicleid,
        name: data[0].name,
        category: data[0].vehicle_category,
        year: data[0].vehicle_year?.toString() ?? "",
        brand: data[0].vehicle_brand,
        color: data[0].vehicle_color,
        type: data[0].vehicle_type,
        licensePlate: data[0].license_plate,
        image: data[0].image_url ?? "/assets/car.jpg",
        location: {
          id: data[0].location_id ?? "",
          vehicleId: data[0].vehicleid ?? "",
          name: data[0].location_name ?? "-",
          address: data[0].location_address ?? "-",
        },
      };

      setVehicle(mapped);
    } catch (err) {
      console.error("Unexpected error:", err);
      setVehicle(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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

        {vehicle ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          </div>
        ) : (
          <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
            <CarFront className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Data kendaraan tidak ditemukan.</p>
          </div>
        )}
      </main>
    </div>
  );
}
