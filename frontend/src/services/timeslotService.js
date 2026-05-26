import { api, getData } from "../config/api.js";

export const timeslotService = {
  list: () => api.get("/timeslots").then(getData),
  create: (body) => api.post("/timeslots", body).then(getData),
  remove: (id) => api.delete(`/timeslots/${id}`).then(getData),
};
