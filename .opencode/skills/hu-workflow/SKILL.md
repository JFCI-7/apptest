---
name: hu-workflow
description: Orquesta el flujo completo de una HU de punta a punta: leer spec, rama feature/HU-{id}-{slug}, contract-first si hay API, TDD, Conventional Commits con scope, PR con checklist y cierre en Plane. Úsalo cuando el usuario diga "trabaja la HU", "empieza esta historia", "implementa el spec", o pida desarrollar una funcionalidad completa del proyecto.
---

# HU Workflow

Una HU se desarrolla de punta a punta con un orden fijo. Este skill orquesta
a los demás: `spec-author` (el QUÉ), `contract-first` (la API), `tdd-cycle`
(la implementación) y `plane-sync` (la trazabilidad). Seguir el orden evita
re-trabajo y mantiene la trazabilidad spec → HU → PR que exige la
CONSTITUTION (§3, §9, §10).

## Secuencia

1. **Leer antes de tocar nada**: `CONSTITUTION.md`, el spec de la HU en `docs/specs/` y la sección relevante de `contracts/openapi.yaml`. Si el spec no existe o no cubre lo pedido → skill `spec-author` primero; no se programa sin spec.
2. **Plane**: verifica que la HU existe y está asignada al cycle del sprint (skill `plane-sync`). Anota su `id`.
3. **Rama**: `feature/HU-{id}-{slug}` desde `main`. Nunca se trabaja directo en `main` ni se hace push directo (rama protegida: PR + CI + aprobación CODEOWNERS).
4. **¿Cambia la API?** → skill `contract-first`: el contrato se edita, valida y commitea ANTES que el código.
5. **Implementar con `tdd-cycle`**: rojo → verde → refactor. Regla de zonas (§8): una HU de backend NO toca `frontend/` y viceversa — la rebanada vertical (§3) se completa con las HUs hermanas del mismo cycle, no mezclando zonas en una HU.
6. **Commits**: Conventional Commits con scope y referencia a la HU.
   - `feat(backend): crea POST /clientes (HU-12)`
   - `fix(frontend): valida nombre vacío en formulario (HU-14)`
   - `test(backend): ...`, `refactor(backend): ...`, `docs: ...`
7. **PR**: push de la rama y PR usando `.github/PULL_REQUEST_TEMPLATE.md`: descripción, HU(s) que cierra, checklist completo (tests en verde, contrato actualizado si aplica, sin mezcla de zonas), pasos para probar.
8. **CI en verde**: `ci-backend` / `ci-frontend` corren typecheck + tests (y build en frontend). Si el PR toca `contracts/**`, vigila AMBOS workflows. No se mergea con CI rojo.
9. **Cierre**: merge aprobado → marca la HU `completed` en Plane y enlaza el PR en su descripción (skill `plane-sync`).

## Checklist rápido antes del PR

- [ ] Spec cubre el cambio (si no, se actualizó primero)
- [ ] Contrato actualizado ANTES del código si cambió la API
- [ ] Tests nuevos en rojo primero, suite en verde al final
- [ ] Solo toqué la zona de la HU (backend/ o frontend/, no ambos)
- [ ] Commits convencionales con scope e id de HU
- [ ] HU lista para marcarse completed + link del PR
