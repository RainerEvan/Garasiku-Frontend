import { LocationVehicle } from "@/models/location-vehicle";
import { MoveLocationVehicleDialog } from "../components/move-location-vehicle-dialog";
import { MapPin } from "lucide-react";
import { LocationCard } from "@/components/shared/location-card";
import { useLoading } from "@/lib/loading-context";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export default function RiwayatLokasiKendaraanPage() {
    const { id } = useParams<{ id: string }>();
    const { setLoading } = useLoading();

    const [listVehicleLocations, setListVehicleLocations] = useState<LocationVehicle[]>([]);
    const [vehicleIsSold, setVehicleIsSold] = useState(false);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                if (!id) return;

                // 1. Ambil data lokasi
                const { data: locationData, error: locationError } = await supabase
                    .from("vehicle_locations")
                    .select("*")
                    .eq("vehicle_id", id)
                    .order("created_at", { ascending: false });

                if (locationError) {
                    console.error("Location fetch error:", locationError);
                } else if (locationData) {
                    const mapped = locationData.map((v: any) => ({
                        id: v.id,
                        vehicleId: v.vehicle_id,
                        name: v.name,
                        address: v.address,
                        createdAt: v.created_at,
                        createdBy: v.created_by,
                    }));
                    setListVehicleLocations(mapped);
                }

                // 2. Ambil status kendaraan (terjual atau tidak)
                const { data: vehicleData, error: vehicleError } = await supabase
                    .from("vehicles")
                    .select("is_sold")
                    .eq("id", id)
                    .single();

                if (vehicleError) {
                    console.error("Vehicle fetch error:", vehicleError);
                } else {
                    setVehicleIsSold(vehicleData?.is_sold ?? false);
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [id]);

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="bg-background border rounded-lg p-5 shadow-xs flex flex-col gap-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold">Riwayat Lokasi Kendaraan</h1>
                            {!vehicleIsSold && (
                                <p className="text-muted-foreground text-sm">Klik button pindah lokasi untuk memindahkan lokasi kendaraan.</p>
                            )}
                        </div>
                        {!vehicleIsSold && listVehicleLocations[0] && (
                            <MoveLocationVehicleDialog
                                vehicleId={id!}
                                currLocationAddress={listVehicleLocations[0].address}
                            />
                        )}
                    </div>

                    <div>
                        {listVehicleLocations.length > 0 ? (
                            <div className="relative">
                                {listVehicleLocations.map((location, index) => (
                                    <div key={location.id} className="relative flex gap-3">
                                        {/* Timeline Left Side */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-4 h-4 bg-secondary rounded-full border-2 border-white"></div>
                                            {index !== listVehicleLocations.length - 1 && (
                                                <div className="flex-1 w-px bg-secondary"></div>
                                            )}
                                        </div>

                                        {/* Card */}
                                        <div className="flex-1 flex flex-col gap-2 pb-5">
                                            {index === 0 && (
                                                <p className="text-sm font-medium text-secondary">Lokasi Terakhir</p>
                                            )}
                                            <LocationCard
                                                name={location.name}
                                                address={location.address}
                                                createdAt={location.createdAt}
                                                createdBy={location.createdBy}
                                                disabled={index !== 0}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
                                <MapPin className="h-5 w-5 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Belum ada lokasi kendaraan</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
