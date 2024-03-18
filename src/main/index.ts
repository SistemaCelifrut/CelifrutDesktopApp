/* eslint-disable prettier/prettier */
import { app, shell, BrowserWindow, nativeTheme, ipcMain, utilityProcess, Notification, dialog  } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { io } from 'socket.io-client'
import { responseLoginType, clientesServerResponseType } from './types/login'
import { autoUpdater } from 'electron-updater'

let theme: 'Dark' | 'Ligth' = 'Ligth'
let cargo = ''


function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
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

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
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
    console.log("serverToDesktop")
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  autoUpdater.checkForUpdates()

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
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


autoUpdater.on('error', (info) => {
  new Notification({
    title: 'Error',
    body: info.message
  }).show()
})

autoUpdater.on('update-available', (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type:"info",
    buttons:["Ok"],
    title: "Aplication Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail: "A new version is being download"
  }
  dialog.showMessageBox(dialogOpts, (response) => {})

})

autoUpdater.on('update-not-available', (info) => {
  new Notification({
    title: 'no avaiable',
    body: info.version
  }).show()
})

/*Download Completion Message*/
autoUpdater.on('update-downloaded', (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type:"info",
    buttons:["Ok"],
    title: "Aplication Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail: "A new version is being download"
  }
  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if(returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

//se obtiene el theme del equipo
ipcMain.handle('obtenerTheme', async () => {
  try {
    return theme
  } catch (e: unknown) {
    return `${e}`
  }
})

const socket = io('ws://192.168.0.172:3000/', {
  rejectUnauthorized: false
})

//la funcion que loguea la cuenta
ipcMain.handle('user', async (event, datos) => {
  try {
    event.defaultPrevented
    console.log("user", datos)
    const request = { data: datos, id: socket.id }
    const user: responseLoginType = await new Promise((resolve) => {
      socket.emit('user', request, (response) => {
        if (typeof response === 'object') {
          resolve(response)
        } else {
          resolve({
            status: 400,
            data: { user: '', password: '', rol: '', cargo: '', permisos: [''] }
          })
        }
      })
    })
    console.log(user)
    if (datos.action === 'logIn') {
      cargo = user.data.cargo
    }
    return user
  } catch (e: unknown) {
    return `${e}`
  }
})

//comunicacion con el servidor
ipcMain.handle('server', async (event, data) => {
  try{
    event.preventDefault();
    const request = { data:data }
    const response = await new Promise((resolve) => {
     socket.emit("Desktop", request, (serverResponse) => {
      // console.log(serverResponse)
      resolve(serverResponse);
     })
    })
     return response;
  } catch(e){
    return {status:505, data:e};
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
      console.log(response)

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

// const socket = io('ws://localhost:3000/',{
//   rejectUnauthorized: false,
// });

// const child = utilityProcess.fork(join(__dirname, 'imprimir.js'))
// child.postMessage({ message: 'hello' })
// child.stdout?.on('data', (data) => {
//   console.log(data)
// })
