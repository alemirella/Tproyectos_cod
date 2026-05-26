import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.jsx";
import RoleRoute from "./RoleRoute.jsx";
import GuestRoute from "./GuestRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import TeacherLayout from "../layouts/TeacherLayout.jsx";
import StudentLayout from "../layouts/StudentLayout.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import AdminPlaceholderPage from "../pages/admin/AdminPlaceholderPage.jsx";
import CoursesPage from "../pages/courses/CoursesPage.jsx";
import TeachersPage from "../pages/teachers/TeachersPage.jsx";
import TeacherAvailabilityAdminPage from "../pages/teachers/TeacherAvailabilityPage.jsx";
import TeacherHomePage from "../pages/teacher/TeacherHomePage.jsx";
import TeacherPortalAvailabilityPage from "../pages/teacher/TeacherPortalAvailabilityPage.jsx";
import StudentHomePage from "../pages/student/StudentHomePage.jsx";
import StudentSchedulePage from "../pages/schedules/StudentSchedulePage.jsx";
import ScheduleGenerationPage from "../pages/schedules/ScheduleGenerationPage.jsx";
import ScheduleResultsPage from "../pages/schedules/ScheduleResultsPage.jsx";

function TeacherSchedulePlaceholder() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-lg font-semibold text-slate-900">Mi horario asignado</h3>
      <p className="mt-2 text-sm text-slate-500 sm:text-base">Módulo en desarrollo.</p>
    </div>
  );
}

function StudentEnrollmentPlaceholder() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-lg font-semibold text-slate-900">Matrícula de cursos</h3>
      <p className="mt-2 text-sm text-slate-500 sm:text-base">Módulo en desarrollo.</p>
    </div>
  );
}

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />

          {/* Administrador */}
          <Route
            element={
              <RoleRoute roles={["ADMIN"]}>
                <MainLayout />
              </RoleRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route
              path="/teachers/:id/availability"
              element={<TeacherAvailabilityAdminPage />}
            />
            <Route path="/classrooms" element={<AdminPlaceholderPage />} />
            <Route path="/students" element={<AdminPlaceholderPage />} />
            <Route path="/enrollments" element={<AdminPlaceholderPage />} />
            <Route path="/schedules/generate" element={<ScheduleGenerationPage />} />
            <Route path="/schedules/results" element={<ScheduleResultsPage />} />
            <Route path="/restrictions" element={<AdminPlaceholderPage />} />
            <Route path="/settings" element={<AdminPlaceholderPage />} />
          </Route>

          {/* Docente */}
          <Route
            element={
              <RoleRoute roles={["TEACHER"]}>
                <TeacherLayout />
              </RoleRoute>
            }
          >
            <Route path="/teacher" element={<TeacherHomePage />} />
            <Route
              path="/teacher/availability"
              element={<TeacherPortalAvailabilityPage />}
            />
            <Route path="/teacher/schedule" element={<TeacherSchedulePlaceholder />} />
          </Route>

          {/* Alumno */}
          <Route
            element={
              <RoleRoute roles={["STUDENT"]}>
                <StudentLayout />
              </RoleRoute>
            }
          >
            <Route path="/student" element={<StudentHomePage />} />
            <Route path="/student/enrollment" element={<StudentEnrollmentPlaceholder />} />
            <Route path="/student/schedule" element={<StudentSchedulePage />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
