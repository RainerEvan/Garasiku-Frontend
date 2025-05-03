import { Vehicle } from "./vehicle"

export interface Administration {
    id?: string
    ticketNum?: string
    vehicleId?: string
    vehicle?: Vehicle
    type?: string
    dueDate?: string
    endDate?: string
    status?: string
}