import { TaskTypeIcons, TaskTypeLabel } from "@/lib/constants"

interface TaskTypeProps {
    taskType?: keyof typeof TaskTypeLabel
}

export default function TaskType({
    taskType = ""
}: TaskTypeProps) {
    const Icon = TaskTypeIcons[taskType]
    
    return (
        <div className="flex gap-2 items-center justify-center border rounded-lg px-3 py-2 ">
            {Icon && <Icon className="w-4 h-4" />}
            <span className="text-xs font-medium">{TaskTypeLabel[taskType]}</span>
        </div>
    )
}
