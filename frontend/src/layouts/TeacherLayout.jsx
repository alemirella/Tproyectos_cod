import RoleShellLayout from "../components/layout/RoleShellLayout.jsx";

const navItems = [
  { to: "/teacher", label: "Inicio", end: true },
  { to: "/teacher/availability", label: "Disponibilidad" },
  { to: "/teacher/schedule", label: "Mi horario" },
];

export default function TeacherLayout() {
  return (
    <RoleShellLayout
      brandTitle="SGOHA Docente"
      brandSubtitle="Portal del docente"
      navItems={navItems}
    />
  );
}
