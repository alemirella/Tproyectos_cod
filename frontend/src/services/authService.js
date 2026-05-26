import { api, getData } from "../config/api.js";

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  getMe: () => api.get("/auth/me").then(getData),

  logout: () => {
    localStorage.removeItem("sgoha_token");
  },
};
