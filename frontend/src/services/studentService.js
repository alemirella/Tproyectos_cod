import { api, getData } from "../config/api.js";

export const studentService = {
  list: () => api.get("/students").then(getData),
  create: (body) => api.post("/students", body).then(getData),
  update: (id, body) => api.put(`/students/${id}`, body).then(getData),
  remove: (id) => api.delete(`/students/${id}`).then(getData),
};
