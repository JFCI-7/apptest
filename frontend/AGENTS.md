# AGENTS.md — frontend (anidado)

> Reglas específicas del frontend. Se suman al AGENTS.md raíz.
> Cargado automáticamente cuando trabajas en `frontend/`.

## Stack

Vue 3 (Composition API) + TypeScript + Tailwind CSS v4 (CSS-first) + Vite + Vitest.

Requiere Node.js >= 22.12, compatible con la versión declarada por el CI. Las llamadas al
backend deben seguir `contracts/openapi.yaml`, fuente de verdad del contrato compartido.

## Arquitectura (Clean Architecture pragmática)

- **COMPONENTES** = presentación (dumb). Solo renderizan y disparan casos de uso.
  NUNCA hacen `fetch` directo ni validan reglas de negocio.
- **COMPOSABLES** = casos de uso (lógica). Orquestan dominio + infraestructura.
- **SERVICES** = infraestructura (API client). ÚNICA capa que hace HTTP.
- **VALIDATORS** = dominio puro (funciones sin Vue, testeables sin montar componentes).
- Estructura feature-based: `features/{feature}/{components,composables,services}`.
- **APP** = bootstrap de la aplicación (`app/App.vue`, `app/main.ts` y router cuando exista navegación).

## Reglas

- Un componente NUNCA importa un `service` directamente; pasa por el composable.
- Las validaciones de negocio son funciones puras en `validators.ts`.
- TypeScript estricto; sin `any` sin justificar.
- TDD: lógica de composables y validators se testea SIN montar componentes (unit);
  los componentes se testean con `mount` (integración).

## Convenciones

- Componentes: `PascalCase.vue` (ej. `ClientForm.vue`).
- Composables: `camelCase` con prefijo `use` (ej. `useCreateClient.ts`).
- Services: `{feature}.api.ts` (ej. `clients.api.ts`).
- Tailwind v4 CSS-first: `@import "tailwindcss"` en `style.css` (sin config).

## Comandos

`npm run dev` · `npm test` · `npm run typecheck` · `npm run build` · `npm run test:coverage`
