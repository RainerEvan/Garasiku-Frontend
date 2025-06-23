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
        )
      `)
                .eq("id", id)
                .maybeSingle();

            if (serviceError) {
                console.error("Service fetch error:", serviceError);
                return;
            }

            console.log(serviceData);
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

            const { data: locationData, error: locationError } = await supabase
                .from("vehicle_locations")
                .select("*")
                .eq("vehicle_id", svc.vehicle_id)
                .order("created_at", { ascending: false })
                .limit(1);

            if (locationError) {
                console.error("Location fetch error:", locationError);
            } else if (locationData?.length > 0) {
                const loc = locationData[0];
                setLatestLocation({
                    id: loc.id,
                    vehicleId: svc.vehicle_id,
                    name: loc.name,
                    address: loc.address,
                });
            }

            const { data: attachData, error: attachError } = await supabase
                .from("attachment_vehicle")
                .select("*")
                .eq("vehicle_id", svc.vehicle_id)
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
        console.log("Cancel Service button clicked");
    };

    if (!service) return <div>Loading...</div>;

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
                                    <StartServiceDialog service={service} />
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
                                    <CompleteServiceDialog service={service} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="flex flex-col gap-5">
                    {/* Vehicle Bar */}
                    <Link to={`/kendaraan/detail/${service.vehicleId}`}>
                        <DataBarCard
                            variant="button"
                            type="kendaraan"
                            label={service.vehicle?.name}
                            description={service.vehicle?.licensePlate}
                        />
                    </Link >

                    {/* Lokasi Bar */}
                    {latestLocation && (
                        <Link to={`/kendaraan/detail/${service.vehicleId}/riwayat-lokasi`}>
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
                                    <EditServiceRecordDialog service={service} />
                                )}
                            </>
                        }
                    >
                        {service && (
                            <div className="grid grid-cols-1 gap-3 py-1">
                                <div className="grid grid-cols-2 gap-3">
                                    <SectionItem label="Kilometer" value={`${service.mileage} KM`} />
                                    <SectionItem label="Biaya" value={`Rp ${service.totalCost}`} />
                                </div>
                                <SectionItem label="Nama Mekanik" value={service.mechanicName} />
                                <SectionItem label="Jasa" value={service.task} />
                                <SectionItem label="Sparepart" value={service.sparepart} />
                                <SectionItem label="Catatan" value={service.notes} />
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
                        {attachments.length > 0 && (
                            <div className="flex flex-col">
                                {
                                    attachments.map((attachment, index) => (
                                        <div key={attachment.id}>
                                            <AttachmentItem
                                                attachment={attachment}
                                            />
                                            {index < attachments.length - 1 && (
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
