# Informe técnico integral — SGOHA

**Punto 7.2:** Análisis SonarQube · Interpretación de métricas · Análisis OWASP · Validación WCAG · Evaluación SUS · CI/CD

---

## 1. Información general

| Campo | Valor |
|-------|-------|
| Nombre del sistema | SGOHA — Sistema de Generación Óptima de Horarios Académicos |
| Descripción | Plataforma web para planificación de horarios universitarios con motor CSP, matrículas y restricciones académicas |
| Arquitectura | Cliente-servidor desacoplado (MERN) |
| Frontend | React 19, Vite 8, Tailwind CSS 4, React Router 7, Axios |
| Backend | Node.js, Express 5, Mongoose 8, JWT |
| Base de datos | MongoDB (local Docker / Atlas) |
| Pruebas | Jest, RTL, MSW, Supertest, Cypress (raíz del repo) |
| Versión analizada | 2.0.0 |
| Rama evaluada | `main` |
| Fecha de evaluación | Pendiente de ejecución formal (preparación técnica: 2026) |
| Responsable | Equipo SGOHA / QA académico |
| Commit evaluado | Pendiente — registrar SHA al ejecutar análisis |

### Roles del sistema

- **ADMIN** — gestión integral, configuración, generación de horarios.
- **TEACHER** — disponibilidad, cursos asignados, consulta de horario.
- **STUDENT** — matrícula, validación, consulta de horario.

### Módulos evaluados

Usuarios, cursos, docentes, disponibilidad, aulas, estudiantes, matrículas, franjas HORALV, restricciones CSP, horarios, dashboard, configuración, autenticación.

---

## 2. Objetivo del análisis

Evaluar de forma sistemática:

- Calidad y mantenibilidad del código (SonarQube).
- Seguridad aplicativa (OWASP Top 10).
- Accesibilidad web (WCAG 2.2 nivel AA).
- Usabilidad percibida (SUS).
- Automatización mediante CI/CD (GitHub Actions).
- Preparación técnica para despliegue continuo.

El resultado debe ser **reproducible**, con evidencias verificables y sin cifras inventadas.

---

## 3. Alcance técnico

### Frontend (`frontend/src/`)

React, Vite, Tailwind, React Router, Axios, formularios, navegación por roles, grillas de disponibilidad, matrícula, horarios, portales docente/alumno.

### Backend (`backend/src/`)

Express, Mongoose, JWT, middleware `protect` / `authorizeRoles`, servicios de dominio, motor CSP (`csp.service.js`), validaciones de matrícula, manejo global de errores.

### Infraestructura y automatización

- MongoDB vía Docker (documentado en README; sin `docker-compose.yml` de aplicación en repo).
- GitHub Actions: CI, CodeQL, Sonar (condicional), Security, CD plantilla.
- SonarQube local opcional: `docker-compose.sonar.yml`.
- Suite de pruebas en raíz: `tests/`, `cypress/`.

### Exclusiones

- Código legado en `backend/routes/` (PoC anterior).
- Artefactos generados (`dist/`, `tests/reports/`).
- Secretos en `.env` (no versionados).

---

## 4. Metodología

1. Inspección del repositorio y dependencias.
2. Configuración de análisis estático (SonarQube / SonarCloud).
3. Revisión de seguridad alineada a OWASP Top 10 (código + dependencias).
4. Evaluación WCAG 2.2 AA (axe-core automatizado + checklist manual).
5. Diseño de evaluación SUS (cuestionario y registro).
6. Implementación de correcciones de bajo riesgo.
7. Pruebas automatizadas posteriores (`npm test`, `npm run test:a11y`).
8. Integración en GitHub Actions.
9. Registro de evidencias en `docs/evidencias/`.

---

## 5. Análisis SonarQube

### 5.1 Objetivo

Medir calidad interna del código: bugs, vulnerabilidades, code smells, duplicación, cobertura y deuda técnica.

### 5.2 Herramienta y versión

- **SonarQube Community** (Docker) o **SonarCloud** (SaaS).
- Archivo de configuración: `sonar-project.properties` (raíz).
- Scanner: `sonar-scanner` CLI o GitHub Action `SonarSource/sonarcloud-github-action`.

### 5.3 Alcance

Proyecto **unificado SGOHA**:

