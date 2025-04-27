import { ChevronRight } from "lucide-react"
import { SectionCard } from "@/components/shared/section-card"
import SectionItem from "@/components/shared/section-item"
import { DataBarCard } from "@/components/shared/data-bar-card"
import { Button } from "@/components/shadcn/button"
import ServiceActivityItem from "../components/service-activity-item"
import { Separator } from "@/components/shadcn/separator"
import AdministrationActivityItem from "../components/administration-activity-item"
import { Status, StatusLabel } from "@/lib/constants"
import { ImageCarousel } from "../components/image-carousel"
import { EditDetailVehicleDialog } from "../components/edit-detail-vehicle-dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/shadcn/alert-dialog"
import { EditDetailStnkDialog } from "../components/edit-detail-stnk-dialog"
import { Vehicle } from "@/models/vehicle"
import { Service } from "@/models/service"
import { EditEquipmentVehicleDialog } from "../components/edit-equipment-vehicle-dialog"
import { Checkbox } from "@/components/shadcn/checkbox"
import { HistoryLocationVehicleDialog } from "../components/history-location-vehicle-dialog"
import AttachmentItem from "@/components/shared/attachment-item"
import { AttachmentVehicle } from "@/models/attachment-vehicle"
import { Administration } from "@/models/administration"
import { Stnk } from "@/models/stnk"
import { Param } from "@/models/param"
import { AddAttachmentVehicleDialog } from "../components/add-attachment-vehicle-dialog"

