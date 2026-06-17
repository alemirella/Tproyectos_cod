# 🛡️ Informe técnico integral del sistema SGOHA

**Punto 7.2 del informe técnico:**  
Análisis SonarQube · Interpretación de métricas · Análisis OWASP · Validación WCAG 2.2 · Análisis SUS

---

## Datos de identificación

| Campo | Valor |
| ----- | ----- |
| **Proyecto** | SGOHA — Sistema de Generación Óptima de Horarios Académicos |
| **Versión analizada** | 2.0.0 |
| **Rama** | `main` |
| **Commit de referencia** | `fb539a2` |
| **Fecha de corte** | 2026-06-17 |
| **Equipo responsable** | QA/Arquitectura/DevSecOps SGOHA |
| **Stack validado** | React 19 + Vite 8 + Tailwind 4 · Node/Express 5 · MongoDB/Mongoose 8 · JWT · Jest · Cypress |
| **Entorno de evaluación** | macOS local + workflows GitHub Actions |
| **Estado SonarQube al cierre** | 🔵 Requiere ejecución de plataforma externa (explicado en 7.2.a) |

---

## Resumen ejecutivo

### Propósito del análisis

Consolidar un expediente técnico **reproducible y verificable** del nivel de calidad, seguridad, accesibilidad y usabilidad del sistema SGOHA, sin inventar métricas ni resultados.

### Herramientas utilizadas

- ⚙️ **Calidad:** ESLint, Jest, cobertura LCOV.
- ⚙️ **Seguridad:** npm audit, revisión OWASP Top 10, CodeQL, ZAP baseline.
- ⚙️ **Accesibilidad:** Cypress + axe-core, Lighthouse CI (configurado), checklist manual WCAG.
- ⚙️ **Usabilidad:** cuestionario SUS, protocolo, script de cálculo automático.

### Hallazgos clave

- 🟡 Cobertura global de pruebas en **30,3 %** de líneas (riesgo medio en módulos CSP/horarios).
- ✅ Backend sin vulnerabilidades auditables tras actualización de `qs` (`6.15.2`).
- ✅ Frontend con ESLint sin errores bloqueantes (advertencias documentadas).
- ⚙️ Flujo CI/CD operativo para lint, tests, cobertura, seguridad y accesibilidad.
- 🔵 SonarQube no ejecutado en este entorno al cierre por dependencia de Docker/credenciales.

### Mejoras implementadas en esta iteración

- ✅ Refuerzo documental integral del punto 7.2 por apartados conceptuales y técnicos.
- ✅ Diagnóstico explícito del estado SonarQube (local + workflow).
- ✅ Cierre de trazabilidad entre informe principal y evidencias/guías de reproducción.

---

## Arquitectura evaluada

```mermaid
flowchart LR
    U[Usuarios ADMIN TEACHER STUDENT] --> F[Frontend React + Vite]
    F -->|Axios / JWT| B[API Node + Express]
    B --> M[(MongoDB)]
    B --> C[Motor CSP]
    G[GitHub] --> A[GitHub Actions]
    A --> Q[Calidad]
    A --> S[Seguridad]
    A --> D[Plantilla de despliegue]
```

### Componentes funcionales verificados

- Autenticación JWT y control de acceso por rol (`ADMIN`, `TEACHER`, `STUDENT`).
- Gestión académica: usuarios, cursos, docentes, disponibilidad, aulas, estudiantes, matrícula.
- Restricciones y generación de horarios.
- Portales por rol y módulos administrativos.

---

## Alcance de la evaluación

| Capa | Ruta | Cobertura del análisis |
| ---- | ---- | ---------------------- |
| Frontend | `frontend/src` | UI, rutas protegidas, formularios, validaciones y servicios |
| Backend | `backend/src` | middlewares de seguridad, servicios, auth, controladores |
| Pruebas | `tests`, `cypress` | unitarias, integración, cobertura y accesibilidad |
| CI/CD | `.github/workflows` | CI, seguridad, CodeQL, Sonar, plantilla CD |
| Documentación | `docs` | Informe, guías técnicas, matrices y evidencias |

### Fuera de alcance directo

- Secretos reales en `.env`.
- Evidencias externas que dependen de UI remota (SonarCloud/CodeQL/ZAP en GitHub).

---

## Metodología

