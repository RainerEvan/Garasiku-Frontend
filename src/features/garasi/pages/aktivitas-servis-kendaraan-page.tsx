import { Wrench } from "lucide-react";
import { Service } from "@/models/service";
import { ServiceCard } from "@/features/servis/components/service-card";


export default function AktivitasServisKendaraanPage() {
    const serviceActivities: Service[] = [
        {
            id: "1",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                year: "2022",
                brand: "honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "servis-regular",
            scheduleDate: "15 Jan 2028",
            startDate: undefined,
            endDate: undefined,
            status: "pending",
        },
        {
            id: "2",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                year: "2022",
                brand: "honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "servis-regular",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            endDate: undefined,
            status: "ongoing",
        },
        {
            id: "3",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                year: "2022",
                brand: "honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "servis-regular",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "completed",
        }
    ]

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="bg-background border rounded-lg p-5 shadow-xs flex flex-col gap-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold">Aktivitas Servis Kendaraan</h1>
                            <p className="text-muted-foreground text-sm">Daftar aktivitas servis kendaraan.</p>
                        </div>
                    </div>

                    <div>
                        {serviceActivities.length === 0 ? (
                            <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
                                <Wrench className="h-5 w-5 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Belum ada aktivitas servis</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5">
                                {serviceActivities.map((service) => (
                                    <ServiceCard
                                        key={service.id}
                                        service={service}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
