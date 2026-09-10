# AGENTS.md — app-test

> Manual del agente de `app-test`. Cargado automáticamente en cualquier
> sesión del proyecto (raíz, backend/ o frontend/).

## Rol del proyecto

CRUD de **catálogo de clientes** — monorepo frontend + backend —
usado como ensayo de un proyecto grande (SDD + TDD + DevOps + CI/CD).

## Antes de empezar (SIEMPRE)

1. Lee `CONSTITUTION.md` — sus reglas son NO negociables.
2. Los requisitos de negocio (nivel 0 del QUÉ) están en `docs/requirements.md`.
3. El contrato front↔back está en `contracts/openapi.yaml`.
4. Los specs (el QUÉ por feature) están en `docs/specs/`.
5. Las decisiones de arquitectura están en `docs/adr/`.
6. Los skills del proyecto (recetas reutilizables) viven en `.opencode/skills/` — opencode los carga automáticamente.

## Mapa del repo

| Ruta                | Contenido                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| `backend/`          | Node + Express + TypeScript (SOLO servidor, BD en memoria)                                           |
| `frontend/`         | Vue 3 + TypeScript + Tailwind (SOLO UI)                                                              |
| `contracts/`        | openapi.yaml — contrato compartido                                                                   |
| `docs/requirements.md` | requisitos de negocio de nivel 0                                                                     |
| `docs/specs/`       | specs (fuente de verdad del QUÉ)                                                                     |
| `docs/adr/`         | ADRs (decisiones de arquitectura)                                                                    |
| `docs/references/`  | referencias operativas, incluida la guía de Plane                                                    |
| `.github/`          | CODEOWNERS, PR template, CI por zona                                                                 |
| `.opencode/skills/` | Skills del proyecto (spec-author, contract-first, tdd-cycle, plane-sync, hu-workflow, skill-creator) |

## Reglas duras de separación front/back

- Trabajando una HU de backend, NUNCA edites `frontend/` (y viceversa).
- Solo `contracts/` y `docs/` son compartidos.
- Si un cambio toca front Y back: edita PRIMERO `contracts/openapi.yaml`.

## Workflow (obligatorio)

- TDD: 🔴 rojo → 🟢 verde → 🔵 refactor. Nunca código sin test previo.
- Rebanadas verticales: de punta a punta (backend + DB + frontend).
- 1 feature = 1 spec + 1 sprint (Cycle) + VARIAS HUs.
- Ramas: `feature/HU-{id}-{slug}`.
- Commits: Conventional Commits con scope → `feat(backend): ...`, `fix(frontend): ...`
- Todo entra por PR; `main` protegida (CI verde + aprobación CODEOWNERS).

## Plane (HUs y sprints)

- Leer/crear/actualizar HUs vía REST API: consulta `docs/references/plane-api.md`.
- Base: `http://localhost:8080/api/v1`, header `X-API-Key`.
- El token vive en `$PLANE_API_KEY` del entorno. NUNCA en código ni commits.
- Al terminar una HU: marcarla `completed` y enlazar el PR en la descripción.

## Comandos (se confirman en Sprint 0)

- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm run dev`