1. **Inspección estructural** del repositorio y configuraciones (frontend/backend/workflows).
2. **Ejecución técnica local** de pruebas, lint, cobertura y auditoría de dependencias.
3. **Análisis de seguridad** orientado a OWASP Top 10 en código y pipeline.
4. **Validación de accesibilidad** automática (axe) + manual guiada (checklist WCAG).
5. **Implementación del instrumento SUS** con script reproducible y protocolo formal.
6. **Consolidación de hallazgos** en matriz, plan de pruebas, evidencias y recomendaciones.

---

## 7.2.a Análisis SonarQube

### Concepto del apartado

SonarQube permite medir de forma integral la calidad de código (bugs, smells, duplicación, deuda técnica, seguridad estática y Quality Gate) sobre `frontend` y `backend`, usando cobertura LCOV como entrada.

### Configuración validada

- Archivo: [`sonar-project.properties`](../sonar-project.properties)
- Fuentes: `frontend/src`, `backend/src`
- Tests: `tests`, `cypress`
- Cobertura: `tests/reports/coverage/*/lcov.info`
- Exclusiones: `node_modules`, `dist`, `build`, `coverage`, artefactos y evidencias

### Entorno local reproducible

- Archivo: [`docker-compose.sonar.yml`](../docker-compose.sonar.yml)
- Servicios: SonarQube Community + PostgreSQL
- Guía paso a paso: [`reportes/sonar/GUIA_EJECUCION_SONARQUBE.md`](./reportes/sonar/GUIA_EJECUCION_SONARQUBE.md)

### Evidencia técnica local disponible para Sonar

| Insumo | Estado |
| ------ | ------ |
| `frontend-quality.txt` | ✅ Generado |
| `backend-quality.txt` | ✅ Generado |
| `coverage-summary.md` | ✅ Generado (30,3 % líneas) |
| LCOV por suite | ✅ Generado |

### Verificación explícita de ejecución SonarQube (real)

**Fecha/hora de verificación:** 2026-06-17 18:17:09 -05

| Verificación | Resultado real | Diagnóstico |
| ------------ | -------------- | ----------- |
| `docker compose -f docker-compose.sonar.yml ps` | `Cannot connect to the Docker daemon...` | Docker local no está activo |
| `curl -I http://localhost:9000` | sin respuesta útil en entorno actual | Sonar local no está levantado |
| `sonar-scanner --version` | `command not found: sonar-scanner` | Scanner no instalado en máquina |
| Workflow `.github/workflows/sonar.yml` | condicionado por `if: secrets.SONAR_TOKEN != ''` | Sin token no corre análisis |

### Estado Sonar al cierre

- 🔵 **Requiere ejecución en plataforma externa** (GitHub con `SONAR_TOKEN`) o activar Docker local + instalar scanner.
- 🧪 **Ejecución reproducible preparada**: configuración, guía y rutas LCOV están listas.

### Métricas Sonar (matriz del apartado)

| Métrica | Resultado inicial | Resultado posterior | Estado | Interpretación | Evidencia |
| ------- | ----------------: | ------------------: | ------ | -------------- | --------- |
| Quality Gate | — | — | 🔵 Requiere SonarQube/Cloud | No inferible desde ESLint/Jest | SON-01 |
| Bugs | — | — | 🔵 Requiere SonarQube/Cloud | Hallazgo estático de defectos lógicos | SON-02 |
| Vulnerabilities | — | — | 🔵 Requiere SonarQube/Cloud | Complementa npm audit | SON-02 |
| Security Hotspots | — | — | 🔵 Requiere SonarQube/Cloud | Revisión guiada por analizador | SON-02 |
| Code Smells | — | — | 🔵 Requiere SonarQube/Cloud | Deuda de mantenibilidad | SON-02 |
| Duplicated Lines | — | — | 🔵 Requiere SonarQube/Cloud | Riesgo de mantenimiento | SON-02 |
| Coverage (LCOV importable) | — | 30,3 % | 🟡 | Cobertura baja en lógica crítica CSP/horarios | `coverage-summary.md` |
| Reliability/Security/Maintainability | — | — | 🔵 Requiere SonarQube/Cloud | Ratings dependen del panel | SON-01 |
| Technical Debt / Complexity | — | — | 🔵 Requiere SonarQube/Cloud | Métrica derivada del análisis estático | SON-02 |

### Flujo Sonar en la arquitectura de entrega

```mermaid
flowchart LR
    DEV[Desarrollador] --> GIT[Push / Pull Request]
    GIT --> CI[GitHub Actions]
    CI --> TEST[Lint + Tests + Coverage]
    TEST --> SONAR[SonarQube / SonarCloud]
    SONAR --> GATE{Quality Gate}
    GATE -->|Aprobado| MERGE[Merge]
    GATE -->|Rechazado| FIX[Corrección]
```

