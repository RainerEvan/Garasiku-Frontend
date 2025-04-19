import SectionItem from "@/components/shared/section-item"
import StatusLabel from "@/components/shared/status-label"
import { typeIcons } from "@/lib/constants"
import { Link } from "react-router-dom"

interface ServiceActivityItemProps {
    id: string
    type: keyof typeof typeIcons
    typeLabel: string
    scheduleDate?: string
    startDate?: string
    endDate?: string
    status: "pending" | "inprogress" | "completed" | "cancelled" | "active" | "inactive"
    statusLabel: string
}

export default function ServiceActivityItem({
    id,
    type,
    typeLabel,
    scheduleDate,
    startDate,
    endDate,
    status,
    statusLabel
}: ServiceActivityItemProps) {
    const Icon = type ? typeIcons[type] : null

    return (
        <Link to={`/servis/${id}`} className="flex flex-col gap-4 hover:bg-accent">
            <div className="flex items-start justify-between">
                <div className="flex gap-2 items-center justify-center border rounded-lg px-4 py-2 ">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span className="text-xs font-medium">{typeLabel}</span>
                </div>
                <StatusLabel status={status} label={statusLabel} />
            </div>
            <div className="flex items-end justify-between">
                <SectionItem label="Jadwal Servis" value={scheduleDate || "-"} />
                <SectionItem label="Servis Mulai" value={startDate || "-"} />
                <SectionItem label="Servis Selesai" value={endDate || "-"} />
            </div>
        </Link>
    )
}
