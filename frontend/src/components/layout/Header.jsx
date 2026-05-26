import { useLocation, useNavigate } from "react-router-dom";
import { Bell, CircleHelp, LogOut, Menu } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import { getInitials } from "../../utils/getInitials.js";
import { getPageTitle } from "../../utils/pageTitles.js";

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = getPageTitle(pathname);
  const initials = getInitials(user?.name || "Admin");
  const displayRole =
    user?.role === "ADMIN" ? "Admin" : user?.name?.split(" ")[0] || "Usuario";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 shadow-sm sm:h-16 sm:gap-3 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="shrink-0 rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
          {title}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <button
          type="button"
          className="relative hidden rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 sm:inline-flex"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <button
          type="button"
          className="hidden rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 md:inline-flex"
          aria-label="Ayuda"
        >
          <CircleHelp className="h-5 w-5" />
        </button>

        <div className="mx-0 hidden h-8 w-px bg-gray-200 sm:mx-1 md:block" />

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sgoha-primary text-xs font-bold text-white sm:h-9 sm:w-9">
            {initials}
          </div>
          <span className="hidden max-w-[120px] truncate text-sm font-medium text-gray-700 md:inline">
            {displayRole}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
