import { ChevronRight } from "lucide-react"
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
import { HistoryLocationServiceDialog } from "../components/history-location-service-dialog"
import { EditServiceRecordDialog } from "../components/edit-service-record-dialog"
import { AddAttachmentServiceDialog } from "../components/add-attachment-service-dialog"
import { useNavigate } from "react-router-dom"
import { StartServiceDialog } from "../components/start-service-dialog"

export default function ServisDetailPage() {
    const navigate = useNavigate();

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
        status: "completed",
    };

    const serviceRecord: ServiceRecord = {
        id: "1",
        serviceId: "1",
        mileage: undefined,
        totalCost: undefined,
        mechanicName: undefined,
        task: undefined,
        sparepart: undefined,
        notes: undefined,
    };

    const location = {
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

    const handleDataKendaraan = () => {
        console.log("Data Kendaraan button clicked")
        navigate(`/kendaraan/${service.vehicleId}`);
    }

    const handleCancelService = () => {
        console.log("Cancel Service button clicked")
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                {/* Service Details */}
                <div className="flex flex-col gap-5 rounded-lg border bg-background p-5">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h1 className="text-3xl font-bold">{service.ticketNum}</h1>
                        </div>

                        <Separator />

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
                    </div>

                    {/* Action Buttons */}
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
                </div>

                {/* Info Bar */}
                <div className="flex flex-col gap-5">
                    {/* Lokasi Bar */}
                    <HistoryLocationServiceDialog serviceId={service.id} latestLocation={location} />
                </div>

                {/* Sections */}
                <div className="flex flex-col gap-5 overflow-auto">
                    {/* Data Kendaraan */}
                    <SectionCard
                        title="Data Kendaraan"
                        headerAction={
                            <Button variant="ghost" size="sm" onClick={handleDataKendaraan}>
                                <ChevronRight />
                            </Button>
                        }
                    >
                        {service.vehicle && (
                            <div className="flex justify-between gap-5 capitalize">
                                <div className="flex flex-col">
                                    <p className="font-medium">{service.vehicle.name}</p>
                                    <p className="text-xs text-light">{service.vehicle.licensePlate}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm text-medium">{service.vehicle.type}</p>
                                </div>
                            </div>
                        )}
                    </SectionCard>

                    {/* Rincian Servis */}
                    <SectionCard
                        title="Rincian Servis"
                        headerAction={
                            <EditServiceRecordDialog serviceRecord={serviceRecord} />
                        }
                    >
                        {serviceRecord && (
                            <div className="grid grid-cols-1 gap-3 py-1">
                                <div className="grid grid-cols-2 gap-3">
                                    <SectionItem label="Kilometer" value={serviceRecord.mileage} />
                                    <SectionItem label="Biaya" value={serviceRecord.totalCost} />
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
                        collapsible
                        defaultCollapsed={true}
                        collapsedHeight={60}
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
