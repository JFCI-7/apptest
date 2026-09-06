---
name: contract-first
description: Aplica el flujo contract-first del proyecto: todo cambio de API se hace PRIMERO en contracts/openapi.yaml y se valida antes de tocar código. Úsalo siempre que el usuario mencione endpoints, rutas, payloads, schemas, respuestas de la API, o cuando una HU requiera crear o modificar la integración entre frontend y backend, aunque no diga "contrato".
---

# Contract-First

`contracts/openapi.yaml` es la fuente de verdad de la integración front/back
(CONSTITUTION.md §7). El orden nunca se invierte: primero el contrato, luego
el código. Así el frontend puede trabajar contra una API definida aunque el
backend aún no exista, y los cambios de API quedan revisados en un solo lugar.

## Flujo obligatorio

1. **Editar el contrato**: agrega/modifica paths, schemas y respuestas en `contracts/openapi.yaml` (OpenAPI 3.x). Incluye ejemplos cuando el payload no sea obvio.
2. **Validar** antes de continuar:
   - Mínimo: sintaxis YAML — `python3 -c "import yaml,sys; yaml.safe_load(open('contracts/openapi.yaml'))"`.
   - Si está disponible en el proyecto: linter OpenAPI (p. ej. Spectral). No instales herramientas nuevas sin confirmar.
3. **Commit del contrato solo** con Conventional Commit: `feat(contracts): agrega endpoint PATCH /clientes/{id}`.
4. **Implementar después**: el backend implementa el contrato en su HU; el frontend lo consume en la suya (HU separadas — CONSTITUTION §8).

## Reglas duras

- Si a mitad de una HU descubres que el contrato debe cambiar: DETÉN el código, actualiza `contracts/openapi.yaml`, valida, commitea el contrato, y recién continúa.
- El frontend NUNCA consume un endpoint que no exista en el contrato. Si hace falta, primero se agrega al contrato.
- Los tipos del contrato deben alinearse con TypeScript en ambos lados (los schemas de `components/` son la referencia compartida).
- Cambios en `contracts/**` disparan AMBOS workflows de CI (backend y frontend): un PR que toque el contrato debe vigilar los dos checks.

## Ejemplo de secuencia correcta

**Input**: "necesitamos actualizar el nombre de un cliente"
**Output**:
1. `PATCH /clientes/{id}` + schema `ClienteUpdate` en `contracts/openapi.yaml`
2. Validación YAML en verde
3. Commit `feat(contracts): agrega PATCH /clientes/{id}`
4. HU backend: implementa el endpoint (skill `tdd-cycle`)
5. HU frontend: consume el endpoint
