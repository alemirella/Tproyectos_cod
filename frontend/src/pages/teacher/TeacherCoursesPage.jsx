import { useEffect, useState } from "react";
import { BookOpen, AlertTriangle } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { teacherPortalService } from "../../services/teacherPortalService.js";
import {
  getClassroomLabel,
  CLASSROOM_TYPE_BADGE,
} from "../../utils/courseLabels.js";

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [linkError, setLinkError] = useState(false);

  useEffect(() => {
    teacherPortalService
      .getMyCourses()
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setLinkError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
        Cargando cursos...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mis cursos"
        subtitle="Cursos que puedes dictar o que fueron asignados a tu perfil."
      />

      {linkError ? (
        <Card className="flex items-start gap-3 border-amber-200 bg-amber-50 p-5 text-amber-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">
            No encontramos un perfil docente vinculado a tu usuario.
          </p>
        </Card>
      ) : courses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Aún no tienes cursos asignados"
          description="Pide al administrador que asocie cursos a tu perfil docente para que puedas verlos aquí."
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="divide-y divide-slate-100 lg:hidden">
            {courses.map((c) => (
              <article key={c._id} className="p-4">
                <p className="font-semibold text-sgoha-primary">{c.code}</p>
                <p className="mt-0.5 font-medium text-slate-900">{c.name}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{c.credits ?? "—"} créditos</span>
                  <Badge
                    variant={CLASSROOM_TYPE_BADGE[c.classroomTypeRequired] || "info"}
                  >
                    {getClassroomLabel(c.classroomTypeRequired)}
                  </Badge>
                  <Badge variant={c.active !== false ? "success" : "neutral"}>
                    {c.active !== false ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </article>
            ))}
          </div>
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Código</th>
                  <th className="px-5 py-3">Nombre</th>
                  <th className="px-5 py-3">Créditos</th>
                  <th className="px-5 py-3">Tipo de aula</th>
                  <th className="px-5 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50/80">
                    <td className="px-5 py-3 font-semibold text-sgoha-primary">
                      {c.code}
                    </td>
                    <td className="px-5 py-3 font-medium text-slate-900">
                      {c.name}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {c.credits ?? "—"}
                    </td>
                    <td className="px-5 py-3">
                      <Badge
                        variant={
                          CLASSROOM_TYPE_BADGE[c.classroomTypeRequired] || "info"
                        }
                      >
                        {getClassroomLabel(c.classroomTypeRequired)}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={c.active !== false ? "success" : "neutral"}>
                        {c.active !== false ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
