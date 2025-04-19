import { ChevronRight, Edit } from "lucide-react"
import { SectionCard } from "@/components/shared/section-card"
import SectionItem from "@/components/shared/section-item"
import { DataBarCard } from "@/components/shared/data-bar-card"
import { Button } from "@/components/shadcn/button"
import ServiceActivityItem from "../components/service-activity-item"
import { Separator } from "@/components/shadcn/separator"
import AdministrationActivityItem from "../components/administration-activity-item"
import { Status } from "@/lib/constants"
import { ImageCarousel } from "../components/image-carousel"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function VehicldeDetailPage() {
    // const vehicle = {
    //     jenis: "Mobil",
    //     tahun: "2022",
    //     merk: "Honda",
    //     warna: "Hitam",
    //     tipe: "Civic Turbo",
    //     platNo: "D 1234 ABC",
    //     dueDateSTNK: "15 Jan 2026",
    //     dueDateInsurance: "1 Feb 2026",
    //     lastDateService: "15 Jul 2025",
    // };

    // const stnk = {
    //     noPolisi: "D 1234 ABC",
    //     noSTNK: "123456789",
    //     merk: "Honda",
    //     warna: "Hitam",
    //     tipe: "Civic Turbo",
    //     bahanBakar: "Bensin",
    //     jenis: "Mobil",
    //     warnaTNKB: "Putih",
    //     model: "Sedan",
    //     tahunRegistrasi: "2023",
    //     tahunPembuatan: "2022",
    //     noBPKB: "00123456789",
    //     isiSilinder: "1498 CC",
    //     noUrutPendaftaran: "001/002-1238/1234/0123",
    //     noRangka: "MRHFC1610NT0023",
    //     kodeLokasi: "0123",
    //     noMesin: "L15B7-1234567",
    //     berlakuSampai: "15 Jan 2028",
    // };

    // const vehicleName = `${vehicle.merk} ${vehicle.tipe} ${vehicle.warna} ${vehicle.tahun}`

    // const location = {
    //     label: "Rumah Bandung",
    //     description: "Jl. Sukajadi No. 57, Bandung"
    // }

    const listServis = [
        {
            id: "1",
            type: "servisRegular",
            typeLabel: "Servis Regular",
            scheduleDate: "15 Jan 2028",
            status: "pending",
            statusLabel: "Pending"
        },
        {
            id: "2",
            type: "servisRegular",
            typeLabel: "Servis Regular",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            status: "inprogress",
            statusLabel: "In Progress"
        },
        {
            id: "3",
            type: "servisRegular",
            typeLabel: "Servis Regular",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "completed",
            statusLabel: "Completed"
        }
    ]

    const listAdministrasi = [
        {
            id: "1",
            type: "adminStnk",
            typeLabel: "Perpanjang STNK",
            dueDate: "15 Jan 2028",
            status: "pending",
            statusLabel: "Pending"
        },
        {
            id: "2",
            type: "adminAsuransi",
            typeLabel: "Perpanjang Asuransi",
            dueDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "completed",
            statusLabel: "Completed"
        },
        {
            id: "3",
            type: "adminAsuransi",
            typeLabel: "Perpanjang Asuransi",
            dueDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "cancelled",
            statusLabel: "Cancelled"
        }
    ]

    // const images = [
    //     "/assets/car.jpg?text=Front",
    //     "/assets/car.jpg?text=Front",
    //     "/assets/car.jpg?text=Front",
    //     "/assets/car.jpg?text=Front"
    // ]

    const handleEditDetailKendaraan = () => {
        console.log("Detail Kendaraan icon clicked")
    }

    const handleEditDetailSTNK = () => {
        console.log("Detail Kendaraan icon clicked")
    }

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

    const handleVehicleEquipment = () => {
        console.log("Vehicle Equipment button clicked")
    }

    const handleVehicleAttachment = () => {
        console.log("Vehicle Attachment button clicked")
    }

    const [vehicleData, setVehicleData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams() // asumsikan kamu pakai route /kendaraan/[id]
    const [stnkData, setStnkData] = useState<any>(null);

    const [images, setImages] = useState<string[]>([])

useEffect(() => {
    const fetchVehicleData = async () => {
        setLoading(true);

        // Fetch kendaraan
        const { data: vehicleData, error: vehicleError } = await supabase
            .rpc("get_kendaraan_latest_location")
            .eq("id", id);

        if (vehicleError) {
            console.error("Gagal fetch kendaraan:", vehicleError);
        } else {
            setVehicleData(vehicleData[0]);
        }

        // Fetch STNK
        const { data: stnkData, error: stnkError } = await supabase
            .from('stnk_kendaraan')
            .select('*')
            .eq('kendaraan_id', id)
            .order('berlaku_sampai', { ascending: false })
            .limit(1);

        if (stnkError) {
            console.error("Gagal fetch STNK:", stnkError);
        } else {
            setStnkData(stnkData[0]);
        }

        
        const { data: imageList, error: imageListError } = await supabase.storage
            .from('kendaraan') //nama bucket
            .list(`${id}`);
        console.log(imageList);
    

        if (imageListError) {
            console.error("Gagal fetch image list:", imageListError);
        } else {
            const urls = await Promise.all(
                imageList
                    .filter(file => file.name.endsWith(".jpg") || file.name.endsWith(".png"))
                    .map(file =>
                        supabase.storage
                            .from('kendaraan')
                            .getPublicUrl(`${id}/${file.name}`).data.publicUrl
                    )
            );
            setImages(urls);
        }

        setLoading(false);
    };

    if (id) fetchVehicleData();
}, [id]);

    if (loading) return <div>Loading...</div>
    if (!vehicleData || !stnkData) return <div>Data kendaraan atau STNK tidak ditemukan</div>;


    const location = {
        label: vehicleData.location_name,
        description: vehicleData.location_address
    }

    const vehicle = {
        jenis: vehicleData.jenis,
        tahun: vehicleData.tahun,
        merk: vehicleData.merek,
        warna: vehicleData.warna,
        tipe: vehicleData.tipe,
        platNo: vehicleData.plat_no,
        dueDateSTNK: stnkData.berlaku_sampai, // Gunakan tanggal berlaku_sampai dari STNK
        dueDateInsurance: vehicleData.asuransi_berlaku_sampai, // optional
        lastDateService: "15 Jul 2025", // optional
    };

    const vehicleName = `${vehicle.merk} ${vehicle.tipe} ${vehicle.warna} ${vehicle.tahun}`


    const stnk = {
        noSTNK: stnkData.no_stnk,
        bahanBakar: stnkData.bahan_bakar,
        warnaTNKB: stnkData.warna_tnkb,
        tahunRegistrasi: stnkData.tahun_registrasi,
        tahunPembuatan: stnkData.tahun_pembuatan,
        noBPKB: stnkData.no_bpkb,
        isiSilinder: stnkData.isi_silinder,
        noUrutPendaftaran: stnkData.no_urut_pendaftaran,
        noRangka: stnkData.no_rangka,
        kodeLokasi: stnkData.kode_lokasi,
        noMesin: stnkData.no_mesin,
        berlakuSampai: stnkData.berlaku_sampai,
        model :stnkData.model
    };


   

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold">{vehicleName}</h1>
                </div>

                {/* Vehicle Details */}
                <div className="grid grid-cols-1 gap-5 rounded-lg border bg-background p-5 md:grid-cols-7">

                    {/* Image Carousel */}
                    <div className="col-span-1 md:col-span-4">
                        <ImageCarousel images={images} name={vehicleName} />
                    </div>

                    <div className="col-span-1 md:col-span-3 w-full flex flex-col justify-between gap-3">
                        {/* Details */}
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-5 items-center justify-between">
                                <h1 className="font-semibold">Detail Kendaraan</h1>
                                <Button variant="outline" size="sm" onClick={handleEditDetailKendaraan}>
                                    <Edit />Ubah
                                </Button>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-3 py-1">
                                <SectionItem label="Jenis" value={vehicle.jenis} />
                                <SectionItem label="Tahun" value={vehicle.tahun} />
                                <SectionItem label="Merk" value={vehicle.merk} />
                                <SectionItem label="Warna" value={vehicle.warna} />
                                <SectionItem label="Tipe" value={vehicle.tipe} />
                                <SectionItem label="Plat No" value={vehicle.platNo} />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Button onClick={handleDeleteVehicle} variant="destructive">Hapus Kendaraan</Button>
                            <Button onClick={handleSellVehicle} variant="default">Jual Kendaraan</Button>
                        </div>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5 md:flex-row">
                        {/* Lokasi Bar */}
                        <DataBarCard
                            variant="link"
                            type="lokasi"
                            label={location.label}
                            description={location.description}
                            urlLink="riwayat-lokasi"
                        />
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row">
                        {/* STNK Bar */}
                        <DataBarCard
                            variant="default"
                            type="adminStnk"
                            label="Jatuh Tempo STNK"
                            description={vehicle.dueDateSTNK}
                        />

                        {/* Asuransi Bar */}
                        <DataBarCard
                            variant="default"
                            type="adminAsuransi"
                            label="Jatuh Tempo Asuransi"
                            description={vehicle.dueDateInsurance}
                        />

                        {/* Servis Bar */}
                        <DataBarCard
                            variant="default"
                            type="servisRegular"
                            label="Servis Terakhir"
                            description={vehicle.dueDateSTNK}
                        />
                    </div>
                </div>

                {/* Sections */}
                <div className="flex flex-col gap-5 overflow-auto">
                    {/* STNK Details */}
                    <SectionCard
                        title="Detail STNK"
                        headerAction={
                            <Button variant="outline" size="sm" onClick={handleEditDetailSTNK}>
                                <Edit />Ubah
                            </Button>
                        }
                        collapsible
                        defaultCollapsed={true}
                        collapsedHeight={100}
                    >
     
                        <div className="grid grid-cols-2 gap-3 py-1">
                            <SectionItem label="No Polisi" value={vehicleData.plat_no} />
                            <SectionItem label="No STNK" value={stnk.noSTNK} />
                            <SectionItem label="Merk" value={vehicleData.merek} />
                            <SectionItem label="Warna" value={vehicleData.warna} />
                            <SectionItem label="Tipe" value={vehicleData.tipe} />
                            <SectionItem label="Bahan Bakar" value={stnk.bahanBakar} />
                            <SectionItem label="Jenis" value={vehicleData.jenis} />
                            <SectionItem label="Warna TNKB" value={stnk.warnaTNKB} />
                            <SectionItem label="Model" value={stnk.model} />
                            <SectionItem label="Tahun Registrasi" value={stnk.tahunRegistrasi} />
                            <SectionItem label="Tahun Pembuatan" value={stnk.tahunPembuatan} />
                            <SectionItem label="No BPKB" value={stnk.noBPKB} />
                            <SectionItem label="Isi Silinder" value={stnk.isiSilinder} />
                            <SectionItem label="No Urut Pendaftaran" value={stnk.noUrutPendaftaran} />
                            <SectionItem label="No Rangka" value={stnk.noRangka} />
                            <SectionItem label="Kode Lokasi" value={stnk.kodeLokasi} />
                            <SectionItem label="No Mesin" value={stnk.noMesin} />
                            <SectionItem label="Berlaku Sampai" value={stnk.berlakuSampai} />
                        </div>
                    </SectionCard>

                    {/* Aktivitas Servis */}
                    <SectionCard
                        title="Aktivitas Servis"
                        collapsible
                        defaultCollapsed={true}
                        collapsedHeight={100}
                        headerAction={
                            <Button variant="ghost" size="sm" onClick={handleServiceActivity}>
                                <ChevronRight />
                            </Button>
                        }
                    >
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
                                            statusLabel={item.statusLabel}
                                        />
                                        {index < listServis.length - 1 && (
                                            <Separator className="my-4" />
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    </SectionCard>

                    {/* Aktivitas Administrasi */}
                    <SectionCard
                        title="Aktivitas Administrasi"
                        collapsible
                        defaultCollapsed={true}
                        collapsedHeight={100}
                        headerAction={
                            <Button variant="ghost" size="sm" onClick={handleAdministrationActivity}>
                                <ChevronRight />
                            </Button>
                        }
                    >
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
                                            statusLabel={item.statusLabel}
                                        />
                                        {index < listServis.length - 1 && (
                                            <Separator className="my-4" />
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    </SectionCard>

                    {/* Kelengkapan Kendaraan */}
                    <SectionCard
                        title="Kelengkapan Kendaraan"
                        collapsible
                        defaultCollapsed={true}
                        collapsedHeight={100}
                        headerAction={
                            <Button variant="ghost" size="sm" onClick={handleVehicleEquipment}>
                                <ChevronRight />
                            </Button>
                        }
                    >
                    </SectionCard>

                    {/* Lampiran Dokumen */}
                    <SectionCard
                        title="Lampiran Dokumen"
                        collapsible
                        defaultCollapsed={true}
                        collapsedHeight={100}
                        headerAction={
                            <Button variant="ghost" size="sm" onClick={handleVehicleAttachment}>
                                <ChevronRight />
                            </Button>
                        }
                    >
                    </SectionCard>
                </div>
            </main>
        </div>
    )
}
