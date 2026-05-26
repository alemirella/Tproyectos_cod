/**
 * Bloques académicos oficiales HORALV (frontend).
 * Espejo de `backend/src/constants/timeBlocks.js`.
 * Mantener ambos archivos sincronizados.
 */
export const TIME_BLOCKS = [
  { startTime: "07:00", endTime: "07:44", label: "07:00 - 07:44" },
  { startTime: "07:45", endTime: "08:29", label: "07:45 - 08:29" },
  { startTime: "08:40", endTime: "09:24", label: "08:40 - 09:24" },
  { startTime: "09:25", endTime: "10:09", label: "09:25 - 10:09" },
  { startTime: "14:00", endTime: "14:44", label: "14:00 - 14:44" },
  { startTime: "14:45", endTime: "15:29", label: "14:45 - 15:29" },
  { startTime: "15:40", endTime: "16:24", label: "15:40 - 16:24" },
  { startTime: "16:25", endTime: "17:09", label: "16:25 - 17:09" },
  { startTime: "17:20", endTime: "18:04", label: "17:20 - 18:04" },
  { startTime: "18:05", endTime: "18:49", label: "18:05 - 18:49" },
  { startTime: "19:00", endTime: "19:44", label: "19:00 - 19:44" },
  { startTime: "19:45", endTime: "20:29", label: "19:45 - 20:29" },
  { startTime: "20:30", endTime: "21:14", label: "20:30 - 21:14" },
  { startTime: "21:15", endTime: "21:59", label: "21:15 - 21:59" },
];

export const DAYS = [
  { key: "MONDAY", label: "Lun", fullLabel: "Lunes" },
  { key: "TUESDAY", label: "Mar", fullLabel: "Martes" },
  { key: "WEDNESDAY", label: "Mié", fullLabel: "Miércoles" },
  { key: "THURSDAY", label: "Jue", fullLabel: "Jueves" },
  { key: "FRIDAY", label: "Vie", fullLabel: "Viernes" },
  { key: "SATURDAY", label: "Sáb", fullLabel: "Sábado" },
  { key: "SUNDAY", label: "Dom", fullLabel: "Domingo" },
];

/** Etiquetas largas por clave. */
export const DAY_FULL_LABEL = DAYS.reduce((acc, d) => {
  acc[d.key] = d.fullLabel;
  return acc;
}, {});

/** Duración del bloque académico (minutos). */
export const BLOCK_MINUTES = 44;

/** ID estable de una franja. */
export function slotKey(day, startTime, endTime) {
  return `${day}|${startTime}|${endTime}`;
}

/**
 * Estadísticas precisas a partir de una lista de slots seleccionados.
 * - blocks: cantidad de bloques marcados
 * - minutes: minutos totales (cada bloque dura BLOCK_MINUTES)
 * - hours: equivalente en horas con dos decimales
 */
export function countAvailabilityStats(availability = []) {
  const blocks = availability.length;
  const minutes = blocks * BLOCK_MINUTES;
  const hours = Math.round((minutes / 60) * 100) / 100;
  return { blocks, minutes, hours };
}
