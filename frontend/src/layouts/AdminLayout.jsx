import { Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  UserRound,
  Building2,
  Users,
  ShieldCheck,
  CalendarRange,
  UserCheck,
  CalendarDays,
  Clock,
  Ban,
  Settings,
  UserCog,
  Zap,
} from "lucide-react";
import RoleSidebar from "../components/layout/RoleSidebar.jsx";
import RoleHeader from "../components/layout/RoleHeader.jsx";
import { useMobileNav } from "../hooks/useMobileNav.js";

const adminNav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/users", label: "Usuarios", icon: ShieldCheck },
  { to: "/courses", label: "Cursos", icon: BookOpen },
  { to: "/teachers", label: "Docentes", icon: UserRound },
  { to: "/classrooms", label: "Aulas", icon: Building2 },
  { to: "/students", label: "Estudiantes", icon: Users },
  { to: "/timeslots", label: "Franjas horarias", icon: CalendarRange },
  { to: "/enrollments", label: "Matrícula", icon: UserCheck },
  { to: "/schedules/generate", label: "Generar horarios", icon: CalendarDays },
  { to: "/schedules", label: "Horarios", icon: Clock },
  { to: "/restrictions", label: "Restricciones", icon: Ban },
  { to: "/settings", label: "Configuración", icon: Settings },
  { to: "/account", label: "Mi cuenta", icon: UserCog },
];

export default function AdminLayout() {
  const { open, toggle, close } = useMobileNav();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sgoha-bg">
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-label="Cerrar menú"
        />
      )}

      <RoleSidebar
        brandTitle="SGOHA"
        brandSubtitle="Panel administrativo"
        navItems={adminNav}
        mobileOpen={open}
        onNavigate={close}
        footer={
          <button
            type="button"
            onClick={() => {
              close();
              navigate("/schedules/generate");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-sgoha-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
          >
            <Zap className="h-4 w-4 shrink-0" />
            <span className="truncate">Generar horario</span>
          </button>
        }
      />

      <div className="flex min-h-screen flex-col lg:ml-[264px]">
        <RoleHeader onMenuClick={toggle} fallbackTitle="Dashboard general" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
