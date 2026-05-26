import { api, getData } from "../config/api.js";

// ── Mock temporal (reemplazar cuando exista GET /api/dashboard/*) ──

const MOCK_SUMMARY = {
  courses: 124,
  teachers: 86,
  classrooms: 42,
  students: 1450,
  schedules: 8,
};

const MOCK_STATUS = [
  { id: "mongodb", label: "MongoDB", status: "Activa", icon: "database" },
  { id: "api", label: "API", status: "Activa", icon: "server" },
  { id: "csp", label: "Motor CSP", status: "Listo", icon: "cpu" },
];

const MOCK_ACTIVITY = [
  {
    id: "1",
    date: "Hoy, 10:45 AM",
    action: "Generación de horario 2024-I",
    user: "Admin",
    status: "Completado",
  },
  {
    id: "2",
    date: "Hoy, 09:12 AM",
    action: "Registro masivo de estudiantes",
    user: "María P.",
    status: "En progreso",
  },
  {
    id: "3",
    date: "Ayer, 16:30 PM",
    action: "Actualización de restricción docente",
    user: "Admin",
    status: "Completado",
  },
  {
    id: "4",
    date: "Ayer, 14:15 PM",
    action: "Validación de matrícula",
    user: "Sistema",
    status: "Fallido",
  },
];

export const dashboardService = {
  /**
   * Resumen de métricas del sistema.
   * Futuro: GET /api/dashboard/summary
   */
  getDashboardSummary: async () => {
    try {
      // const data = await api.get("/dashboard/summary").then(getData);
      // return data;
      return { ...MOCK_SUMMARY };
    } catch {
      return { ...MOCK_SUMMARY };
    }
  },

  /**
   * Estado de servicios (MongoDB, API, CSP).
   * Futuro: GET /api/dashboard/status
   */
  getSystemStatus: async () => {
    try {
      // return await api.get("/dashboard/status").then(getData);
      return [...MOCK_STATUS];
    } catch {
      return [...MOCK_STATUS];
    }
  },

  /**
   * Actividad reciente.
   * Futuro: GET /api/dashboard/activity
   */
  getRecentActivity: async () => {
    try {
      // return await api.get("/dashboard/activity").then(getData);
      return [...MOCK_ACTIVITY];
    } catch {
      return [...MOCK_ACTIVITY];
    }
  },
};
