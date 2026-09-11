# ADR-0002: Clean Architecture

## Estado

Aceptado

## Contexto

Cómo estructurar el backend para que sea mantenible y testeable. Opciones:

- **MVC simple:** rápido, pero acopla lógica de negocio al framework.
- **Clean Architecture:** dominio / casos de uso / infraestructura.

## Decisión

Clean Architecture: separar dominio, casos de uso e infraestructura.
Las dependencias apuntan hacia adentro (hacia el dominio).

## Consecuencias

- ✅ Dominio testeable e independiente del framework; fácil migrar/cambiar infra.
- ⚠️ Más capas y boilerplate inicial (se paga con menos acoplamiento).
