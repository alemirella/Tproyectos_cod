export const PAGE_TITLES = {
  "/dashboard": "Dashboard general",
  "/courses": "Gestión de cursos",
  "/teachers": "Gestión de docentes",
  "/classrooms": "Aulas",
  "/students": "Estudiantes",
  "/enrollments": "Matrícula",
  "/schedules/generate": "Generar horarios",
  "/schedules": "Horarios",
  "/schedules/results": "Horarios",
  "/restrictions": "Restricciones",
  "/settings": "Configuración",
};

export function getPageTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  const match = Object.keys(PAGE_TITLES)
    .filter((p) => p !== "/dashboard")
    .sort((a, b) => b.length - a.length)
    .find((p) => pathname.startsWith(p));
  return match ? PAGE_TITLES[match] : "SGOHA";
}