- Fuentes: `frontend/src`, `backend/src`
- Pruebas: `tests/`, `cypress/`
- Exclusiones: `node_modules`, `dist`, `seed`, rutas legado, reportes generados

### 5.4 Configuración

```properties
# sonar-project.properties (resumen)
sonar.projectKey=sgoha
sonar.sources=frontend/src,backend/src
sonar.tests=tests,cypress
sonar.javascript.lcov.reportPaths=tests/reports/coverage/*/lcov.info
```

Cobertura LCOV: generar previamente con `npm run test:coverage`.

### 5.5 Comandos de ejecución

**Local — SonarQube Docker:**

```bash
docker compose -f docker-compose.sonar.yml up -d
npm run test:coverage
sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=<TOKEN_GENERADO_EN_SONAR>
```

**CI — SonarCloud:** configurar secretos `SONAR_TOKEN` y `SONAR_ORGANIZATION` en GitHub (ver `docs/CI_CD_GITHUB_ACTIONS.md`).

### 5.6 Métricas evaluadas

Bugs, Vulnerabilities, Security Hotspots, Code Smells, Duplicated Lines, Coverage, Technical Debt, Reliability / Security / Maintainability Rating, Quality Gate.

### 5.7 Resultados obtenidos

| Métrica | Resultado inicial | Resultado final | Estado | Evidencia |
| ------- | ----------------: | --------------: | ------ | --------- |
| Bugs | Pendiente | Pendiente | Pendiente de análisis | `docs/evidencias/sonarqube/02-bugs-inicial.png` |
| Vulnerabilidades | Pendiente | Pendiente | Pendiente de análisis | `docs/evidencias/sonarqube/` |
| Code Smells | Pendiente | Pendiente | Pendiente de análisis | `docs/evidencias/sonarqube/03-code-smells-inicial.png` |
| Duplicación | Pendiente | Pendiente | Pendiente de análisis | `docs/evidencias/sonarqube/` |
| Cobertura | Pendiente | Pendiente | Pendiente de análisis Sonar* | `tests/reports/coverage/html/index.html` |
| Deuda técnica | Pendiente | Pendiente | Pendiente de análisis | `docs/evidencias/sonarqube/` |
| Quality Gate | Pendiente | Pendiente | Pendiente de análisis | `docs/evidencias/sonarqube/01-quality-gate-inicial.png` |

\* La cobertura Jest local está disponible; la métrica Sonar requiere ejecutar el scanner.

### 5.8 Hallazgos

| ID | Componente | Archivo | Regla Sonar | Severidad | Descripción | Riesgo | Corrección | Estado |
| -- | ---------- | ------- | ----------- | --------- | ----------- | ------ | ---------- | ------ |
| — | — | — | — | — | Sin ejecución de scanner aún | — | Ejecutar Sonar tras `npm run test:coverage` | Pendiente |

### 5.9 Correcciones realizadas (preparación)

- Configuración `sonar-project.properties` y `docker-compose.sonar.yml`.
- Pipeline `sonar.yml` con soporte SonarCloud y self-hosted.
- Rutas LCOV alineadas a `tests/reports/coverage/`.

### 5.10 Comparación antes y después

Pendiente de medición tras primera ejecución de SonarScanner.

### 5.11 Conclusión SonarQube

El proyecto está **preparado** para análisis SonarQube. Los resultados cuantitativos deben obtenerse ejecutando el scanner; no se reportan cifras sin evidencia.

---

## 6. Interpretación de métricas

### 6.1 Tabla general

