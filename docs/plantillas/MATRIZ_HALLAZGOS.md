# Matriz general de hallazgos — SGOHA

Plantilla para registrar hallazgos de calidad, seguridad, accesibilidad, usabilidad y CI/CD.

| ID | Área | Herramienta | Componente | Hallazgo | Evidencia | Severidad | Impacto | Corrección | Responsable | Estado |
| -- | ---- | ----------- | ---------- | -------- | --------- | --------- | ------- | ---------- | ----------- | ------ |
| SQ-001 | SonarQube | SonarScanner | Global | Análisis inicial pendiente de ejecución | `docs/evidencias/sonarqube/` | — | — | Ejecutar `npm run test:coverage` + Sonar | Equipo QA | Pendiente |
| OW-001 | OWASP | Revisión código | `backend/src/app.js` | Ausencia de cabeceras HTTP seguras (Helmet) | Revisión estática | Media | Medio | Implementado `securityHeaders` | DevSecOps | Corregido |
| OW-002 | OWASP | Revisión código | `auth.routes.js` | Sin rate limiting en login | Revisión estática | Alta | Alto | `loginRateLimiter` 20 req/15 min | DevSecOps | Corregido |
| OW-003 | OWASP | Revisión código | `frontend/src/config/api.js` | JWT en `localStorage` (riesgo XSS) | Revisión estática | Media | Alto | Documentado; mitigar XSS + CSP | Arquitectura | Aceptado como riesgo |
| WC-001 | WCAG | Revisión código | `frontend/index.html` | `lang="en"` en app en español | Inspección HTML | Baja | Bajo | Cambiado a `lang="es"` | Frontend | Corregido |
| WC-002 | WCAG | Revisión código | `Input.jsx` | Errores sin `aria-describedby` | Inspección componente | Media | Medio | `aria-invalid`, `role="alert"` | Frontend | Corregido |
| WC-003 | WCAG | axe-core | Login, dashboard | Evaluación automatizada pendiente en CI | `cypress/e2e/accessibility/` | — | — | `npm run test:a11y` | QA | En proceso |
| SUS-001 | SUS | Cuestionario | Global | Sin participantes registrados aún | `docs/plantillas/CUESTIONARIO_SUS.md` | — | — | Aplicar cuestionario a 5+ usuarios/rol | UX | Pendiente |
| CI-001 | CI/CD | GitHub Actions | `.github/workflows/ci.yml` | Pipeline CI implementado | `docs/evidencias/ci-cd/` | — | — | Verificar en push a `main` | DevOps | Verificado |
| CI-002 | CI/CD | GitHub Actions | `cd-template.yml` | Sin plataforma de despliegue configurada | Revisión repo | Baja | Medio | Configurar Vercel/Render + secretos | DevOps | Pendiente |

## Estados válidos

- **Pendiente** — no iniciado.
- **En proceso** — en curso.
- **Corregido** — fix aplicado en código.
- **Verificado** — confirmado con prueba o evidencia.
- **Aceptado como riesgo** — documentado y aprobado.
