import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(value: string | number | null | undefined) {
  if (!value) return "";
  const number = Number(value.toString().replace(/\D/g, ""));
  return number.toLocaleString("id-ID");
}

export function formatDateTime(dateString?: string) {
  if (!dateString) return "-"

  const date = new Date(dateString)
  const tanggal = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)

  const jam = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)

  return `${tanggal} ${jam}`
}

export function formatDate(dateString?: string) {
  if (!dateString) return "-"

  const date = new Date(dateString)
  const tanggal = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)

  return `${tanggal}`
}
