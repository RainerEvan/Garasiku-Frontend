import { useState } from "react"
import { MapPin } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/dialog"
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { LocationVehicle } from "@/models/location-vehicle"
import { DataBarCard } from "@/components/shared/data-bar-card"
import { LocationCard } from "@/components/shared/location-card"
import { MoveLocationVehicleDialog } from "./move-location-vehicle-dialog"

interface HistoryLocationVehicleDialogProps {
    location: LocationVehicle
}

export function HistoryLocationVehicleDialog({ location }: HistoryLocationVehicleDialogProps) {
    const [open, setOpen] = useState(false)

    const carLocations = [
        {
            id: "1",
            vehicleId: "1",
            name: "Rumah Bandung",
            address: "Jl. Sukajadi No. 57, Bandung",
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="w-full">
                    <DataBarCard
                        variant="button"
                        type="lokasi"
                        label={location.name}
                        description={location.address}
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Riwayat Lokasi</DialogTitle>
                    <DialogDescription>
                        Klik button pindah lokasi untuk memindahkan lokasi kendaraan.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <ScrollArea className="h-[50vh]">
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
                                                <div className="text-sm font-medium text-secondary">Lokasi Saat Ini</div>
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
                    </ScrollArea>

                    <DialogFooter>
                        <MoveLocationVehicleDialog vehicleId={location.vehicleId}/>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}
