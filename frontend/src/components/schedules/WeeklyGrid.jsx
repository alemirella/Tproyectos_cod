import {
  DAYS as AVAILABILITY_DAYS,
  TIME_BLOCKS,
} from "../../constants/timeBlocks.js";

/**
 * Grilla semanal reutilizable para mostrar horarios académicos.
 * Acepta una lista de asignaciones con la forma:
 *   {
 *     course: { code, name },
 *     teacher: { fullName },
 *     classroom: { code, name },
 *     timeSlot: { day, startTime, endTime, label }
 *   }
 *
 * Se renderiza una tabla con scroll horizontal en móvil y
 * tarjetas compactas dentro de cada celda.
 */
export default function WeeklyGrid({ assignments = [], variant = "student" }) {
  const map = new Map();
  for (const a of assignments) {
    const ts = a.timeSlot || {};
    const key = `${ts.day}|${ts.startTime}|${ts.endTime}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(a);
  }

  const isTeacher = variant === "teacher";
  const accent = isTeacher
    ? "bg-amber-50 border-amber-200 text-amber-900"
    : "bg-blue-50 border-blue-200 text-blue-900";

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="weekly-grid">
        <div className="weekly-grid-corner" />
        {AVAILABILITY_DAYS.map((d) => (
          <div
            key={d.key}
            className="weekly-grid-day text-center text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            {d.label}
          </div>
        ))}

        {TIME_BLOCKS.map((block) => (
          <div key={block.label} className="contents">
            <div className="weekly-grid-time text-xs font-medium text-slate-500">
              {block.label}
            </div>
            {AVAILABILITY_DAYS.map((d) => {
              const cellKey = `${d.key}|${block.startTime}|${block.endTime}`;
              const items = map.get(cellKey) || [];
              return (
                <div
                  key={`${d.key}-${block.startTime}`}
                  className="weekly-grid-cell"
                >
                  {items.map((a, idx) => (
                    <article
                      key={idx}
                      className={`mb-1 last:mb-0 rounded-lg border px-2 py-1.5 text-[11px] leading-tight ${accent}`}
                    >
                      <p className="truncate font-semibold">
                        {a.course?.code || "—"}
                      </p>
                      <p className="truncate">
                        {a.course?.name || ""}
                      </p>
                      <p className="truncate text-[10px] opacity-80">
                        {isTeacher
                          ? a.classroom?.code || a.classroom?.name || ""
                          : a.teacher?.fullName || ""}
                      </p>
                    </article>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
