import { TaskTypeIcons } from "@/lib/constants";
import { Vehicle } from "@/models/vehicle"
import { Link } from "react-router-dom"

type VehicleCardProps = {
  vehicle: Vehicle
}

export function VehicleCard({
  vehicle
}: VehicleCardProps) {
  const variant = vehicle.isSold ? "sold" : "active";
  const Icon = vehicle.isSold ? TaskTypeIcons["terjual"] : TaskTypeIcons["lokasi"]

  return (
    <Link to={`/kendaraan/${vehicle.id}`} className="bg-background border rounded-lg shadow-xs hover:shadow-md overflow-hidden">
      {/* Image Placeholder */}
      <div className="relative aspect-video w-full overflow-hidden text-[#b3b3b3] bg-[#d9d9d9] flex items-center justify-center">
        <img
          src={vehicle.image || "/placeholder.svg"}
          alt={`${name} - Image`}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 flex items-center bg-background/90 px-5 py-1 rounded-xl shadow-md">
          <p className="text-medium text-sm">{vehicle.type}</p>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="w-full p-5 flex flex-col">
        <div className="flex flex-col">
          <p className="font-medium">{vehicle.name}</p>
          <p className="text-xs text-light">{vehicle.licensePlate}</p>
        </div>

        {/* Location or Sold Status */}
        <div className="mt-3 border rounded-lg p-3 flex items-start gap-2">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="h-5 w-5 text-medium shrink-0" />}
            {variant === "active" && location && (
                <div>
                  <p className="text-sm font-medium">{vehicle.location?.name}</p>
                  <p className="text-xs text-medium">{vehicle.location?.address}</p>
                </div>
            )}
            {variant === "sold" && vehicle.soldDate && (
                <div>
                  <p className="text-sm font-medium">Terjual</p>
                  <p className="text-xs text-medium">{vehicle.soldDate}</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