export default function KendaraanDetailPage() {
    const vehicle: Vehicle = {
        id: "1",
        name: "Honda Civic Turbo Hitam 2022",
        type: "mobil",
        year: "2022",
        brand: "honda",
        color: "Hitam",
        model: "Civic Turbo",
        licensePlate: "D 1234 ABC",
        stnkDueDate: "22 Feb 2026",
        insuranceDueDate: "1 Feb 2026",
        lastServiceDate: "15 Jul 2025",
    };

    const stnk: Stnk = {
        id: "1",
        vehicleId: "1",
        licensePlate: "D 1234 ABC",
        stnkNumber: "123456789",
        brand: "Honda",
        color: "Hitam", 
        model: "Civic Turbo", 
        fuelType: "Bensin",
        type: "Mobil",
        tnkbColor: "Putih",
        bodyModel: "Sedan",
        registrationYear: "2023",
        manufactureYear: "2022",
        bpkbNumber: "00123456789",
        engineCapacity: "1498 CC",
        registrationOrderNumber: "001/002-1238/1234/0123",
        chassisNumber: "MRHFC1610NT0023",
        locationCode: "0123",
        engineNumber: "L15B7-1234567",
        validUntil: "15 Jan 2028",
    };

    const location = {
        id: "1",
        vehicleId: "1",
        name: "Rumah Bandung",
        address: "Jl. Sukajadi No. 57, Bandung"
    }

    const listServis: Service[] = [
        {
            id: "1",
            vehicleId: "1",
            type: "servisRegular",
            typeLabel: "Servis Regular",
            scheduleDate: "15 Jan 2028",
            startDate: undefined,
            endDate: undefined,
            status: "pending",
        },
        {
            id: "2",
            vehicleId: "1",
            type: "servisRegular",
            typeLabel: "Servis Regular",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            endDate: undefined,
            status: "inprogress",
        },
        {
            id: "3",
            vehicleId: "1",
            type: "servisRegular",
            typeLabel: "Servis Regular",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "completed",
        }
    ]

    const listAdministrasi: Administration[] = [
        {
            id: "1",
            vehicleId: "1",
            type: "adminStnk",
            typeLabel: "Perpanjang STNK",
            dueDate: "15 Jan 2028",
            endDate: undefined,
            status: "pending",
        },
        {
            id: "2",
            vehicleId: "1",
            type: "adminAsuransi",
            typeLabel: "Perpanjang Asuransi",
            dueDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "completed",
        }
    ]

    const listAttachment: AttachmentVehicle[] = [
        {
            id: "1",
            vehicleId: "1",
            fileName: "Dokumen STNK.pdf",
            fileType: "pdf",
            fileSize: "1 MB",
            fileLink: "dokumen-stnk-link",
            createdAt: "12 Jan 2025",
            createdBy: "rainerevan"
        },
        {
            id: "2",
            vehicleId: "1",
            fileName: "Dokumen BPKB.pdf",
            fileType: "pdf",
            fileSize: "300 KB",
            fileLink: "dokumen-bpkb-link",
            createdAt: "11 Jan 2025",
            createdBy: "rainerevan"
        },
    ]

    const images = [
        "/assets/car.jpg?text=Front",
        "/assets/car.jpg?text=Front",
        "/assets/car.jpg?text=Front",
    ]

    const vehicleEquipments = ["bpkb", "ban-cadangan"];

    const equipmentParam: Param[] = [
        {
            id: "1",
            group: "003",
            key: "bpkb",
            name: "BPKB",
        },
        {
            id: "2",
            group: "003",
            key: "ban-cadangan",
            name: "Ban Cadangan",
        },
        {
            id: "3",
            group: "003",
            key: "dongkrak",
            name: "Dongkrak",
        },
        {
            id: "4",
            group: "003",
            key: "toolkit",
            name: "Toolkit",
        },
        {
            id: "5",
            group: "003",
            key: "kotak-p3k",
            name: "Kotak P3K",
        },
        {
            id: "6",
            group: "003",
            key: "dash-cam",
            name: "Dash Cam",
        }
    ]

    const handleDeleteVehicle = () => {
        console.log("Delete Kendaraan button clicked")
    }

    const handleSellVehicle = () => {
        console.log("Sell Kendaraan button clicked")
    }

    const handleServiceActivity = () => {
        console.log("Service Activity button clicked")
    }

    const handleAdministrationActivity = () => {
        console.log("Administration Activity button clicked")
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold">{vehicle.name}</h1>
                </div>

                {/* Vehicle Details */}
                <div className="grid grid-cols-1 rounded-lg border bg-background md:grid-cols-7">

                    {/* Image Carousel */}
                    <div className="col-span-1 md:col-span-4 md:p-5 md:pr-0">
                        <ImageCarousel images={images} />
                    </div>

                    <div className="col-span-1 md:col-span-3 w-full flex flex-col justify-between gap-3 p-5">
                        {/* Details */}
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-5 items-center justify-between">
                                <h1 className="font-semibold">Detail Kendaraan</h1>
                                <EditDetailVehicleDialog vehicle={vehicle} />
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-3 py-1">
                                <SectionItem label="Jenis" value={vehicle.type} />
                                <SectionItem label="Tahun" value={vehicle.year} />
                                <SectionItem label="Merk" value={vehicle.brand} />
                                <SectionItem label="Warna" value={vehicle.color} />
                                <SectionItem label="Model" value={vehicle.model} />
                                <SectionItem label="Plat No" value={vehicle.licensePlate} />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse gap-3 sm:grid sm:grid-cols-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Hapus Kendaraan</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Hapus Kendaraan?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah Anda yakin ingin menghapus kendaraan {vehicle.name}?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteVehicle}>Hapus</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="default">Jual Kendaraan</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Jual Kendaraan?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah Anda yakin ingin menjual kendaraan {vehicle.name}?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleSellVehicle}>Jual</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5 md:flex-row">
                        {/* Lokasi Bar */}
                        <HistoryLocationVehicleDialog location={location} />
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row">
                        {/* STNK Bar */}
                        <DataBarCard
                            variant="default"
                            type="adminStnk"
                            label="Jatuh Tempo STNK"
                            description={vehicle.stnkDueDate}
                        />

                        {/* Asuransi Bar */}
                        <DataBarCard
                            variant="default"
                            type="adminAsuransi"
                            label="Jatuh Tempo Asuransi"
                            description={vehicle.insuranceDueDate}
                        />

                        {/* Servis Bar */}
                        <DataBarCard
                            variant="default"
                            type="servisRegular"
                            label="Servis Terakhir"
                            description={vehicle.lastServiceDate}
                        />
                    </div>
                </div>

                {/* Sections */}
                <div className="flex flex-col gap-5 overflow-auto">
                    {/* STNK Details */}
                    <SectionCard
                        title="Detail STNK"
                        headerAction={
                            <EditDetailStnkDialog stnk={stnk} />
                        }
                        collapsible
                        defaultCollapsed={true}
                        collapsedHeight={100}
                    >
                        {stnk && (
                            <div className="grid grid-cols-2 gap-3 py-1 md:grid-cols-3">
                                <SectionItem label="No Polisi" value={stnk.licensePlate} />
                                <SectionItem label="No STNK" value={stnk.stnkNumber} />
                                <SectionItem label="Merk" value={stnk.brand} />
                                <SectionItem label="Warna" value={stnk.color} />
                                <SectionItem label="Tipe" value={stnk.model} />
                                <SectionItem label="Bahan Bakar" value={stnk.fuelType} />
                                <SectionItem label="Jenis" value={stnk.type} />
                                <SectionItem label="Warna TNKB" value={stnk.tnkbColor} />
                                <SectionItem label="Model" value={stnk.bodyModel} />
                                <SectionItem label="Tahun Registrasi" value={stnk.registrationYear} />
                                <SectionItem label="Tahun Pembuatan" value={stnk.manufactureYear} />
                                <SectionItem label="No BPKB" value={stnk.bpkbNumber} />
                                <SectionItem label="Isi Silinder" value={stnk.engineCapacity} />
                                <SectionItem label="No Urut Pendaftaran" value={stnk.registrationOrderNumber} />
                                <SectionItem label="No Rangka" value={stnk.chassisNumber} />
                                <SectionItem label="Kode Lokasi" value={stnk.locationCode} />
                                <SectionItem label="No Mesin" value={stnk.engineNumber} />
                                <SectionItem label="Berlaku Sampai" value={stnk.validUntil} />
                            </div>
                        )}
                    </SectionCard>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Aktivitas Servis */}
                        <SectionCard
                            title="Aktivitas Servis"
                            headerAction={
                                <Button variant="ghost" size="sm" onClick={handleServiceActivity}>
                                    <ChevronRight />
                                </Button>
                            }
                        >
                            {listServis.length > 0 && (
                                <div className="flex flex-col py-2">
                                    {
                                        listServis.map((item, index) => (
                                            <div key={item.id}>
                                                <ServiceActivityItem
                                                    id={item.id}
                                                    type={item.type as "servisRegular" | "servisHeavy"}
                                                    typeLabel={item.typeLabel}
                                                    scheduleDate={item.scheduleDate}
                                                    startDate={item.startDate}
                                                    endDate={item.endDate}
                                                    status={item.status as Status}
                                                    statusLabel={StatusLabel[item.status as Status]}
                                                />
                                                {index < listServis.length - 1 && (
                                                    <Separator className="my-4" />
                                                )}
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </SectionCard>

                        {/* Aktivitas Administrasi */}
                        <SectionCard
                            title="Aktivitas Administrasi"
                            headerAction={
                                <Button variant="ghost" size="sm" onClick={handleAdministrationActivity}>
                                    <ChevronRight />
                                </Button>
                            }
                        >
                            {listAdministrasi.length > 0 && (
                                <div className="flex flex-col py-2">
                                    {
                                        listAdministrasi.map((item, index) => (
                                            <div key={item.id}>
                                                <AdministrationActivityItem
                                                    id={item.id}
                                                    type={item.type as "adminStnk" | "adminAsuransi"}
                                                    typeLabel={item.typeLabel}
                                                    dueDate={item.dueDate}
                                                    endDate={item.endDate}
                                                    status={item.status as Status}
                                                    statusLabel={StatusLabel[item.status as Status]}
                                                />
                                                {index < listAdministrasi.length - 1 && (
                                                    <Separator className="my-4" />
                                                )}
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </SectionCard>
                    </div>

                    {/* Kelengkapan Kendaraan */}
                    <SectionCard
                        title="Kelengkapan Kendaraan"
                        headerAction={
                            <EditEquipmentVehicleDialog
                                equipmentParam={equipmentParam}
                                vehicleEquipments={vehicleEquipments}
                            />
                        }
                    >
                        {equipmentParam.length > 0 && (
                            <div className={`grid gap-5 p-2 ${equipmentParam.length > 5 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                                {equipmentParam.map((item) => (
                                    <div key={item.id} className="flex flex-row items-center space-x-3 space-y-0">
                                        <Checkbox checked={item.id ? vehicleEquipments.includes(item.key) : false} disabled />
                                        <label className="text-sm font-normal">
                                            {item.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </SectionCard>

                    {/* Lampiran Dokumen */}
                    <SectionCard
                        title="Lampiran Dokumen"
                        headerAction={
                            <AddAttachmentVehicleDialog vehicleId={vehicle.id} />
                        }
                        collapsible
                        defaultCollapsed={true}
                        collapsedHeight={60}
                    >
                        {listAttachment.length > 0 && (
                            <div className="flex flex-col">
                                {
                                    listAttachment.map((item, index) => (
                                        <div key={item.id}>
                                            <AttachmentItem
                                                id={item.id}
                                                vehicleId="{item.vehicleId}"
                                                fileName={item.fileName}
                                                fileType={item.fileType}
                                                fileSize={item.fileSize}
                                                fileLink={item.fileLink}
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
