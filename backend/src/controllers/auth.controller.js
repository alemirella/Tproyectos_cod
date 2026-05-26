import { asyncHandler } from "../utils/asyncHandler.js";
import { ok, fail } from "../utils/apiResponse.js";
import { authService } from "../services/auth.service.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim()) {
    return fail(res, "Ingresa tu correo institucional.", 400);
  }
  if (!password) {
    return fail(res, "Ingresa tu contraseña.", 400);
  }

  try {
    const data = await authService.login({ email, password });
    res.status(200).json({
      success: true,
      message: "Inicio de sesión correcto",
      data,
    });
  } catch (error) {
    if (error.status === 401) {
      return fail(res, "Credenciales incorrectas", 401);
    }
    throw error;
  }
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.me(req.user._id);
  ok(res, user);
});
