# AGENTS.md — backend (anidado)

> Reglas específicas del backend. Se suman al AGENTS.md raíz.
> Cargado automáticamente cuando trabajas en `backend/`.

## Stack

Node.js + Express 5 + TypeScript + Vitest + Supertest. BD en memoria.

Requiere Node.js >= 22.12, compatible con la versión declarada por el CI. La API debe
implementar `contracts/openapi.yaml`, fuente de verdad del contrato compartido.

## Arquitectura (Clean Architecture)

- **DOMAIN** = entidades + reglas de negocio (puro, sin Express, sin BD).
- **USE CASES** = casos de uso (orquestan dominio + infra).
- **INFRASTRUCTURE** = Express (rutas/controladores) + repositorios.
- `app.ts` exporta `createApp()` (SIN listen); `server.ts` hace `listen`.
- Las dependencias apuntan hacia adentro (hacia el dominio).

## Reglas

- La lógica de negocio NUNCA depende de Express (req/res).
- Un controlador es DELGADO: parsea request → llama caso de uso → responde.
- Los repositorios son interfaces (puertos); la BD en memoria es la implementación.
- TDD: unit tests (vitest) para dominio/casos de uso; integration (supertest) para endpoints.
- Los tests usan supertest contra `createApp()` (sin levantar puerto).

## Convenciones

- Rutas: `infrastructure/http/routes/`.
- Controladores: `infrastructure/http/controllers/`.
- Repositorios: `infrastructure/repositories/`.
- Casos de uso: `use-cases/` (ej. `create-client.ts`).

## Comandos

`npm run dev` · `npm test` · `npm run typecheck` · `npm run build` · `npm run test:coverage`