### Conclusión del apartado 7.2.a

El análisis Sonar está **correctamente diseñado y listo para ejecutarse**, pero **no está corriendo actualmente** en este entorno por falta de ejecución operativa (Docker/Scanner local o `SONAR_TOKEN` en GitHub).

---

## 7.2.b Interpretación de métricas

### Concepto del apartado

No se trata de listar números aislados, sino de explicar su **impacto técnico real en SGOHA**: estabilidad funcional, riesgo de regresión, seguridad operativa y mantenibilidad.

### Lectura técnica de indicadores principales

| Métrica | Resultado | Interpretación aplicada a SGOHA |
| ------- | --------- | -------------------------------- |
| Pruebas ejecutadas | 208 | 🟢 Base de regresión sólida para flujos clave |
| Cobertura líneas | 30,3 % | 🟠 Riesgo medio-alto en módulos complejos (CSP/horarios) |
| ESLint frontend | 0 errores | 🟢 Mantenibilidad mínima garantizada para CI |
| Audit backend | 0 vulnerabilidades | 🟢 Cadena backend saneada tras fix `qs` |
| Audit frontend | hallazgos vigentes | 🟡 Riesgo en seguimiento, sin ocultar resultados |
| A11y automática | configurada/ejecutable | 🟡 Debe complementarse con validación humana |

### Interpretación de negocio académico

- Una cobertura baja en matrícula/restricciones puede habilitar escenarios de inscripción inválida.
- Un control de lint estable reduce errores triviales en formularios y rutas.
- Un backend con dependencias saneadas disminuye exposición a fallos de disponibilidad.
- La ausencia temporal de Quality Gate Sonar limita la gobernanza de deuda técnica.

### Priorización cualitativa

```mermaid
quadrantChart
    title Priorización de indicadores SGOHA
    x-axis Bajo impacto --> Alto impacto
    y-axis Baja urgencia --> Alta urgencia
    quadrant-1 Prioridad crítica
    quadrant-2 Corregir pronto
    quadrant-3 Monitorear
    quadrant-4 Planificar
    Cobertura CSP y horarios: [0.86, 0.88]
    Sonar Quality Gate: [0.73, 0.58]
    Hallazgos npm frontend: [0.55, 0.63]
    WCAG manual restante: [0.72, 0.66]
    SUS con participantes: [0.64, 0.45]
```

### Referencia complementaria

Ver detalle completo en [`COVERAGE_ANALYSIS.md`](./COVERAGE_ANALYSIS.md).

---

## 7.2.c Análisis OWASP

### Concepto del apartado

Evaluar la postura de seguridad de SGOHA frente a riesgos OWASP (acceso, autenticación, misconfiguración, dependencias, excepciones y trazabilidad), combinando revisión de código y evidencia de ejecución.

### Qué se implementó y qué cubre

| Control | Qué hace en SGOHA | Estado |
| ------- | ----------------- | ------ |
| `helmet` | Endurece cabeceras HTTP | ✅ Corregido |
| `loginRateLimiter` / `apiRateLimiter` | Mitiga abuso y fuerza bruta | ✅ Corregido |
| JWT + RBAC | Restringe acceso por rol | 🟢 Conforme |
| bcrypt y exclusión de password | Protección de credenciales | 🟢 Conforme |
| npm audit + matriz OWASP | Control de cadena de suministro | 🟡 Seguimiento activo |
| CodeQL workflow | Análisis estático en GitHub | ⚙️ Automatizado |
| ZAP workflow | DAST baseline en CI | ⚙️ Automatizado |

### Aplicación real al sistema

- Se redujo exposición a ataques de autenticación y misconfiguración.
- Se resolvió el hallazgo moderado de `qs` en backend.
- Se documentaron riesgos residuales reales (sin ocultarlos ni falsearlos).

### Evidencias del apartado

- [`reportes/security/OWASP_ANALYSIS.md`](./reportes/security/OWASP_ANALYSIS.md)
- [`reportes/security/NPM_AUDIT_INTERPRETATION.md`](./reportes/security/NPM_AUDIT_INTERPRETATION.md)
- [`reportes/security/CODEQL_ANALYSIS.md`](./reportes/security/CODEQL_ANALYSIS.md)
- [`reportes/security/OWASP_ZAP_GUIDE.md`](./reportes/security/OWASP_ZAP_GUIDE.md)

