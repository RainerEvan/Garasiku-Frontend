import SectionItem from "@/components/shared/section-item"
import StatusBar from "@/components/shared/status-bar"
import TaskType from "@/components/shared/task-type-bar"
import { Status } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Administration } from "@/models/administration"
import { cva } from "class-variance-authority"
import { Link } from "react-router-dom"

const statusVariants = cva(
  "border-l-8",
  {
    variants: {
      status: {
        default:
          "border-primary",
        pending:
          "border-status-pending",
        ongoing:
          "border-status-ongoing",
        completed:
          "border-status-completed",
        cancelled:
          "border-status-cancelled",
        active:
          "border-status-active",
        inactive:
          "border-status-inactive",
      }
    },
    defaultVariants: {
      status: "pending"
    },
  }
)

type AdministrationCardProps = {
  administration: Administration
}

export function AdministrationCard({
  administration
}: AdministrationCardProps) {
  const status = administration.status as Status;

  return (
    <Link to={`/administrasi/${administration.id}`} className="bg-background border rounded-lg shadow-xs hover:shadow-md overflow-hidden">
      {/* Administration Info */}
      <div className={cn(statusVariants({ status }), "w-full p-5 flex flex-col gap-5")}>
        <div className="flex items-start justify-between gap-5">
          <div className="flex flex-col capitalize">
            <h3 className="font-medium">{administration.vehicle?.name}</h3>
            <p className="text-sm text-medium ">{administration.vehicle?.category}</p>
            <p className="text-xs text-light">{administration.vehicle?.licensePlate}</p>
          </div>
          <div>
            <StatusBar status={status} />
          </div>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            <TaskType taskType={administration.type} />
          </div>
          <div>
            <SectionItem label="Jatuh Tempo" value={administration.dueDate} className="items-end" />
          </div>
        </div>
      </div>
    </Link>
  )
}
