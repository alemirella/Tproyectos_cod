import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import { useMobileNav } from "../../hooks/useMobileNav.js";
import { getInitials } from "../../utils/getInitials.js";

/**
 * Layout responsive compartido para roles Docente y Alumno.
 */
export default function RoleShellLayout({ brandTitle, brandSubtitle, navItems }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { open, toggle, close } = useMobileNav();
  const initials = getInitials(user?.name || "U");

  function handleLogout() {
    logout();
    navigate("/login");
  }

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

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(280px,85vw)] flex-col bg-gradient-to-b from-sgoha-sidebar-from to-sgoha-sidebar-to text-white shadow-xl transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-bold">{brandTitle}</p>
              {brandSubtitle && (
                <p className="truncate text-xs text-blue-200/90">{brandSubtitle}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-2 text-white/80 hover:bg-white/10 lg:hidden"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={close}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-sgoha-secondary text-white shadow-md"
                    : "text-blue-100/90 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-col lg:ml-[280px]">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 shadow-sm sm:h-16 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="truncate text-sm font-semibold text-slate-800 sm:text-base">
              {user?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sgoha-primary text-xs font-bold text-white sm:h-9 sm:w-9">
              {initials}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
