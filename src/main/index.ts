import { app, shell, BrowserWindow, nativeTheme, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { io } from 'socket.io-client'

let theme: 'Dark' | 'Ligth' = 'Ligth'
//let userGlobal: userType = { user: '', permisos: [''] }

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

  socket.on('descartesInfo2', (data) => {
    console.log(data)
    if (data.status === 200) mainWindow.webContents.send('descartes', data.data)
    else console.log('error')
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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

//se obtiene el theme del equipo
ipcMain.handle('obtenerTheme', async () => {
  try {
    return theme
  } catch (e: any) {
    return `${e.name}:${e.message}`
  }
})

const socket = io('ws://192.168.0.172:3001/', {
  rejectUnauthorized: false
})

//la funcion que loguea la cuenta
ipcMain.handle('logIn', async (event, datos) => {
  try {
    event.defaultPrevented
    const request = { data: datos, id: socket.id }
    const user = await new Promise((resolve) => {
      socket.emit('logIn', request, (response) => {
        if (typeof response === 'object') {
          resolve(response)
        } else {
          resolve({ status: 400, user: '', permisos: [] })
        }
      })
    })
    console.log(user)
    return user
  } catch (e: any) {
    return `${e.name}:${e.message}`
  }
})
// funcion encargada para enviar y recibir los datos de ingreso de fruta
ipcMain.handle('ingresoFruta', async (event, data) => {
  try {
    event.defaultPrevented
    console.log(data)
    const request = { data: data, id: socket.id }
    const response = await new Promise((resolve) => {
      socket.emit('celifrutListen', request, (serverResponse) => {
        if (typeof serverResponse === 'object') {
          resolve(serverResponse)
        } else {
          resolve({ status: 400 })
        }
      })
    })
    console.log(response)
    return response
  } catch (e:any) {
    console.log(`${e.name}:${e.message}`)
    return {status:400, data:[{_id:'', PREDIO:''}]}
  }
})
//seccion inventario
ipcMain.handle('inventario', async (event, data) => {
  try {
    event.preventDefault()
    const request = { data: data, id: socket.id }
    console.log(request)
    const response = await new Promise((resolve) => {
      socket.emit('celifrutListen', request, (serverResponse) => {
        if (typeof serverResponse === 'object') {
          resolve(serverResponse)
        } else {
          resolve({ status: 400 })
        }
      })
    })
    console.log(response)
    return response
  } catch (e) {
    return { status: 400 }
  }
})
