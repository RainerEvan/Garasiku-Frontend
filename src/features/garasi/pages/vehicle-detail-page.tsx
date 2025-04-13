import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Calendar, Shield, PenToolIcon as Tool, Plus, Edit, IdCard, Wrench, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { DetailSectionCard } from "@/components/custom/detail-section-card"
import DetailSectionItem from "@/components/custom/detail-section-item"
import { DataBarCard } from "@/components/custom/data-bar-card"
import { Button } from "@/components/shadcn/button"

export default function VehicldeDetailPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  const vehicle = {
    jenis: "Mobil",
    tahun: "2022",
    merk: "Honda",
    warna: "Hitam",
    tipe: "Civic Turbo",
    platNo: "D 1234 ABC",
    dueDateSTNK: "15 Jan 2026",
    dueDateInsurance: "1 Feb 2026",
    lastDateService: "15 Jul 2025",
  };

  const stnk = {
    noPolisi: "D 1234 ABC",
    noSTNK: "123456789",
    merk: "Honda",
    warna: "Hitam",
    tipe: "Civic Turbo",
    bahanBakar: "Bensin",
    jenis: "Mobil",
    warnaTNKB: "Putih",
    model: "Sedan",
    tahunRegistrasi: "2023",
    tahunPembuatan: "2022",
    noBPKB: "00123456789",
    isiSilinder: "1498 CC",
    noUrutPendaftaran: "001/002-1238/1234/0123",
    noRangka: "MRHFC1610NT0023",
    kodeLokasi: "0123",
    noMesin: "L15B7-1234567",
    berlakuSampai: "15 Jan 2028",
  };

  const location = {
    label: "Rumah Bandung",
    description: "Jl. Sukajadi No. 57, Bandung"
  }

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="grid grid-cols-1 md:gap-6 md:max-w-6xl md:mx-auto md:w-full md:grid-cols-2 md:p-6">
        {/* Details */}
        <div className="flex-1 flex flex-col md:gap-5">
            {/* Carousel */}
            <div className="relative bg-[#e3e3e3] h-48 md:h-64 flex items-center justify-center">
                <button onClick={prevSlide} className="absolute left-2 z-10 bg-white/80 rounded-full p-1">
                    <ChevronLeft className="h-5 w-5 text-[#1e1e1e]" />
                </button>

                <div className="w-32 h-32 bg-[#d9d9d9] rounded-md flex items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M19 19H5V5H19M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3Z"
                        fill="#b2b2b2"
                        />
                        <path d="M12 17H17V12H12M12 7H7V12H12V7Z" fill="#b2b2b2" />
                    </svg>
                </div>

                <button onClick={nextSlide} className="absolute right-2 z-10 bg-white/80 rounded-full p-1">
                    <ChevronRight className="h-5 w-5 text-[#1e1e1e]" />
                </button>

                {/* Pagination dots */}
                <div className="absolute bottom-2 flex gap-1 justify-center w-full">
                {[...Array(totalSlides)].map((_, i) => (
                    <div key={i} className={cn("w-2 h-2 rounded-full", currentSlide === i ? "bg-white" : "bg-white/50")} />
                ))}
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5 p-4 md:p-0">
                <h1 className="text-3xl font-bold">Honda Civic</h1>

                {/* Detail Kendaraan */}
                <DetailSectionCard 
                    title="Detail Kendaraan"
                    icon={Edit}
                    onIconClick={handleEditDetailKendaraan} 
                >
                    <DetailSectionItem label="Jenis" value={vehicle.jenis} />
                    <DetailSectionItem label="Tahun" value={vehicle.tahun} />
                    <DetailSectionItem label="Merk" value={vehicle.merk} />
                    <DetailSectionItem label="Warna" value={vehicle.warna} />
                    <DetailSectionItem label="Tipe" value={vehicle.tipe} />
                    <DetailSectionItem label="Plat No" value={vehicle.platNo} />
                </DetailSectionCard>

                {/* Lokasi Bar */}
                <DataBarCard
                    variant="link"
                    label={location.label}
                    description={location.description}
                    icon={MapPin}
                    urlLink="history-lokasi"
                />

                {/* STNK Bar */}
                <DataBarCard
                    variant="default"
                    label="Jatuh Tempo STNK"
                    description={vehicle.dueDateSTNK}
                    icon={IdCard}
                />

                {/* Asuransi Bar */}
                <DataBarCard
                    variant="default"
                    label="Jatuh Tempo Asuransi"
                    description={vehicle.dueDateSTNK}
                    icon={ShieldCheck}
                />

                {/* Servis Bar */}
                <DataBarCard
                    variant="default"
                    label="Servis Terakhir"
                    description={vehicle.dueDateSTNK}
                    icon={Wrench}
                />

                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-3">
                    <Button onClick={handleDeleteVehicle} variant="destructive">Hapus Kendaraan</Button>
                    <Button onClick={handleSellVehicle}>Jual Kendaraan</Button>
                </div>
            </div>
        </div>
        
        {/* Sections */}
        <div className="flex-1 flex flex-col gap-5 p-4 md:p-0 overflow-auto">
            {/* STNK Details */}
            <DetailSectionCard 
                title="Detail STNK" 
                icon={Edit} 
                onIconClick={handleEditDetailSTNK}
                collapsible
                defaultCollapsed={true}
                collapsedHeight={100}
            >
                <DetailSectionItem label="No Polisi" value={stnk.noPolisi} />
                <DetailSectionItem label="No STNK" value={stnk.noSTNK} />
                <DetailSectionItem label="Merk" value={stnk.merk} />
                <DetailSectionItem label="Warna" value={stnk.warna} />
                <DetailSectionItem label="Tipe" value={stnk.tipe} />
                <DetailSectionItem label="Bahan Bakar" value={stnk.bahanBakar} />
                <DetailSectionItem label="Jenis" value={stnk.jenis} />
                <DetailSectionItem label="Warna TNKB" value={stnk.warnaTNKB} />
                <DetailSectionItem label="Model" value={stnk.model} />
                <DetailSectionItem label="Tahun Registrasi" value={stnk.tahunRegistrasi} />
                <DetailSectionItem label="Tahun Pembuatan" value={stnk.tahunPembuatan} />
                <DetailSectionItem label="No BPKB" value={stnk.noBPKB} />
                <DetailSectionItem label="Isi Silinder" value={stnk.isiSilinder} />
                <DetailSectionItem label="No Urut Pendaftaran" value={stnk.noUrutPendaftaran} />
                <DetailSectionItem label="No Rangka" value={stnk.noRangka} />
                <DetailSectionItem label="Kode Lokasi" value={stnk.kodeLokasi} />
                <DetailSectionItem label="No Mesin" value={stnk.noMesin} />
                <DetailSectionItem label="Berlaku Sampai" value={stnk.berlakuSampai} />
            </DetailSectionCard>

            {/* Service Activities */}
            <div className="mb-4">
            <h2 className="font-semibold mb-3">Aktivitas Servis</h2>

            {/* Service Item 1 */}
            <div className="bg-white rounded-md p-4 mb-2 shadow-sm">
                <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                    <Tool className="h-4 w-4 text-[#757575]" />
                    <span className="font-medium">Servis Regular</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#6699cc]"></div>
                    <span className="text-xs text-[#757575]">Pending</span>
                </div>
                </div>
                <div className="grid grid-cols-3 text-xs text-[#757575]">
                <div>
                    <div>Jadwal Servis</div>
                    <div>15 Jan 2026</div>
                </div>
                <div>
                    <div>Servis Mulai</div>
                    <div>-</div>
                </div>
                <div>
                    <div>Servis Selesai</div>
                    <div>-</div>
                </div>
                </div>
            </div>

            {/* Service Item 2 */}
            <div className="bg-white rounded-md p-4 mb-2 shadow-sm">
                <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                    <Tool className="h-4 w-4 text-[#757575]" />
                    <span className="font-medium">Servis Heavy</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#0055aa]"></div>
                    <span className="text-xs text-[#757575]">In Progress</span>
                </div>
                </div>
                <div className="grid grid-cols-3 text-xs text-[#757575]">
                <div>
                    <div>Jadwal Servis</div>
                    <div>1 Sep 2025</div>
                </div>
                <div>
                    <div>Servis Mulai</div>
                    <div>1 Sep 2025</div>
                </div>
                <div>
                    <div>Servis Selesai</div>
                    <div>-</div>
                </div>
                </div>
            </div>

            {/* Service Item 3 */}
            <div className="bg-white rounded-md p-4 mb-2 shadow-sm">
                <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                    <Tool className="h-4 w-4 text-[#757575]" />
                    <span className="font-medium">Servis Regular</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#002244]"></div>
                    <span className="text-xs text-[#757575]">Completed</span>
                </div>
                </div>
                <div className="grid grid-cols-3 text-xs text-[#757575]">
                <div>
                    <div>Jadwal Servis</div>
                    <div>15 Jul 2025</div>
                </div>
                <div>
                    <div>Servis Mulai</div>
                    <div>17 Jul 2025</div>
                </div>
                <div>
                    <div>Servis Selesai</div>
                    <div>17 Jul 2025</div>
                </div>
                </div>
            </div>
            </div>

            {/* Administration Activities */}
            <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold">Aktivitas Administrasi</h2>
                <ChevronRight className="h-5 w-5 text-[#757575]" />
            </div>

            {/* Admin Item 1 */}
            <div className="bg-white rounded-md p-4 mb-2 shadow-sm">
                <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#757575]" />
                    <span className="font-medium">Perpanjang STNK</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#6699cc]"></div>
                    <span className="text-xs text-[#757575]">Pending</span>
                </div>
                </div>
                <div className="grid grid-cols-2 text-xs text-[#757575]">
                <div>
                    <div>Jatuh Tempo</div>
                    <div>15 Jan 2026</div>
                </div>
                <div>
                    <div>Administrasi Selesai</div>
                    <div>-</div>
                </div>
                </div>
            </div>

            {/* Admin Item 2 */}
            <div className="bg-white rounded-md p-4 mb-2 shadow-sm">
                <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#757575]" />
                    <span className="font-medium">Perpanjang Asuransi</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#6699cc]"></div>
                    <span className="text-xs text-[#757575]">Pending</span>
                </div>
                </div>
                <div className="grid grid-cols-2 text-xs text-[#757575]">
                <div>
                    <div>Jatuh Tempo</div>
                    <div>1 Feb 2026</div>
                </div>
                <div>
                    <div>Administrasi Selesai</div>
                    <div>-</div>
                </div>
                </div>
            </div>

            {/* Admin Item 3 */}
            <div className="bg-white rounded-md p-4 mb-2 shadow-sm">
                <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#757575]" />
                    <span className="font-medium">Perpanjang STNK</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#002244]"></div>
                    <span className="text-xs text-[#757575]">Completed</span>
                </div>
                </div>
                <div className="grid grid-cols-2 text-xs text-[#757575]">
                <div>
                    <div>Jatuh Tempo</div>
                    <div>15 Jan 2025</div>
                </div>
                <div>
                    <div>Administrasi Selesai</div>
                    <div>2 Jan 2025</div>
                </div>
                </div>
            </div>
            </div>

            {/* Kelengkapan Kendaraan */}
            <DetailSectionCard 
                title="Kelengkapan Kendaraan" 
                icon={Edit} 
                onIconClick={handleEditDetailSTNK}
                collapsible
                defaultCollapsed={true}
                collapsedHeight={100}
            >
            </DetailSectionCard>

            {/* Lampiran Dokumen */}
            <DetailSectionCard 
                title="Lampiran Dokumen" 
                icon={Edit} 
                onIconClick={handleEditDetailSTNK}
                collapsible
                defaultCollapsed={true}
                collapsedHeight={100}
            >
            </DetailSectionCard>
        </div>
      </main>
    </div>
  )
}
