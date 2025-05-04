import { Param } from "@/models/param"
import { ParamGroup } from "@/models/param-group"
import { ParamCard } from "../components/param-card"

export default function MaintenanceDetailPage() {
    const paramGroup: ParamGroup = {
        id: "1",
        group: "001",
        name: "Merk Kendaraan",
        description: "List merk kendaraan",
        isMaintain: true,
        isFixed: false,
    }

    const listParam: Param[] = [
        {
            id: "1",
            group: "002",
            key: "honda",
            name: "Honda",
            description: "Merk honda"
        },
        {
            id: "2",
            group: "002",
            key: "toyota",
            name: "Toyota",
            description: undefined
        },
        {
            id: "3",
            group: "002",
            key: "suzuki",
            name: "Suzuki",
            description: undefined
        },
        {
            id: "4",
            group: "002",
            key: "bmw",
            name: "BMW",
            description: undefined
        },
        {
            id: "5",
            group: "002",
            key: "mercedes-benz",
            name: "Mercedes-Benz",
            description: undefined
        },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold">{paramGroup.name}</h1>
                </div>

                {/* List Param */}
                <div className="flex flex-col gap-5 overflow-auto">
                    {listParam.map((param, index) => (
                        <ParamCard
                            key={param.id}
                            param={param}
                            index={index}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}
