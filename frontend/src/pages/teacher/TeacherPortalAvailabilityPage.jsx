import { useEffect, useState } from "react";
import { teacherService } from "../../services/teacherService.js";
import AvailabilityGrid from "../../components/availability/AvailabilityGrid.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";

/** Portal docente: selección de perfil y grilla de disponibilidad. */
export default function TeacherPortalAvailabilityPage() {
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [availability, setAvailability] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    teacherService.getTeachers({ active: "true" }).then(setTeachers);
  }, []);

  useEffect(() => {
    const t = teachers.find((x) => x._id === teacherId);
    setAvailability(t?.availability || []);
  }, [teacherId, teachers]);

  async function save() {
    if (!teacherId) return;
    setSaving(true);
    setMsg(null);
    try {
      await teacherService.updateTeacherAvailability(teacherId, availability);
      setMsg({ type: "success", text: "Disponibilidad actualizada correctamente." });
      const list = await teacherService.getTeachers({ active: "true" });
      setTeachers(list);
    } catch {
      setMsg({ type: "error", text: "No se pudo guardar la disponibilidad." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mi disponibilidad horaria"
        subtitle="Marca las franjas en las que puedes dictar clases."
      />

      <Card className="p-4 sm:p-6">
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Perfil docente
        </label>
        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="mb-6 w-full max-w-md rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="">Seleccione...</option>
          {teachers.map((t) => (
            <option key={t._id} value={t._id}>
              {t.fullName}
            </option>
          ))}
        </select>

        {teacherId && (
          <>
            <AvailabilityGrid value={availability} onChange={setAvailability} />
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-sgoha-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-900 disabled:opacity-60 sm:w-auto"
            >
              {saving ? "Guardando..." : "Guardar disponibilidad"}
            </button>
            {msg && (
              <p
                className={`mt-3 text-sm font-medium ${
                  msg.type === "error" ? "text-red-600" : "text-green-600"
                }`}
              >
                {msg.text}
              </p>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
