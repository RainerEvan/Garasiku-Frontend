import { Input } from "@/components/shadcn/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { ParamGroup } from "@/models/param-group";
import { ParamGroupCard } from "../components/param-group-card";

export default function MaintenancePage() {
    const [searchGroup, setSearchGroup] = useState("");

    const paramGroups: ParamGroup[] = [
        {
            id: "1",
            group: "001",
            name: "Merk Kendaraan",
            description: "List merk kendaraan",
            isMaintain: true,
            isTotalFixed: false,
        },
        {
            id: "2",
            group: "002",
            name: "Lokasi Kendaraan",
            description: "List lokasi kendaraan",
            isMaintain: true,
            isTotalFixed: false,
        },
        {
            id: "3",
            group: "003",
            name: "Waktu Reminder",
            description: "List waktu reminder",
            isMaintain: true,
            isTotalFixed: true,
        },
        {
            id: "4",
            group: "004",
            name: "Kelengkapan Kendaraan",
            description: "List kelengkapan kendaraan",
            isMaintain: true,
            isTotalFixed: false,
        }
    ]

    const filteredParamGroups = paramGroups.filter((paramGroup) =>
        paramGroup.name.toLowerCase().includes(searchGroup.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Parameter</h1>
                </div>

                {/* Search Bar */}
                <div className="relative flex w-full items-center space-x-2">
                    <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                    <Input
                        type="text"
                        placeholder="Cari nama parameter"
                        className="w-full pl-10"
                        value={searchGroup}
                        onChange={(e) => setSearchGroup(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    {filteredParamGroups.map((paramGroup) => (
                        <ParamGroupCard
                            key={paramGroup.group}
                            paramGroup={paramGroup}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}