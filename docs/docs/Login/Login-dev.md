---
title: Inicio de sesión Desarrollador (Main)🚀
description: Documentacion del componente Login
---

Lo primero que hace el sistema al iniciar es crear una funcion donde se crea la ventana de inicio de sesión

## Función `createLoginWindow()`

La función `createLoginWindow()` se encarga de crear y configurar una ventana de inicio de sesión en la aplicación.

### Descripción

La función crea una instancia de `BrowserWindow` utilizando Electron para mostrar una ventana de inicio de sesión con las siguientes configuraciones:

- **Dimensiones:** Ancho de 900px y alto de 670px.
- **Opciones de Visualización:**
  - `show: false` para inicialmente ocultar la ventana hasta que esté lista para ser mostrada.
  - `autoHideMenuBar: false` para mantener visible la barra de menú.
  
- **Configuración de `webPreferences`:**
  - `preload`: Carga el script `index.js` ubicado en la carpeta de `preload`.
  - `sandbox: false` permite la ejecución de scripts con acceso completo al API de Node.js.
  - `nodeIntegrationInWorker: true` habilita Node.js en los workers.
  - `nodeIntegration: true` permite la integración de Node.js en el proceso de renderizado.
  - `contextIsolation: false` desactiva el aislamiento de contexto para acceder directamente al contexto del navegador.

### Eventos

La ventana de inicio de sesión se muestra cuando está lista utilizando el evento `'ready-to-show'`.

### Carga de Contenido

Carga el archivo `login.html` ubicado en la carpeta `renderer` para mostrar el contenido de la ventana de inicio de sesión.

### Uso

Para utilizar esta función, simplemente llámala en el lugar adecuado de tu código para inicializar la ventana de inicio de sesión.

```typescript
function createLoginWindow(): void {
    // Código de la función aquí
}
```

## Configuración al Iniciar la Aplicación

El siguiente código se ejecuta cuando la aplicación está lista para ser utilizada (`app.whenReady().then()`), configurando varios aspectos clave de la aplicación.

### Descripción

Este bloque de código realiza las siguientes acciones:

- **Configuración del modelo de usuario de la aplicación para ventanas en Windows.**
- **Observación de accesos directos de ventana:** Observa los accesos directos de ventana para optimización.
- **Creación de ventanas:** Crea una nueva ventana si no hay otras ventanas abiertas al activar la aplicación en macOS.
- **Configuración de tema:** Determina y ajusta el tema de la aplicación según la configuración de tema del sistema operativo.

### Código

```javascript
app.whenReady().then(() => {
    // Set app user model id for windows
  
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })
  
    // createWindow()
  
    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  
    // const tray = new Tray(nativeImage.createFromPath(appIcon))
    
    let theme = nativeTheme.shouldUseDarkColors ? 'Dark' : 'Light';
  
    nativeTheme.on('updated', () => {
      theme = nativeTheme.shouldUseDarkColors ? 'Dark' : 'Light';
    })
  
    createLoginWindow();
});
```

### Uso
Este código debe ser ejecutado una vez que la aplicación Electron esté completamente cargada y lista para ser utilizada. Asegúrate de integrarlo en el punto apropiado de tu aplicación para configurar correctamente el entorno y las ventanas necesarias al iniciar la aplicación.

## Función de Manejo del Evento 'user'

La siguiente función maneja el evento `'user'` en Electron, encargado del proceso de inicio de sesión en la aplicación.

### Descripción

Esta función utiliza `ipcMain.handle()` para escuchar el evento `'user'` desde el proceso principal de Electron (`ipcMain`), el cual es activado cuando el usuario inicia sesión en la aplicación. A continuación, se realiza una solicitud HTTP POST para autenticar al usuario en el servidor y realizar diversas acciones dependiendo de la respuesta obtenida.

### Código

```javascript
ipcMain.handle('user', async (event, datos) => {
  try {
    // Evita el comportamiento predeterminado del evento
    event.defaultPrevented;

    // Realiza una solicitud POST al servidor de autenticación
    const responseJSON = await net.fetch("http://192.168.0.172:3010/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' // Establece el tipo de contenido JSON
      },
      body: JSON.stringify({
        user: datos.user,
        password: datos.password
      })
    });

    // Obtiene la respuesta JSON del servidor
    const response = await responseJSON.json();

    // Procesa la respuesta del servidor
    if (response.status === 200) {
      // Establece el token de acceso
      accessToken = response.accesToken;

      // Crea conexiones WebSocket con el servidor de sockets
      socket2 = io('ws://192.168.0.172:3011/', {
        auth: {
          token: response.accesToken
        },
        rejectUnauthorized: false
      });

      socket = io('ws://192.168.0.172:3000/', {
        auth: {
          token: response.accesToken
        },
        rejectUnauthorized: false
      });

      // Maneja eventos de conexión para los sockets WebSocket
      socket2.on('connect', () => {
        console.log("Conectado a ws://192.168.0.172:3011/");
      });

      socket.on('connect', () => {
        // Configura el modelo de usuario de la aplicación en Windows
        electronApp.setAppUserModelId('com.electron');
        
        // Obtiene la versión de la aplicación
        const version = app.getVersion();
        
        // Realiza una solicitud GET para verificar nuevas actualizaciones
        net.fetch(`http://192.168.0.172:3000/newVersion=${version}`, { method: 'GET' })
          .then((response) => response.text())
          .then((data) => {
            // Si hay una nueva versión disponible, muestra una notificación
            if (data === "true") {
              updater.autoUpdater.checkForUpdates().then(() => {
                updater.autoUpdater.once('update-available', (info) => {
                  new Notification({
                    title: 'Versión disponible',
                    body: info.version
                  }).show();

                  // Descarga la actualización y reinicia la aplicación
                  updater.autoUpdater.downloadUpdate().then(() => {
                    updater.autoUpdater.once("update-downloaded", () => {
                      updater.autoUpdater.quitAndInstall();
                    });
                  });
                });
              });
            }
          })
          .catch((e) => console.log(e));

        // Maneja errores durante la actualización automática
        updater.autoUpdater.on("error", (info) => {
          new Notification({
            title: info.name,
            body: info.message
          }).show();
        });
      });

      // Maneja errores de conexión para los sockets WebSocket
      socket.on('connect_error', (error) => {
        console.error('Error de conexión del socket:', error);
      });

      socket2.on('connect_error', (error) => {
        console.error('Error de conexión del socket:', error.message);
        // Cierra la ventana principal y vuelve a abrir la ventana de inicio de sesión
        mainWindow.close();
        createLoginWindow();
      });

      // Cierra la ventana de inicio de sesión después de iniciar sesión correctamente
      loginWindow.close();
      console.log(response);

      // Asigna variables de sesión obtenidas del servidor
      cargo = response.cargo;
      user = response.user;
      permisos = response.permisos;

      // Crea la ventana principal de la aplicación
      createWindow();

      // Devuelve la respuesta del servidor
      return response;
    }

    // Devuelve la respuesta del servidor si no se cumple la condición anterior
    return response;
  } catch (e) {
    // Maneja errores generales
    if (e instanceof Error) {
      console.log(e);
      return `${e.message}`;
    }
  }
});
```
### Uso
Esta función debe ser utilizada dentro de tu aplicación Electron para manejar la autenticación de usuarios y la configuración de conexiones WebSocket. Asegúrate de integrarla correctamente en tu flujo de trabajo de inicio de sesión y manejo de eventos relacionados.