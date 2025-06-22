import { useEffect, useState } from "react";
import { SectionCard } from "@/components/shared/section-card";
import SectionItem from "@/components/shared/section-item";
import { Button } from "@/components/shadcn/button";
import { Separator } from "@/components/shadcn/separator";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog";
import { Service } from "@/models/service";
import AttachmentItem from "@/components/shared/attachment-item";
import { AttachmentService } from "@/models/attachment-service";
import TaskTypeBar from "@/components/shared/task-type-bar";
import StatusBar from "@/components/shared/status-bar";
import { Status } from "@/lib/constants";
import { EditServiceRecordDialog } from "../components/edit-service-record-dialog";
import { AddAttachmentServiceDialog } from "../components/add-attachment-service-dialog";
import { StartServiceDialog } from "../components/start-service-dialog";
import { CompleteServiceDialog } from "../components/complete-service-dialog";
import { DataBarCard } from "@/components/shared/data-bar-card";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient"

export default function ServisDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [attachments, setAttachments] = useState<AttachmentService[]>([]);
    const [latestLocation, setLatestLocation] = useState<{ id: string; vehicleId: string; name: string; address: string } | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            // 1. Fetch service details including related vehicle and latest location
            const { data: serviceData, error: serviceError } = await supabase
                .from("services")
                .select(`
          *,
          vehicles (
            id,
            name,
            category,
            year,
            brand,
            color,
            type,
            license_plate
          ),
          vehicle_locations (
            id,
            name,
            address
          )
        `)
                .eq("vehicle_id", id)
                .order("vehicle_locations.created_at", { ascending: false })
                .limit(1)
                .single();

            if (serviceError) {
                console.error("Service fetch error:", serviceError);
            } else if (serviceData) {
                const svc = serviceData as any;
                setService({
                    id: svc.id,
                    ticketNum: svc.ticket_num,
                    vehicleId: svc.vehicle_id,
                    vehicle: {
                        id: svc.vehicles.id,
                        name: svc.vehicles.name,
                        category: svc.vehicles.category,
                        year: svc.vehicles.year,
                        brand: svc.vehicles.brand,
                        color: svc.vehicles.color,
                        type: svc.vehicles.type,
                        licensePlate: svc.vehicles.license_plate,
                    },
                    type: svc.type,
                    scheduleDate: svc.schedule_date,
                    startDate: svc.start_date,
                    endDate: svc.end_date,
                    status: svc.status as Status,
                    mileage: svc.mileage,
                    totalCost: svc.total_cost,
                    mechanicName: svc.mechanic_name,
                    task: svc.task,
                    sparepart: svc.sparepart,
                    notes: svc.notes,
                });

                if (svc.vehicle_locations?.length) {
                    const loc = svc.vehicle_locations[0];
                    setLatestLocation({
                        id: loc.id,
                        vehicleId: svc.vehicle_id,
                        name: loc.name,
                        address: loc.address,
                    });
                }
            }

            // 2. Fetch attachments
            const { data: attachData, error: attachError } = await supabase
                .from("attachment_vehicle")
                .select("*")
                .eq("vehicle_id", service?.vehicleId)
                .order("sort", { ascending: true });

            if (attachError) {
                console.error("Attachment fetch error:", attachError);
            } else if (attachData) {
                setAttachments(
                    attachData.map((a: any) => ({
                        id: a.id,
                        serviceId: a.vehicle_id,
                        fileName: a.file_name,
                        fileType: a.file_type,
                        fileSize: a.file_size,
                        fileLink: a.file_link,
                        createdAt: a.created_at,
                        createdBy: a.created_by,
                    }))
                );
            }
        };

        if (id) {
            fetchDetail();
        }
    }, [id]);

    const handleCancelService = () => {
        // Cancel logic here
        console.log("Cancel Service button clicked");
    };

    if (!service) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                {/* Service Info */}
                <div className="rounded-lg border bg-background p-5">
                    <h1 className="text-3xl font-bold">{service.ticketNum}</h1>
                    <Separator />
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between">
                            <TaskTypeBar taskType={service.type} />
                            <StatusBar status={service.status as Status} />
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            <SectionItem label="Jadwal Servis" value={service.scheduleDate} />
                            <SectionItem label="Servis Mulai" value={service.startDate} />
                            <SectionItem label="Servis Selesai" value={service.endDate} />
                        </div>

                        {(service.status === "pending" || service.status === "ongoing") && (
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
                                {service.status === "pending" ? (
                                    <StartServiceDialog service={service} />
                                ) : (
                                    <CompleteServiceDialog service={service} />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Vehicle and Location Info */}
                <div className="flex flex-col gap-5">
                    <Link to={`/kendaraan/detail/${service.vehicleId}`}>
                        <DataBarCard
                            variant="button"
                            type="kendaraan"
                            label={service.vehicle?.name}
                            description={service.vehicle?.licensePlate}
                        />

                    </Link>

                    {latestLocation && (
                        <Link to={`/kendaraan/detail/${service.vehicleId}/riwayat-lokasi`}>
                            <DataBarCard
                                variant="button"
                                type="lokasi"
                                label={latestLocation.name}
                                description={latestLocation.address}
                            />
                        </Link>
                    )}
                </div>

                {/* Rincian Servis */}
                <SectionCard
                    title="Rincian Servis"
                    headerAction={service.status === "ongoing" ? <EditServiceRecordDialog service={service} /> : undefined}
                >
                    <div className="grid grid-cols-2 gap-3 py-1">
                        <SectionItem label="Kilometer" value={`${service.mileage} KM`} />
                        <SectionItem label="Biaya" value={`Rp ${service.totalCost}`} />
                        <SectionItem label="Nama Mekanik" value={service.mechanicName} />
                        <SectionItem label="Jasa" value={service.task} />
                        <SectionItem label="Sparepart" value={service.sparepart} />
                        <SectionItem label="Catatan" value={service.notes} />
                    </div>
                </SectionCard>

                {/* Lampiran Dokumen */}
                <SectionCard title="Lampiran Dokumen" headerAction={<AddAttachmentServiceDialog serviceId={service.id} />}>
                    {attachments.length > 0 ? (
                        <div className="flex flex-col">
                            {attachments.map((att, idx) => (
                                <div key={att.id}>
                                    <AttachmentItem attachment={att} />
                                    {idx < attachments.length - 1 && <Separator className="my-4" />}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Belum ada lampiran.</p>
                    )}
                </SectionCard>
            </main>
        </div>
    );
}
