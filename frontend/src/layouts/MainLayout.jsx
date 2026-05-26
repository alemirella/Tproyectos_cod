import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import Header from "../components/layout/Header.jsx";
import { useMobileNav } from "../hooks/useMobileNav.js";

export default function MainLayout() {
  const { open, toggle, close } = useMobileNav();

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

      <Sidebar mobileOpen={open} onNavigate={close} />

      <div className="flex min-h-screen flex-col lg:ml-[260px]">
        <Header onMenuClick={toggle} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
