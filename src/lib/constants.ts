import { Anvil, IdCard, MapPin, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";

export const TaskTypeLabel: Record<string, string> = {
  "servis-regular": "Servis Regular",
  "servis-heavy": "Servis Berat",
  "admin-stnk": "Perpanjang STNK",
  "admin-asuransi": "Perpanjang Asuransi"
};

export const TaskTypeIcons: Record<string, LucideIcon> = {
  "admin-stnk": IdCard,
  "admin-asuransi": ShieldCheck,
  "servis-regular": Wrench,
  "servis-heavy": Anvil,
  "lokasi": MapPin
};

export const PENDING = "pending";
export const ONGOING = "ongoing"; 
export const COMPLETED = "completed";
export const CANCELLED = "cancelled";
export const ACTIVE = "active";
export const INACTIVE = "inactive";

export type Status = typeof PENDING | typeof ONGOING | typeof COMPLETED | typeof CANCELLED | typeof ACTIVE | typeof INACTIVE;

export const StatusLabel: Record<Status, string> = {
  [PENDING]: "Pending",
  [ONGOING]: "Proses",
  [COMPLETED]: "Selesai",
  [CANCELLED]: "Batal",
  [ACTIVE]: "Aktif",
  [INACTIVE]: "Nonaktif"
};