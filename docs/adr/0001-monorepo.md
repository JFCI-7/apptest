# ADR-0001: Monorepo

## Estado

Aceptado

## Contexto

Frontend (Vue) y backend (Express) comparten el contrato de API. Opciones:

- **Monorepo:** un solo repo con `frontend/` + `backend/`.
- **Polyrepo:** repos separados, contrato publicado como paquete.

## Decisión

Monorepo: un solo repositorio `app-test` con `frontend/`, `backend/`,
`contracts/` y `docs/`.

## Consecuencias

- ✅ Contrato compartido, PRs atómicos (cambiar API + consumidor en un PR), CI único.
- ⚠️ Requiere disciplina de separación (CODEOWNERS + CI por path).