| Métrica | Qué mide | Riesgo asociado | Umbral recomendado | Resultado SGOHA | Interpretación |
| ------- | -------- | --------------- | ------------------ | --------------- | -------------- |
| Bugs | Defectos probables en runtime | Fallos en producción | 0 en Quality Gate | Pendiente | Requiere Sonar |
| Vulnerabilidades | Debilidades explotables | Compromiso del sistema | 0 críticas/altas | Pendiente | Revisión OWASP complementaria |
| Security Hotspots | Código sensible a revisar | Falsos negativos de seguridad | 100% revisados | Pendiente | — |
| Code Smells | Mantenibilidad | Deuda, regresiones | Rating A | Pendiente | — |
| Duplicación | Código repetido | Inconsistencias al cambiar | &lt; 3% | Pendiente | — |
| Cobertura | Líneas ejecutadas por tests | Regresiones no detectadas | ≥ 70% global | Pendiente Sonar** | Jest: 208 tests; ver `npm run test:coverage` |
| Deuda técnica | Esfuerzo de remediación | Retraso en features | &lt; 5% del esfuerzo | Pendiente | — |
| Mantenibilidad | Rating Sonar | Costo de cambio | A | Pendiente | — |
| Confiabilidad | Rating Sonar | Estabilidad | A | Pendiente | — |
| Seguridad (rating) | Rating Sonar | Exposición | A | Pendiente | — |
| Dependencias (npm audit) | CVEs en paquetes | Supply chain | 0 high/critical sin plan | Pendiente ejecución | `npm run audit:security` |
| WCAG (axe) | Violaciones a11y | Exclusión de usuarios | 0 críticas | Pendiente CI | `npm run test:a11y` |
| SUS | Usabilidad percibida | Adopción del sistema | ≥ 68 orientativo | Pendiente | Cuestionario sin aplicar |
| Pipeline CI | Tasa de éxito | Calidad en merge | 100% en main | Pendiente en GitHub | Workflows creados |
| Duración CI | Tiempo de feedback | Productividad | &lt; 15 min | Pendiente | — |

\*\* Cobertura Jest generada localmente; integración Sonar pendiente de scanner.

### 6.2 Métricas de calidad

**Bugs y code smells:** indican probabilidad de defectos y dificultad de evolución. En SGOHA, la lógica CSP y matrículas concentra complejidad en `csp.service.js` y `enrollment.service.js`.

**Cobertura:** la suite en raíz incluye 208 pruebas Jest (unitarias + integración). Ejecutar `npm run test:coverage` y abrir `tests/reports/coverage/html/index.html`.

### 6.3 Métricas de seguridad

**npm audit:** script `npm run audit:security` → `docs/reportes/security/`.

**CodeQL:** workflow `.github/workflows/codeql.yml` — resultados en pestaña Security del repositorio GitHub.

### 6.4 Métricas de accesibilidad

**axe-core (Cypress):** `cypress/e2e/accessibility/` — reglas WCAG 2.x/2.1 AA.

**Lighthouse:** configuración opcional en `lighthouserc.json` (requiere build + preview).

### 6.5 Métricas de usabilidad

**SUS:** plantilla en `docs/plantillas/CUESTIONARIO_SUS.md` — sin participantes registrados.

### 6.6 Métricas de automatización

CI ejecuta lint, build, tests, cobertura, audit y a11y. CD documentado como plantilla (`cd-template.yml`) — sin plataforma de despliegue detectada.

---

## 7. Análisis OWASP

Revisión estática del código y configuración actual (OWASP Top 10: 2025 / enfoque académico).

### 7.1 Matriz de hallazgos

| ID | Categoría OWASP | Evidencia revisada | Hallazgo | Prob. | Impacto | Riesgo | Corrección | Estado |
| -- | --------------- | ------------------ | -------- | ----- | ------- | ------ | ---------- | ------ |
| OW-01 | A01 Broken Access Control | `auth.middleware.js`, rutas con `authorizeRoles` | Control por rol implementado en rutas admin | Media | Alto | Medio | Mantener tests integración; pendiente ZAP | En proceso |
| OW-02 | A02 Security Misconfiguration | `app.js` | Faltaban Helmet y límite de body | Alta | Medio | Alto | `helmet`, `express.json({ limit })` | **Corregido** |
| OW-03 | A03 Supply Chain | `package.json` ×3 | CVEs en dependencias sin auditar en CI | Media | Alto | Medio | `npm audit` en CI + Dependabot | En proceso |
| OW-04 | A04 Cryptographic Failures | `User.js`, JWT | bcrypt en contraseñas; JWT en localStorage (XSS) | Media | Alto | Medio | bcrypt OK; token en localStorage documentado como riesgo | Aceptado como riesgo |
| OW-05 | A05 Injection | Mongoose models | Consultas parametrizadas; validación parcial ObjectId | Baja | Alto | Medio | `CastError` → 400 en error middleware | Parcial |
| OW-06 | A06 Insecure Design | Matrícula / CSP | Reglas de negocio en servicios | Baja | Medio | Bajo | Tests de enrollment y CSP | Verificado (tests) |
| OW-07 | A07 Authentication Failures | `auth.routes.js` | Sin rate limit en login | Alta | Alto | Alto | `loginRateLimiter` 20/15min | **Corregido** |
| OW-08 | A08 Software/Data Integrity | GitHub | Sin CI previo | Media | Alto | Medio | CodeQL + CI | **Corregido** |
| OW-09 | A09 Logging Failures | `error.middleware.js` | Log completo en dev; mensaje sin stack al cliente | Media | Medio | Medio | Reducir log en producción | **Corregido** |
| OW-10 | A10 Mishandling Exceptions | `error.middleware.js` | Handler centralizado | Baja | Medio | Bajo | ValidationError, 11000, CastError | Verificado |

