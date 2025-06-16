import { Input } from "@/components/shadcn/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { Administration } from "@/models/administration";
import { Search } from "lucide-react";
import { useState } from "react";
import { AdministrationCard } from "../components/administrasi-card";

export default function AdministrasiPage() {
    const [searchTodo, setSearchTodo] = useState("");
    const [searchHistori, setSearchHistori] = useState("");

    const todoAdministrations: Administration[] = [
        {
            id: "1",
            ticketNum: "ADM25-00001",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "Mobil",
                year: "2022",
                brand: "Honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "administrasi-stnk-1tahun",
            dueDate: "15 Jan 2028",
            endDate: undefined,
            status: "pending",
        },
        {
            id: "2",
            ticketNum: "ADM25-00002",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "Mobil",
                year: "2022",
                brand: "Honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "administrasi-asuransi",
            dueDate: "15 Jan 2028",
            endDate: undefined,
            status: "pending",
        },
        {
            id: "3",
            ticketNum: "ADM25-00003",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "Mobil",
                year: "2022",
                brand: "Honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "administrasi-stnk-1tahun",
            dueDate: "15 Jan 2028",
            endDate: undefined,
            status: "pending",
        },
    ]

    const historiAdministrations: Administration[] = [
        {
            id: "1",
            ticketNum: "ADM25-00004",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "Mobil",
                year: "2022",
                brand: "Honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "administrasi-stnk-1tahun",
            dueDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "completed",
        },
        {
            id: "2",
            ticketNum: "ADM25-00005",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "Mobil",
                year: "2022",
                brand: "Honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "administrasi-asuransi",
            dueDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "completed",
        },
        {
            id: "3",
            ticketNum: "ADM25-00006",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "Mobil",
                year: "2022",
                brand: "Honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "administrasi-stnk-1tahun",
            dueDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "cancelled",
        },
    ]

    const filteredTodoAdministrations = todoAdministrations.filter((administration) =>
        (administration.vehicle?.licensePlate && administration.vehicle?.licensePlate.toLowerCase().includes(searchTodo.toLowerCase())) ||
        (administration.vehicle?.name && administration.vehicle?.name.toLowerCase().includes(searchTodo.toLowerCase())) ||
        (administration.type && administration.type.toLowerCase().includes(searchTodo.toLowerCase()))
    );

    const filteredHistoriAdministrations = historiAdministrations.filter((administration) =>
        (administration.vehicle?.licensePlate && administration.vehicle?.licensePlate.toLowerCase().includes(searchHistori.toLowerCase())) ||
        (administration.vehicle?.name && administration.vehicle?.name.toLowerCase().includes(searchHistori.toLowerCase())) ||
        (administration.type && administration.type.toLowerCase().includes(searchHistori.toLowerCase()))
    );

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Administrasi</h1>
                </div>

                <Tabs defaultValue="todo" className="w-full">
                    <TabsList className="w-full md:max-w-sm">
                        <TabsTrigger value="todo">To-do</TabsTrigger>
                        <TabsTrigger value="histori">Histori</TabsTrigger>
                    </TabsList>
                    <TabsContent value="todo">
                        {/* Search Bar */}
                        <div className="relative mb-5 flex w-full items-center space-x-2">
                            <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                            <Input
                                type="text"
                                placeholder="Filter kendaraan"
                                className="w-full pl-10"
                                value={searchTodo}
                                onChange={(e) => setSearchTodo(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            {filteredTodoAdministrations.map((administration) => (
                                <AdministrationCard
                                    key={administration.id}
                                    administration={administration}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="histori">
                        {/* Search Bar */}
                        <div className="relative mb-5 flex w-full items-center space-x-2">
                            <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                            <Input
                                type="text"
                                placeholder="Filter kendaraan"
                                className="w-full pl-10"
                                value={searchTodo}
                                onChange={(e) => setSearchHistori(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            {filteredHistoriAdministrations.map((administration) => (
                                <AdministrationCard
                                    key={administration.id}
                                    administration={administration}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}