import { Input } from "@/components/shadcn/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ServiceCard } from "../components/service-card";
import { Service } from "@/models/service";
import { AddServiceDialog } from "../components/add-service-dialog";
import { useLoading } from "@/lib/loading-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { Param } from "@/models/param";
import { Button } from "@/components/shadcn/button";
import { SERVICE_TYPE_PARAM } from "@/lib/constants";

type SelectOption = {
    label: string
    value: string
}

export default function ServisPage() {
    const { setLoading } = useLoading();

    const [activeTab, setActiveTab] = useState("todo");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectType, setSelectType] = useState("all");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    const [selectTypeOptions, setSelectTypeOptions] = useState<SelectOption[]>([])

    const [listServices, setListServices] = useState<Service[]>([]);

    // Sample Data
    const todoServices: any[] = [
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
            schedule_date: "2028-01-15",
            startDate: undefined,
            end_date: undefined,
            status: "pending",
        },
        {
            id: "2",
            ticket_num: "SRV25-00002",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Toyota Avanza Putih 2021",
                category: "mobil",
                license_plate: "D 5678 DEF",
            },
            type: "servis-berat",
            schedule_date: "2028-01-17",
            start_date: undefined,
            end_date: undefined,
            status: "pending",
        },
        {
            id: "3",
            ticket_num: "SRV25-00003",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Suzuki Ertiga Merah 2020",
                category: "mobil",
                license_plate: "B 1234 GHI",
            },
            type: "servis-lainnya",
            schedule_date: "2028-02-01",
            start_date: undefined,
            end_date: undefined,
            status: "pending",
        },
    ]

    const prosesServices: any[] = [
        {
            id: "1",
            ticket_num: "SRV25-00004",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Mercedes-Benz C-Class Hitam 2023",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "servis-regular",
            schedule_date: "2028-01-15",
            start_date: "2028-01-15",
            end_date: undefined,
            status: "ongoing",
            task: "Ganti Oli Mesin",
            sparepart: "Oli Mesin 5W-30",
        },
        {
            id: "2",
            ticket_num: "SRV25-00005",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Toyota Avanza Putih 2021",
                category: "mobil",
                license_plate: "D 5678 DEF",
            },
            type: "servis-berat",
            schedule_date: "2028-01-15",
            start_date: "2028-01-15",
            end_date: undefined,
            status: "ongoing",
        }
    ]

    const historiServices: any[] = [
        {
            id: "1",
            ticket_num: "SRV25-00006",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Suzuki Ertiga Merah 2020",
                category: "mobil",
                license_plate: "B 1234 GHI",
            },
            type: "servis-regular",
            schedule_date: "2028-01-15",
            start_date: "2028-01-15",
            end_date: "2028-01-15",
            status: "completed",
            task: "Ganti Ban",
            sparepart: "Ban Bridgestone Potenza",
        },
        {
            id: "2",
            ticket_num: "SRV25-00007",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "servis-lainnya",
            schedule_date: "2028-01-15",
            start_date: "2028-01-15",
            end_date: "2028-01-15",
            status: "completed",
            task: "Ganti Aki",
            sparepart: "Aki Yuasa NS40ZL",
        },
        {
            id: "3",
            ticket_num: "SRV25-00008",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Mazda CX-5 Merah 2021",
                category: "mobil",
                license_plate: "B 5678 JKL",
            },
            type: "servis-regular",
            schedule_date: "2028-01-15",
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
                let statusQuery = todoServices;

                if (activeTab === "todo") statusQuery = todoServices
                else if (activeTab === "proses") statusQuery = prosesServices
                else if (activeTab === "histori") statusQuery = historiServices

                await new Promise((resolve) => setTimeout(resolve, 2000));

                const [
                    serviceTypeParamsRes,
                    servicesRes
                ] = await Promise.all([
                    // simulate fetching params (you might replace this with supabase or API call)
                    Promise.resolve(SERVICE_TYPE_PARAM),
                    Promise.resolve(statusQuery),
                ]);

                // === PARAMS ===
                const serviceTypeParamsData: Param[] = serviceTypeParamsRes;
                const optionsFromParams: SelectOption[] = serviceTypeParamsData.map((param) => ({
                    label: param.description || param.name,
                    value: param.name,
                }));
                setSelectTypeOptions([{ label: "Semua", value: "all" }, ...optionsFromParams]);

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
                            year: s.vehicle.year,
                            brand: s.vehicle.brand,
                            color: s.vehicle.color,
                            type: s.vehicle.type,
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
    }, [activeTab]);

    useEffect(() => {
        setSearchQuery("");
        setSelectType("all");
    }, [activeTab]);

    const filteredAndSortedService = useMemo(() => {
        const filtered = listServices.filter((service) => {
            const matchesSearch =
                (service.ticketNum && service.ticketNum.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (service.vehicle?.licensePlate && service.vehicle?.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (service.vehicle?.name && service.vehicle?.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (service.task && service.task.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (service.sparepart && service.sparepart.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesType = selectType === "all" || service.type?.toLowerCase() === selectType.toLowerCase()

            return matchesSearch && matchesType
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
    }, [activeTab, searchQuery, selectType, listServices, sortOrder])

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Servis</h1>
                    <AddServiceDialog />
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full md:max-w-sm">
                        <TabsTrigger value="todo">To-do</TabsTrigger>
                        <TabsTrigger value="proses">Proses</TabsTrigger>
                        <TabsTrigger value="histori">Histori</TabsTrigger>
                    </TabsList>
                    <TabsContent value={activeTab}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-row flex-wrap md:flex-nowrap gap-3">
                                {/* Search Bar */}
                                <div className="relative w-full flex items-center space-x-2">
                                    <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                                    <Input
                                        type="text"
                                        placeholder="Filter kendaraan dan servis"
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
                                <div className="flex items-center justify-center w-full py-6">
                                    <p>Tidak ada data servis.</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}