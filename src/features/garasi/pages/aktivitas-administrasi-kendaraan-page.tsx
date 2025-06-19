import { ArrowDownNarrowWide, ArrowUpNarrowWide, IdCard, Search } from "lucide-react";
import { Administration } from "@/models/administration";
import { AdministrationCard } from "@/features/administrasi/components/administrasi-card";
import { Input } from "@/components/shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { Button } from "@/components/shadcn/button";
import { useLoading } from "@/lib/loading-context";
import { useEffect, useMemo, useState } from "react";
import { ADMINISTRATION_TYPE_PARAM, STATUS_PARAM } from "@/lib/constants";
import { Param } from "@/models/param";

type SelectOption = {
    label: string
    value: string
}

export default function AktivitasAdministrasiKendaraanPage() {
    const { setLoading } = useLoading();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectType, setSelectType] = useState("all");
    const [selectStatus, setSelectStatus] = useState("all");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

    const [selectTypeOptions, setSelectTypeOptions] = useState<SelectOption[]>([])
    const [selectStatusOptions, setSelectStatusOptions] = useState<SelectOption[]>([])

    const [listAdministrations, setListAdministrations] = useState<Administration[]>([]);

    // Sample Data
    const administrationActivities: any[] = [
        {
            id: "1",
            ticket_num: "ADM25-00001",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "administrasi-stnk-1",
            due_date: "2025-07-19",
            end_date: undefined,
            status: "pending",
        },
        {
            id: "2",
            ticket_num: "ADM25-00002",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "administrasi-stnk-5",
            due_date: "2025-07-19",
            end_date: "2025-07-19",
            status: "completed",
        },
        {
            id: "3",
            ticket_num: "ADM25-00003",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "administrasi-stnk-1",
            due_date: "2026-07-14",
            end_date: "2025-07-14",
            status: "cancelled",
        },
        {
            id: "4",
            ticket_num: "ADM25-00004",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "administrasi-stnk-1",
            due_date: "2027-07-19",
            end_date: undefined,
            status: "pending",
        },
        {
            id: "5",
            ticket_num: "ADM25-00005",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "administrasi-stnk-5",
            due_date: "2030-07-19",
            end_date: undefined,
            status: "pending",
        },
        {
            id: "6",
            ticket_num: "ADM25-00006",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "administrasi-asuransi",
            due_date: "2031-05-01",
            end_date: undefined,
            status: "pending",
        },
    ]

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);

            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));

                const [
                    administrationTypeParamsRes,
                    administrationStatusParamsRes,
                    administrationsRes
                ] = await Promise.all([
                    // simulate fetching params (you might replace this with supabase or API call)
                    Promise.resolve(ADMINISTRATION_TYPE_PARAM),
                    Promise.resolve(STATUS_PARAM),
                    Promise.resolve(administrationActivities),
                ]);

                // === PARAMS ===
                const administrationTypeParamsData: Param[] = administrationTypeParamsRes;
                const optionsTypeFromParams: SelectOption[] = administrationTypeParamsData.map((param) => ({
                    label: param.description || param.name,
                    value: param.name,
                }));
                setSelectTypeOptions([{ label: "Semua", value: "all" }, ...optionsTypeFromParams]);

                const administrationStatusParamsData: Param[] = administrationStatusParamsRes;
                const optionsStatusFromParams: SelectOption[] = administrationStatusParamsData.map((param) => ({
                    label: param.description || param.name,
                    value: param.name,
                }));
                setSelectStatusOptions([{ label: "Semua", value: "all" }, ...optionsStatusFromParams]);


                // === ADMINISTRATIONS ===
                const { data: administrationsData, error: administrationsError } = { data: administrationsRes, error: null }; // Replace with actual API call if needed
                if (administrationsError) {
                    console.error("Failed to fetch administrations:", administrationsError);
                } else if (administrationsData) {
                    const mappedAdministrations = administrationsData.map((a: any) => ({
                        id: a.id,
                        ticketNum: a.ticket_num,
                        vehicleId: a.vehicle_id,
                        vehicle: {
                            id: a.vehicle.id,
                            name: a.vehicle.name,
                            category: a.vehicle.category,
                            licensePlate: a.vehicle.license_plate,
                        },
                        type: a.type,
                        dueDate: a.due_date,
                        endDate: a.end_date,
                        status: a.status,
                    }));
                    setListAdministrations(mappedAdministrations);
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
                console.log(listAdministrations)
            }
        };

        fetchAll();
    }, []);

    const filteredAndSortedAdministration = useMemo(() => {
        const filtered = listAdministrations.filter((administration) => {
            const matchesSearch =
                (administration.ticketNum && administration.ticketNum.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesType = selectType === "all" || administration.type?.toLowerCase() === selectType.toLowerCase()
            const matchesStatus = selectStatus === "all" || administration.status?.toLowerCase() === selectStatus.toLowerCase()

            return matchesSearch && matchesType && matchesStatus;
        })

        filtered.sort((a, b) => {
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : null;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : null;

            if (dateA === null && dateB === null) return 0;
            if (dateA === null) return sortOrder === "asc" ? 1 : -1;
            if (dateB === null) return sortOrder === "asc" ? -1 : 1;

            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        })

        return filtered
    }, [searchQuery, selectType, selectStatus, listAdministrations, sortOrder])


    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="bg-background border rounded-lg p-5 shadow-xs flex flex-col gap-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold">Aktivitas Administrasi Kendaraan</h1>
                            <p className="text-muted-foreground text-sm">Daftar aktivitas administrasi kendaraan.</p>
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap md:flex-nowrap gap-3">
                        {/* Search Bar */}
                        <div className="relative w-full flex items-center space-x-2">
                            <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                            <Input
                                type="text"
                                placeholder="Filter aktivitas administrasi"
                                className="w-full pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Select Type */}
                        <Select onValueChange={setSelectType} value={selectType}>
                            <SelectTrigger>
                                <span className="flex items-center gap-2">
                                    <span className="text-muted-foreground">Tipe Administrasi:</span>
                                    <SelectValue placeholder="Pilih tipe administrasi" />
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
                            Total Data: <span className="font-medium">{filteredAndSortedAdministration.length}</span>
                        </p>
                    </div>

                    {filteredAndSortedAdministration.length > 0 ? (
                        <div className="flex flex-col gap-5">
                            {filteredAndSortedAdministration.map((administration) => (
                                <AdministrationCard
                                    key={administration.id}
                                    administration={administration}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
                            <IdCard className="h-5 w-5 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Aktivitas administrasi tidak ditemukan.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
