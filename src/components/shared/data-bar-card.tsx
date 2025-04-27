import { TypeIcons } from "@/lib/constants";
import { ChevronRight } from "lucide-react"

interface DataBarCardProps {
  variant: "default" | "button"
  type: keyof typeof TypeIcons
  label?: string
  description?: string | null
}

export function DataBarCard({ 
  variant = "default",
  type,
  label = "Label",
  description = "-"
}: DataBarCardProps) {
  const Icon = type ? TypeIcons[type] : null

  return (
    <>
      {variant === "default" && (
        <div className="w-full bg-background border rounded-lg px-4 py-3 shadow-xs flex items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-[#f5f5f5] p-2 rounded-full">
              {Icon && <Icon className="w-5 h-5" />}
            </div>
            <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-medium">{description}</div>
            </div>
          </div>
        </div>
      )}

      {variant === "button" && (
        <div className="w-full bg-background border rounded-lg px-4 py-3 shadow-xs flex items-center justify-between cursor-pointer hover:bg-accent hover:text-accent-foreground">
          <div className="flex items-center space-x-3">
            <div className="bg-[#f5f5f5] p-2 rounded-full">
              {Icon && <Icon className="w-5 h-5" />}
            </div>
            <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-medium">{description}</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </>
  )
}
