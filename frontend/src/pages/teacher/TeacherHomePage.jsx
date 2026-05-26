import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";

export default function TeacherHomePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Bienvenido, ${user?.name?.split(" ")[0] || "Docente"}`}
        subtitle="Registra tu disponibilidad y consulta tu horario asignado."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          to="/teacher/availability"
          className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sgoha-secondary">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Mi disponibilidad</p>
            <p className="text-sm text-slate-500">Franjas horarias semanales</p>
          </div>
        </Link>
        <Link
          to="/teacher/schedule"
          className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Ver mi horario</p>
            <p className="text-sm text-slate-500">Asignaciones publicadas</p>
          </div>
        </Link>
      </div>
      <Card className="p-5 text-sm text-slate-500">
        Usa el menú lateral para navegar entre las secciones del portal docente.
      </Card>
    </div>
  );
}
