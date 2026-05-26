import RoleShellLayout from "../components/layout/RoleShellLayout.jsx";

const navItems = [
  { to: "/student", label: "Inicio", end: true },
  { to: "/student/enrollment", label: "Matrícula" },
  { to: "/student/schedule", label: "Mi horario" },
];

export default function StudentLayout() {
  return (
    <RoleShellLayout
      brandTitle="SGOHA Alumno"
      brandSubtitle="Portal del estudiante"
      navItems={navItems}
    />
  );
}
