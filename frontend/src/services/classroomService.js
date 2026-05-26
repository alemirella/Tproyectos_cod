import { api, getData } from "../config/api.js";

export const classroomService = {
  list: () => api.get("/classrooms").then(getData),
  create: (body) => api.post("/classrooms", body).then(getData),
  update: (id, body) => api.put(`/classrooms/${id}`, body).then(getData),
  remove: (id) => api.delete(`/classrooms/${id}`).then(getData),
};
