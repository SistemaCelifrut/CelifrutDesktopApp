---
title: Estructura general del proyecto
description: Explicación detallada sobre la estructura general del proyecto
---

# Estructura general del proyecto 🚀
El proyecto está desarrollado con el framework [Electron](https://www.electronjs.org/es/), una plataforma que permite crear aplicaciones de escritorio multiplataforma utilizando tecnologías web estándar como HTML, CSS y JavaScript. [Electron](https://www.electronjs.org/es/) combina el motor de renderizado Blink de Chrome y el entorno de ejecución Node.js, proporcionando un entorno robusto para el desarrollo de aplicaciones de escritorio modernas.

### Documentación de Electron
Puedes consultar la documentación oficial de [Electron](https://www.electronjs.org/es/) para obtener más detalles sobre cómo construir y desarrollar aplicaciones con Electron:

- [Documentacion de Electron](https://www.electronjs.org/es/)

## Empaquetado con electron-vite
El proyecto ha sido empaquetado utilizando [electron-vite](https://electron-vite.org/), una herramienta que optimiza el desarrollo y la construcción de aplicaciones Electron utilizando Vite como bundler. Vite es conocido por su rapidez y eficiencia en el desarrollo de aplicaciones web y su integración con Electron permite un flujo de trabajo ágil y optimizado.

### Documentación de electron-vite
Para aprender más sobre cómo empaquetar y optimizar tu aplicación Electron con electron-vite, te recomiendo revisar su documentación oficial:

- [Documentación de electron-vite](https://electron-vite.org/)

Estas herramientas proporcionan una base sólida para el desarrollo y empaquetado de tu aplicación de escritorio, aprovechando las capacidades modernas de las tecnologías web y ofreciendo un entorno de desarrollo eficiente y optimizado.

## Estructura del Proyecto

En general, el proyecto está organizado en tres partes principales: `main`, `preload` y `renderer`.

```plaintext
.
├── src
│   ├── main
│   │   ├── index.ts
│   │   └── ...
│   ├── preload
│   │   ├── index.ts
│   │   └── ...
│   └── renderer    # con Vue, React, etc.
│       ├── src
│       ├── index.html
│       └── ...
├── electron.vite.config.ts
├── package.json
└── ...
```

### Detalles de cada parte del proyecto:
- main: Esta carpeta contiene el código principal de tu aplicación Electron. Aquí se inicia el proceso principal de la aplicación y se maneja la lógica central del programa.

- preload: El preload actúa como un puente de comunicación entre el proceso de renderizado y el proceso principal (main). Se utiliza para cargar scripts en el contexto de la página web renderizada, permitiendo acceso a APIs Node.js desde el proceso de renderizado.

- renderer: Esta carpeta contiene la parte visual y de interfaz de usuario de tu aplicación. Aquí se utiliza HTML, CSS y JavaScript para construir la interfaz que interactúa con los usuarios. Puedes elegir utilizar frameworks como Vue.js, React u otros para desarrollar la interfaz de usuario de manera eficiente y modular.

### Configuración y archivos adicionales:
- electron.vite.config.ts: Este archivo contiene la configuración específica de electron-vite para optimizar y empaquetar tu aplicación Electron utilizando Vite como bundler. Aquí se pueden configurar ajustes adicionales como rutas de archivos, ajustes de optimización y más.

- package.json: El archivo package.json contiene las dependencias y scripts necesarios para construir, ejecutar y empaquetar tu aplicación Electron. Aquí se definen las configuraciones de inicio y las dependencias del proyecto.

Esta estructura organizada te permite separar claramente las responsabilidades del proceso principal, el preload y la interfaz de usuario, facilitando el desarrollo, la depuración y el mantenimiento de tu aplicación Electron.