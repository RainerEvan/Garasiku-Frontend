import { Anvil, Bolt, CarFront, IdCard, MapPin, ShieldCheck, Tag, Wrench, type LucideIcon } from "lucide-react";

export const TaskTypeLabel: Record<string, string> = {
  "servis-regular": "Servis Regular",
  "servis-berat": "Servis Berat",
  "servis-lainnya": "Servis Lainnya",
  "administrasi-stnk-1tahun": "STNK 1 Tahun",
  "administrasi-stnk-5tahun": "STNK 5 Tahun",
  "administrasi-asuransi": "Asuransi"
};

export const TaskTypeIcons: Record<string, LucideIcon> = {
  "administrasi-stnk-1tahun": IdCard,
  "administrasi-stnk-5tahun": IdCard,
  "administrasi-asuransi": ShieldCheck,
  "servis-regular": Wrench,
  "servis-berat": Anvil,
  "servis-lainnya": Bolt,
  "lokasi": MapPin,
  "terjual": Tag,
  "kendaraan": CarFront,
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
  [CANCELLED]: "Dibatalkan",
  [ACTIVE]: "Aktif",
  [INACTIVE]: "Nonaktif"
};