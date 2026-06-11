# Evidencias de pruebas

| Suite | Comando | Resultado |
|-------|---------|-----------|
| Unit backend | `npm run test:unit:backend` | 22 tests |
| Unit frontend | `npm run test:unit:frontend` | 14 tests |
| Integración API | `npm run test:integration:api` | 16 tests |
| Integración frontend MSW | `npm run test:integration:frontend` | 10 tests |
| **Total Jest** | `npm test` | **62 tests** |
| Cypress aceptación | `npm run test:acceptance` | Requiere `npm run dev` en frontend |
| Cypress E2E | `npm run test:e2e` | Requiere frontend activo |
| CO₂ | `npm run test:co2` | `tests/reports/coverage-summary/co2-impact.json` |

## Ubicación reportes

- Cobertura: `tests/reports/coverage/`
- Logs: `docs/evidences/logs/`
- Cypress videos: `cypress/videos/`

## Escenario fallido controlado

```bash
npm run test:unit:backend -- --testNamePattern="no existe"
```

Debe reportar 0 tests o FAIL si se altera una assertion.