### Diagrama de control OWASP

```mermaid
flowchart TD
    R[Solicitud] --> V[Validación]
    V --> A[Autenticación]
    A --> Z[Autorización por rol]
    Z --> C[Controlador]
    C --> S[Servicio]
    S --> DB[(MongoDB)]
    C --> E[Manejador de errores]
    E --> L[Registro seguro]
```

---

## 7.2.d Validación WCAG 2.2

### Concepto del apartado

Verificar que la interfaz cumpla criterios de accesibilidad con objetivo AA, tanto en pruebas automatizadas (axe/Lighthouse) como en revisión humana guiada.

### Automatización implementada

| Elemento | Aporte técnico | Estado |
| -------- | -------------- | ------ |
| `lang="es"` | Mejora lectura de tecnologías asistivas | ✅ Corregido |
| Cypress + `cypress-axe` | Detección automática de violaciones | ⚙️ Configurado |
| Specs a11y por módulo | Cobertura de pantallas críticas por rol | ⚙️ Configurado |
| `lighthouserc.json` | Auditoría reproducible de accesibilidad | ⚙️ Configurado |
| Checklist manual | Validación de teclado/foco/lector/zoom | 🧑‍💻 Requiere validación humana |

### Resultado del apartado

- 🧪 La automatización está implementada y lista.
- 🧑‍💻 La conformidad completa depende de la validación manual y evidencia capturable.

### Evidencias del apartado

- [`reportes/accessibility/WCAG_2_2_VALIDATION.md`](./reportes/accessibility/WCAG_2_2_VALIDATION.md)
- [`reportes/accessibility/WCAG_MANUAL_CHECKLIST.md`](./reportes/accessibility/WCAG_MANUAL_CHECKLIST.md)

### Mapa WCAG

```mermaid
mindmap
  root((WCAG 2.2))
    Perceptible
      Contraste
      Texto alternativo
      Estructura
    Operable
      Teclado
      Foco
      Objetivos táctiles
    Comprensible
      Etiquetas
      Errores
      Navegación consistente
    Robusto
      HTML semántico
      ARIA
      Tecnologías de asistencia
```

---

## 7.2.e Análisis SUS

### Concepto del apartado

SUS mide usabilidad percibida con un instrumento estandarizado (10 preguntas, escala 1–5). En este proyecto se implementó el sistema completo de captura/cálculo, evitando simular usuarios reales.

### Qué quedó completo

| Entregable | Descripción | Estado |
| ---------- | ----------- | ------ |
| Cuestionario SUS | Instrumento formal en español | ✅ |
| Plantilla CSV | Captura anonimizada por participante/rol | ✅ |
| Script de cálculo | Cálculo individual, promedio, mediana y salida MD/JSON | ✅ |
| Piloto metodológico | Ejemplo matemático declarado como demostrativo | ✅ |
| Protocolo real | Sesión con participantes y trazabilidad | ✅ |

### Qué requiere validación humana

- Aplicación con participantes reales (mínimo recomendado por protocolo).
- Carga de `sus-responses.csv` real y ejecución del cálculo final institucional.

### Evidencias del apartado

- [`reportes/usability/SUS_ANALYSIS.md`](./reportes/usability/SUS_ANALYSIS.md)
- [`reportes/usability/SUS_EVALUATION_PROTOCOL.md`](./reportes/usability/SUS_EVALUATION_PROTOCOL.md)
- [`reportes/usability/SUS_PILOT_METHODOLOGY.md`](./reportes/usability/SUS_PILOT_METHODOLOGY.md)

### Flujo SUS

```mermaid
flowchart LR
    T[Tareas] --> Q[Cuestionario SUS]
    Q --> R[Respuestas 1-5]
    R --> C[Calculo automatizado]
    C --> P[Puntaje 0-100]
    P --> I[Interpretacion]
    I --> M[Mejoras UX]
```

---

## Integración CI/CD

### Concepto del apartado

Conectar calidad, seguridad, accesibilidad y trazabilidad en pipelines automáticos para evitar validaciones manuales aisladas.

```mermaid
flowchart LR
    DEV[Feature Branch] --> PR[Pull Request]
    PR --> CI[CI]
    CI --> L[Lint]
    CI --> T[Tests]
    CI --> C[Coverage]
    CI --> S[Security]
    CI --> Q[Sonar]
    Q --> G{Quality Gate}
    G -->|Aprobado| M[Merge main]
    M --> CD[CD]
    CD --> DEPLOY[Produccion]
```

