# 📚 MEVN SPA Backend

Una aplicación backend desarrollada con **Node.js**, **Express** y **MongoDB** para una SPA (Single Page Application) usando el stack MEVN.

## 🚀 Características

- ✅ API RESTful
- ✅ Autenticación JWT
- ✅ Base de datos MongoDB
- ✅ Middleware de validación
- ✅ CORS habilitado

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone <https://github.com/Victor-Rodriguez/spa-salon-mevn-backend.git>

# Navegar al directorio
cd spa-salon-mevn-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar el servidor
npm run dev
```

## 📡 Endpoints de la API

### 🔐 Autenticación

| Método | Endpoint                           | Descripción                 | Body / Params               | Autenticación |
| ------ | ---------------------------------- | --------------------------- | --------------------------- | ------------- |
| POST   | `/api/auth/register`               | Registrar usuario           | `{ name, email, password }` | ❌            |
| GET    | `/api/auth/verify/:token`          | Verificar cuenta            | `token` en URL              | ❌            |
| POST   | `/api/auth/login`                  | Iniciar sesión              | `{ email, password }`       | ❌            |
| GET    | `/api/auth/user`                   | Validar usuario autenticado | -                           | ✅ (Bearer)   |
| POST   | `/api/auth/forgot-password`        | Solicitar recuperación      | `{ email }`                 | ❌            |
| GET    | `/api/auth/forgot-password/:token` | Validar token recuperación  | `token` en URL              | ❌            |
| POST   | `/api/auth/forgot-password/:token` | Nueva contraseña            | `{ password }`              | ❌            |
| GET    | `/api/auth/admin`                  | Validar usuario admin       | -                           | ✅ (Bearer)   |

---

### 🧴 Servicios

| Método | Endpoint            | Descripción                | Body / Params                  | Autenticación |
| ------ | ------------------- | -------------------------- | ------------------------------ | ------------- |
| GET    | `/api/services`     | Listar todos los servicios | -                              | ❌            |
| POST   | `/api/services`     | Crear nuevo servicio       | `{ name, description, price }` | ✅            |
| GET    | `/api/services/:id` | Obtener servicio por ID    | `id` en URL                    | ❌            |
| PUT    | `/api/services/:id` | Actualizar servicio        | `{ name, description, price }` | ✅            |
| DELETE | `/api/services/:id` | Eliminar servicio          | `id` en URL                    | ✅            |

---

### 📅 Citas

| Método | Endpoint                            | Descripción             | Body / Params                           | Autenticación |
| ------ | ----------------------------------- | ----------------------- | --------------------------------------- | ------------- |
| POST   | `/api/appointments`                 | Crear nueva cita        | `{ services, date, time, totalAmount }` | ✅            |
| GET    | `/api/appointments?date=DD/MM/YYYY` | Obtener citas por fecha | `date` como query param                 | ✅            |
| GET    | `/api/appointments/:id`             | Obtener cita por ID     | `id` en URL                             | ✅            |

---

### 👤 Usuarios

| Método | Endpoint                      | Descripción              | Body / Params | Autenticación |
| ------ | ----------------------------- | ------------------------ | ------------- | ------------- |
| GET    | `/api/users/:id/appointments` | Obtener citas de usuario | `id` en URL   | ✅            |

---

## Variables de entorno necesarias

Crea un archivo `.env` en la raíz del backend con las siguientes variables:

```env
MONGO_URI=tu_url_de_mongodb
FRONTEND_URL=http://localhost:5173
EMAIL_HOST=tu_host_smtp
EMAIL_PORT=tu_puerto_smtp
EMAIL_USER=tu_usuario_smtp
EMAIL_PASS=tu_password_smtp
JWT_SECRET=tu_clave_secreta_jwt
```

Asegúrate de completar cada valor según tu configuración local o de producción.
