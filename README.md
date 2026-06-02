# Sistema de Gestión de Tickets

Proyecto académico desarrollado con:

* Oracle Database 11g XE
* Node.js + Express
* React + Vite

## Requisitos Previos

Antes de ejecutar el proyecto es necesario contar con:

* Oracle Database 11g XE
* Node.js (versión LTS recomendada)
* npm
* Git
* Oracle Instant Client (para conexión desde Node.js utilizando modo Thick)

---

# Estructura del Proyecto

```text
ProyectoBD/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/          # Configuración de Oracle, variables de entorno y pool de conexiones
│   │   ├── controllers/     # Controladores HTTP
│   │   ├── middleware/      # Validaciones, autenticación y manejo de errores
│   │   ├── routes/          # Definición de endpoints
│   │   ├── services/        # Acceso a datos y llamadas a procedimientos almacenados
│   │   ├── utils/           # Utilidades compartidas
│   │   ├── app.js           # Configuración principal de Express
│   │   └── server.js        # Punto de entrada del servidor
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── client/
│   │
│   ├── src/
│   │   ├── api/             # Configuración de Axios y servicios de API
│   │   ├── components/      # Componentes reutilizables
│   │   ├── context/         # Context API y manejo global de estado
│   │   ├── layouts/         # Plantillas y estructuras visuales
│   │   ├── pages/           # Páginas de la aplicación
│   │   ├── routes/          # Configuración de rutas React Router
│   │   ├── App.jsx          # Componente principal
│   │   └── main.jsx         # Punto de entrada de React
│   │
│   ├── public/
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── database/
│   │
│   ├── migrations/
│   │   ├── 01_schema.sql
│   │   ├── 02_soft_delete.sql
│   │   ├── 03_add_password_hash.sql
│   │   ├── 04_seed.sql
│   │   ├── 05_views.sql
│   │   └── 06_procedures.sql
│   │
│   └── utilities/
│       ├── 98_validate.sql
│       └── 99_reset_database.sql
│
├── .gitignore
├── README.md
└── PROYECTO01.DBF
```

## Arquitectura del Backend

El backend sigue una arquitectura por capas:

```text
Request
   │
   ▼
Routes
   │
   ▼
Middleware
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Oracle Database
```

### Responsabilidades

* **Routes**: exponen los endpoints REST.
* **Middleware**: validaciones, autenticación JWT y manejo de errores.
* **Controllers**: reciben solicitudes y construyen respuestas HTTP.
* **Services**: contienen la lógica de acceso a datos y ejecución de procedimientos almacenados.
* **Database**: Oracle 11g XE mediante procedimientos almacenados y vistas.

---

## Arquitectura del Frontend

El frontend utiliza React con una estructura desacoplada:

```text
Pages
  │
  ▼
Components
  │
  ▼
API Services
  │
  ▼
Backend REST API
```

### Responsabilidades

* **Pages**: vistas principales del sistema.
* **Components**: elementos reutilizables de interfaz.
* **Layouts**: estructura visual común.
* **Context**: estado global y autenticación.
* **Routes**: navegación protegida y pública.
* **API**: comunicación con el backend mediante Axios.


---

# Configuración de Base de Datos

## Tablespace

El proyecto utiliza el tablespace:

```sql
PROYECTO_TS
```

Este tablespace debe existir antes de ejecutar las migraciones.

---

## Ejecución de Scripts

Los scripts deben ejecutarse en el siguiente orden:

### 1. Crear estructura principal

```sql
database/migrations/01_schema.sql
```

### 2. Agregar soporte para Soft Delete

```sql
database/migrations/02_soft_delete.sql
```

### 3. Agregar campos de autenticación

```sql
database/migrations/03_add_password_hash.sql
```

### 4. Cargar datos iniciales

```sql
database/migrations/04_seed.sql
```

### 5. Crear vistas

```sql
database/migrations/05_views.sql
```

### 6. Crear procedimientos almacenados

```sql
database/migrations/06_procedures.sql
```

---

## Scripts Utilitarios

### Validar objetos creados

```sql
database/utilities/98_validate.sql
```

### Reiniciar completamente la base de datos

```sql
database/utilities/99_reset_database.sql
```

Este script elimina:

* Tablas
* Vistas
* Triggers
* Secuencias
* Procedimientos almacenados

---

# Backend

## Instalación

Entrar al directorio:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

---

## Variables de Entorno

Crear el archivo:

```text
backend/.env
```

Ejemplo:

```env
PORT=3000

ORACLE_USER=PROYECTO
ORACLE_PASSWORD=proyecto
ORACLE_CONNECT_STRING=localhost:1521/ORCL

JWT_SECRET=super_secret_key
```

Ajustar los valores según la configuración local.

---

## Ejecutar API

```bash
npm start
```

o

```bash
node src/server.js
```

La API quedará disponible en:

```text
http://localhost:3000/api
```

---

## Endpoint de Prueba

```http
GET /api/test
```

Respuesta esperada:

```json
[
  [
    "Oracle OK"
  ]
]
```

---

# Frontend

## Instalación

Entrar al directorio:

```bash
cd client
```

Instalar dependencias:

```bash
npm install
```

---

## Variables de Entorno

Crear el archivo:

```text
client/.env
```

Contenido:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Ejecutar Frontend

```bash
npm run dev
```

La aplicación quedará disponible en:

```text
http://localhost:5173
```

---

# Flujo de Inicio

## Primera ejecución

1. Crear tablespace y usuario Oracle.
2. Ejecutar scripts SQL en orden.
3. Instalar dependencias del backend.
4. Configurar variables de entorno del backend.
5. Iniciar backend.
6. Instalar dependencias del frontend.
7. Configurar variables de entorno del frontend.
8. Iniciar frontend.
9. Verificar conexión mediante el endpoint `/api/test`.

---

# Usuarios de Prueba

Los datos de prueba se generan mediante:

```sql
04_seed.sql
```

Incluye:

* Categorías
* Clientes
* Agentes
* Tickets
* Historial de estados

---

# Credenciales Administrativas

El acceso de administrador se encuentra implementado mediante credenciales hardcodeadas en el backend y no se almacena en la base de datos.
