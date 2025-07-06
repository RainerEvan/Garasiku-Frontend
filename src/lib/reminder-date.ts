import { supabase } from "./supabaseClient";
import { PARAM_GROUP_WAKTU_REMINDER, PARAM_WAKTU_REMINDER } from "./constants";

let cachedReminderRange:
  | { today: Date; futureDate: Date; intervalDays: number }
  | null = null;

export async function getCachedReminderDateRange() {
  if (cachedReminderRange) return cachedReminderRange;

  try {
    const { data, error } = await supabase
      .from("parameter")
      .select("description")
      .eq("group", PARAM_GROUP_WAKTU_REMINDER)
      .eq("name", PARAM_WAKTU_REMINDER)
      .single();

    const intervalDays = Number(data?.description);
    const validInterval = !isNaN(intervalDays) && intervalDays > 0;

    const days = validInterval ? intervalDays : 30; // fallback to 30

    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    cachedReminderRange = { today, futureDate, intervalDays: days };
    return cachedReminderRange;
  } catch (err) {
    console.error("Failed to fetch reminder interval param:", err);

    // Fallback
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30);

    cachedReminderRange = { today, futureDate, intervalDays: 30 };
    return cachedReminderRange;
  }
}

export function clearReminderCache() {
  cachedReminderRange = null;
}
