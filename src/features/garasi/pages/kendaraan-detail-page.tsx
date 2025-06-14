import { ChevronRight } from "lucide-react"
import { SectionCard } from "@/components/shared/section-card"
import SectionItem from "@/components/shared/section-item"
import { DataBarCard } from "@/components/shared/data-bar-card"
import { Button } from "@/components/shadcn/button"
import ServiceActivityItem from "../components/service-activity-item"
import { Separator } from "@/components/shadcn/separator"
import { ImageCarousel } from "../components/image-carousel"
import { EditDetailVehicleDialog } from "../components/edit-detail-vehicle-dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/shadcn/alert-dialog"
import { EditDetailStnkDialog } from "../components/edit-detail-stnk-dialog"
import { Vehicle } from "@/models/vehicle"
import { Service } from "@/models/service"
import { EditEquipmentVehicleDialog } from "../components/edit-equipment-vehicle-dialog"
import { Checkbox } from "@/components/shadcn/checkbox"
import AttachmentItem from "@/components/shared/attachment-item"
import { AttachmentVehicle } from "@/models/attachment-vehicle"
import { Administration } from "@/models/administration"
import { Stnk } from "@/models/stnk"
import { Param } from "@/models/param"
import { AddAttachmentVehicleDialog } from "../components/add-attachment-vehicle-dialog"
import AdministrationActivityItem from "../components/administration-activity-item"
import { Link } from "react-router-dom"

