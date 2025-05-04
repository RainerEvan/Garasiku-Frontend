import { Param } from "@/models/param"
import { Link } from "react-router-dom"

type ParamCardProps = {
  param: Param
  index: number
}

export function ParamCard({
  param,
  index
}: ParamCardProps) {
  return (
    <Link to={`/maintenance/${param.group}`} className="bg-background border rounded-lg shadow-xs p-4 hover:shadow-md overflow-hidden">
      {/* Param Group Info */}
      <div className="flex items-center space-x-3">
        <div className="bg-[#f5f5f5] flex items-center justify-center w-5 h-5 p-4 rounded-full">
          <p className="font-medium">{index+1}</p>
        </div>
        <div>
          <p className="text-sm font-medium">{param.key}</p>
          <p className="text-sm font-medium">{param.name}</p>
          <p className="text-xs text-medium">{param.description}</p>
        </div>
      </div>
    </Link>
  )
}
