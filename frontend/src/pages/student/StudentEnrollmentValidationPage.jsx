import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { studentPortalService } from "../../services/studentPortalService.js";
import {
  MIN_CREDITS,
  MAX_CREDITS,
  ENROLLMENT_STATUS_LABEL,
  ENROLLMENT_STATUS_BADGE,
} from "../../utils/enrollmentConstants.js";

export default function StudentEnrollmentValidationPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function run() {
      try {
        const bundle = await studentPortalService.getMyEnrollment();
        const courseIds = (bundle?.enrollment?.courses || []).map((c) =>
          String(c._id)
        );
        setCourses(bundle?.enrollment?.courses || []);
        if (courseIds.length === 0) {
          setResult({
            status: "INVALID",
            valid: false,
            totalCredits: 0,
            messages: ["Aún no has seleccionado cursos."],
          });
        } else {
          const r =
            await studentPortalService.validateMySelection(courseIds);
          setResult(r);
        }
      } catch {
        setResult(null);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, []);

  const status = result?.status || "INVALID";
  const statusLabel = ENROLLMENT_STATUS_LABEL[status] || status;
  const statusVariant = ENROLLMENT_STATUS_BADGE[status] || "neutral";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Validación de matrícula"
        subtitle="Revisa si tus cursos cumplen prerrequisitos y créditos."
      >
        <Link
          to="/student/enrollment"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a mi matrícula
        </Link>
      </PageHeader>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
          Validando matrícula...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <StatusBanner result={result} />
            <Card className="p-5 sm:p-6">
              <h3 className="text-base font-semibold text-slate-900">
                Detalle de validación
              </h3>
              <ul className="mt-4 space-y-2">
                {(result?.messages?.length ? result.messages : [
                  "Sin mensajes de validación.",
                ]).map((m, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                  >
                    {result?.valid ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    )}
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {courses.length > 0 && (
              <Card className="overflow-hidden">
                <div className="border-b border-slate-100 px-5 py-3">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Cursos en validación
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {courses.map((c) => (
                    <div
                      key={c._id}
                      className="flex items-center justify-between gap-3 px-5 py-3 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-sgoha-primary">
                          {c.code}
                        </p>
                        <p className="text-slate-700">{c.name}</p>
                      </div>
                      <span className="text-xs text-slate-500">
                        {c.credits} créditos
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    result?.valid
                      ? "bg-green-50 text-green-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm text-slate-500">Estado</p>
                  <Badge variant={statusVariant}>{statusLabel}</Badge>
                </div>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                <Row label="Créditos seleccionados" value={result?.totalCredits ?? 0} />
                <Row label="Mínimo permitido" value={MIN_CREDITS} />
                <Row label="Máximo permitido" value={MAX_CREDITS} />
              </dl>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBanner({ result }) {
  if (!result) return null;
  if (result.valid) {
    return (
      <Card className="flex items-start gap-3 border-green-200 bg-green-50 p-4 text-green-800">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-sm font-semibold">Matrícula válida</p>
          <p className="mt-1 text-sm">
            Cumples prerrequisitos y rango de créditos. Tu matrícula está lista
            para confirmar.
          </p>
        </div>
      </Card>
    );
  }
  return (
    <Card className="flex items-start gap-3 border-amber-200 bg-amber-50 p-4 text-amber-900">
      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
      <div>
        <p className="text-sm font-semibold">Aún no es válida</p>
        <p className="mt-1 text-sm">
          Revisa los mensajes para corregir tu selección y volver a validar.
        </p>
      </div>
    </Card>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
