import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.jsx";
import RoleRoute from "./RoleRoute.jsx";
import GuestRoute from "./GuestRoute.jsx";

import AdminLayout from "../layouts/AdminLayout.jsx";
import TeacherLayout from "../layouts/TeacherLayout.jsx";
import StudentLayout from "../layouts/StudentLayout.jsx";

import LoginPage from "../pages/auth/LoginPage.jsx";

// Admin
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import AdminPlaceholderPage from "../pages/admin/AdminPlaceholderPage.jsx";
import UsersPage from "../pages/admin/UsersPage.jsx";
import CoursesPage from "../pages/courses/CoursesPage.jsx";
import TeachersPage from "../pages/teachers/TeachersPage.jsx";
import TeacherAvailabilityAdminPage from "../pages/teachers/TeacherAvailabilityPage.jsx";
import ScheduleGenerationPage from "../pages/schedules/ScheduleGenerationPage.jsx";
import ScheduleResultsPage from "../pages/schedules/ScheduleResultsPage.jsx";

// Cuenta compartida
import AccountPage from "../pages/account/AccountPage.jsx";

// Docente (portal)
import TeacherHomePage from "../pages/teacher/TeacherHomePage.jsx";
import TeacherAvailabilityPage from "../pages/teacher/TeacherAvailabilityPage.jsx";
import TeacherCoursesPage from "../pages/teacher/TeacherCoursesPage.jsx";
import TeacherSchedulePage from "../pages/teacher/TeacherSchedulePage.jsx";
import TeacherProfilePage from "../pages/teacher/TeacherProfilePage.jsx";

// Alumno (portal)
import StudentHomePage from "../pages/student/StudentHomePage.jsx";
import StudentEnrollmentPage from "../pages/student/StudentEnrollmentPage.jsx";
import StudentCoursesPage from "../pages/student/StudentCoursesPage.jsx";
import StudentEnrollmentValidationPage from "../pages/student/StudentEnrollmentValidationPage.jsx";
import StudentSchedulePage from "../pages/student/StudentSchedulePage.jsx";
import StudentProfilePage from "../pages/student/StudentProfilePage.jsx";

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

          {/* ============ Administrador ============ */}
          <Route
            element={
              <RoleRoute roles={["ADMIN"]}>
                <AdminLayout />
              </RoleRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route
              path="/teachers/:id/availability"
              element={<TeacherAvailabilityAdminPage />}
            />
            <Route path="/classrooms" element={<AdminPlaceholderPage />} />
            <Route path="/students" element={<AdminPlaceholderPage />} />
            <Route path="/timeslots" element={<AdminPlaceholderPage />} />
            <Route path="/enrollments" element={<AdminPlaceholderPage />} />
            <Route path="/schedules/generate" element={<ScheduleGenerationPage />} />
            <Route path="/schedules" element={<ScheduleResultsPage />} />
            <Route path="/schedules/results" element={<ScheduleResultsPage />} />
            <Route path="/restrictions" element={<AdminPlaceholderPage />} />
            <Route path="/settings" element={<AdminPlaceholderPage />} />
          </Route>

          {/* ============ Docente ============ */}
          <Route
            element={
              <RoleRoute roles={["TEACHER"]}>
                <TeacherLayout />
              </RoleRoute>
            }
          >
            <Route path="/teacher" element={<Navigate to="/teacher/home" replace />} />
            <Route path="/teacher/home" element={<TeacherHomePage />} />
            <Route
              path="/teacher/availability"
              element={<TeacherAvailabilityPage />}
            />
            <Route path="/teacher/courses" element={<TeacherCoursesPage />} />
            <Route path="/teacher/schedule" element={<TeacherSchedulePage />} />
            <Route path="/teacher/profile" element={<TeacherProfilePage />} />
            <Route path="/teacher/account" element={<AccountPage />} />
          </Route>

          {/* ============ Alumno ============ */}
          <Route
            element={
              <RoleRoute roles={["STUDENT"]}>
                <StudentLayout />
              </RoleRoute>
            }
          >
            <Route path="/student" element={<Navigate to="/student/home" replace />} />
            <Route path="/student/home" element={<StudentHomePage />} />
            <Route path="/student/enrollment" element={<StudentEnrollmentPage />} />
            <Route path="/student/courses" element={<StudentCoursesPage />} />
            <Route
              path="/student/enrollment-validation"
              element={<StudentEnrollmentValidationPage />}
            />
            <Route path="/student/schedule" element={<StudentSchedulePage />} />
            <Route path="/student/profile" element={<StudentProfilePage />} />
            <Route path="/student/account" element={<AccountPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