export default function KendaraanDetailPage() {
    const vehicle: Vehicle = {
        id: "1",
        name: "Honda Civic Turbo Hitam 2022",
        category: "Mobil",
        year: "2022",
        brand: "Honda",
        color: "Hitam",
        type: "Civic Turbo",
        licensePlate: "D 1234 ABC",
        stnkDueDate: "22 Feb 2026",
        insuranceDueDate: "1 Feb 2026",
        lastServiceDate: "15 Jul 2025",
        soldDate: "15 Jul 2025",
        isSold: false,
    };

    const stnk: Stnk = {
        id: "1",
        vehicleId: "1",
        licensePlate: "D 1234 ABC",
        stnkNumber: "123456789",
        ownerName: "Rainer Evan",
        ownerAddress: "Jl. Sukajadi VIII No. 57 RT1/2 Bandung",
        brand: "Honda",
        type: "Civic Turbo",
        category: "Mobil",
        model: "Sedan",
        manufacturedYear: "2022",
        cylinderCapacity: "1498 CC",
        chassisNumber: "MRHFC1610NT0023",
        engineNumber: "L15B7-1234567",
        color: "Hitam",
        fuelType: "Bensin",
        licensePlateColor: "Putih",
        registrationYear: "2023",
        bpkbNumber: "00123456789",
        registrationNumber: "001/002-1238/1234/0123",
        validUntil: "15 Jan 2028"
    };

    const latestLocation = {
        id: "1",
        vehicleId: "1",
        name: "Rumah Bandung",
        address: "Jl. Sukajadi No. 57, Bandung"
    }

    const listServis: Service[] = [
        {
            id: "1",
            vehicleId: "1",
            type: "servis-regular",
            scheduleDate: "15 Jan 2028",
            startDate: undefined,
            endDate: undefined,
            status: "pending",
        },
        {
            id: "2",
            vehicleId: "1",
            type: "servis-regular",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            endDate: undefined,
            status: "ongoing",
        },
        {
            id: "3",
            vehicleId: "1",
            type: "servis-regular",
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
            type: "administrasi-stnk-1tahun",
            dueDate: "15 Jan 2028",
            endDate: undefined,
            status: "pending",
        },
        {
            id: "2",
            vehicleId: "1",
            type: "administrasi-asuransi",
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
            name: "bpkb",
            description: "BPKB",
        },
        {
            id: "2",
            group: "003",
            name: "ban-cadangan",
            description: "Ban Cadangan",
        },
        {
            id: "3",
            group: "003",
            name: "dongkrak",
            description: "Dongkrak",
        },
        {
            id: "4",
            group: "003",
            name: "toolkit",
            description: "Toolkit",
        },
        {
            id: "5",
            group: "003",
            name: "kotak-p3k",
            description: "Kotak P3K",
        },
        {
            id: "6",
            group: "003",
            name: "dash-cam",
            description: "Dash Cam",
        }
    ]

    const handleDeleteVehicle = () => {
        console.log("Delete Kendaraan button clicked")
    }

    const handleSellVehicle = () => {
        console.log("Sell Kendaraan button clicked")
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
                                <SectionItem label="Jenis" value={vehicle.category} />
                                <SectionItem label="Tahun" value={vehicle.year} />
                                <SectionItem label="Merk" value={vehicle.brand} />
                                <SectionItem label="Warna" value={vehicle.color} />
                                <SectionItem label="Tipe" value={vehicle.type} />
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
                                        <AlertDialogCancel>Tidak</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteVehicle}>Hapus</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            {!vehicle.isSold && (
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
                                            <AlertDialogCancel>Tidak</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleSellVehicle}>Jual</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}

                            {vehicle.isSold && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="default">Aktifkan Kendaraan</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Aktifkan Kendaraan?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Apakah Anda yakin ingin mengaktifkan kendaraan {vehicle.name} kembali?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Tidak</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleSellVehicle}>Aktifkan</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="flex flex-col gap-5">
                    {/* Lokasi Bar */}
                    {latestLocation && (
                        <Link to={`/kendaraan/${vehicle.id}/riwayat-lokasi`}>
                            <DataBarCard
                                variant="button"
                                type="lokasi"
                                label={latestLocation.name}
                                description={latestLocation.address}
                            />
                        </Link >
                    )}

                    {/* Terjual Bar */}
                    {(vehicle.isSold && vehicle.soldDate) && (
                        <DataBarCard
                            variant="default"
                            type="terjual"
                            label={"Terjual"}
                            description={vehicle.soldDate}
                        />
                    )}

                    <div className="flex flex-col gap-5 md:flex-row">
                        {/* STNK Bar */}
                        <DataBarCard
                            variant="default"
                            type="administrasi-stnk-1tahun"
                            label="Jatuh Tempo STNK"
                            description={vehicle.stnkDueDate}
                        />

                        {/* Asuransi Bar */}
                        <DataBarCard
                            variant="default"
                            type="administrasi-asuransi"
                            label="Jatuh Tempo Asuransi"
                            description={vehicle.insuranceDueDate}
                        />

                        {/* Servis Bar */}
                        <DataBarCard
                            variant="default"
                            type="servis-regular"
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
                        collapsedHeight={140}
                    >
                        {stnk && (
                            <div className="flex flex-col gap-3 py-1">
                                <div className="grid grid-cols-2 gap-3 mb-5 md:mb-0">
                                    <SectionItem label="No Polisi" value={stnk.licensePlate} />
                                    <SectionItem label="No STNK" value={stnk.stnkNumber} />
                                    <SectionItem className="col-span-2 md:col-span-1" label="Nama Pemilik" value={stnk.ownerName} />
                                    <SectionItem className="col-span-2 md:col-span-1" label="Alamat" value={stnk.ownerAddress} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <SectionItem label="Merk" value={stnk.brand} />
                                    <SectionItem label="Warna" value={stnk.color} />
                                    <SectionItem label="Tipe" value={stnk.type} />
                                    <SectionItem label="Bahan Bakar" value={stnk.fuelType} />
                                    <SectionItem label="Jenis" value={stnk.category} />
                                    <SectionItem label="Warna TNKB" value={stnk.licensePlateColor} />
                                    <SectionItem label="Model" value={stnk.model} />
                                    <SectionItem label="Tahun Registrasi" value={stnk.registrationYear} />
                                    <SectionItem label="Tahun Pembuatan" value={stnk.manufacturedYear} />
                                    <SectionItem label="No BPKB" value={stnk.bpkbNumber} />
                                    <SectionItem label="Isi Silinder" value={stnk.cylinderCapacity} />
                                    <SectionItem label="No Pendaftaran" value={stnk.registrationNumber} />
                                    <SectionItem label="No Rangka" value={stnk.chassisNumber} />
                                    <SectionItem label="Berlaku Sampai" value={stnk.validUntil} />
                                    <SectionItem label="No Mesin" value={stnk.engineNumber} />
                                </div>
                            </div>
                        )}
                    </SectionCard>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Aktivitas Servis */}
                        <SectionCard
                            title="Aktivitas Servis"
                            headerAction={
                                <Link to={`/kendaraan/${vehicle.id}/aktivitas-servis`}>
                                    <Button variant="ghost" size="sm">
                                        <ChevronRight />
                                    </Button>
                                </Link >
                            }
                        >
                            {listServis.length > 0 && (
                                <div className="flex flex-col py-2">
                                    {
                                        listServis.map((servis, index) => (
                                            <div key={servis.id}>
                                                <ServiceActivityItem
                                                    service={servis}
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
                                <Link to={`/kendaraan/${vehicle.id}/aktivitas-administrasi`}>
                                    <Button variant="ghost" size="sm">
                                        <ChevronRight />
                                    </Button>
                                </Link >
                            }
                        >
                            {listAdministrasi.length > 0 && (
                                <div className="flex flex-col py-2">
                                    {
                                        listAdministrasi.map((administrasi, index) => (
                                            <div key={administrasi.id}>
                                                <AdministrationActivityItem
                                                    administrasi={administrasi}
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
                                        <Checkbox checked={vehicleEquipments.includes(item.name)} disabled />
                                        <label className="text-sm font-normal">
                                            {item.description}
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
