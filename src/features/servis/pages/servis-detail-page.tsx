import { SectionCard } from "@/components/shared/section-card"
import SectionItem from "@/components/shared/section-item"
import { Button } from "@/components/shadcn/button"
import { Separator } from "@/components/shadcn/separator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/shadcn/alert-dialog"
import { Service } from "@/models/service"
import AttachmentItem from "@/components/shared/attachment-item"
import { AttachmentService } from "@/models/attachment-service"
import { ServiceRecord } from "@/models/service-record"
import TaskTypeBar from "@/components/shared/task-type-bar"
import StatusBar from "@/components/shared/status-bar"
import { Status } from "@/lib/constants"
import { EditServiceRecordDialog } from "../components/edit-service-record-dialog"
import { AddAttachmentServiceDialog } from "../components/add-attachment-service-dialog"
import { Link } from "react-router-dom"
import { StartServiceDialog } from "../components/start-service-dialog"
import { DataBarCard } from "@/components/shared/data-bar-card"
import { CompleteServiceDialog } from "../components/complete-service-dialog"

export default function ServisDetailPage() {
    const service: Service = {
        id: "1",
        ticketNum: "SRV25-00001",
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
        type: "servis-regular",
        scheduleDate: "15 Jan 2028",
        startDate: "15 Jan 2028",
        endDate: "15 Jan 2028",
        status: "ongoing",
    };

    const serviceRecord: ServiceRecord = {
        id: "1",
        serviceId: "1",
        mileage: 30000,
        totalCost: 1500000,
        mechanicName: "Agus Purnama",
        task: "-Tune Up\n-Ganti Oli & Filter\n-Ganti Kampas Rem",
        sparepart: "-Oli\n-Filter\n-Kampas Rem",
        notes: "Ban depan udah mulai gundul",
    };

    const latestLocation = {
        id: "1",
        serviceId: "1",
        name: "Bengkel Honda",
        address: "Jl. Sukajadi No. 57, Bandung",
    }

    const listAttachment: AttachmentService[] = [
        {
            id: "1",
            serviceId: "1",
            fileName: "Nota Servis.pdf",
            fileType: "pdf",
            fileSize: "1 MB",
            fileLink: "nota-servis-link",
            createdAt: "12 Jan 2025",
            createdBy: "rainerevan"
        },
        {
            id: "2",
            serviceId: "1",
            fileName: "Dokumen BPKB.pdf",
            fileType: "pdf",
            fileSize: "300 KB",
            fileLink: "dokumen-bpkb-link",
            createdAt: "11 Jan 2025",
            createdBy: "rainerevan"
        },
    ]

    const handleCancelService = () => {
        console.log("Cancel Service button clicked")
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex flex-col gap-5">
                    {/* Service Details */}
                    <div className="flex flex-col gap-3 rounded-lg border bg-background p-5">
                        <div>
                            <h1 className="text-3xl font-bold">{service.ticketNum}</h1>
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-5">
                                <div className="flex items-start justify-between">
                                    <TaskTypeBar taskType={service.type} />
                                    <StatusBar status={service.status as Status} />
                                </div>
                                <div className="flex items-end justify-between">
                                    <SectionItem label="Jadwal Servis" value={service.scheduleDate} />
                                    <SectionItem label="Servis Mulai" value={service.startDate} />
                                    <SectionItem label="Servis Selesai" value={service.endDate} />
                                </div>
                            </div>

                            {service.status == "pending" && (
                                <div className="flex flex-col-reverse gap-3 sm:grid sm:grid-cols-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive">Batalkan Servis</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Batalkan Servis?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Apakah Anda yakin ingin membatalkan servis {service.ticketNum}?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Tidak</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleCancelService}>Batalkan</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <StartServiceDialog serviceRecord={serviceRecord} />
                                </div>
                            )}

                            {service.status == "ongoing" && (
                                <div className="flex flex-col-reverse gap-3 sm:grid sm:grid-cols-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive">Batalkan Servis</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Batalkan Servis?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Apakah Anda yakin ingin membatalkan servis {service.ticketNum}?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Tidak</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleCancelService}>Batalkan</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <CompleteServiceDialog serviceRecord={serviceRecord} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="flex flex-col gap-5">
                    {/* Vehicle Bar */}
                    <Link to={`/kendaraan/${service.vehicleId}`}>
                        <DataBarCard
                            variant="button"
                            type="kendaraan"
                            label={service.vehicle?.name}
                            description={service.vehicle?.licensePlate}
                        />
                    </Link >

                    {/* Lokasi Bar */}
                    {latestLocation && (
                        <Link to={`/servis/${service.id}/riwayat-lokasi`}>
                            <DataBarCard
                                variant="button"
                                type="lokasi"
                                label={latestLocation.name}
                                description={latestLocation.address}
                            />
                        </Link >
                    )}
                </div>

                {/* Sections */}
                <div className="flex flex-col gap-5 overflow-auto">
                    {/* Rincian Servis */}
                    <SectionCard
                        title="Rincian Servis"
                        headerAction={
                            <>
                                {service.status == "ongoing" && (
                                    <EditServiceRecordDialog serviceRecord={serviceRecord} />
                                )}
                            </>
                        }
                    >
                        {serviceRecord && (
                            <div className="grid grid-cols-1 gap-3 py-1">
                                <div className="grid grid-cols-2 gap-3">
                                    <SectionItem label="Kilometer" value={`${serviceRecord.mileage} KM`} />
                                    <SectionItem label="Biaya" value={`Rp ${serviceRecord.totalCost}`} />
                                </div>
                                <SectionItem label="Nama Mekanik" value={serviceRecord.mechanicName} />
                                <SectionItem label="Jasa" value={serviceRecord.task} />
                                <SectionItem label="Sparepart" value={serviceRecord.sparepart} />
                                <SectionItem label="Catatan" value={serviceRecord.notes} />
                            </div>
                        )}
                    </SectionCard>

                    {/* Lampiran Dokumen */}
                    <SectionCard
                        title="Lampiran Dokumen"
                        headerAction={
                            <AddAttachmentServiceDialog serviceId={service.id} />
                        }
                    >
                        {listAttachment.length > 0 && (
                            <div className="flex flex-col">
                                {
                                    listAttachment.map((attachment, index) => (
                                        <div key={attachment.id}>
                                            <AttachmentItem
                                                attachment={attachment}
                                            />
                                            {index < listAttachment.length - 1 && (
                                                <Separator className="my-4" />
                                            )}
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </SectionCard>
                </div>
            </main>
        </div>
    )
}
