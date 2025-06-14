import { Input } from "@/components/shadcn/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { Search } from "lucide-react";
import { useState } from "react";
import { ServiceCard } from "../components/service-card";
import { Service } from "@/models/service";
import { AddServiceDialog } from "../components/add-service-dialog";

export default function ServisPage() {
    const [searchTodo, setSearchTodo] = useState("");
    const [searchProses, setSearchProses] = useState("");
    const [searchHistori, setSearchHistori] = useState("");

    const todoServices: Service[] = [
        {
            id: "1",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                year: "2022",
                brand: "honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "servis-regular",
            scheduleDate: "15 Jan 2028",
            startDate: undefined,
            endDate: undefined,
            status: "pending",
        },
        {
            id: "2",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                year: "2022",
                brand: "honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "servis-berat",
            scheduleDate: "15 Jan 2028",
            startDate: undefined,
            endDate: undefined,
            status: "pending",
        },
        {
            id: "3",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                year: "2022",
                brand: "honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "servis-lainnya",
            scheduleDate: "15 Jan 2028",
            startDate: undefined,
            endDate: undefined,
            status: "pending",
        },
    ]

    const prosesServices: Service[] = [
        {
            id: "1",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                year: "2022",
                brand: "honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "servis-regular",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            endDate: undefined,
            status: "ongoing",
        },
        {
            id: "2",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                year: "2022",
                brand: "honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "servis-berat",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            endDate: undefined,
            status: "ongoing",
        }
    ]

    const historiServices: Service[] = [
        {
            id: "1",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                year: "2022",
                brand: "honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "servis-regular",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "completed",
        },
        {
            id: "2",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                year: "2022",
                brand: "honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "servis-lainnya",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "completed",
        },
        {
            id: "3",
            vehicleId: "1",
            vehicle: {
                id: "1",
                name: "Honda Civic Turbo Hitam 2022",
                category: "mobil",
                year: "2022",
                brand: "honda",
                color: "Hitam",
                type: "Civic Turbo",
                licensePlate: "D 1234 ABC",
            },
            type: "servis-regular",
            scheduleDate: "15 Jan 2028",
            startDate: "15 Jan 2028",
            endDate: "15 Jan 2028",
            status: "cancelled",
        },
    ]

    const filteredTodoServices = todoServices.filter((service) =>
        (service.vehicle?.licensePlate && service.vehicle?.licensePlate.toLowerCase().includes(searchTodo.toLowerCase())) ||
        (service.vehicle?.name && service.vehicle?.name.toLowerCase().includes(searchTodo.toLowerCase())) ||
        (service.type && service.type.toLowerCase().includes(searchTodo.toLowerCase()))
    );

    const filteredProsesServices = prosesServices.filter((service) =>
        (service.vehicle?.licensePlate && service.vehicle?.licensePlate.toLowerCase().includes(searchProses.toLowerCase())) ||
        (service.vehicle?.name && service.vehicle?.name.toLowerCase().includes(searchProses.toLowerCase())) ||
        (service.type && service.type.toLowerCase().includes(searchProses.toLowerCase()))
    );

    const filteredHistoriServices = historiServices.filter((service) =>
        (service.vehicle?.licensePlate && service.vehicle?.licensePlate.toLowerCase().includes(searchHistori.toLowerCase())) ||
        (service.vehicle?.name && service.vehicle?.name.toLowerCase().includes(searchHistori.toLowerCase())) ||
        (service.type && service.type.toLowerCase().includes(searchHistori.toLowerCase()))
    );

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Servis</h1>
                    <AddServiceDialog />
                </div>

                <Tabs defaultValue="todo" className="w-full">
                    <TabsList className="w-full md:max-w-sm">
                        <TabsTrigger value="todo">To-do</TabsTrigger>
                        <TabsTrigger value="proses">Proses</TabsTrigger>
                        <TabsTrigger value="histori">Histori</TabsTrigger>
                    </TabsList>
                    <TabsContent value="todo">
                        {/* Search Bar */}
                        <div className="relative mb-5 flex w-full items-center space-x-2">
                            <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                            <Input
                                type="text"
                                placeholder="Filter kendaraan dan servis"
                                className="w-full pl-10"
                                value={searchTodo}
                                onChange={(e) => setSearchTodo(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            {filteredTodoServices.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="proses">
                        {/* Search Bar */}
                        <div className="relative mb-5 flex w-full items-center space-x-2">
                            <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                            <Input
                                type="text"
                                placeholder="Filter kendaraan dan servis"
                                className="w-full pl-10"
                                value={searchTodo}
                                onChange={(e) => setSearchProses(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            {filteredProsesServices.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
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
                                placeholder="Filter kendaraan dan servis"
                                className="w-full pl-10"
                                value={searchTodo}
                                onChange={(e) => setSearchHistori(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            {filteredHistoriServices.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}