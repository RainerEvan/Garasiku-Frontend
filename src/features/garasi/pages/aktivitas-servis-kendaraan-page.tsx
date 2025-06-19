import { ArrowDownNarrowWide, ArrowUpNarrowWide, Search, Wrench } from "lucide-react";
import { Service } from "@/models/service";
import { ServiceCard } from "@/features/servis/components/service-card";
import { Input } from "@/components/shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { Button } from "@/components/shadcn/button";
import { useLoading } from "@/lib/loading-context";
import { useEffect, useMemo, useState } from "react";
import { SERVICE_TYPE_PARAM, STATUS_PARAM } from "@/lib/constants";
import { Param } from "@/models/param";

type SelectOption = {
    label: string
    value: string
}

export default function AktivitasServisKendaraanPage() {
    const { setLoading } = useLoading();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectType, setSelectType] = useState("all");
    const [selectStatus, setSelectStatus] = useState("all");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

    const [selectTypeOptions, setSelectTypeOptions] = useState<SelectOption[]>([])
    const [selectStatusOptions, setSelectStatusOptions] = useState<SelectOption[]>([])

    const [listServices, setListServices] = useState<Service[]>([]);

    // Sample Data
    const serviceActivities: any[] = [
        {
            id: "1",
            ticket_num: "SRV25-00001",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "servis-regular",
            schedule_date: "2025-07-15",
            startDate: undefined,
            end_date: undefined,
            status: "pending",
            task: undefined,
            sparepart: undefined,
        },
        {
            id: "2",
            ticket_num: "SRV25-00002",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "servis-berat",
            schedule_date: "2028-02-17",
            start_date: undefined,
            end_date: undefined,
            status: "pending",
            task: undefined,
            sparepart: undefined,
        },
        {
            id: "3",
            ticket_num: "SRV25-00003",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "servis-berat",
            schedule_date: "2028-05-01",
            start_date: "2028-08-01",
            end_date: undefined,
            status: "ongoing",
            task: undefined,
            sparepart: undefined,
        },
        {
            id: "4",
            ticket_num: "SRV25-00004",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "servis-berat",
            schedule_date: "2028-09-15",
            start_date: "2028-01-15",
            end_date: undefined,
            status: "ongoing",
            task: "Ganti Ban",
            sparepart: "Ban Bridgestone Potenza RE050A",
        },
        {
            id: "5",
            ticket_num: "SRV25-00005",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "servis-regular",
            schedule_date: "2028-10-01",
            start_date: "2028-01-15",
            end_date: "2028-01-15",
            status: "completed",
            task: "Ganti Aki",
            sparepart: "Aki Yuasa NS40ZL",
        },
        {
            id: "6",
            ticket_num: "SRV25-00006",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "servis-regular",
            schedule_date: "2028-12-30",
            start_date: "2028-01-15",
            end_date: "2028-01-15",
            status: "cancelled",
            task: "Ganti Oli Mesin",
            sparepart: "Oli Mesin 5W-30",
        },
    ]

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);

            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));

                const [
                    serviceTypeParamsRes,
                    serviceStatusParamsRes,
                    servicesRes
                ] = await Promise.all([
                    // simulate fetching params (you might replace this with supabase or API call)
                    Promise.resolve(SERVICE_TYPE_PARAM),
                    Promise.resolve(STATUS_PARAM),
                    Promise.resolve(serviceActivities),
                ]);

                // === PARAMS ===
                const serviceTypeParamsData: Param[] = serviceTypeParamsRes;
                const optionsTypeFromParams: SelectOption[] = serviceTypeParamsData.map((param) => ({
                    label: param.description || param.name,
                    value: param.name,
                }));
                setSelectTypeOptions([{ label: "Semua", value: "all" }, ...optionsTypeFromParams]);

                const serviceStatusParamsData: Param[] = serviceStatusParamsRes;
                const optionsStatusFromParams: SelectOption[] = serviceStatusParamsData.map((param) => ({
                    label: param.description || param.name,
                    value: param.name,
                }));
                setSelectStatusOptions([{ label: "Semua", value: "all" }, ...optionsStatusFromParams]);


                // === SERVICES ===
                const { data: servicesData, error: servicesError } = { data: servicesRes, error: null }; // Replace with actual API call if needed
                if (servicesError) {
                    console.error("Failed to fetch services:", servicesError);
                } else if (servicesData) {
                    const mappedServices = servicesData.map((s: any) => ({
                        id: s.id,
                        ticketNum: s.ticket_num,
                        vehicleId: s.vehicle_id,
                        vehicle: {
                            id: s.vehicle.id,
                            name: s.vehicle.name,
                            category: s.vehicle.category,
                            licensePlate: s.vehicle.license_plate,
                        },
                        type: s.type,
                        scheduleDate: s.schedule_date,
                        startDate: s.start_date,
                        endDate: s.end_date,
                        status: s.status,
                        task: s.task,
                        sparepart: s.sparepart,
                    }));
                    setListServices(mappedServices);
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    const filteredAndSortedService = useMemo(() => {
        const filtered = listServices.filter((service) => {
            const matchesSearch =
                (service.ticketNum && service.ticketNum.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (service.task && service.task.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (service.sparepart && service.sparepart.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesType = selectType === "all" || service.type?.toLowerCase() === selectType.toLowerCase()
            const matchesStatus = selectStatus === "all" || service.status?.toLowerCase() === selectStatus.toLowerCase()

            return matchesSearch && matchesType && matchesStatus;
        })

        filtered.sort((a, b) => {
            const dateA = a.scheduleDate ? new Date(a.scheduleDate).getTime() : null;
            const dateB = b.scheduleDate ? new Date(b.scheduleDate).getTime() : null;

            if (dateA === null && dateB === null) return 0;
            if (dateA === null) return sortOrder === "asc" ? 1 : -1;
            if (dateB === null) return sortOrder === "asc" ? -1 : 1;

            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        })

        return filtered
    }, [searchQuery, selectType, selectStatus, listServices, sortOrder])

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="bg-background border rounded-lg p-5 shadow-xs flex flex-col gap-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold">Aktivitas Servis Kendaraan</h1>
                            <p className="text-muted-foreground text-sm">Daftar aktivitas servis kendaraan.</p>
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap md:flex-nowrap gap-3">
                        {/* Search Bar */}
                        <div className="relative w-full flex items-center space-x-2">
                            <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                            <Input
                                type="text"
                                placeholder="Filter aktivitas servis"
                                className="w-full pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Select Type */}
                        <Select onValueChange={setSelectType} value={selectType}>
                            <SelectTrigger>
                                <span className="flex items-center gap-2">
                                    <span className="text-muted-foreground">Tipe Servis:</span>
                                    <SelectValue placeholder="Pilih tipe servis" />
                                </span>
                            </SelectTrigger>
                            <SelectContent>
                                {selectTypeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Select Status */}
                        <Select onValueChange={setSelectStatus} value={selectStatus}>
                            <SelectTrigger>
                                <span className="flex items-center gap-2">
                                    <span className="text-muted-foreground">Status:</span>
                                    <SelectValue placeholder="Pilih status" />
                                </span>
                            </SelectTrigger>
                            <SelectContent>
                                {selectStatusOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Sort Order */}
                        <Button
                            variant="outline"
                            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                            className="flex items-center gap-2 w-fit"
                        >
                            {sortOrder === "asc" ? (
                                <ArrowUpNarrowWide className="h-4 w-4" />
                            ) : (
                                <ArrowDownNarrowWide className="h-4 w-4" />
                            )}
                            Sort Tanggal
                        </Button>
                    </div>

                    <div className="flex items-center">
                        <p className="text-sm text-muted-foreground">
                            Total Data: <span className="font-medium">{filteredAndSortedService.length}</span>
                        </p>
                    </div>

                    {filteredAndSortedService.length > 0 ? (
                        <div className="flex flex-col gap-5">
                            {filteredAndSortedService.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
                            <Wrench className="h-5 w-5 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Aktivitas servis tidak ditemukan.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
