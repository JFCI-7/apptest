# Spec 000 — Base (Walking Skeleton)

## Objetivo

Validar la tubería completa del proyecto (monorepo + CI + PR + deploy)
con la rebanada MÁS delgada posible, ANTES de construir features reales.

## Alcance (lo que SÍ incluye)

- Backend: scaffolding de Express + TypeScript + Vitest
- Endpoint `GET /health` → responde `200 {"status": "ok"}` (según contrato)
- Frontend: scaffolding de Vue 3 + Vite + TypeScript + Tailwind
- Una página que consume `/health` y muestra el estado
- CI en verde (install, typecheck, test, build)
- Vitest como runner de tests ÚNICO en front y back
- Genera el comando en el package.json

## Fuera de alcance (lo que NO incluye)

- Ninguna funcionalidad de clientes (eso viene en Sprint 1+)
- Base de datos real (la de memoria se define cuando haya clientes)

## Contrato

- `contracts/openapi.yaml` ya define `GET /health` (200 con `{status}`)

## Criterios de aceptación

- [ ] `GET /health` devuelve `200` y `{"status":"ok"}`
- [ ] Hay al menos un test de backend (del endpoint /health) con Vitest
- [ ] La página del frontend muestra el estado del backend
- [ ] CI Backend y CI Frontend en verde
- [ ] Todo entra por PR (main protegida)
