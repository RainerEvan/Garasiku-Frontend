import { ChevronRight, type LucideIcon } from "lucide-react"
import { Link } from "react-router-dom";

interface DataBarCardProps {
  variant: "default" | "link"
  label: string
  description: string
  icon?: LucideIcon;
  urlLink?: string
}

export function DataBarCard({ 
  variant = "default",
  label = "Label",
  description = "Description",
  icon: Icon, 
  urlLink
}: DataBarCardProps) {

  return (
    <>
      {variant === "default" && (
        <div className="bg-background border rounded-lg px-4 py-3 shadow-xs flex items-center">
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

      {variant === "link" && urlLink && (
        <Link to={`${urlLink}`} className="bg-background border rounded-lg px-4 py-3 shadow-xs flex items-center justify-between">
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
        </Link>
      )}
    </>
  )
}
