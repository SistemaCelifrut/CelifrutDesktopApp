/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const { ipcRenderer } = require('electron')

// Custom APIs for renderer
const api = {
  obtenerTheme: async (): Promise<'Dark' | 'Light'> => {
    const response = await ipcRenderer.invoke('obtenerTheme')
    return response
  },
  user: async (datos): Promise<unknown> => {
    const response = await ipcRenderer.invoke('user', datos)
    return response
  },
  proceso: async (datos) => {
    const response = await ipcRenderer.invoke('proceso', datos)
    return response
  },
  imprimirRotulos: async (datos) => {
    const response = await ipcRenderer.invoke('imprimirRotulos', datos)
    return response
  },
  obtenerSesion: async () => {
    const response = await ipcRenderer.invoke('obtenerSesion')
    return response
  },
  ingresoFruta: async (datos) => {
    const response = await ipcRenderer.invoke('ingresoFruta', datos)
    return response
  },
  inventario: async (datos) => {
    const response = await ipcRenderer.invoke('inventario', datos)
    return response
  },
  contenedores: async (datos) => {
    const response = await ipcRenderer.invoke('contenedores', datos)
    return response
  },
  calidad: async (datos) => {
    const response = await ipcRenderer.invoke('calidad', datos)
    return response
  },
  proveedores: async (datos) => {
    const response = await ipcRenderer.invoke('proveedores', datos)
    return response
  },
  descartes: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => {
      event.preventDefault
      return callback(...args)
    })
  },
  listaEmpaqueInfo: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => {
      event.preventDefault
      return callback(...args)
    })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
