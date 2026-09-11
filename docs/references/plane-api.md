# Plane API — Cheat Sheet (self-hosted)

Guía para que opencode (o tú) lea, cree y actualice HUs y sprints en Plane vía REST API.

## Base URL y autenticación

```bash
# Self-hosted local
PLANE_BASE_URL="http://localhost:8080/api/v1"
# Header de autenticación en TODA petición
#   X-API-Key: <TU_TOKEN>
```

- Token: **Workspace Settings → API tokens** (o Profile Settings → Personal Access Tokens)
- ⚠️ **Nunca** escribir el token en código ni en el repo. Usar variable de entorno:

  ```bash
  echo 'export PLANE_API_KEY="TU_TOKEN_AQUI"' >> ~/.zshrc
  source ~/.zshrc
  ```

- Con curl: `-H "X-API-Key: $PLANE_API_KEY"`
- Rate limit (cloud): 60 req/min por key. Self-hosted: sin límite estricto.

## IDs que vas a necesitar

| ID               | Dónde encontrarlo                                                 |
| ---------------- | ----------------------------------------------------------------- |
| `workspace_slug` | En la URL de la app: `http://localhost:8080/<workspace_slug>/...` |
| `project_id`     | `GET $PLANE_BASE_URL/workspaces/{ws}/projects/`                   |
| `state_id`       | `GET $PLANE_BASE_URL/workspaces/{ws}/projects/{pid}/states/`      |
| `cycle_id`       | `GET $PLANE_BASE_URL/workspaces/{ws}/projects/{pid}/cycles/`      |
| `work_item_id`   | Respuesta del GET de work-items (campo `id`)                      |

## Endpoints esenciales

| Acción                       | Método + Ruta                                                     | Body                                                                         |
| ---------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Verificar token / tu usuario | `GET /users/me/`                                                  | —                                                                            |
| Listar proyectos             | `GET /workspaces/{ws}/projects/`                                  | —                                                                            |
| Listar HUs                   | `GET /workspaces/{ws}/projects/{pid}/work-items/?per_page=100`    | —                                                                            |
| Crear HU                     | `POST /workspaces/{ws}/projects/{pid}/work-items/`                | `{"name": "...", "description_html": "<p>...</p>", "priority": "high"}`      |
| Ver HU                       | `GET /workspaces/{ws}/projects/{pid}/work-items/{wid}/`           | —                                                                            |
| Actualizar HU                | `PATCH /workspaces/{ws}/projects/{pid}/work-items/{wid}/`         | `{"state_id": "...", "priority": "urgent", "name": "..."}`                   |
| Borrar HU                    | `DELETE /workspaces/{ws}/projects/{pid}/work-items/{wid}/`        | —                                                                            |
| Listar estados               | `GET /workspaces/{ws}/projects/{pid}/states/`                     | —                                                                            |
| Listar sprints               | `GET /workspaces/{ws}/projects/{pid}/cycles/`                     | —                                                                            |
| Crear sprint                 | `POST /workspaces/{ws}/projects/{pid}/cycles/`                    | `{"name": "Sprint 1", "start_date": "2026-09-01", "end_date": "2026-09-14"}` |
| Asignar HUs a sprint         | `POST /workspaces/{ws}/projects/{pid}/cycles/{cid}/cycle-issues/` | `{"issues": ["id1", "id2"]}`                                                 |

### Parámetros de consulta útiles (GET)

- `per_page` (default 20, max 100), `cursor` (paginación: formato `20:1:0`)
- `fields=id,name,state` — solo ciertos campos
- `expand=assignees,state` — traer relaciones
- `order_by=-created_at` — ordenar (prefijo `-` = descendente)

## Flujo SDD completo (curl)

```bash
export PLANE_API_KEY="tu-token"
export PLANE_BASE_URL="http://localhost:8080/api/v1"
export WS="tu-slug"
export PID="project-id"          # del GET de projects

# 1) Crear una HU desde un spec
curl -X POST "$PLANE_BASE_URL/workspaces/$WS/projects/$PID/work-items/" \
  -H "X-API-Key: $PLANE_API_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Crear reserva de tour", "description_html": "<p>HU del spec de reservas</p>", "priority": "high"}'

# 2) Crear sprint
curl -X POST "$PLANE_BASE_URL/workspaces/$WS/projects/$PID/cycles/" \
  -H "X-API-Key: $PLANE_API_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Sprint 1", "start_date": "2026-09-01", "end_date": "2026-09-14"}'

# 3) Asignar HU(s) al sprint
curl -X POST "$PLANE_BASE_URL/workspaces/$WS/projects/$PID/cycles/CYCLE_ID/cycle-issues/" \
  -H "X-API-Key: $PLANE_API_KEY" -H "Content-Type: application/json" \
  -d '{"issues": ["HU_ID"]}'

# 4) Marcar HU completada (state_id = el estado "done" del proyecto)
curl -X PATCH "$PLANE_BASE_URL/workspaces/$WS/projects/$PID/work-items/HU_ID/" \
  -H "X-API-Key: $PLANE_API_KEY" -H "Content-Type: application/json" \
  -d '{"state_id": "ESTADO_DONE_ID"}'
```

## Etiquetas (labels) para métricas

Cada HU lleva **≥1 label de zona + 1 de tipo** (la feature es opcional pero recomendada). Vocabulario cerrado: no inventar labels nuevos sin actualizar esta sección.

| Grupo | Labels |
| ----- | ------ |
| Zona | `backend`, `frontend`, `compartida` (+ `contrato`, `infra` si aplica) |
| Tipo | `feature`, `bugfix`, `refactor`, `test`, `docs`, `infra` |
| Feature | `feature/{NNN}-{slug}` (ej. `feature/000-base`) |

- Crear: `POST /workspaces/{ws}/projects/{pid}/labels/` con `{"name": "..."}`.
- Asignar: `PATCH /workspaces/{ws}/projects/{pid}/work-items/{wid}/` con `{"labels": ["<label_id>", ...]}`.
- Consultar: `GET .../work-items/?expand=labels`.

## Notas

- Los grupos de estado típicos: `backlog`, `unstarted`, `started`, `completed`, `cancelled` (cada proyecto tiene sus propios `state_id`).
- Doc oficial completa (una página por endpoint, con cURL/Python/JS):
  - Índice: <https://developers.plane.so/api-reference/>
  - En Markdown puro (ideal para IA): agrega `.md` a cualquier URL, p. ej. <https://developers.plane.so/api-reference/issue/add-issue.md>
  - `description_html` acepta HTML (para el texto de la HU con criterios de aceptación).
