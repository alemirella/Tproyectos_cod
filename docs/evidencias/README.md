# Evidencias técnicas — SGOHA

Este directorio almacena capturas, reportes exportados y resultados verificables del punto **7.2** del informe técnico integral.

## Reglas

1. **No incluir datos sensibles**: contraseñas, tokens JWT, `MONGO_URI`, correos reales de usuarios.
2. **Anonimizar participantes SUS**: usar códigos (`P01`, `P02`) sin nombres completos.
3. **Incluir contexto**: fecha, rama (`main`), commit SHA cuando sea posible.
4. **No editar capturas** para ocultar fallos críticos.
5. **Relacionar cada evidencia** con el informe (`docs/INFORME_TECNICO_INTEGRAL_7_2.md`).

## Convención de nombres

### sonarqube/

| Archivo | Contenido |
|---------|-----------|
| `01-quality-gate-inicial.png` | Quality Gate antes de correcciones |
| `02-bugs-inicial.png` | Panel de bugs inicial |
| `03-code-smells-inicial.png` | Code smells inicial |
| `04-quality-gate-final.png` | Quality Gate después de correcciones |
| `05-cobertura.png` | Gráfico de cobertura en Sonar |

### owasp/

| Archivo | Contenido |
|---------|-----------|
| `01-npm-audit-frontend.png` | Salida `npm audit` frontend |
| `02-npm-audit-backend.png` | Salida `npm audit` backend |
| `03-codeql-resultados.png` | Pestaña Security → Code scanning |
| `04-zap-baseline.png` | Reporte OWASP ZAP (si se ejecuta) |

### wcag/

| Archivo | Contenido |
|---------|-----------|
| `01-lighthouse-login.png` | Lighthouse accesibilidad — login |
| `02-axe-dashboard.png` | axe DevTools — dashboard |
| `03-keyboard-navigation.png` | Navegación por teclado |
| `04-contrast-check.png` | Verificación de contraste |

### sus/

| Archivo | Contenido |
|---------|-----------|
| `01-cuestionarios-anonimizados.png` | Formularios sin datos personales |
| `02-calculo-sus.png` | Hoja de cálculo o tabla SUS |
| `03-resultados-promedio.png` | Promedio por rol |

### ci-cd/

| Archivo | Contenido |
|---------|-----------|
| `01-ci-success.png` | Workflow CI en verde |
| `02-codeql-success.png` | CodeQL completado |
| `03-sonar-success.png` | Sonar workflow (si activo) |
| `04-deployment-success.png` | Despliegue (cuando exista CD) |

### pruebas/

| Archivo | Contenido |
|---------|-----------|
| `01-login-admin.png` | Login administrador |
| `02-disponibilidad-docente.png` | Grilla de disponibilidad |
| `03-validacion-matricula.png` | Validación de matrícula |
| `04-generacion-horarios.png` | Precheck / generación |

## Reportes exportables (JSON/HTML)

Los reportes generados por scripts se guardan en `docs/reportes/`:

- `security/frontend-npm-audit.json`
- `security/backend-npm-audit.json`
- `accessibility/lighthouse/` (si se ejecuta Lighthouse CI)
- `sonar/` (export manual desde SonarQube)

Comando para auditoría de dependencias:

```bash
npm run audit:security
```
