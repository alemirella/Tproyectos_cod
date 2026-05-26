import {
  DAYS as AVAILABILITY_DAYS,
  TIME_BLOCKS,
  slotKey,
} from "../../constants/timeBlocks.js";

export default function AvailabilityGrid({
  value = [],
  onChange,
  readOnly = false,
}) {
  const selected = new Set(
    value.map((v) => slotKey(v.day, v.startTime, v.endTime))
  );

  function toggle(day, startTime, endTime) {
    if (readOnly || !onChange) return;
    const k = slotKey(day, startTime, endTime);
    const next = selected.has(k)
      ? value.filter((v) => slotKey(v.day, v.startTime, v.endTime) !== k)
      : [...value, { day, startTime, endTime }];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <p className="text-center text-[11px] text-slate-400 lg:hidden">
        Desliza horizontalmente para ver los siete días de la semana
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-2 sm:p-4">
        <div className="grid-availability mx-auto w-full min-w-[52rem] max-w-full">
          <div className="grid-availability-corner" />
          {AVAILABILITY_DAYS.map((d) => (
            <div
              key={d.key}
              className="grid-availability-day text-center text-[0.65rem] font-semibold text-slate-600 sm:text-xs"
            >
              {d.label}
            </div>
          ))}
          {TIME_BLOCKS.map((block) => (
            <div key={block.label} className="contents">
              <div className="grid-availability-time">{block.label}</div>
              {AVAILABILITY_DAYS.map((d) => {
                const on = selected.has(
                  slotKey(d.key, block.startTime, block.endTime)
                );
                return (
                  <button
                    key={`${d.key}-${block.startTime}`}
                    type="button"
                    disabled={readOnly}
                    aria-pressed={on}
                    aria-label={`${d.label} ${block.label}`}
                    onClick={() =>
                      toggle(d.key, block.startTime, block.endTime)
                    }
                    className={`grid-availability-cell ${
                      on
                        ? "grid-availability-cell--on"
                        : "grid-availability-cell--off"
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-6 rounded border border-green-600 bg-green-500" />
          Disponible
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-6 rounded border border-slate-200 bg-slate-100" />
          No disponible
        </span>
      </div>
    </div>
  );
}
