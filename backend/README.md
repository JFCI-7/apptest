<!-- backend/README.md -->

# Backend — app-test

API del catálogo de clientes.

## Stack

- Node.js + Express 5
- TypeScript
- Vitest + Supertest (tests)
- Base de datos en memoria.

## Arquitectura

La siguiente es la estructura objetivo; se incorporará progresivamente durante
el refactor (🔵) de las HUs.

Clean Architecture (dominio / casos de uso / infraestructura):

src/
├── domain/ → entidades + reglas de negocio (puro, sin Express)
├── use-cases/ → casos de uso (orquestan dominio + infra)
├── infrastructure/
│ ├── http/ → rutas y controladores (Express)
│ └── repositories/ → repositorio en memoria
├── app.ts → createApp() (configura Express, SIN listen)
└── server.ts → listen (bootstrap)

La API implementa el contrato compartido definido en `contracts/openapi.yaml`.

## Comandos

- `npm run dev` → tsx watch src/server.ts
- `npm test` → vitest run
- `npm run typecheck` → tsc --noEmit
- `npm run build` → tsc -p tsconfig.build.json
- `npm run test:coverage` → cobertura

## Principios

- La lógica de negocio NO depende de Express (req/res).
- `app.ts` exporta `createApp()`; `server.ts` hace `listen` (tests usan supertest).
