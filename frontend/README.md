<!-- frontend/README.md -->

# Frontend — app-test

Interfaz de usuario del catálogo de clientes.

## Stack

- Vue 3 (Composition API)
- TypeScript
- Tailwind CSS v4 (CSS-first)
- Vite (build + dev server)
- Vitest + @vue/test-utils + happy-dom (tests)

## Arquitectura

La siguiente es la estructura objetivo; se incorporará progresivamente durante
el refactor (🔵) de las HUs.

Feature-based con "composables como casos de uso" (Clean Architecture pragmática):

src/
├── features/
│ └── {feature}/
│ ├── components/ → presentación (componentes "dumb")
│ ├── composables/ → casos de uso (lógica)
│ ├── services/ → infraestructura (API client, fetch)
│ ├── validators.ts → dominio puro (funciones sin Vue)
│ └── types.ts
├── shared/ → reusable entre features
└── app/ → bootstrap (App.vue, main.ts; router cuando exista navegación)

Las integraciones con backend siguen el contrato compartido definido en
`contracts/openapi.yaml`.

## Comandos

- `npm run dev` → servidor de desarrollo
- `npm test` → Vitest
- `npm run typecheck` → vue-tsc --noEmit
- `npm run build` → vite build
- `npm run test:coverage` → cobertura

## Principios

- Los componentes no hacen `fetch` directo ni validan negocio.
- La lógica vive en composables; las validaciones son funciones puras.
