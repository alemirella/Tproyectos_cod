import { Link } from "react-router-dom";
import { BookOpen, Clock } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";

export default function StudentHomePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Bienvenido, ${user?.name?.split(" ")[0] || "Alumno"}`}
        subtitle="Selecciona tus cursos y consulta tu horario de clases."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          to="/student/enrollment"
          className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sgoha-secondary">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Matrícula de cursos</p>
            <p className="text-sm text-slate-500">Inscripción por periodo</p>
          </div>
        </Link>
        <Link
          to="/student/schedule"
          className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Ver mi horario</p>
            <p className="text-sm text-slate-500">Clases asignadas</p>
          </div>
        </Link>
      </div>
      <Card className="p-5 text-sm text-slate-500">
        Usa el menú lateral para acceder a matrícula y horario.
      </Card>
    </div>
  );
}
