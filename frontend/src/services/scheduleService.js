import { api, getData } from "../config/api.js";

export const scheduleService = {
  list: () => api.get("/schedules").then(getData),
  generate: (period) =>
    api.post("/schedules/generate", { period }).then(getData),
  byStudent: (studentId) =>
    api.get(`/schedules/student/${studentId}`).then(getData),
  byTeacher: (teacherId) =>
    api.get(`/schedules/teacher/${teacherId}`).then(getData),
  byClassroom: (classroomId) =>
    api.get(`/schedules/classroom/${classroomId}`).then(getData),
};
