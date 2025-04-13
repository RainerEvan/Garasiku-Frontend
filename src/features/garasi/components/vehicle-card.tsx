import { MapPin, Tag } from "lucide-react"
import { Link } from "react-router-dom"

type VehicleCardProps = {
  id: string
  variant: "active" | "sold"
  name: string
  licensePlate: string
  type: string
  location?: {
    name: string
    address: string
  }
  soldDate?: string
}

export function VehicleCard({ 
  id,
  variant,
  name,
  licensePlate,
  type,
  location,
  soldDate 
}: VehicleCardProps) {
  return (
    <Link to={`/daftar-kendaraan/${id}`} className="mb-4 bg-background border rounded-lg shadow-xs overflow-hidden">
      {/* Image Placeholder */}
      <div className="bg-[#d9d9d9] h-48 flex items-center justify-center">
        <div className="text-[#b3b3b3]">
          <img
            src="/"
            alt="Vehicle image"
            width={400}
            height={192}
            className="opacity-20"
          />
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-light">{licensePlate}</p>
          </div>
          <span className="text-sm">{type}</span>
        </div>

        {/* Location or Sold Status */}
        <div className="mt-3 border rounded-lg p-3 flex items-start gap-2">
          {variant === "active" && location && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-medium shrink-0" />
              <div>
                <p className="text-sm font-medium">{location.name}</p>
                <p className="text-xs text-medium">{location.address}</p>
              </div>
            </div>
          )}

          {variant === "sold" && soldDate && (
            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-medium shrink-0" />
              <div>
                <p className="text-sm font-medium">Terjual</p>
                <p className="text-xs text-medium">{soldDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
