import { LocationVehicle } from "./location-vehicle";

export interface Vehicle {
    id?: string;
    name?: string;
    type?: string;
    brand?: string;
    model?: string;
    year?: string;
    color?: string;
    licensePlate?: string;
    stnkDueDate?: string;
    insuranceDueDate?: string;
    lastServiceDate?: string;
    location?: LocationVehicle;
    soldDate?: string;
    image?: string;
    isSold?: boolean;
}