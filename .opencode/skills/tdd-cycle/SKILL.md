---
name: tdd-cycle
description: Impone el ciclo TDD estricto del proyecto (rojo → verde → refactor): prohíbe escribir código de producción sin un test que falle primero. Úsalo SIEMPRE que vayas a escribir, corregir o refactorizar código en backend/ o frontend/, aunque el usuario no mencione tests, y antes de proponer cualquier merge o PR.
---

# TDD Cycle

El TDD es obligatorio y no negociable aquí (CONSTITUTION.md §1): nunca se
escribe código de producción sin un test que falle primero. El test es la red
de seguridad que después permite refactorizar sin miedo — por eso el orden del
ciclo importa tanto como el resultado.

## El ciclo

1. 🔴 **Rojo**: escribe UN test pequeño que describa el comportamiento deseado. Ejecútalo y verifica que FALLE — y que falle por la razón correcta (no por un import roto).
2. 🟢 **Verde**: escribe el código MÍNIMO para que pase. Nada de funcionalidad extra "ya que estamos".
3. 🔵 **Refactor**: con los tests en verde, limpia y mejora. Si algo se rompe, el test te avisa al instante.
4. Repite con el siguiente comportamiento.

## Comandos

- Backend: `cd backend && npm test` (typecheck: `npm run typecheck`)
- Frontend: `cd frontend && npm test` (typecheck: `npm run typecheck`, build: `npm run build`)
- Corre la suite completa de la zona afectada antes de dar por terminado un paso.

## Reglas duras

- Si el usuario pide un fix: primero escribe un test que reproduzca el bug (rojo), luego el fix (verde). Un fix sin test de regresión no está terminado.
- PROHIBIDO proponer merge/PR con tests en rojo — el CI (`ci-backend` / `ci-frontend`) es la puerta de entrada y ejecuta typecheck + tests.
- No refactorices en rojo: primero verde, después azul.
- Los tests viven en la misma zona que el código que prueban (tests de backend en `backend/`, nunca en `frontend/`).
- Si una HU parece demasiado grande para testearla por partes, es señal de partirla en HUs más pequeñas (rebanadas verticales).

## Ejemplo de secuencia correcta

**Input**: "implementa la creación de clientes en el backend"
**Output**:
1. Test `POST /clientes` espera 201 + cliente con id → falla (no existe el endpoint) 🔴
2. Implementa la ruta mínima hasta pasar 🟢
3. Test de validación (nombre vacío → 400) → falla → implementa 🔴🟢
4. Con todo verde, refactor (extraer validaciones, limpiar handler) 🔵
