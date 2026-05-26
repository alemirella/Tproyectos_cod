import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService.js";
import { getHomePathForRole } from "../utils/authRedirect.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sgoha_token");
    if (!token) {
      setLoading(false);
      return;
    }

    authService
      .getMe()
      .then(setUser)
      .catch(() => {
        authService.logout();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);

    if (!response.success) {
      const err = new Error(response.message || "Credenciales incorrectas");
      err.response = { data: response };
      throw err;
    }

    localStorage.setItem("sgoha_token", response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const homePath = user ? getHomePathForRole(user.role) : "/login";

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, homePath }}>
      {children}
    </AuthContext.Provider>
  );
}
