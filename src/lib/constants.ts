import { IdCard, MapPin, ShieldCheck, Wrench } from "lucide-react";

export const TypeIcons = {
  adminStnk: IdCard,
  adminAsuransi: ShieldCheck,
  servisRegular: Wrench,
  servisHeavy: Wrench,
  lokasi: MapPin
};

export type Status = "pending" | "inprogress" | "completed" | "cancelled" | "active" | "inactive";

export const StatusLabel: Record<Status, string> = {
  pending: "Pending",
  inprogress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  active: "Active",
  inactive: "Inactive",
};