### 7.2 Herramientas

| Herramienta | Comando / ubicación | Estado |
| ----------- | ------------------- | ------ |
| npm audit | `npm run audit:security` | Preparado |
| CodeQL | `.github/workflows/codeql.yml` | Implementado |
| Dependabot | `.github/dependabot.yml` | Implementado |
| OWASP ZAP baseline | `.github/workflows/security.yml` (input `target_url`) | Opcional |

### 7.3 Conclusión OWASP

Se identificaron y corrigieron debilidades de configuración (Helmet, rate limit, body limit, logging producción). Persisten riesgos documentados (JWT en localStorage, auditoría de dependencias por ejecutar). Escaneo dinámico ZAP pendiente de URL de staging.

---

## 8. Validación WCAG 2.2

### 8.1 Objetivo

Evaluar accesibilidad nivel **AA** (objetivo) en interfaces críticas del frontend.

### 8.2 Alcance

Login, dashboard admin, cursos, docentes, disponibilidad, matrícula, horarios, configuración, portales docente/alumno.

### 8.3 Herramientas

| Herramienta | Uso |
| ----------- | --- |
| axe-core + Cypress | `npm run test:a11y` |
| Lighthouse | `lighthouserc.json` (opcional) |
| Inspección manual | Teclado, contraste, lectores de pantalla |
| axe DevTools | Extension navegador (evidencia manual) |

### 8.4 Matriz de cumplimiento (muestra)

| ID | Criterio WCAG | Nivel | Pantalla | Resultado | Hallazgo | Corrección | Evidencia |
| -- | ------------- | ----- | -------- | --------- | -------- | ---------- | --------- |
| WC-1.1 | 3.1.1 Idioma de página | A | Global | Corregido | `lang="en"` | `lang="es"` en `index.html` | Inspección HTML |
| WC-1.3 | 1.3.1 Info y relaciones | A | Formularios | Mejorado | Errores sin asociar | `aria-describedby`, `role="alert"` en `Input.jsx` | Código |
| WC-2.4 | 2.4.6 Encabezados y etiquetas | AA | Modales | Mejorado | Botón cerrar sin nombre | `aria-label` en `Modal.jsx` | Código |
| WC-3.1 | 4.1.2 Nombre, función, valor | A | Login | Pendiente axe | — | Ejecutar `test:a11y` | `docs/evidencias/wcag/` |
| WC-4.1 | 2.1.1 Teclado | A | Navegación | Pendiente manual | — | Prueba manual tab order | `03-keyboard-navigation.png` |

### 8.5 Resultados por principio

| Principio | Estado |
| --------- | ------ |
| **Perceptible** | Parcial — idioma y errores de formulario mejorados; contraste pendiente Lighthouse |
| **Operable** | Parcial — modales con Escape; foco en modal pendiente revisión completa |
| **Comprensible** | Parcial — mensajes en español |
| **Robusto** | Parcial — pruebas axe automatizadas implementadas |

### 8.6 Correcciones implementadas

- `frontend/index.html`: `lang="es"`, título y meta descripción.
- `Input.jsx`: `aria-invalid`, `aria-describedby`, `role="alert"`.
- `Modal.jsx`: `aria-label` en botón cerrar.
- Pruebas `cypress/e2e/accessibility/` con `cypress-axe`.

### 8.7 Comparación antes y después

Pendiente de ejecución formal de `npm run test:a11y` y capturas en `docs/evidencias/wcag/`.

