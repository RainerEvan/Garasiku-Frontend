import { Anvil, Bolt, CarFront, IdCard, MapPin, ShieldCheck, Tag, Wrench, type LucideIcon } from "lucide-react";

export const TASK_TYPE_LABEL: Record<string, string> = {
  "servis-regular": "Servis Regular",
  "servis-berat": "Servis Berat",
  "servis-lainnya": "Servis Lainnya",
  "administrasi-stnk-1": "STNK 1 Tahun",
  "administrasi-stnk-5": "STNK 5 Tahun",
  "administrasi-asuransi": "Asuransi"
};

export const TASK_TYPE_ICONS: Record<string, LucideIcon> = {
  "administrasi-stnk-1": IdCard,
  "administrasi-stnk-5": IdCard,
  "administrasi-asuransi": ShieldCheck,
  "servis-regular": Wrench,
  "servis-berat": Anvil,
  "servis-lainnya": Bolt,
  "lokasi": MapPin,
  "terjual": Tag,
  "kendaraan": CarFront,
};

export const VEHICLE_CATEGORY_PARAM = [
  { id: "1", group: "0001", name: "Mobil", description: "Mobil" },
  { id: "2", group: "0001", name: "Motor", description: "Motor" },
]

export const SERVICE_TYPE_PARAM = [
  { id: "1", group: "0002", name: "servis-regular", description: TASK_TYPE_LABEL["servis-regular"] },
  { id: "2", group: "0002", name: "servis-berat", description: TASK_TYPE_LABEL["servis-berat"] },
  { id: "3", group: "0002", name: "servis-lainnya", description: TASK_TYPE_LABEL["servis-lainnya"] },
]

export const ADMINISTRATION_TYPE_PARAM = [
  { id: "1", group: "0003", name: "administrasi-stnk-1", description: TASK_TYPE_LABEL["administrasi-stnk-1"] },
  { id: "2", group: "0003", name: "administrasi-stnk-5", description: TASK_TYPE_LABEL["administrasi-stnk-5"] },
  { id: "3", group: "0003", name: "administrasi-asuransi", description: TASK_TYPE_LABEL["administrasi-asuransi"] },
]

export const PENDING = "pending";
export const ONGOING = "ongoing";
export const COMPLETED = "completed";
export const CANCELLED = "cancelled";
export const ACTIVE = "active";
export const INACTIVE = "inactive";

export type Status = typeof PENDING | typeof ONGOING | typeof COMPLETED | typeof CANCELLED | typeof ACTIVE | typeof INACTIVE;

export const STATUS_LABEL: Record<Status, string> = {
  [PENDING]: "Pending",
  [ONGOING]: "Proses",
  [COMPLETED]: "Selesai",
  [CANCELLED]: "Dibatalkan",
  [ACTIVE]: "Aktif",
  [INACTIVE]: "Nonaktif"
};