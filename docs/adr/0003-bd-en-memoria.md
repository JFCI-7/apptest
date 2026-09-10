# ADR-0003: Base de datos en memoria

## Estado

Aceptado (fases A/B)

## Contexto

El objetivo es ensayar el MÉTODO, no la persistencia. Opciones:

- **PostgreSQL/SQLite:** realista, pero añade setup e infra.
- **En memoria:** cero setup, foco en la lógica.

## Decisión

Base de datos en memoria para las fases A/B, detrás de una interfaz
(repositorio) que permita cambiarla por una real sin tocar el dominio.

## Consecuencias

- ✅ Cero setup, foco en TDD/Clean Architecture; el cambio a real es trivial.
- ⚠️ Sin persistencia (se pierde al reiniciar); sin transacciones reales.
