---
name: plane-sync
description: Gestiona HUs, sprints (cycles) y estados en Plane vía REST API (self-hosted): crear, listar, actualizar, asignar a sprint, marcar completada y enlazar PRs. Úsalo cuando el usuario mencione Plane, HUs, historias de usuario, sprints, cycles, "marcar completada", o al abrir y cerrar cualquier tarea de desarrollo.
---

# Plane Sync

Las HUs y sprints viven en Plane (proyecto "App Test") y se gestionan vía
REST API (CONSTITUTION.md §9). La referencia completa de endpoints, IDs y
ejemplos curl está en `docs/plane-api.md` — léela antes de actuar; este skill
ordena el flujo y fija las reglas de seguridad.

## Precondiciones (verificar SIEMPRE antes de cualquier petición)

1. `$PLANE_API_KEY` existe en el entorno: `echo ${PLANE_API_KEY:+OK}`. Si está vacía, DETENTE y pide al usuario que la configure (Workspace Settings → API tokens → export en ~/.zshrc). NUNCA hardcodees el token en código, comandos guardados, ni commits.
2. Base URL: `PLANE_BASE_URL="http://localhost:8080/api/v1"` (self-hosted).
3. Header en toda petición: `-H "X-API-Key: $PLANE_API_KEY"`.
4. Si falta el workspace slug o el project id, descúbrelos (pasos 1-2 abajo).

## Flujo de descubrimiento (solo la primera vez)

1. Verificar token: `GET /users/me/`
2. Projects: `GET /workspaces/{ws}/projects/` → `project_id`
3. States: `GET /workspaces/{ws}/projects/{pid}/states/` → anota el `state_id` del grupo `completed`
4. Cycles: `GET /workspaces/{ws}/projects/{pid}/cycles/`

## Flujos típicos

### Crear HU desde un spec

```bash
curl -X POST "$PLANE_BASE_URL/workspaces/$WS/projects/$PID/work-items/" \
  -H "X-API-Key: $PLANE_API_KEY" -H "Content-Type: application/json" \
  -d '{"name": "HU-X: <título>", "description_html": "<p>Criterios de aceptación del spec...</p>", "priority": "high"}'
```

- El nombre sigue el formato del spec; `description_html` lleva los criterios de aceptación (acepta HTML).
- Guarda el `id` de la respuesta: se usa en la rama `feature/HU-{id}-{slug}`.

### Crear sprint y asignar HUs

```bash
# crear cycle
curl -X POST "$PLANE_BASE_URL/workspaces/$WS/projects/$PID/cycles/" \
  -H "X-API-Key: $PLANE_API_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Sprint N", "start_date": "YYYY-MM-DD", "end_date": "YYYY-MM-DD"}'
# asignar HUs al cycle
curl -X POST "$PLANE_BASE_URL/workspaces/$WS/projects/$PID/cycles/{cid}/cycle-issues/" \
  -H "X-API-Key: $PLANE_API_KEY" -H "Content-Type: application/json" \
  -d '{"issues": ["<hu_id_1>", "<hu_id_2>"]}'
```

### Cerrar una HU (obligatorio al terminar)

Regla CONSTITUTION §9: al terminar una HU se marca completada en Plane y se enlaza el PR.

1. Agrega el link del PR a la descripción: `PATCH /workspaces/{ws}/projects/{pid}/work-items/{wid}/` con `description_html` actualizado.
2. Cambia el estado: mismo PATCH con `{"state_id": "<state_id de completed>"}`.

## Reglas duras

- El token NUNCA aparece en el repo: solo vía variable de entorno.
- Actualiza Plane al inicio (crear/asignar) y al cierre (completed + PR) de cada HU; Plane desactualizado rompe la trazabilidad.
- Si una petición falla con 401/403: el token es inválido o faltan permisos — informa al usuario, no reintentes en loop.
- Docs oficiales si falta algún endpoint: https://developers.plane.so/api-reference/ (agrega `.md` a cualquier URL para versión legible por IA).
