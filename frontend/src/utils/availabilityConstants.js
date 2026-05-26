/** Bloques de 1h 30 — jornada 07:00 a 22:00 (usado por CSP y RF-02). */
export const AVAILABILITY_DAYS = [
  { key: "MONDAY", label: "Lun" },
  { key: "TUESDAY", label: "Mar" },
  { key: "WEDNESDAY", label: "Mié" },
  { key: "THURSDAY", label: "Jue" },
  { key: "FRIDAY", label: "Vie" },
  { key: "SATURDAY", label: "Sáb" },
  { key: "SUNDAY", label: "Dom" },
];

export const TIME_BLOCKS = [
  { startTime: "07:00", endTime: "08:30", label: "07:00 - 08:30" },
  { startTime: "08:30", endTime: "10:00", label: "08:30 - 10:00" },
  { startTime: "10:00", endTime: "11:30", label: "10:00 - 11:30" },
  { startTime: "11:30", endTime: "13:00", label: "11:30 - 13:00" },
  { startTime: "13:00", endTime: "14:30", label: "13:00 - 14:30" },
  { startTime: "14:30", endTime: "16:00", label: "14:30 - 16:00" },
  { startTime: "16:00", endTime: "17:30", label: "16:00 - 17:30" },
  { startTime: "17:30", endTime: "19:00", label: "17:30 - 19:00" },
  { startTime: "19:00", endTime: "20:30", label: "19:00 - 20:30" },
  { startTime: "20:30", endTime: "22:00", label: "20:30 - 22:00" },
];

export const BLOCK_HOURS = 1.5;

export function slotKey(day, startTime, endTime) {
  return `${day}|${startTime}|${endTime}`;
}

export function countAvailabilityStats(availability = []) {
  const blocks = availability.length;
  const hours = blocks * BLOCK_HOURS;
  return { blocks, hours };
}
