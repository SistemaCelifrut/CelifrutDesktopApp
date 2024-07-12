/* eslint-disable prettier/prettier */
import {
  app,
  shell,
  BrowserWindow,
  nativeTheme,
  ipcMain,
  utilityProcess,
  net,
  Notification,
  Menu,
  MenuItem,
  dialog,
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { io } from 'socket.io-client'
import { clientesServerResponseType } from './types/login'
import updater from 'electron-updater'
import appIcon from "../../build/Celifrut.ico?asset"

let theme: 'Dark' | 'Ligth' = 'Ligth'
let cargo = ''
let user = ''
let permisos = []
let socket
let socket2
let loginWindow 
let mainWindow
let accessToken ='';

updater.autoUpdater.setFeedURL({ url: 'http://192.168.0.172:3000', provider: 'generic' })

//#region  create Windows
function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    icon: appIcon,

    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegrationInWorker: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const ctxMenu = new Menu()
  
  ctxMenu.append(new MenuItem({
    label: "Actualizar",
    click: function():void{
      mainWindow.webContents.send('reload', "message")
      return;
    }
  }));

  ctxMenu.append(new MenuItem({
    label: "Descargar",
    click: function():void{
      mainWindow.webContents.send('Descargar', "Descargar")
      return;
    }
  }));


  mainWindow.webContents.on("context-menu", function(_, params){
    
    ctxMenu.popup(params)
  })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  socket.off('serverToDesktop')
  socket.on('serverToDesktop', (data) => {
    console.log('serverToDesktop')
    if (data.status === 200) mainWindow.webContents.send('serverEmit', data)
    else console.log('error')
  })

  socket.off('listaEmpaqueInfo')
  socket.on('listaEmpaqueInfo', (data) => {
    console.log(data)
    if (data.status === 200) mainWindow.webContents.send('listaEmpaqueInfo', data)
    if (cargo === 'auxiliar_lista_de_empaque') {
      if (data.imprimir) {
        const child = utilityProcess.fork(join(__dirname, 'imprimir.js'))
        child.postMessage({
          destino: data.dataImpresion.cliente.destino,
          codigoCliente: data.dataImpresion.cliente.code,
          codigoPredio: data.dataImpresion.proveedor.code,
          codigoICA: data.dataImpresion.proveedor.ICA,
          codigoGGN: data.dataImpresion.proveedor.GGN,
          codigoCoC: undefined,
          contenedor: data.dataIngreso.contenedor,
          ef1: data.dataIngreso.id,
          cliente: data.dataImpresion.cliente.cliente,
          clienteID: data.dataImpresion.cliente.clienteID,
          telefono: data.dataImpresion.cliente.telefono,
          correo: data.dataImpresion.cliente.correo,
          cajas: data.dataIngreso.cajas,
          tipoFruta: data.dataImpresion.tipoFruta,
          tipoCaja: data.dataIngreso.tipoCaja
        })
        child.stdout?.on('data', (data) => {
          console.log(data)
        })
      } else console.log('error')
    }
  })
}

function createLoginWindow() :void {
    // Create the browser window.
    loginWindow = new BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: false,
    
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        nodeIntegrationInWorker: true,
        nodeIntegration: true,
        contextIsolation: false
      }
    })

    loginWindow.on('ready-to-show', () => {
      loginWindow.show()
    })

    loginWindow.loadFile(join(__dirname, '../renderer/login.html'))

}

//#region  cuando esta lista la app
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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

  

  if (nativeTheme.shouldUseDarkColors) {
    theme = 'Dark'
  } else {
    theme = 'Ligth'
  }
  nativeTheme.on('updated', () => {
    if (nativeTheme.shouldUseDarkColors) {
      theme = 'Dark'
    } else {
      theme = 'Ligth'
    }
  })


  createLoginWindow()

})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

//#region funciones del sistema
//se obtiene el theme del equipo
ipcMain.handle('obtenerTheme', async () => {
  try {
    return theme
  } catch (e: unknown) {
    return `${e}`
  }
})

ipcMain.handle('version', async () => {
  return app.getVersion();
})

ipcMain.handle('obtenerCuenta', async () => {
  try {
    return {user:user, permisos:permisos, cargo:cargo}
  } catch (e: unknown) {
    return `${e}`
  }
})

// const socket = io('ws://192.168.0.172:3000/', {
//   rejectUnauthorized: false
// })

//#region llamadas al servidor

