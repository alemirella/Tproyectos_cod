import { useEffect, useState } from "react";
import { AlertTriangle, Save } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import AvailabilityGrid from "../../components/availability/AvailabilityGrid.jsx";
import { teacherPortalService } from "../../services/teacherPortalService.js";
import {
  BLOCK_MINUTES,
  countAvailabilityStats,
} from "../../constants/timeBlocks.js";

/**
 * Disponibilidad horaria del docente autenticado.
 * Usa /api/teachers/me — sin selector de perfil.
 */
export default function TeacherAvailabilityPage() {
  const [teacher, setTeacher] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [linkError, setLinkError] = useState(false);

  useEffect(() => {
    teacherPortalService
      .getMyProfile()
      .then((data) => {
        setTeacher(data);
        setAvailability(data?.availability || []);
      })
      .catch(() => setLinkError(true))
      .finally(() => setLoading(false));
  }, []);

  const { blocks, hours } = countAvailabilityStats(availability);

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const updated =
        await teacherPortalService.updateMyAvailability(availability);
      setTeacher(updated);
      setMsg({
        type: "success",
        text: "Disponibilidad actualizada correctamente.",
      });
    } catch {
      setMsg({
        type: "error",
        text: "No se pudo guardar la disponibilidad.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
        Cargando disponibilidad...
      </div>
    );
  }

  if (linkError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Mi disponibilidad horaria"
          subtitle="Marca las franjas en las que puedes dictar clases."
        />
        <Card className="flex items-start gap-3 border-amber-200 bg-amber-50 p-5 text-amber-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Perfil docente no vinculado</p>
            <p className="mt-1 text-sm">
              No encontramos un perfil docente asociado a tu usuario. Pide al
              administrador que registre tu perfil en{" "}
              <strong>Gestión de docentes</strong> usando tu correo institucional.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mi disponibilidad horaria"
        subtitle="Marca las franjas en las que puedes dictar clases."
      />

      <Card className="space-y-3 p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Docente</p>
            <p className="text-lg font-semibold text-slate-900">
              {teacher?.fullName}
            </p>
            <p className="text-xs text-slate-500">{teacher?.email}</p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {blocks} bloques · {hours}h por semana
          </span>
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <AvailabilityGrid value={availability} onChange={setAvailability} />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Cada bloque equivale a {BLOCK_MINUTES} minutos académicos (HORALV)
            y será usado por el motor CSP.
          </p>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sgoha-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-900 disabled:opacity-60 sm:w-auto"
          >
            <Save className="h-4 w-4" />
            {saving ? "Guardando..." : "Guardar disponibilidad"}
          </button>
        </div>

        {msg && (
          <p
            className={`mt-3 text-sm font-medium ${
              msg.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {msg.text}
          </p>
        )}
      </Card>
    </div>
  );
}
