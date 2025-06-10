# Proyecto de Autenticación y Gestión de Sesión (Administrador y Estudiante)

Este proyecto es una aplicación web de Vue 3 con **Pinia** para la gestión de estado global, **Vue Router** para la navegación, y **Cookies** para la autenticación de usuarios. El proyecto tiene dos roles de usuario: **Administrador** y **Estudiante**. Cada uno tiene un conjunto de funcionalidades protegidas, y el acceso a estas funcionalidades depende de la autenticación exitosa del usuario.

## Funcionalidades

- **Autenticación**: Los usuarios pueden iniciar sesión con un email y contraseña. El estado de autenticación se gestiona usando **Pinia** y se guarda en las **Cookies**.
- **Roles**: Existen dos roles de usuario: **Administrador** y **Estudiante**, con opciones y vistas diferentes.
- **Logout**: El usuario puede cerrar sesión, lo que elimina el token de autenticación de las **Cookies** y redirige al login.
- **Protección de rutas**: Solo los usuarios autenticados pueden acceder a las rutas protegidas, como las vistas del **Administrador** y el **Estudiante**.

## Tecnologías utilizadas

- **Vue 3**: Framework de JavaScript para construir interfaces de usuario reactivas.
- **Pinia**: Gestión de estado global para Vue 3.
- **Vue Router**: Para la gestión de la navegación y rutas protegidas.
- **Cookies**: Para almacenar el token de autenticación del usuario.
- **Axios**: Para la comunicación con el backend (si es necesario).

## Instalación

Sigue los siguientes pasos para instalar y ejecutar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
