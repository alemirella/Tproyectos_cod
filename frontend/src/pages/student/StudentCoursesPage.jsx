import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Plus, Check, BookOpen } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { courseService } from "../../services/courseService.js";
import { studentPortalService } from "../../services/studentPortalService.js";
import {
  getClassroomLabel,
  CLASSROOM_TYPE_BADGE,
} from "../../utils/courseLabels.js";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const loadAll = useCallback(async () => {
    try {
      const [list, mine] = await Promise.all([
        courseService.getCourses({ active: "true" }),
        studentPortalService
          .getMyEnrollment()
          .then((r) => r?.enrollment?.courses?.map((c) => String(c._id)) || [])
          .catch(() => []),
      ]);
      setCourses(Array.isArray(list) ? list : []);
      setSelectedIds(mine);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  function showToast(text, type = "success") {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3500);
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return courses;
    return courses.filter(
      (c) =>
        c.code.toLowerCase().includes(term) ||
        c.name.toLowerCase().includes(term)
    );
  }, [courses, search]);

  async function addCourse(course) {
    if (selectedIds.includes(String(course._id))) return;
    setSaving(true);
    try {
      const next = [...selectedIds, String(course._id)];
      await studentPortalService.saveMySelection(next);
      setSelectedIds(next);
      showToast(`${course.code} agregado a tu matrícula.`);
    } catch {
      showToast("No se pudo agregar el curso.", "error");
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
        title="Cursos disponibles"
        subtitle="Consulta los cursos habilitados para matrícula y agrégalos a tu selección."
      />

      <Card className="overflow-hidden">
        <div className="border-b border-slate-100 p-4 lg:p-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Buscar por código o nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center text-slate-500">
            Cargando cursos...
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="Sin cursos disponibles"
            description="No hay cursos que coincidan con tu búsqueda."
          />
        ) : (
          <>
            <div className="divide-y divide-slate-100 lg:hidden">
              {filtered.map((c) => (
                <CourseCardMobile
                  key={c._id}
                  course={c}
                  selected={selectedIds.includes(String(c._id))}
                  onAdd={() => addCourse(c)}
                  saving={saving}
                />
              ))}
            </div>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-3">Código</th>
                    <th className="px-5 py-3">Nombre</th>
                    <th className="px-5 py-3">Créditos</th>
                    <th className="px-5 py-3">Prerrequisitos</th>
                    <th className="px-5 py-3">Tipo de aula</th>
                    <th className="px-5 py-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((c) => {
                    const isSelected = selectedIds.includes(String(c._id));
                    return (
                      <tr key={c._id} className="hover:bg-slate-50/80">
                        <td className="px-5 py-3 font-semibold text-sgoha-primary">
                          {c.code}
                        </td>
                        <td className="px-5 py-3 font-medium text-slate-900">
                          {c.name}
                        </td>
                        <td className="px-5 py-3 text-slate-600">{c.credits}</td>
                        <td className="px-5 py-3">
                          <PrereqList prerequisites={c.prerequisites} />
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
                        <td className="px-5 py-3 text-right">
                          {isSelected ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                              <Check className="h-4 w-4" /> En matrícula
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addCourse(c)}
                              disabled={saving}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-sgoha-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-900 disabled:opacity-60"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              Agregar a matrícula
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

function CourseCardMobile({ course, selected, onAdd, saving }) {
  return (
    <article className="space-y-2 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-sgoha-primary">{course.code}</p>
          <p className="truncate font-medium text-slate-900">{course.name}</p>
          <p className="mt-1 text-xs text-slate-500">
            {course.credits} créditos
          </p>
        </div>
        {selected ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            <Check className="h-3.5 w-3.5" /> En matrícula
          </span>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            disabled={saving}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-sgoha-primary px-3 py-1.5 text-xs font-semibold text-white"
          >
            <Plus className="h-3.5 w-3.5" />
            Agregar
          </button>
        )}
      </div>
      <PrereqList prerequisites={course.prerequisites} />
      <Badge
        variant={CLASSROOM_TYPE_BADGE[course.classroomTypeRequired] || "info"}
      >
        {getClassroomLabel(course.classroomTypeRequired)}
      </Badge>
    </article>
  );
}

function PrereqList({ prerequisites }) {
  if (!prerequisites?.length) {
    return <span className="text-xs text-slate-400 italic">Sin prerrequisitos</span>;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {prerequisites.map((p) => (
        <span
          key={p._id || p}
          className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
        >
          {typeof p === "object" ? p.code : p}
        </span>
      ))}
    </div>
  );
}
