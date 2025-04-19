import { IdCard, MapPin, ShieldCheck, Wrench } from "lucide-react";

export const typeIcons = {
  adminStnk: IdCard,
  adminAsuransi: ShieldCheck,
  servisRegular: Wrench,
  servisHeavy: Wrench,
  lokasi: MapPin
};

export type Status = "pending" | "inprogress" | "completed" | "cancelled" | "active" | "inactive";