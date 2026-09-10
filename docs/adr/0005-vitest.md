# ADR-0005: Vitest como runner de tests

## Estado

Aceptado

## Contexto

Qué runner usar. Opciones:

- **Jest:** maduro, gran ecosistema, pero configuración TS/ESM más peleada.
- **Vitest:** nativo de Vite, TS/ESM out-of-the-box, rápido.

## Decisión

Vitest como ÚNICO runner en frontend y backend.

## Consecuencias

- ✅ Consistencia (un solo runner en todo el monorepo), rápido, TS nativo.
- ⚠️ Ecosistema de plugins más joven que Jest (irrelevante para este proyecto).
