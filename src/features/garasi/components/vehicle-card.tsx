import { LocationVehicle } from "@/models/location-vehicle"
import { MapPin, Tag } from "lucide-react"
import { Link } from "react-router-dom"

type VehicleCardProps = {
  id?: string
  variant: "active" | "sold"
  name?: string
  licensePlate?: string
  type?: string
  location?: LocationVehicle
  soldDate?: string
  image?: string
}

export function VehicleCard({
  id,
  variant,
  name,
  licensePlate,
  type,
  location,
  soldDate,
  image
}: VehicleCardProps) {
  return (
    <Link to={`/kendaraan/${id}`} className="bg-background border rounded-lg shadow-xs hover:shadow-md overflow-hidden">
      {/* Image Placeholder */}
      <div className="relative aspect-video w-full overflow-hidden text-[#b3b3b3] bg-[#d9d9d9] flex items-center justify-center">
        <img
          src={image || "/placeholder.svg"}
          alt={`${name} - Image`}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 flex items-center bg-background/90 px-5 py-1 rounded-xl shadow-md">
          <span className="text-medium text-sm">{type}</span>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="w-full p-5 flex flex-col">
        <div className="flex flex-col">
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-light">{licensePlate}</p>
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