//la funcion que loguea la cuenta
ipcMain.handle('user', async (event, datos) => {
  try {
    event.defaultPrevented
    const responseJSON = await net.fetch("http://192.168.0.172:3010/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' // Añade este encabezado
      },
      body: JSON.stringify({
        user: datos.user,
        password: datos.password
      })
    })
    const response = await responseJSON.json();

    if (response.status === 200) {
    
      accessToken = response.accesToken;

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

      socket2.on('connect', () => {
        console.log("Conectado a ws://192.168.0.172:3011/")
      });

      socket.on('connect', () => {
        electronApp.setAppUserModelId('com.electron')
        const version = app.getVersion()
        net
          .fetch(`http://192.168.0.172:3000/newVersion=${version}`, { method: 'GET' })
          .then((response) => response.text())
          .then((data) => {
            if (data === "true") {
              updater.autoUpdater.checkForUpdates().then(() => {
                updater.autoUpdater.once('update-available', (info) => {
                  new Notification({
                    title: 'version disponible',
                    body: info.version
                  }).show()
                  updater.autoUpdater.downloadUpdate().then(() => {
                    updater.autoUpdater.once("update-downloaded", () => {
                      updater.autoUpdater.quitAndInstall();
                    })
                  })
                })
              })
            }
          })
          .catch((e) => console.log(e))

        updater.autoUpdater.on("error", (info) => {
          new Notification({
            title: info.name,
            body: info.message
          }).show()
        })
      });


      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      socket2.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message);
        mainWindow.close()
        createLoginWindow()
      });
      
      loginWindow.close()
      console.log(response)
      cargo = response.cargo;
      user = response.user;
      permisos = response.permisos;

      createWindow()

      return response
    }
    return response
  } catch (e) {
    if (e instanceof Error){
      console.log(e)
      return `${e.message}`

    }
  }
})

//comunicacion con el servidor
ipcMain.handle('server', async (event, data) => {
  try {
    event.preventDefault()
    const request = { data: data}
    const response = await new Promise((resolve) => {
      socket.emit('Desktop', request, (serverResponse) => {
        // console.log(serverResponse)
        resolve(serverResponse)
      })
    })
    return response
  } catch (e) {
    return { status: 505, data: e }
  }
})

//comunicacion con el servidor
ipcMain.handle('server2', async (event, data) => {
  try {
    event.preventDefault()
    const request = { data: data, token:accessToken }
    const response:{status:number, data:object, token:string} = await new Promise((resolve) => {
      socket2.emit('Desktop2', request, (serverResponse) => {
        console.log(serverResponse.status)
        if(serverResponse.status === 404){
          mainWindow.close()
          createLoginWindow()
        }
        resolve(serverResponse)
      })
    })
    accessToken = response.token;
    return response
  } catch (e) {
    return { status: 505, data: e }
  }
})

ipcMain.handle('imprimirRotulos', async (event, data) => {
  try {
    event.preventDefault()
    console.log(data)
    if (data.tipoRotulo === 'rotuloCaja') {
      console.log('entra aqui')
      const request = {
        data: {
          action: 'obtenerInfoRotulosCajas',
          data: { cliente: data.cliente, nombrePredio: data.nombrePredio, enf: data.enf }
        },
        id: socket.id
      }
      const response: clientesServerResponseType = await new Promise((resolve) => {
        socket.emit('contenedoresService', request, (serverResponse) => {
          if (typeof serverResponse === 'object') {
            resolve(serverResponse)
          }
        })
      })

      if (cargo === 'auxiliar_lista_de_empaque') {
        const child = utilityProcess.fork(join(__dirname, 'imprimir.js'))
        child.postMessage({
          destino: response.data.cliente.PAIS_DESTINO,
          codigoCliente: response.data.cliente.CODIGO,
          codigoPredio: response.data.proveedor['CODIGO INTERNO'],
          codigoICA: response.data.proveedor.ICA,
          codigoGGN: response.data.proveedor.GGN,
          codigoCoC: undefined,
          contenedor: data.contenedor,
          ef1: response.data.lote._id,
          cliente: response.data.cliente.CLIENTE,
          clienteID: response.data.cliente.ID,
          telefono: response.data.cliente.TELEFONO,
          correo: response.data.cliente.CORREO,
          cajas: data.cajas,
          tipoFruta: response.data.lote.tipoFruta,
          tipoCaja: data.tipoCaja
        })
        child.stdout?.on('data', (data) => {
          console.log(data)
        })
      }
    } else if (data.tipoRotulo === 'rotuloPallet') {
      console.log(data)
      if (cargo === 'auxiliar_lista_de_empaque') {
        const child = utilityProcess.fork(join(__dirname, 'imprimirPallet.js'))
        child.postMessage({
          pallet: data.pallet
        })
        child.stdout?.on('data', (data) => {
          console.log(data)
        })
      }
    }
  } catch (e) {
    console.error(e)
  }
})

ipcMain.handle('crearDocumento', async (event, data) => {
  event.preventDefault()
  const { filePath } = await dialog.showSaveDialog({
    title: 'Guardar archivo Excel',
    defaultPath: 'tabla.xlsx',
    filters: [{ name: 'Excel', extensions: ['xlsx'] }],
  });

  const child2 = utilityProcess.fork(join(__dirname, 'crearDocumentos.js'))
  child2.postMessage({data:data, path:filePath});

})

