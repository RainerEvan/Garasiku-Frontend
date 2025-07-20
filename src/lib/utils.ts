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
