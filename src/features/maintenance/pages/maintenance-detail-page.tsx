import { Param } from "@/models/param"
import { ParamGroup } from "@/models/param-group"
import { ParamCard } from "../components/param-card"
import { AddParamDialog } from "../components/add-param-dialog"

export default function MaintenanceDetailPage() {
    const paramGroup: ParamGroup = {
        id: "1",
        group: "001",
        name: "Merk Kendaraan",
        description: "List merk kendaraan",
        isMaintain: true,
        isTotalFixed: false,
    }

    const listParam: Param[] = [
        {
            id: "1",
            group: "002",
            name: "Honda",
            description: undefined
        },
        {
            id: "2",
            group: "002",
            name: "Toyota",
            description: undefined
        },
        {
            id: "3",
            group: "002",
            name: "Suzuki",
            description: undefined
        },
        {
            id: "4",
            group: "002",
            name: "BMW",
            description: undefined
        },
        {
            id: "5",
            group: "002",
            name: "Mercedes-Benz",
            description: undefined
        },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">{paramGroup.name}</h1>
                    {!paramGroup.isTotalFixed && (
                        <AddParamDialog paramGroup={paramGroup}/>
                    )}
                </div>

                {/* List Param */}
                <div className="flex flex-col gap-5 overflow-auto">
                    {listParam.map((param, index) => (
                        <ParamCard
                            key={param.id}
                            param={param}
                            paramGroup={paramGroup}
                            index={index}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}
