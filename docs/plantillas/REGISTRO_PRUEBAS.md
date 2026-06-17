# Registro de pruebas — SGOHA

| ID | Tipo | Módulo | Caso | Precondición | Pasos | Resultado esperado | Resultado real | Estado | Evidencia |
| -- | ---- | ------ | ---- | ------------ | ----- | ------------------ | -------------- | ------ | --------- |
| T-001 | funcional | Auth | Login admin válido | Usuario admin en BD | 1. Ir a /login 2. Ingresar credenciales 3. Enviar | Redirección a /dashboard | Pendiente ejecución manual | Pendiente | `docs/evidencias/pruebas/01-login-admin.png` |
| T-002 | funcional | Cursos | Crear curso | Sesión ADMIN | 1. /courses 2. Nuevo 3. Completar formulario | Curso creado 201 | Cubierto por Jest/Supertest | Verificado | `tests/integration/api/courses.test.js` |
| T-003 | seguridad | Auth | Login sin token en ruta protegida | Sin Authorization | GET /api/settings | 401 | Cubierto por integración | Verificado | `tests/integration/api/settings.test.js` |
| T-004 | seguridad | Auth | Rate limit login | 20+ intentos en 15 min | POST /api/auth/login repetido | 429 o mensaje límite | Pendiente prueba de carga | Pendiente | `docs/evidencias/owasp/` |
| T-005 | accesibilidad | Login | axe WCAG login | Frontend en :5173 | `npm run test:a11y` spec login | 0 violaciones críticas | Pendiente ejecución CI | En proceso | `cypress/e2e/accessibility/` |
| T-006 | integración | Matrícula | Validación créditos 20-22 | Estudiante en BD | validateEnrollmentPayload | VALID o INVALID según créditos | Cubierto unitario | Verificado | `tests/unit/backend/enrollment.service.test.js` |
| T-007 | integración | Horarios | Precheck motor CSP | ADMIN autenticado | GET /api/schedules/precheck | JSON con canGenerate | Cubierto integración | Verificado | `tests/integration/api/schedules.test.js` |
| T-008 | regresión | Global | Suite Jest completa | `npm ci` en raíz | `npm test` | 208 tests pass | Pendiente última ejecución documentada | Pendiente | `docs/TEST_EVIDENCES.md` |
| T-009 | usabilidad | Global | Cuestionario SUS | Participantes por rol | Aplicar plantilla SUS | Puntaje 0-100 | Pendiente | Pendiente | `docs/plantillas/CUESTIONARIO_SUS.md` |
| T-010 | E2E | Flujo completo | Golden path Cypress | Frontend + backend activos | `npm run test:e2e` | Specs en verde | Pendiente ejecución | Pendiente | `cypress/videos/` |

## Tipos

- **funcional** — comportamiento de negocio.
- **seguridad** — OWASP, auth, permisos.
- **accesibilidad** — WCAG, axe, teclado.
- **usabilidad** — SUS, tareas por rol.
- **integración** — API, servicios, MSW.
- **regresión** — suite automatizada completa.
