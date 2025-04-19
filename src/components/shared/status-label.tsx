import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const statusVariants = cva(
    "rounded-full w-3 h-3",
    {
        variants: {
            status: {
                default:
                    "bg-primary",
                pending:
                    "bg-status-pending",
                inprogress:
                    "bg-status-inprogress",
                completed:
                    "bg-status-completed",
                cancelled:
                    "bg-status-cancelled",
                active:
                    "bg-status-active",
                inactive:
                    "bg-status-inactive",
            }
        },
        defaultVariants: {
            status: "pending"
        },
    }
)

interface StatusLabelProps {
    status: "pending" | "inprogress" | "completed" | "cancelled" | "active" | "inactive"
    label: string
}

export default function StatusLabel({
    status,
    label = "Status"
}: StatusLabelProps) {
    return (
        <div className="flex gap-1 items-center justify-center">
            <div className={cn(statusVariants({ status }))} />
            <span className="text-xs font-medium">{label}</span>
        </div>
    )
}