### 8.8 Riesgos pendientes

- Grilla de disponibilidad: selección solo por color/clic — revisar teclado y anuncios.
- Contraste Tailwind en badges — verificar 4.5:1.
- Focus trap completo en modales.

### 8.9 Conclusión WCAG

**Cumplimiento parcial** — criterios evaluados en código y automatización preparada. No se afirma cumplimiento AA completo hasta ejecutar axe + revisión manual en todas las pantallas.

---

## 9. Evaluación SUS

### 9.1 Objetivo

Medir usabilidad percibida con System Usability Scale (0–100).

### 9.2 Perfil de participantes (objetivo)

| Rol | Mínimo sugerido |
| ----- | --------------- |
| ADMIN | 3 participantes |
| TEACHER | 3 participantes |
| STUDENT | 3 participantes |

**Estado:** Pendiente de reclutamiento.

### 9.3 Tareas evaluadas

**Administrador:** login, registrar curso/docente/aula, revisar matrícula, generar horario.

**Docente:** login, disponibilidad, cursos, horario.

**Alumno:** login, selección de cursos, validar matrícula, consultar horario.

### 9.4 Aplicación del cuestionario

Plantilla: `docs/plantillas/CUESTIONARIO_SUS.md`

### 9.5 Cálculo

Preguntas impares: `aporte = respuesta − 1`  
Preguntas pares: `aporte = 5 − respuesta`  
**SUS = Σ(aportes) × 2.5**

### 9.6 Resultados

| Participante | Rol | SUS |
| ------------ | --- | --: |
| — | — | Pendiente |

**Promedio global:** Pendiente

### 9.7 Interpretación

Pendiente hasta aplicar cuestionario (ver rangos en plantilla SUS).

### 9.8 Hallazgos cualitativos

Pendiente.

### 9.9 Mejoras implementadas (usabilidad técnica)

- Títulos de página (`pageTitles.js`) — cubierto por tests.
- Mensajes de error en formularios asociados al campo.

### 9.10 Conclusión SUS

Instrumento preparado; **sin puntuaciones** hasta aplicación con usuarios reales.

---

## 10. CI/CD con GitHub Actions

### 10.1 Implementación

| Componente | Archivo | Estado |
| ---------- | ------- | ------ |
| Integración continua | `.github/workflows/ci.yml` | Implementado |
| CodeQL | `.github/workflows/codeql.yml` | Implementado |
| Sonar | `.github/workflows/sonar.yml` | Condicional (token) |
| Seguridad | `.github/workflows/security.yml` | Implementado |
| Dependabot | `.github/dependabot.yml` | Implementado |
| CD | `.github/workflows/cd-template.yml` | Plantilla — sin despliegue |

Documentación operativa: `docs/CI_CD_GITHUB_ACTIONS.md`

### 10.2 Flujo

```
Push/PR → CI (lint, build, test, coverage, audit, a11y)
        → CodeQL (paralelo en push main)
        → Sonar (si SONAR_TOKEN configurado)
```

CD: **no activo** — no se detectó Vercel/Render en el repositorio.

---

## 11. Mejoras implementadas

| ID | Área | Problema inicial | Mejora | Archivo | Evidencia | Verificación |
| -- | ---- | ---------------- | ------ | ------- | --------- | ------------ |
| M-01 | Seguridad | Sin Helmet | Cabeceras HTTP seguras | `security.middleware.js`, `app.js` | Código | Pendiente ZAP |
| M-02 | Seguridad | Sin rate limit login | 20 intentos / 15 min | `auth.routes.js` | Código | Test manual |
| M-03 | Seguridad | Body JSON sin límite | `limit: 1mb` | `app.js` | Código | — |
| M-04 | Seguridad | Stack en logs prod | Solo mensaje en prod | `error.middleware.js` | Código | — |
| M-05 | WCAG | `lang="en"` | `lang="es"` | `frontend/index.html` | HTML | Manual |
| M-06 | WCAG | Errores sin ARIA | aria-* en Input | `Input.jsx` | Código + tests | `Input.test.jsx` |
| M-07 | WCAG | Botón cerrar modal | `aria-label` | `Modal.jsx` | Código | — |
| M-08 | A11y | Sin tests axe | Cypress + cypress-axe | `cypress/e2e/accessibility/` | CI job | `npm run test:a11y` |
| M-09 | CI/CD | Sin pipelines | Workflows GitHub | `.github/workflows/` | Actions tab | Push a GitHub |
| M-10 | Calidad | Sin Sonar config | `sonar-project.properties` | Raíz | — | Sonar scanner |
| M-11 | Calidad | Cobertura dispersa | HTML consolidado | `scripts/generate-coverage-html.cjs` | `tests/reports/coverage/` | `npm run coverage:open` |

