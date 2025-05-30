import { VehicleCard } from "../components/vehicle-card"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { supabase } from "@/lib/supabaseClient"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { AddVehicleDialog } from "../components/add-vehicle-dialog"


type Vehicle = {
  id: string;
  jenis: string;
  tahun: string;
  merek: string;
  warna: string;
  tipe: string;
  plat_no: string;
  location_name: string;
  location_address: string;
  status: "active" | "sold";
  image_url: string;
  sold_date?: string;
}

  // Sample data
  // const activeVehicles = [
  //   {
  //     id: '1',
  //     jenis: "Mobil",
  //     tahun: "2022",
  //     merk: "Honda",
  //     warna: "Hitam",
  //     tipe: "Civic Turbo",
  //     platNo: "D 1234 ABC",
  //     location: {
  //       name: "Rumah Bandung",
  //       address: "Jl. Sukajadi No. 57, Bandung",
  //     },
  //     image: "/assets/car.jpg"
  //   },
  //   {
  //     id: '2',
  //     jenis: "Mobil",
  //     tahun: "2023",
  //     merk: "Toyota",
  //     warna: "Putih",
  //     tipe: "Innova",
  //     platNo: "D 7890 DFE",
  //     location: {
  //       name: "Rumah Jakarta",
  //       address: "Jl. Sriwijaya No. 5, Jakarta",
  //     },
  //     image: "/assets/car.jpg"
  //   },
  //   {
  //     id: '3',
  //     jenis: "Mobil",
  //     tahun: "2022",
  //     merk: "Honda",
  //     warna: "Hitam",
  //     tipe: "Civic Turbo",
  //     platNo: "D 1234 ABC",
  //     location: {
  //       name: "Rumah Bandung",
  //       address: "Jl. Sukajadi No. 57, Bandung",
  //     },
  //     image: "/assets/car.jpg"
  //   },
  // ]

  // const soldVehicles = [
  //   {
  //     id: '4',
  //     jenis: "Mobil",
  //     tahun: "2022",
  //     merk: "Honda",
  //     warna: "Hitam",
  //     tipe: "Civic Turbo",
  //     platNo: "D 1234 ABC",
  //     soldDate: "10 Mar 2025",
  //     image: "/assets/car.jpg"
  //   },
  //   {
  //     id: '5',
  //     jenis: "Mobil",
  //     tahun: "2022",
  //     merk: "Honda",
  //     warna: "Hitam",
  //     tipe: "Civic Turbo",
  //     platNo: "D 1234 ABC",
  //     soldDate: "15 Feb 2025",
  //     image: "/assets/car.jpg"
  //   },
  // ]

  
  const navigate = useNavigate();
  const [activeVehicles, setActiveVehicles] = useState<Vehicle[]>([]);
  const [soldVehicles, setSoldVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      // Cek login dan role user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "owner" && profile?.role !== "divisi") {
        navigate("/unauthorized"); // atau tampilkan pesan tidak boleh akses
        return;
      }

      // Fetch kendaraan
      const { data, error } = await supabase.rpc("get_kendaraan_latest_location");
      // const { data, error } = await supabase
      // .from("kendaraan")
      // .select("*");
      console.log(data);

      if (error) {
        console.error("Gagal fetch kendaraan:", error.message);
        return;
      }

      const active = data.filter((v: Vehicle) => v.status === "active");
      const sold = data.filter((v: Vehicle) => v.status === "sold");
    //   const filteredActiveVehicles = activeVehicles.filter((vehicle) =>
    //   vehicle.licensePlate && vehicle.licensePlate.toLowerCase().includes(searchActive.toLowerCase())
    // );
  
    // const filteredSoldVehicles = soldVehicles.filter((vehicle) =>
    //   vehicle.licensePlate && vehicle.licensePlate.toLowerCase().includes(searchSold.toLowerCase())
    // );
      setActiveVehicles(active);
      setSoldVehicles(sold);
    }

    fetchVehicles();
  }, [navigate]);
  
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
                placeholder="Filter Plat No kendaraan"
                className="w-full pl-10"
                value={searchActive}
                onChange={(e) => setSearchActive(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {activeVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  id={vehicle.id}
                  variant="active"
                  name={`${vehicle.merek} ${vehicle.tipe} ${vehicle.warna} ${vehicle.tahun}`}
                  licensePlate={vehicle.plat_no}
                  type={vehicle.jenis}
                  location={{
                    name: vehicle.location_name,
                    address: vehicle.location_address,
                  }}
                  image={vehicle.image_url}
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
                value={searchSold}
                onChange={(e) => setSearchSold(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
             {soldVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  id={vehicle.id}
                  variant="sold"
                  name={`${vehicle.merek} ${vehicle.tipe} ${vehicle.warna} ${vehicle.tahun}`}
                  licensePlate={vehicle.plat_no}
                  type={vehicle.jenis}
                  soldDate={vehicle.sold_date}
                  image={vehicle.image_url}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}