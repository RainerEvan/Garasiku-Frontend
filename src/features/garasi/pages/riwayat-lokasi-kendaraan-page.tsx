import { LocationVehicle } from "@/models/location-vehicle";
import { MoveLocationVehicleDialog } from "../components/move-location-vehicle-dialog";
import { MapPin } from "lucide-react";
import { LocationCard } from "@/components/shared/location-card";


export default function RiwayatLokasiKendaraanPage() {
    const carLocations: LocationVehicle[] = [
        {
            id: "1",
            vehicleId: "1",
            name: "Rumah Bandung",
            address: "Jl. Taman Sukajadi Baru Blok A VIII 12 No. 57, Bandung",
            createdAt: "01 Jan 2025 10:00",
            createdBy: "rainerevan"
        },
        {
            id: "2",
            vehicleId: "1",
            name: "Apartment Jakarta",
            address: "Menteng Park Apartment, Jakarta",
            createdAt: "31 Des 2024 10:00",
            createdBy: "rainerevan"
        },
        {
            id: "3",
            vehicleId: "1",
            name: "Bengkel ASCO",
            address: "Jl. Kolonel Sugiono No. 20, Jakarta",
            createdAt: "30 Des 2024 10:00",
            createdBy: "rainerevan"
        },
        {
            id: "4",
            vehicleId: "1",
            name: "Lain-lain",
            address: "Jl. Sabang No. 8, Bandung",
            createdAt: "11 Nov 2024 10:00",
            createdBy: "rainerevan"
        }
    ]

    const vehicleId = "1";

    const vehicleIsSold: boolean = false;

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="bg-background border rounded-lg p-5 shadow-xs flex flex-col gap-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold">Riwayat Lokasi Kendaraan</h1>
                            {!vehicleIsSold && (
                                <p className="text-muted-foreground text-sm">Klik button pindah lokasi untuk memindahkan lokasi kendaraan.</p>
                            )}
                        </div>
                        {!vehicleIsSold && (
                            <MoveLocationVehicleDialog vehicleId={vehicleId} />
                        )}
                    </div>

                    <div>
                        {carLocations.length === 0 ? (
                            <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
                                <MapPin className="h-5 w-5 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Belum ada lokasi kendaraan</p>
                            </div>
                        ) : (
                            <div className="relative">
                                {/* Location Cards */}
                                {carLocations.map((location, index) => (
                                    <div key={index} className="relative flex gap-3">
                                        {/* Timeline Left Side */}
                                        <div className="flex flex-col items-center">
                                            {/* Dot */}
                                            <div className="w-4 h-4 bg-secondary rounded-full border-2 border-white"></div>

                                            {/* Line - only if not last item */}
                                            {index !== carLocations.length - 1 && (
                                                <div className="flex-1 w-px bg-secondary"></div>
                                            )}
                                        </div>

                                        {/* Card */}
                                        <div className="flex-1 flex flex-col gap-2 pb-5">
                                            {index == 0 && (
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
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
