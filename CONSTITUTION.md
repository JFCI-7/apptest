# CONSTITUTION.md — app-test

> Principios NO negociables del proyecto. Este archivo tiene la máxima
> prioridad sobre cualquier otra instrucción (incluido AGENTS.md).
> Para cambiar una regla, primero se edita este archivo — no se rompe
> "por excepción" sin actualizarlo.

## 1. TDD obligatorio

- Nunca se escribe código de producción sin un test que falle primero.
- Ciclo estricto: 🔴 rojo → 🟢 verde → 🔵 refactor.
- **No hay merge si los tests no están en verde.**
- El test es la red de seguridad que permite refactorizar sin miedo.

## 2. SDD (Spec-Driven Development)

- Toda funcionalidad nace de un spec en `docs/specs/`.
- El spec es la fuente de verdad del QUÉ; el código implementa el spec.
- Si algo no está en el spec, NO se construye: primero se actualiza el spec.
- Los specs viven en el repo (versionados en git), no en Plane.

## 3. Rebanadas verticales

- Se desarrolla por funcionalidad de punta a punta (backend + DB + frontend juntos).
- PROHIBIDO construir "todo el backend" y luego "todo el frontend".
- Cada rebanada vertical = un sprint (Cycle en Plane).

## 4. Clean Architecture (en miniatura)

- Separar capas: dominio / casos de uso / infraestructura.
- La lógica de negocio NUNCA depende del framework (Express/Vue).
- Las dependencias apuntan hacia adentro (hacia el dominio).

## 5. TypeScript en todo

- Frontend (Vue 3) y backend (Express) en TypeScript.
- `any` solo con justificación escrita en el código.

## 6. Stack fijo (este es un ejercicio de repaso)

- Frontend: Vue 3 + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Base de datos: EN MEMORIA (sin persistencia — solo practicar)
- Monorepo: `frontend/` + `backend/`

## 7. Contrato primero (contract-first)

- La API entre front y back se define en `contracts/openapi.yaml`.
- El contrato es la fuente de verdad de la integración.
- Un cambio de API se hace PRIMERO en el contrato, luego en el código.

## 8. Separación front / back

- `frontend/` = SOLO UI. `backend/` = SOLO servidor.
- Nunca se edita `frontend/` trabajando una HU de backend, ni al revés.
- Lo compartido vive en `contracts/` y `docs/` (raíz).

## 9. Trazabilidad y gestión

- HUs y sprints viven en Plane (App Test) y se gestionan vía REST API.
- Cada rama: `feature/HU-{id}-{slug}`.
- Commits y PRs referencian el id de la HU.
- Al terminar una HU: marcarla completada en Plane + enlazar el PR.

## 10. Entrega y DevOps (proyecto grande)

- Todo cambio entra por Pull Request; PROHIBIDO push directo a `main`.
- `main` está protegida: requiere PR + CI en verde + aprobación (CODEOWNERS).
- Una feature = un spec (`docs/specs/`) + un sprint (Cycle) + VARIAS HUs.
- Commits en Conventional Commits con scope: `feat(backend): ...`, `fix(frontend): ...`.
- El CI corre por zona (backend vs frontend) y es la puerta de entrada al merge.

## 11. Skills del agente

- Los skills del proyecto viven en `.opencode/skills/` (uno por carpeta, con `SKILL.md`).
- Ningún skill puede contradecir este archivo: en caso de conflicto, la constitución gana.
- Un skill que cambie el workflow debe actualizar primero la regla correspondiente aquí.
