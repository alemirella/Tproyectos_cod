import { api, getData } from "../config/api.js";

export const enrollmentService = {
  list: () => api.get("/enrollments").then(getData),
  create: (body) => api.post("/enrollments", body).then(getData),
  validate: (body) => api.post("/enrollments/validate", body).then(getData),
  confirm: (id) => api.post(`/enrollments/${id}/confirm`).then(getData),
};
