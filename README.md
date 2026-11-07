# 🍳 Recetas App

Aplicación web para explorar, buscar, crear y eliminar recetas, construida como proyecto final del curso de Desarrollo Web (Variante B). Incluye autenticación de usuarios, sesión persistente y renovación automática de tokens.

## ✨ Funcionalidades

- Inicio de sesión con validación de formulario y manejo de errores del servidor.
- Rutas protegidas: solo un usuario autenticado puede ver el catálogo de recetas.
- Renovación automática de la sesión cuando el token de acceso expira.
- Listado de recetas con paginación y búsqueda en vivo.
- Vista de detalle con descarga de imagen y de una ficha de texto.
- Alta y baja de recetas desde la propia interfaz.
- Página 404 para rutas inexistentes.

## 🛠️ Tecnologías

- React 19 + TypeScript + Vite
- React Router para la navegación
- TanStack Query para el estado del servidor (listado, detalle, mutaciones)
- Zustand (con persistencia) para la sesión del usuario
- React Hook Form + Zod para validación de formularios
- Axios con interceptores para autenticación
- Tailwind CSS + componentes shadcn/ui

## 🚀 Instalación y ejecución

```bash
npm install
cp .env.example .env
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`. La API consumida es [DummyJSON](https://dummyjson.com) (configurada en `src/config.ts`).

### Credenciales de prueba

| Campo | Valor |
| --- | --- |
| Usuario | `emilys` |
| Contraseña | `emilyspass` |

## 📦 Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Levanta el servidor de desarrollo |
| `npm run build` | Compila el proyecto y genera `dist/` |
| `npm run lint` | Ejecuta ESLint sobre el código fuente |

## 🌐 Despliegue

El sitio se despliega como aplicación estática (SPA); las rutas internas de React Router se redirigen a `index.html` mediante la configuración incluida (`vercel.json`).
