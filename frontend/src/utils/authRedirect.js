/** Ruta de inicio según rol tras login */
export function getHomePathForRole(role) {
  switch (role) {
    case "ADMIN":
      return "/dashboard";
    case "TEACHER":
      return "/teacher/availability";
    case "STUDENT":
      return "/student/enrollment";
    default:
      return "/login";
  }
}
