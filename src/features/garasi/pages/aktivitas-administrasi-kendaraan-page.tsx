import { IdCard } from "lucide-react";
import { Administration } from "@/models/administration";
import { AdministrationCard } from "@/features/administrasi/components/administrasi-card";


export default function AktivitasAdministrasiKendaraanPage() {
    const administrationActivities: Administration[] = [
        {
            id: "1",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "Mobil",
                year: "2022",
                brand: "Honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "administrasi-stnk-1tahun",
            dueDate: "15 Jan 2028",
            endDate: undefined,
            status: "pending",
        },
        {
            id: "2",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "Mobil",
                year: "2022",
                brand: "Honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "administrasi-asuransi",
            dueDate: "15 Jan 2028",
            endDate: undefined,
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
                            <h1 className="text-lg font-semibold">Aktivitas Administrasi Kendaraan</h1>
                            <p className="text-muted-foreground text-sm">Daftar aktivitas administrasi kendaraan.</p>
                        </div>
                    </div>

                    <div>
                        {administrationActivities.length === 0 ? (
                            <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
                                <IdCard className="h-5 w-5 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Belum ada aktivitas administrasi</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5">
                                {administrationActivities.map((administration) => (
                                    <AdministrationCard
                                        key={administration.id}
                                        administration={administration}
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
