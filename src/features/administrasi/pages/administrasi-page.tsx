import { Input } from "@/components/shadcn/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { Administration } from "@/models/administration";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, IdCard, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdministrationCard } from "../components/administrasi-card";
import { useLoading } from "@/lib/loading-context";
import { Button } from "@/components/shadcn/button";
import { Navigate, useParams } from "react-router-dom";

const validTypes = ["stnk-1", "stnk-5", "asuransi"];

export default function AdministrasiPage() {
    const { type } = useParams();

    if (!type || !validTypes.includes(type)) {
        return <Navigate to="/administrasi/stnk-1" replace />;
    }

    const { setLoading } = useLoading();

    const [activeTab, setActiveTab] = useState("todo");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    const [listAdministrations, setListAdministrations] = useState<Administration[]>([]);

    const stnk1Administrations: any[] = [
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
                name: "Toyota Avanza Putih 2021",
                category: "mobil",
                license_plate: "D 5678 DEF",
            },
            type: "administrasi-stnk-1",
            due_date: "2028-02-15",
            end_date: undefined,
            status: "pending",
        },
        {
            id: "3",
            ticket_num: "ADM25-00003",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Suzuki Ertiga Merah 2020",
                category: "mobil",
                license_plate: "B 1234 GHI",
            },
            type: "administrasi-stnk-1",
            due_date: "2028-03-15",
            end_date: undefined,
            status: "completed",
        },
        {
            id: "4",
            ticket_num: "ADM25-00004",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Daihatsu Xenia Biru 2019",
                category: "mobil",
                license_plate: "B 9876 JKJ",
            },
            type: "administrasi-stnk-1",
            due_date: "2028-04-15",
            end_date: undefined,
            status: "cancelled",
        },
    ]

    const stnk5Administrations: any[] = [
        {
            id: "5",
            ticket_num: "ADM25-00005",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Mercedes-Benz C-Class Hitam 2023",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "administrasi-stnk-5",
            due_date: "2025-07-18",
            end_date: undefined,
            status: "pending",
        },
        {
            id: "6",
            ticket_num: "ADM25-00006",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Toyota Avanza Putih 2021",
                category: "mobil",
                license_plate: "D 5678 DEF",
            },
            type: "administrasi-stnk-5",
            due_date: "2028-02-15",
            end_date: "2028-02-14",
            status: "completed",
        },
        {
            id: "7",
            ticket_num: "ADM25-00007",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Suzuki Ertiga Merah 2020",
                category: "mobil",
                license_plate: "B 1234 GHI",
            },
            type: "administrasi-stnk-5",
            due_date: "2028-03-15",
            end_date: "2028-03-15",
            status: "cancelled",
        },
    ]

    const asuransiAdministrations: any[] = [
        {
            id: "1",
            ticket_num: "ADM25-00004",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Mercedes-Benz C-Class Hitam 2023",
                category: "mobil",
                license_plate: "D 1234 ABC",
            },
            type: "administrasi-asuransi",
            due_date: "2025-07-15",
            end_date: undefined,
            status: "pending",
        },
        {
            id: "2",
            ticket_num: "ADM25-00005",
            vehicle_id: "1",
            vehicle: {
                id: "1",
                name: "Toyota Avanza Putih 2021",
                category: "mobil",
                license_plate: "D 5678 DEF",
            },
            type: "administrasi-asuransi",
            due_date: "2028-02-15",
            end_date: undefined,
            status: "pending",
        }
    ]

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);

            try {
                let typeQuery = [];

                if (type === "stnk-1") typeQuery = stnk1Administrations
                else if (type === "stnk-5") typeQuery = stnk5Administrations
                else if (type === "asuransi") typeQuery = asuransiAdministrations

                let todoAdministrations: any[] = typeQuery.filter((a: any) => {
                    const today = new Date();
                    const dueDate = new Date(a.due_date);
                    dueDate.setMonth(dueDate.getMonth() - 1);
                    return (
                        a.status === "pending" &&
                        a.due_date &&
                        today >= dueDate
                    )
                });
                let pendingAdministrations: any[] = typeQuery.filter((a: any) => a.status === "pending");
                let historiAdministrations: any[] = typeQuery.filter((a: any) => a.status === "completed" || a.status === "cancelled");

                let statusQuery = todoAdministrations;

                if (activeTab === "todo") statusQuery = todoAdministrations
                else if (activeTab === "pending") statusQuery = pendingAdministrations
                else if (activeTab === "histori") statusQuery = historiAdministrations

                await new Promise((resolve) => setTimeout(resolve, 2000));

                const [
                    administrationsRes
                ] = await Promise.all([
                    Promise.resolve(statusQuery),
                ]);

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
            }
        };

        fetchAll();
    }, [activeTab, type]);

    useEffect(() => {
        setSearchQuery("");
    }, [activeTab, type]);

    useEffect(() => {
        setActiveTab("todo");
    }, [type]);

    const filteredAndSortedAdministration = useMemo(() => {
        const filtered = listAdministrations.filter((administration) => {
            const matchesSearch =
                (administration.ticketNum && administration.ticketNum.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (administration.vehicle?.licensePlate && administration.vehicle?.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (administration.vehicle?.name && administration.vehicle?.name.toLowerCase().includes(searchQuery.toLowerCase()))

            return matchesSearch
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
    }, [activeTab, searchQuery, listAdministrations, sortOrder])


    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Administrasi</h1>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full md:max-w-sm">
                        <TabsTrigger value="todo">To-do</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="histori">Histori</TabsTrigger>
                    </TabsList>
                    <TabsContent value={activeTab}>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row flex-wrap md:flex-nowrap gap-3">
                                {/* Search Bar */}
                                <div className="relative w-full flex items-center space-x-2">
                                    <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                                    <Input
                                        type="text"
                                        placeholder="Filter kendaraan dan administrasi"
                                        className="w-full pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

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
                                    <p className="text-sm text-muted-foreground">Data administrasi tidak ditemukan.</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}