| Workflow | Función actual |
| -------- | -------------- |
| `ci.yml` | Lint, build, tests, cobertura, audit, a11y |
| `security.yml` | npm audit, secret scan, ZAP baseline |
| `codeql.yml` | Análisis estático de seguridad |
| `sonar.yml` | Sonar condicional por secretos |
| `cd-template.yml` | Plantilla de despliegue (manual) |

---

## Mejoras implementadas

- ✅ Seguridad backend reforzada (helmet, rate-limit, límites de payload).
- ✅ Frontend estabilizado para CI (lint sin errores bloqueantes).
- ✅ Suite de pruebas consolidada (208 tests) y cobertura documentada.
- ✅ Automatización de accesibilidad con Cypress+axe por pantallas clave.
- ✅ Instrumentación SUS completa (cuestionario + script + protocolo).
- ✅ Informe técnico 7.2 ampliado con explicación conceptual por apartado.
- ✅ Verificación formal del estado SonarQube y diagnóstico operativo.

---

## Comparación antes y después

| Indicador | Antes | Después |
| --------- | ----- | ------- |
| Pruebas automatizadas | Parcial | 208 tests ejecutables |
| Lint en CI | Informativo | Bloqueante en errores |
| Seguridad HTTP | Básica | Endurecida y documentada |
| Sonar | Solo intención | Configuración + guía + diagnóstico real |
| Accesibilidad | Casos aislados | Suite a11y estructurada + checklist |
| SUS | Sin instrumentación | Flujo completo implementado |
| Informe 7.2 | Estructura inicial | Expediente integral detallado |

---

## Evidencias técnicas

Índice general: [`evidencias/README.md`](./evidencias/README.md)

| Área | Evidencia principal |
| ---- | ------------------- |
| Sonar | `docs/reportes/sonar/` |
| Métricas | `docs/COVERAGE_ANALYSIS.md` |
| OWASP | `docs/reportes/security/` |
| WCAG | `docs/reportes/accessibility/` |
| SUS | `docs/reportes/usability/` |
| CI/CD | `docs/CI_CD_GITHUB_ACTIONS.md` |

---

## Riesgos residuales

| Riesgo | Nivel | Tratamiento |
| ------ | ----- | ----------- |
| Sonar sin ejecución efectiva en este entorno | 🟡 | Activar Docker+scanner o secretos GitHub |
| Cobertura baja en módulos CSP/horarios | 🟠 | Incrementar pruebas de dominio e integración |
| Hallazgos npm frontend en seguimiento | 🟡 | Actualización controlada y pruebas de regresión |
| SUS sin participantes reales cargados | 🔵 | Aplicar protocolo y ejecutar script con CSV real |
| CD sin proveedor productivo configurado | 🟡 | Parametrizar e integrar plataforma de despliegue |

---

## Conclusiones

El punto 7.2 queda técnicamente consolidado y explicativo: cada apartado (a–e) tiene concepto, aplicación al sistema, evidencias y estado.

El único bloqueo operativo relevante de cierre total es SonarQube en ejecución real de panel, que depende de:

1. levantar Docker local + instalar `sonar-scanner`, o  
2. configurar secretos (`SONAR_TOKEN` y, según caso, `SONAR_HOST_URL`/`SONAR_ORGANIZATION`) en GitHub Actions.

---

## Recomendaciones de cierre final

1. **Activar SonarQube** y capturar evidencias SON-01, SON-02, SON-03.
2. Ejecutar checklist WCAG manual con evidencias de teclado/foco/zoom.
3. Ejecutar SUS con muestra real y publicar `sus-results.json` real.
4. Mantener ciclo CI/CD como puerta obligatoria para merge.

---

## Anexos

| Anexo | Enlace |
| ----- | ------ |
| Plan de pruebas | [TEST_PLAN.md](./TEST_PLAN.md) |
| Evidencias de pruebas | [TEST_EVIDENCES.md](./TEST_EVIDENCES.md) |
| Matriz de hallazgos | [MATRIZ_HALLAZGOS.md](./plantillas/MATRIZ_HALLAZGOS.md) |
| Cuestionario SUS | [CUESTIONARIO_SUS.md](./plantillas/CUESTIONARIO_SUS.md) |
| Guía SonarQube | [GUIA_EJECUCION_SONARQUBE.md](./reportes/sonar/GUIA_EJECUCION_SONARQUBE.md) |
| Índice documental 7.2 | [README.md](./README.md) |
