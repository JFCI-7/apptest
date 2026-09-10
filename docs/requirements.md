# Requisitos — app-test (Catálogo de Clientes)

> Documento de requisitos (Nivel 0). Define el QUÉ del sistema a nivel de negocio.
> El CÓMO va en `docs/adr/` y el detalle por feature en `docs/specs/`.

## 1. Visión general

Sistema de gestión de un catálogo de clientes, usado como proyecto de práctica
para ensayar el flujo completo de desarrollo de software asistido por IA
(SDD + TDD + Clean Architecture + DevOps), con miras a proyectos grandes.

## 2. Alcance

### Incluye

- **Fase A/B:** CRUD completo de clientes (crear, leer, actualizar, eliminar)
- **Fase C:** Autenticación de usuarios con JWT

### No incluye (por ahora)

- Persistencia real (se usa BD en memoria en las fases A/B)
- Pagos, notificaciones, roles avanzados, recuperación de contraseña

## 3. Entidad Cliente

| Campo           | Tipo     | Regla                                              |
| --------------- | -------- | -------------------------------------------------- |
| id              | UUID     | generado por el backend (no lo escribe el usuario) |
| nombre          | string   | obligatorio                                        |
| apellidoPaterno | string   | obligatorio                                        |
| apellidoMaterno | string   | obligatorio                                        |
| edad            | number   | 1–120                                              |
| email           | string   | formato válido, único                              |
| sexo            | enum     | Masculino / Femenino / Otro                        |
| pasatiempos     | string[] | mínimo 2                                           |
| paisNacimiento  | string   | obligatorio                                        |

> Los nombres técnicos exactos (camelCase en inglés) se definen en el spec/OpenAPI.

## 4. Requisitos funcionales

### Fase A/B — CRUD

- **RF-01:** Crear un cliente con todos los campos válidos.
- **RF-02:** Listar todos los clientes.
- **RF-03:** Ver el detalle de un cliente por su id.
- **RF-04:** Actualizar los datos de un cliente.
- **RF-05:** Eliminar un cliente.
- **RF-06:** Validar los datos (email, edad, sexo, mínimo 2 pasatiempos).

### Fase C — Autenticación (JWT)

- **RF-07:** Autenticarse (login) con credenciales.
- **RF-08:** Recibir un token JWT al autenticarse.
- **RF-09:** Los endpoints del CRUD quedan protegidos (requieren token válido).
- **RF-10:** Sin token o con token inválido → respuesta 401.

## 5. Requisitos no funcionales

- **RNF-01:** Clean Architecture (dominio independiente del framework).
- **RNF-02:** TypeScript en frontend y backend.
- **RNF-03:** TDD obligatorio (test antes que código).
- **RNF-04:** SDD (spec como fuente de verdad).
- **RNF-05:** Base de datos en memoria (fases A/B).
- **RNF-06:** API documentada con OpenAPI (contract-first).

## 6. Criterios de aceptación (generales)

- El CRUD funciona de punta a punta (frontend + backend + BD).
- CI en verde en cada PR.
- Todo cambio entra por PR (rama `main` protegida).
- (Fase C) El acceso sin token es rechazado con 401.
