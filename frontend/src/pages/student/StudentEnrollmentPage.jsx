import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Trash2,
  ClipboardCheck,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { studentPortalService } from "../../services/studentPortalService.js";
import {
  MIN_CREDITS,
  MAX_CREDITS,
  ENROLLMENT_STATUS_LABEL,
  ENROLLMENT_STATUS_BADGE,
} from "../../utils/enrollmentConstants.js";

export default function StudentEnrollmentPage() {
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    try {
      const data = await studentPortalService.getMyEnrollment();
      setBundle(data);
    } catch {
      setBundle(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function showToast(text, type = "success") {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3500);
  }

  const enrollment = bundle?.enrollment;
  const courses = enrollment?.courses || [];
  const totalCredits = useMemo(
    () => courses.reduce((sum, c) => sum + (c.credits || 0), 0),
    [courses]
  );
  const status = enrollment?.status;
  const statusLabel = status ? ENROLLMENT_STATUS_LABEL[status] : "Sin matrícula";
  const statusVariant = status ? ENROLLMENT_STATUS_BADGE[status] : "neutral";

  const creditWarn =
    totalCredits > 0
      ? totalCredits < MIN_CREDITS
        ? `Faltan ${MIN_CREDITS - totalCredits} créditos para el mínimo.`
        : totalCredits > MAX_CREDITS
          ? `Superas el máximo en ${totalCredits - MAX_CREDITS} créditos.`
          : "Total de créditos dentro del rango permitido."
      : "Aún no has seleccionado cursos.";

  async function removeCourse(courseId) {
    setSaving(true);
    try {
      const next = courses
        .filter((c) => String(c._id) !== String(courseId))
        .map((c) => String(c._id));
      await studentPortalService.saveMySelection(next);
      showToast("Curso retirado de tu matrícula.");
      load();
    } catch {
      showToast("No se pudo actualizar la matrícula.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed left-4 right-4 top-[4.25rem] z-50 rounded-lg px-4 py-3 text-center text-sm font-medium shadow-lg sm:left-auto sm:right-6 sm:top-20 sm:max-w-sm sm:text-left ${
            toast.type === "error"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {toast.text}
        </div>
      )}

      <PageHeader
        title="Mi matrícula"
        subtitle="Selecciona los cursos que deseas llevar este periodo."
      >
        <Link
          to="/student/courses"
          className="inline-flex items-center gap-2 rounded-xl bg-sgoha-primary px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-900"
        >
          <BookOpen className="h-4 w-4" />
          Ver cursos disponibles
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="overflow-hidden">
          {loading ? (
            <div className="flex min-h-[240px] items-center justify-center text-slate-500">
              Cargando matrícula...
            </div>
          ) : courses.length === 0 ? (
            <EmptyState
              icon={ClipboardCheck}
              title="Aún no has seleccionado cursos"
              description="Explora los cursos disponibles y agrégalos a tu matrícula."
              action={
                <Link
                  to="/student/courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-sgoha-primary px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-900"
                >
                  Ir a cursos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {courses.map((c) => (
                <article
                  key={c._id}
                  className="flex items-start justify-between gap-3 p-4"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sgoha-primary">{c.code}</p>
                    <p className="truncate font-medium text-slate-900">
                      {c.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {c.credits} créditos
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCourse(c._id)}
                    disabled={saving}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    title="Quitar curso"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </article>
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-4">
          <Card className="p-5 bg-gradient-to-br from-[#1E3A8A] to-[#172554] text-white">
            <p className="text-xs uppercase tracking-wide text-blue-200/90">
              Resumen
            </p>
            <p className="mt-2 text-3xl font-bold">{totalCredits}</p>
            <p className="text-sm text-blue-100/90">
              créditos seleccionados
            </p>
            <p className="mt-3 text-xs text-blue-100/80">
              Mínimo {MIN_CREDITS} · Máximo {MAX_CREDITS}
            </p>
            <p className="mt-2 text-xs text-blue-100/80">{creditWarn}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-blue-100/90">Estado:</span>
              <Badge variant={statusVariant}>{statusLabel}</Badge>
            </div>
          </Card>

          <Link
            to="/student/enrollment-validation"
            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span>
                <p className="text-sm font-semibold text-slate-900">
                  Validar matrícula
                </p>
                <p className="text-xs text-slate-500">
                  Prerrequisitos y créditos
                </p>
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </Link>

          {enrollment?.validationMessages?.length > 0 && (
            <Card className="p-4">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Mensajes
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {enrollment.validationMessages.map((m, i) => (
                  <li key={i}>• {m}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
