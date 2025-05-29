import { SectionCard } from "@/components/shared/section-card"
import SectionItem from "@/components/shared/section-item"
import { Button } from "@/components/shadcn/button"
import { Separator } from "@/components/shadcn/separator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/shadcn/alert-dialog"
import { Administration } from "@/models/administration"
import { AdministrationRecord } from "@/models/administration-record"
import TaskTypeBar from "@/components/shared/task-type-bar"
import StatusBar from "@/components/shared/status-bar"
import { Status } from "@/lib/constants"
import { Link } from "react-router-dom"
import { DataBarCard } from "@/components/shared/data-bar-card"
import { CompleteAdministrationDialog } from "../components/complete-administrasi-dialog"

export default function AdministrasiDetailPage() {
    const administration: Administration = {
        id: "1",
        ticketNum: "ADM25-00001",
        vehicleId: "1",
        vehicle: {
            id: "1",
            name: "Honda Civic Turbo Hitam 2022",
            type: "mobil",
            year: "2022",
            brand: "honda",
            color: "Hitam",
            model: "Civic Turbo",
            licensePlate: "D 1234 ABC",
        },
        type: "administrasi-stnk",
        dueDate: "15 Jan 2028",
        endDate: "15 Jan 2028",
        status: "pending",
    };

    const administrationRecord: AdministrationRecord = {
        id: "1",
        administrationId: "1",
        totalCost: 1500000,
        notes: "Ban depan udah mulai gundul",
        newDueDate: undefined,
    };

    const handleCancelAdministration = () => {
        console.log("Cancel Administration button clicked")
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex flex-col gap-5">
                    {/* Administration Details */}
                    <div className="flex flex-col gap-3 rounded-lg border bg-background p-5">
                        <div>
                            <h1 className="text-3xl font-bold">{administration.ticketNum}</h1>
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-5">
                                <div className="flex items-start justify-between">
                                    <TaskTypeBar taskType={administration.type} />
                                    <StatusBar status={administration.status as Status} />
                                </div>
                                <div className="flex items-end justify-between">
                                    <SectionItem label="Jatuh Tempo" value={administration.dueDate} />
                                    <SectionItem label="Administrasi Selesai" value={administration.endDate} />
                                </div>
                            </div>

                            {administration.status == "pending" && (
                                <div className="flex flex-col-reverse gap-3 sm:grid sm:grid-cols-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive">Batalkan Administrasi</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Batalkan Administrasi?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Apakah Anda yakin ingin membatalkan administrasi {administration.ticketNum}?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Tidak</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleCancelAdministration}>Batalkan</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <CompleteAdministrationDialog administrationRecord={administrationRecord} dueDate={administration.dueDate || ""}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="flex flex-col gap-5">
                    {/* Vehicle Bar */}
                    <Link to={`/kendaraan/${administration.vehicleId}`}>
                        <DataBarCard
                            variant="button"
                            type="kendaraan"
                            label={administration.vehicle?.name}
                            description={administration.vehicle?.licensePlate}
                        />
                    </Link >
                </div>

                {/* Sections */}
                <div className="flex flex-col gap-5 overflow-auto">
                    {/* Rincian Administrasi */}
                    <SectionCard
                        title="Rincian Administrasi"
                    >
                        {administrationRecord && (
                            <div className="grid grid-cols-1 gap-3 py-1">
                                <div className="grid grid-cols-2 gap-3">
                                    <SectionItem label="Jatuh Tempo Baru" value={administrationRecord.newDueDate} />
                                    <SectionItem label="Biaya" value={`Rp ${administrationRecord.totalCost}`} />
                                </div>
                                <SectionItem label="Catatan" value={administrationRecord.notes} />
                            </div>
                        )}
                    </SectionCard>
                </div>
            </main>
        </div>
    )
}
