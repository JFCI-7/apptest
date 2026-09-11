# ADR-0004: Contract-first con OpenAPI

## Estado

Aceptado

## Contexto

Cómo definir la API entre front y back. Opciones:

- **Code-first:** escribir el código y derivar el contrato después.
- **Contract-first:** escribir `openapi.yaml` antes del código.

## Decisión

Contract-first: el `contracts/openapi.yaml` es la fuente de verdad.
Backend lo implementa, frontend lo consume (tipos generados).

## Consecuencias

- ✅ Front y back siempre alineados; una sola fuente de verdad técnica.
- ⚠️ Hay que mantener el contrato al día (cambios de API primero en el yaml).