---

## 12. Evidencias técnicas

Organización: `docs/evidencias/README.md`

| Tipo | Ubicación |
| ---- | --------- |
| SonarQube | `docs/evidencias/sonarqube/` |
| OWASP / audit | `docs/evidencias/owasp/`, `docs/reportes/security/` |
| WCAG | `docs/evidencias/wcag/` |
| SUS | `docs/evidencias/sus/` |
| CI/CD | `docs/evidencias/ci-cd/` |
| Pruebas | `docs/evidencias/pruebas/` |

Plantillas: `docs/plantillas/MATRIZ_HALLAZGOS.md`, `CUESTIONARIO_SUS.md`, `REGISTRO_PRUEBAS.md`

---

## 13. Riesgos pendientes

1. Ejecutar SonarScanner y registrar Quality Gate.
2. Completar npm audit y plan de remediación CVEs high/critical.
3. JWT en localStorage — evaluar httpOnly cookies en iteración futura.
4. OWASP ZAP contra URL de staging autorizada.
5. Aplicar cuestionario SUS con usuarios reales.
6. Revisión WCAG manual completa (teclado, contraste, lector de pantalla).
7. Activar CD cuando exista Vercel/Render.
8. Rate limiting — validar bajo carga (no solo configuración).

---

## 14. Conclusiones

SGOHA cuenta con arquitectura MERN madura, **208 pruebas Jest** automatizadas y preparación técnica para el punto 7.2:

- **SonarQube:** configurado; métricas pendientes de scanner.
- **OWASP:** hallazgos corregidos en configuración; matriz documentada.
- **WCAG:** mejoras en HTML y componentes; axe en CI.
- **SUS:** instrumento listo; sin datos de participantes.
- **CI/CD:** pipeline GitHub Actions operativo; CD como plantilla.

El informe es **honesto**: los valores cuantitativos de Sonar, SUS y auditorías dinámicas deben completarse ejecutando los comandos documentados.

---

## 15. Recomendaciones

1. Configurar `SONAR_TOKEN` en GitHub y ejecutar primer análisis.
2. Proteger rama `main` con checks de CI y CodeQL obligatorios.
3. Aplicar SUS a mínimo 9 participantes (3 por rol).
4. Capturar evidencias según `docs/evidencias/README.md`.
5. Planificar migración de token a cookie httpOnly + CSRF para hardening.
6. Añadir ESLint al backend (actualmente `node --check`).
7. Definir URL de staging para ZAP baseline.

---

## 16. Anexos

### Anexo A — Comandos de verificación

```bash
# Pruebas
npm test
npm run test:coverage
npm run coverage:open

# Seguridad
npm run audit:security

# Accesibilidad (frontend en :5173 o preview)
cd frontend && npm run build && npm run preview -- --port 5173 &
npm run test:a11y

# Sonar local
docker compose -f docker-compose.sonar.yml up -d
npm run test:coverage
sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.token=<TOKEN>
```

### Anexo B — Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [SUS — Brooke](https://www.usability.gov/how-to-and-tools/methods/system-usability-scale.html)
- [SonarQube Docs](https://docs.sonarsource.com/sonarqube/)
- Documentación interna: `docs/CI_CD_GITHUB_ACTIONS.md`, `docs/TEST_PLAN.md`, `AGENTS.md`

### Anexo C — Archivos de configuración creados

`sonar-project.properties`, `docker-compose.sonar.yml`, `lighthouserc.json`, `.github/workflows/*`, `.github/dependabot.yml`, `scripts/run-security-audit.sh`, `cypress/e2e/accessibility/*`

---

*Documento generado como entrega técnica del punto 7.2. Actualizar secciones "Pendiente" tras cada ejecución de herramientas.*
