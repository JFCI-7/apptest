---
name: spec-author
description: Redacta y actualiza specs de funcionalidades en docs/specs/ siguiendo SDD (el spec es la fuente de verdad del QUÉ). Úsalo SIEMPRE que el usuario pida una funcionalidad nueva, describa requisitos, mencione "spec", "requisitos" o "historia de usuario", o cuando se quiera construir algo que aún no tiene spec — aunque el usuario no lo pida explícitamente.
---

# Spec Author (SDD)

En este proyecto toda funcionalidad nace de un spec (CONSTITUTION.md §2).
El spec define el QUÉ; el código lo implementa. Si algo no está en el spec,
NO se construye: primero se actualiza el spec y luego se programa. Esta
disciplina es la que permite que varias HUs (y varios agentes) trabajen
sobre la misma fuente de verdad sin derivar.

## Dónde viven los specs

- Carpeta: `docs/specs/` — versionada en git. Plane NO es fuente de verdad del spec; solo gestiona HUs y sprints.
- Nombre de archivo: `NNN-slug-corto.md` (ej. `001-catalogo-clientes.md`), con `NNN` secuencial.

## Estructura del spec

Usa SIEMPRE esta plantilla:

```markdown
# SPEC-NNN: <nombre de la feature>

## Contexto
Por qué existe esta feature y qué problema resuelve (2-4 líneas).

## Objetivo
Qué quedará funcionando cuando el spec esté completo (1-2 líneas, verificable).

## Fuera de alcance
Lista explícita de lo que este spec NO cubre (evita scope creep).

## Requisitos funcionales (el QUÉ)
Enumerados y verificables. Describe comportamiento observable, no implementación.

## Modelo de datos conceptual
Entidades y campos (sin tipos de base de datos ni ORM — eso es el CÓMO).

## Necesidades de API
Qué operaciones debe exponer la API (crear, listar, actualizar, borrar...).
Sin rutas ni payloads concretos: eso lo define contracts/openapi.yaml (skill contract-first).

## Historias de usuario (HUs)
- HU-1: Como <rol>, quiero <acción>, para <beneficio>.
  - Criterios de aceptación:
    - [ ] ...
- HU-2: ...

## Trazabilidad
- Sprint (Cycle en Plane): <nombre>
- HUs en Plane: <ids, se llenan al crearlas con el skill plane-sync>
```

## Reglas de redacción

- QUÉ, nunca CÓMO: no nombres frameworks, ni tablas, ni rutas HTTP concretas, ni decisiones de UI. Esas decisiones van en `docs/adr/` o en el contrato.
- Cada criterio de aceptación debe ser verificable (se puede probar con un test o demostrarse manualmente).
- "Fuera de alcance" no es opcional: escribirlo fuerza decisiones y evita trabajo no pedido.
- 1 feature = 1 spec + 1 sprint (Cycle en Plane) + VARIAS HUs. Si el spec crece demasiado, pártelo.

## Al terminar un spec

1. Guárdalo en `docs/specs/` con el nombre secuencial correcto.
2. Propón la lista de HUs con sus criterios, listas para crearse en Plane (usa el skill `plane-sync`).
3. No escribas código todavía: el siguiente paso es definir/actualizar el contrato si hay API (skill `contract-first`) y luego las HUs.
