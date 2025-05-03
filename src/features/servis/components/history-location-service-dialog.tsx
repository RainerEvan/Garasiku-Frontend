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
import { DataBarCard } from "@/components/shared/data-bar-card"
import { LocationCard } from "@/components/shared/location-card"
import { MoveLocationServiceDialog } from "./move-location-service-dialog"
import { LocationService } from "@/models/location-service"

interface HistoryLocationServiceDialogProps {
    serviceId?: string
    latestLocation: LocationService
}

export function HistoryLocationServiceDialog({ serviceId, latestLocation }: HistoryLocationServiceDialogProps) {
    const [open, setOpen] = useState(false)

    const carLocations: LocationService[] = [
        {
            id: "1",
            serviceId: "1",
            name: "Bengkel Honda",
            address: "Jl. Sukajadi No. 57, Bandung",
            createdAt: "01 Jan 2025 10:00",
            createdBy: "rainerevan"
        },
        {
            id: "2",
            serviceId: "1",
            name: "Bengkel ASCO",
            address: "Jl. Kolonel Sugiono No. 20, Jakarta",
            createdAt: "30 Des 2024 10:00",
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
                        label={latestLocation.name}
                        description={latestLocation.address}
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Riwayat Lokasi</DialogTitle>
                    <DialogDescription>
                        Klik button pindah lokasi untuk memindahkan lokasi servis.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <ScrollArea className="h-[50vh]">
                        {carLocations.length === 0 ? (
                            <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
                                <MapPin className="h-5 w-5 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Belum ada lokasi servis</p>
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
                                                <p className="text-sm font-medium text-secondary">Lokasi Saat Ini</p>
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
                        <MoveLocationServiceDialog serviceId={serviceId}/>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}
